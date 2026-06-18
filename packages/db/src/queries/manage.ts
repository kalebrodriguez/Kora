import { monogramAvatar } from "../avatar";
import { prisma } from "../client";
import { toJsonArray } from "../json";
import { hashPassword } from "../password";
import type { CategoryKey } from "../types";

// Category presets keep tint/label/image consistent — never hardcoded in UI.
const CATEGORY_PRESETS: Record<
  CategoryKey,
  { label: string; tint: string; defaultImg: string }
> = {
  community: {
    label: "Community",
    tint: "lavender",
    defaultImg:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=70",
  },
  environment: {
    label: "Environment",
    tint: "sky",
    defaultImg:
      "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=600&q=70",
  },
  education: {
    label: "Education",
    tint: "pink",
    defaultImg:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70",
  },
};

export interface CreateShiftInput {
  title: string;
  description: string;
  categoryKey: CategoryKey;
  scheduledAt: Date;
  durationHrs: number;
  slots: number;
  skills: string[];
  img?: string;
}

/** Moderator creates a shift for their own organization. */
export async function createShift(
  moderatorUserId: string,
  input: CreateShiftInput,
): Promise<{ id: string }> {
  const moderator = await prisma.user.findUnique({
    where: { id: moderatorUserId },
    include: { moderatedOrg: true },
  });
  if (!moderator?.moderatedOrg) {
    throw new Error("Not an organization moderator.");
  }

  const preset = CATEGORY_PRESETS[input.categoryKey];
  if (!preset) {
    throw new Error("Unknown category.");
  }
  if (!input.title.trim() || !input.description.trim()) {
    throw new Error("Title and description are required.");
  }
  if (input.slots < 1 || input.durationHrs <= 0) {
    throw new Error("Slots and duration must be positive.");
  }
  if (input.scheduledAt.getTime() < Date.now()) {
    throw new Error("Schedule the shift in the future.");
  }

  const shift = await prisma.shift.create({
    data: {
      title: input.title.trim(),
      description: input.description.trim(),
      orgId: moderator.moderatedOrg.id,
      category: preset.label,
      categoryKey: input.categoryKey,
      categoryTint: preset.tint,
      slots: input.slots,
      scheduledAt: input.scheduledAt,
      durationHrs: input.durationHrs,
      skills: toJsonArray(
        input.skills.map((s) => s.trim().toLowerCase()).filter(Boolean),
      ),
      img: input.img?.trim() || preset.defaultImg,
    },
  });

  return { id: shift.id };
}

export interface CreateOrganizationInput {
  name: string;
  description: string;
  categories: CategoryKey[];
  distance?: string;
  moderatorFirstName: string;
  moderatorLastName: string;
  moderatorEmail: string;
  moderatorPassword: string;
  moderatorRoleTitle?: string;
}

/** Admin onboards a partner organization together with its moderator login. */
export async function createOrganizationWithModerator(
  adminUserId: string,
  input: CreateOrganizationInput,
): Promise<{ orgId: string; moderatorEmail: string }> {
  const admin = await prisma.user.findUnique({ where: { id: adminUserId } });
  if (!admin || admin.role !== "SCHOOL_ADMIN") {
    throw new Error("Only school admins can onboard organizations.");
  }

  const email = input.moderatorEmail.trim().toLowerCase();
  if (!input.name.trim() || !email || !input.moderatorPassword) {
    throw new Error("Organization name, moderator email, and password are required.");
  }
  if (input.moderatorPassword.length < 8) {
    throw new Error("Moderator password must be at least 8 characters.");
  }
  if (input.categories.length === 0) {
    throw new Error("Pick at least one category.");
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    throw new Error("A user with that email already exists.");
  }

  const result = await prisma.$transaction(async (tx) => {
    const moderator = await tx.user.create({
      data: {
        email,
        passwordHash: hashPassword(input.moderatorPassword),
        role: "ORG_MODERATOR",
        firstName: input.moderatorFirstName.trim(),
        lastName: input.moderatorLastName.trim(),
        roleTitle: input.moderatorRoleTitle?.trim() || "Volunteer Coordinator",
        avatar: monogramAvatar(
          `${input.moderatorFirstName.trim()} ${input.moderatorLastName.trim()}`,
        ),
      },
    });

    const org = await tx.organization.create({
      data: {
        name: input.name.trim(),
        description: input.description.trim(),
        avatar: monogramAvatar(input.name.trim(), { square: true }),
        verified: true,
        distance: input.distance?.trim() || null,
        categories: toJsonArray(input.categories),
        moderatorId: moderator.id,
      },
    });

    return { orgId: org.id, moderatorEmail: moderator.email };
  });

  return result;
}
