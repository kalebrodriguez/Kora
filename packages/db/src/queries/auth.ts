import { prisma } from "../client";
import { hashPassword, verifyPassword } from "../password";
import type { RoleName, SessionUser } from "../types";

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

export type RegisterStudentResult =
  | { ok: true; user: SessionUser }
  | { ok: false; error: string };

/**
 * Self-serve student registration. New accounts are always STUDENT role and
 * scoped to a real school so they surface in that school's compliance list
 * (FERPA: never cross-school). Hours start at zero — only a verified QR
 * sign-off can ever add to the ledger.
 */
export async function registerStudent(
  input: RegisterStudentInput,
): Promise<RegisterStudentResult> {
  const firstName = input.firstName.trim();
  const lastName = input.lastName.trim();
  const email = input.email.trim().toLowerCase();

  if (!firstName || !lastName) {
    return { ok: false, error: "Enter your first and last name." };
  }
  if (!email || !email.includes("@")) {
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
      avatar: `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(
        firstName,
      )}&backgroundColor=ECEAFB`,
    },
  });

  return { ok: true, user: toSessionUser(user) };
}
