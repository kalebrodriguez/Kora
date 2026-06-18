import { monogramAvatar } from "../avatar";
import { prisma } from "../client";
import { logToView, shiftToView } from "../mappers";
import type {
  LogStatus,
  OrgPendingLogView,
  OrgRosterEntry,
  OrgShiftView,
  QrSessionInfo,
} from "../types";

export interface ModeratorContext {
  moderator: {
    id: string;
    name: string;
    avatar: string;
    roleTitle: string;
  };
  org: {
    id: string;
    name: string;
    description: string;
    avatar: string;
    verified: boolean;
  };
}

export async function getModeratorContext(
  userId: string,
): Promise<ModeratorContext | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { moderatedOrg: true },
  });

  if (!user || user.role !== "ORG_MODERATOR" || !user.moderatedOrg) {
    return null;
  }

  return {
    moderator: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar:
        user.avatar ?? monogramAvatar(`${user.firstName} ${user.lastName}`),
      roleTitle: user.roleTitle ?? "Volunteer Coordinator",
    },
    org: {
      id: user.moderatedOrg.id,
      name: user.moderatedOrg.name,
      description: user.moderatedOrg.description,
      avatar:
        user.moderatedOrg.avatar ??
        monogramAvatar(user.moderatedOrg.name, { square: true }),
      verified: user.moderatedOrg.verified,
    },
  };
}

export async function getOrgShifts(orgId: string): Promise<OrgShiftView[]> {
  const shifts = await prisma.shift.findMany({
    where: { orgId },
    include: {
      org: true,
      _count: { select: { commitments: true } },
      logs: { select: { status: true } },
      qrSessions: {
        where: { active: true, expiresAt: { gt: new Date() } },
        orderBy: { issuedAt: "desc" },
        take: 1,
      },
    },
    orderBy: { scheduledAt: "asc" },
  });

  return shifts.map((shift) => {
    const view = shiftToView(shift, { saved: false, committed: false });
    const activeSession = shift.qrSessions[0];

    return {
      ...view,
      committedCount: shift._count.commitments,
      pendingLogCount: shift.logs.filter((l) => l.status === "pending").length,
      verifiedLogCount: shift.logs.filter((l) => l.status === "verified").length,
      activeQr: activeSession
        ? {
            token: activeSession.token,
            issuedAt: activeSession.issuedAt.getTime(),
            expiresAt: activeSession.expiresAt.toISOString(),
          }
        : null,
    };
  });
}

export async function getShiftRoster(shiftId: string): Promise<OrgRosterEntry[]> {
  const commitments = await prisma.commitment.findMany({
    where: { shiftId },
    include: {
      user: { include: { shiftLogs: { where: { shiftId } } } },
    },
    orderBy: { createdAt: "asc" },
  });

  return commitments.map((c) => {
    const log = c.user.shiftLogs[0];
    return {
      userId: c.userId,
      name: `${c.user.firstName} ${c.user.lastName}`,
      avatar:
        c.user.avatar ?? monogramAvatar(`${c.user.firstName} ${c.user.lastName}`),
      committedAt: c.createdAt.toISOString(),
      logStatus: (log?.status as LogStatus | undefined) ?? null,
      loggedHours: log?.hours ?? null,
    };
  });
}

export async function getPendingLogsForOrg(
  orgId: string,
): Promise<OrgPendingLogView[]> {
  const logs = await prisma.shiftLog.findMany({
    where: { shift: { orgId }, status: { in: ["pending", "flagged"] } },
    include: { user: true, shift: true },
    orderBy: { completedAt: "desc" },
  });

  return logs.map((log) => ({
    id: log.id,
    shiftId: log.shiftId,
    shiftTitle: log.shift.title,
    studentName: `${log.user.firstName} ${log.user.lastName}`,
    studentAvatar:
      log.user.avatar ?? monogramAvatar(`${log.user.firstName} ${log.user.lastName}`),
    activity: log.activity,
    hours: log.hours,
    status: log.status as LogStatus,
    completedAt: log.completedAt.toISOString(),
  }));
}

/**
 * Persist a moderator-issued QR session; deactivates prior sessions for the
 * shift. Validates the shift belongs to the moderator's organization.
 */
export async function createQrSessionRecord(
  moderatorUserId: string,
  shiftId: string,
  token: string,
  issuedAt: number,
  expiresAt: Date,
): Promise<QrSessionInfo> {
  const moderator = await prisma.user.findUnique({
    where: { id: moderatorUserId },
    include: { moderatedOrg: true },
  });
  if (!moderator?.moderatedOrg) {
    throw new Error("Not an organization moderator.");
  }

  const shift = await prisma.shift.findUnique({ where: { id: shiftId } });
  if (!shift || shift.orgId !== moderator.moderatedOrg.id) {
    throw new Error("Shift not found for your organization.");
  }

  const [, session] = await prisma.$transaction([
    prisma.qrSession.updateMany({
      where: { shiftId, active: true },
      data: { active: false },
    }),
    prisma.qrSession.create({
      data: {
        shiftId,
        token,
        issuedAt: new Date(issuedAt),
        expiresAt,
      },
    }),
  ]);

  return {
    shiftId: session.shiftId,
    token: session.token,
    issuedAt: session.issuedAt.getTime(),
    expiresAt: session.expiresAt.toISOString(),
    active: session.active,
  };
}

/** Moderator manually verifies a pending/flagged log. */
export async function verifyShiftLogById(logId: string, moderatorUserId: string) {
  const moderator = await prisma.user.findUnique({
    where: { id: moderatorUserId },
    include: { moderatedOrg: true },
  });
  if (!moderator?.moderatedOrg) {
    throw new Error("Not an organization moderator.");
  }

  const log = await prisma.shiftLog.findUnique({
    where: { id: logId },
    include: { shift: { include: { org: true } } },
  });
  if (!log || log.shift.orgId !== moderator.moderatedOrg.id) {
    throw new Error("Log not found for your organization.");
  }
  if (log.status === "verified") {
    return logToView(log);
  }

  const updated = await prisma.shiftLog.update({
    where: { id: logId },
    data: {
      status: "verified",
      verifiedAt: new Date(),
      verifiedBy: moderatorUserId,
    },
    include: { shift: { include: { org: true } } },
  });

  await prisma.notification.create({
    data: {
      userId: log.userId,
      kind: "hours_verified",
      title: "Hours verified",
      body: `${moderator.firstName} ${moderator.lastName} approved ${log.hours} hrs for ${log.shift.title} at ${log.shift.org.name}.`,
      href: "/hours",
    },
  });

  return logToView(updated);
}

/** Moderator flags a suspicious log. */
export async function flagShiftLogById(logId: string, moderatorUserId: string) {
  const moderator = await prisma.user.findUnique({
    where: { id: moderatorUserId },
    include: { moderatedOrg: true },
  });
  if (!moderator?.moderatedOrg) {
    throw new Error("Not an organization moderator.");
  }

  const log = await prisma.shiftLog.findUnique({
    where: { id: logId },
    include: { shift: true },
  });
  if (!log || log.shift.orgId !== moderator.moderatedOrg.id) {
    throw new Error("Log not found for your organization.");
  }

  const updated = await prisma.shiftLog.update({
    where: { id: logId },
    data: { status: "flagged", verifiedAt: null, verifiedBy: null },
    include: { shift: { include: { org: true } } },
  });

  return logToView(updated);
}
