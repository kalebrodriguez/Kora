import { prisma } from "../client";
import { parseStringArray } from "../json";
import { logToView, shiftToView } from "../mappers";
import type {
  NotificationKind,
  NotificationView,
  OrgModeratorView,
  OrganizationView,
  CategoryKey,
  ShiftLogView,
  ShiftView,
  StudentProfile,
} from "../types";

export async function getStudentProfile(
  userId: string,
): Promise<StudentProfile> {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    include: { school: true },
  });

  const verified = await prisma.shiftLog.aggregate({
    where: { userId, status: "verified" },
    _sum: { hours: true },
  });

  return {
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    firstName: user.firstName,
    grade: user.grade ?? "",
    avatar:
      user.avatar ??
      `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.firstName}`,
    schoolId: user.schoolId ?? "",
    schoolState: user.school?.state ?? "FL",
    skills: parseStringArray(user.skills),
    hoursLogged: verified._sum.hours ?? 0,
    streakWeeks: user.streakWeeks,
  };
}

export async function getShiftsForStudent(userId: string): Promise<ShiftView[]> {
  const [shifts, saved, committed] = await Promise.all([
    prisma.shift.findMany({
      include: { org: true, _count: { select: { commitments: true } } },
      orderBy: { scheduledAt: "asc" },
    }),
    prisma.savedShift.findMany({ where: { userId }, select: { shiftId: true } }),
    prisma.commitment.findMany({ where: { userId }, select: { shiftId: true } }),
  ]);

  const savedIds = new Set(saved.map((s) => s.shiftId));
  const committedIds = new Set(committed.map((c) => c.shiftId));

  return shifts.map((shift) =>
    shiftToView(shift, {
      saved: savedIds.has(shift.id),
      committed: committedIds.has(shift.id),
    }),
  );
}

export async function getOrganizationsForStudent(
  userId: string,
): Promise<OrganizationView[]> {
  const [orgs, follows] = await Promise.all([
    prisma.organization.findMany({
      include: {
        _count: {
          select: { shifts: { where: { scheduledAt: { gte: new Date() } } } },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.orgFollow.findMany({ where: { userId }, select: { orgId: true } }),
  ]);

  const followingIds = new Set(follows.map((f) => f.orgId));

  return orgs.map((org) => ({
    id: org.id,
    name: org.name,
    description: org.description,
    categories: parseStringArray(org.categories) as CategoryKey[],
    distance: org.distance ?? "",
    verified: org.verified,
    avatar:
      org.avatar ?? `https://api.dicebear.com/9.x/icons/svg?seed=${org.id}`,
    following: followingIds.has(org.id),
    upcomingShifts: org._count.shifts,
    moderatorId: org.moderatorId ?? "",
  }));
}

export async function getModerators(): Promise<OrgModeratorView[]> {
  const moderators = await prisma.user.findMany({
    where: { role: "ORG_MODERATOR" },
  });

  const counts = await prisma.shiftLog.groupBy({
    by: ["verifiedBy"],
    where: { verifiedBy: { in: moderators.map((m) => m.id) } },
    _count: { _all: true },
  });
  const countByModerator = new Map(
    counts.map((c) => [c.verifiedBy, c._count._all]),
  );

  return moderators.map((m) => ({
    id: m.id,
    name: `${m.firstName} ${m.lastName}`,
    avatar:
      m.avatar ?? `https://api.dicebear.com/9.x/avataaars/svg?seed=${m.firstName}`,
    roleTitle: m.roleTitle ?? "Volunteer Coordinator",
    totalVerifications: countByModerator.get(m.id) ?? 0,
  }));
}

export async function getHoursLog(userId: string): Promise<ShiftLogView[]> {
  const logs = await prisma.shiftLog.findMany({
    where: { userId },
    include: { shift: { include: { org: true } } },
    orderBy: { completedAt: "desc" },
  });

  return logs.map(logToView);
}

export async function getNotifications(
  userId: string,
): Promise<NotificationView[]> {
  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return notifications.map((n) => ({
    id: n.id,
    kind: n.kind as NotificationKind,
    title: n.title,
    body: n.body,
    read: n.read,
    createdAt: n.createdAt.toISOString(),
    href: n.href ?? undefined,
  }));
}

export async function markNotificationRead(
  userId: string,
  notificationId: string,
): Promise<void> {
  await prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { read: true },
  });
}

export async function markAllNotificationsRead(userId: string): Promise<void> {
  await prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true },
  });
}

export async function updateUserSkills(
  userId: string,
  skills: string[],
): Promise<void> {
  const normalized = skills
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 20);

  await prisma.user.update({
    where: { id: userId },
    data: { skills: JSON.stringify(normalized) },
  });
}

export async function commitToShift(
  userId: string,
  shiftId: string,
): Promise<{ ok: boolean; reason?: string }> {
  const shift = await prisma.shift.findUnique({
    where: { id: shiftId },
    include: { _count: { select: { commitments: true } } },
  });
  if (!shift) {
    return { ok: false, reason: "Shift not found." };
  }

  const spotsLeft =
    shift.slots - shift.externalSignups - shift._count.commitments;
  if (spotsLeft <= 0) {
    return { ok: false, reason: "This shift is full." };
  }

  const existing = await prisma.commitment.findUnique({
    where: { userId_shiftId: { userId, shiftId } },
  });
  if (existing) {
    return { ok: false, reason: "Already committed." };
  }

  await prisma.commitment.create({ data: { userId, shiftId } });
  return { ok: true };
}

