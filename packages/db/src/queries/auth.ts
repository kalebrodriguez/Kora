import { prisma } from "../client";
import { toJsonArray } from "../json";
import { hashPassword, verifyPassword } from "../password";
import type { CategoryKey, RoleName, SessionUser } from "../types";

export type AuthResult =
  | { ok: true; user: SessionUser }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function avatarFor(seed: string, bg: string): string {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
    seed,
  )}&backgroundColor=${bg}`;
}

function toSessionUser(user: {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}): SessionUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role as RoleName,
    firstName: user.firstName,
    lastName: user.lastName,
  };
}

export async function authenticateUser(
  email: string,
  password: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({
    where: { email: email.trim().toLowerCase() },
  });

  if (!user || !verifyPassword(password, user.passwordHash)) {
    return null;
  }

  return toSessionUser(user);
}

export async function getSessionUserById(
  userId: string,
): Promise<SessionUser | null> {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user ? toSessionUser(user) : null;
}

export interface SignupSchool {
  id: string;
  name: string;
}

/** Schools a new student can join at sign-up. */
export async function listSignupSchools(): Promise<SignupSchool[]> {
  const schools = await prisma.school.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
  return schools;
}

export interface RegisterStudentInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolId: string;
  /** Numeric grade level, 9–12. */
  gradeLevel: number;
}

/**
 * Self-serve student registration. New accounts are always STUDENT role and
 * scoped to a real school so they surface in that school's compliance list
 * (FERPA: never cross-school). Hours start at zero — only a verified QR
 * sign-off can ever add to the ledger.
 */
export async function registerStudent(
  input: RegisterStudentInput,
): Promise<AuthResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();

  if (!firstName || !lastName) {
    return { ok: false, error: "Enter your first and last name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  if (input.gradeLevel < 9 || input.gradeLevel > 12) {
    return { ok: false, error: "Select your grade level." };
  }

  const school = await prisma.school.findUnique({
    where: { id: input.schoolId },
    select: { id: true, name: true },
  });
  if (!school) {
    return { ok: false, error: "Select your school." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const ordinal: Record<number, string> = { 9: "9th", 10: "10th", 11: "11th", 12: "12th" };

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashPassword(input.password),
      role: "STUDENT",
      firstName,
      lastName,
      grade: `${ordinal[input.gradeLevel]} Grade · ${school.name}`,
      schoolId: school.id,
      avatar: avatarFor(firstName, "ECEAFB"),
    },
  });

  return { ok: true, user: toSessionUser(user) };
}

export interface RegisterAdminInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  schoolName: string;
  /** Validated against supported compliance states by the caller. */
  state: string;
  district?: string;
}

/**
 * Bootstraps a school: creates the School plus its first SCHOOL_ADMIN. This is
 * how a brand-new Kora instance gets its first account — students and orgs can
 * then join. `state` must be a compliance-supported state (caller validates).
 */
export async function registerAdmin(
  input: RegisterAdminInput,
): Promise<AuthResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();
  const schoolName = input.schoolName.trim();

  if (!firstName || !lastName) {
    return { ok: false, error: "Enter your first and last name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  if (!schoolName) {
    return { ok: false, error: "Enter your school name." };
  }
  if (!input.state.trim()) {
    return { ok: false, error: "Select your state." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const user = await prisma.$transaction(async (tx) => {
    const school = await tx.school.create({
      data: {
        name: schoolName,
        state: input.state.trim().toUpperCase(),
        district: input.district?.trim() || null,
      },
    });
    return tx.user.create({
      data: {
        email,
        passwordHash: hashPassword(input.password),
        role: "SCHOOL_ADMIN",
        firstName,
        lastName,
        roleTitle: "Service-Learning Coordinator",
        schoolId: school.id,
        avatar: avatarFor(firstName, "DDF0FB"),
      },
    });
  });

  return { ok: true, user: toSessionUser(user) };
}

export interface RegisterOrganizationInput {
  orgName: string;
  description: string;
  categories: CategoryKey[];
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roleTitle?: string;
}

/**
 * Self-serve organization registration: creates the Organization plus its
 * ORG_MODERATOR login in one transaction. The moderator can immediately
 * publish shifts and run QR sign-offs.
 */
export async function registerOrganization(
  input: RegisterOrganizationInput,
): Promise<AuthResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();
  const orgName = input.orgName.trim();

  if (!orgName) {
    return { ok: false, error: "Enter your organization name." };
  }
  if (!input.description.trim()) {
    return { ok: false, error: "Add a short description of your organization." };
  }
  if (input.categories.length === 0) {
    return { ok: false, error: "Pick at least one focus area." };
  }
  if (!firstName || !lastName) {
    return { ok: false, error: "Enter the coordinator's first and last name." };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with that email already exists." };
  }

  const user = await prisma.$transaction(async (tx) => {
    const moderator = await tx.user.create({
      data: {
        email,
        passwordHash: hashPassword(input.password),
        role: "ORG_MODERATOR",
        firstName,
        lastName,
        roleTitle: input.roleTitle?.trim() || "Volunteer Coordinator",
        avatar: avatarFor(firstName, "FBE4F1"),
      },
    });
    await tx.organization.create({
      data: {
        name: orgName,
        description: input.description.trim(),
        avatar: `https://api.dicebear.com/9.x/icons/svg?seed=${encodeURIComponent(
          orgName,
        )}&backgroundColor=DDF0FB`,
        verified: true,
        categories: toJsonArray(input.categories),
        moderatorId: moderator.id,
      },
    });
    return moderator;
  });

  return { ok: true, user: toSessionUser(user) };
}