export async function toggleSavedShift(
  userId: string,
  shiftId: string,
): Promise<boolean> {
  const existing = await prisma.savedShift.findUnique({
    where: { userId_shiftId: { userId, shiftId } },
  });

  if (existing) {
    await prisma.savedShift.delete({ where: { id: existing.id } });
    return false;
  }

  await prisma.savedShift.create({ data: { userId, shiftId } });
  return true;
}

export async function toggleFollowOrg(
  userId: string,
  orgId: string,
): Promise<boolean> {
  const existing = await prisma.orgFollow.findUnique({
    where: { userId_orgId: { userId, orgId } },
  });

  if (existing) {
    await prisma.orgFollow.delete({ where: { id: existing.id } });
    return false;
  }

  await prisma.orgFollow.create({ data: { userId, orgId } });
  return true;
}

/**
 * Single-device demo convenience: newest active QR token for any shift this
 * student committed to, so check-in can be tested without a second screen.
 */
export async function getActiveQrTokenForStudent(
  userId: string,
): Promise<string | null> {
  const session = await prisma.qrSession.findFirst({
    where: {
      active: true,
      expiresAt: { gt: new Date() },
      shift: { commitments: { some: { userId } } },
    },
    orderBy: { issuedAt: "desc" },
  });
  return session?.token ?? null;
}

export interface RedeemQrResult {
  log: ShiftLogView;
  shiftTitle: string;
  org: string;
  hours: number;
}

/**
 * Look up a QR session by token so the caller (apps/web) can HMAC-verify it
 * before redeeming. Raw shift IDs never travel inside the QR token itself.
 */
export async function findQrSession(token: string) {
  const session = await prisma.qrSession.findUnique({
    where: { token },
    include: { shift: { include: { org: true } } },
  });

  if (!session) {
    return null;
  }

  return {
    shiftId: session.shiftId,
    token: session.token,
    issuedAt: session.issuedAt.getTime(),
    expiresAt: session.expiresAt.toISOString(),
    active: session.active,
  };
}

/** Redeem a validated QR session: creates a verified ShiftLog atomically. */
export async function redeemQrSession(
  userId: string,
  token: string,
): Promise<RedeemQrResult> {
  return prisma.$transaction(async (tx) => {
    const session = await tx.qrSession.findUnique({
      where: { token },
      include: { shift: { include: { org: true } } },
    });

    if (!session || !session.active) {
      throw new Error(
        "Invalid QR code. Ask your moderator to display a fresh code.",
      );
    }
    if (session.expiresAt.getTime() <= Date.now()) {
      throw new Error("This QR code has expired. Ask your moderator for a new one.");
    }

    const committed = await tx.commitment.findUnique({
      where: { userId_shiftId: { userId, shiftId: session.shiftId } },
    });
    if (!committed) {
      throw new Error(
        "You must commit to this shift before scanning. Find it on Events and commit first.",
      );
    }

    // Shifts recur, so students may log the same shift across sessions —
    // but each check-in code can only be redeemed once per student.
    const alreadyRedeemed = await tx.shiftLog.findUnique({
      where: { qrToken: `${token}:${userId}` },
    });
    if (alreadyRedeemed) {
      throw new Error("You have already checked in with this code.");
    }

    const moderatorId = session.shift.org.moderatorId;
    const now = new Date();

    const log = await tx.shiftLog.create({
      data: {
        userId,
        shiftId: session.shiftId,
        activity: session.shift.title,
        hours: session.shift.durationHrs,
        status: "verified",
        qrToken: `${token}:${userId}`,
        qrExpiresAt: session.expiresAt,
        verifiedAt: now,
        verifiedBy: moderatorId,
        completedAt: now,
      },
      include: { shift: { include: { org: true } } },
    });

    await tx.notification.create({
      data: {
        userId,
        kind: "hours_verified",
        title: "Hours verified",
        body: `${session.shift.org.name} verified ${session.shift.durationHrs} hrs for ${session.shift.title}.`,
        href: "/hours",
      },
    });

    return {
      log: logToView(log),
      shiftTitle: session.shift.title,
      org: session.shift.org.name,
      hours: session.shift.durationHrs,
    };
  });
}

const FRAUD_WINDOW_MS = 10 * 60 * 1000;
const FRAUD_THRESHOLD = 3;

/**
 * Student requests manual verification (missed the QR scan): creates a
 * pending log. Fraud rule: 3+ students logging identical unverified hours
 * for the same shift within 10 minutes flags them all.
 */
export async function createPendingLog(
  userId: string,
  shiftId: string,
  hours: number,
  activity: string,
): Promise<ShiftLogView> {
  const committed = await prisma.commitment.findUnique({
    where: { userId_shiftId: { userId, shiftId } },
  });
  if (!committed) {
    throw new Error("Commit to this shift before logging hours for it.");
  }

  const log = await prisma.shiftLog.create({
    data: {
      userId,
      shiftId,
      activity,
      hours,
      status: "pending",
      completedAt: new Date(),
    },
    include: { shift: { include: { org: true } } },
  });

  const windowStart = new Date(Date.now() - FRAUD_WINDOW_MS);
  const identical = await prisma.shiftLog.findMany({
    where: {
      shiftId,
      hours,
      status: "pending",
      createdAt: { gte: windowStart },
    },
    select: { id: true, userId: true },
  });

  const distinctStudents = new Set(identical.map((l) => l.userId));
  if (distinctStudents.size >= FRAUD_THRESHOLD) {
    await prisma.shiftLog.updateMany({
      where: { id: { in: identical.map((l) => l.id) } },
      data: { status: "flagged" },
    });
    log.status = "flagged";
  }

  return logToView(log);
}
