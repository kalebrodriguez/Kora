import { monogramAvatar } from "../avatar";
import { prisma } from "../client";
import type { LogStatus } from "../types";

export interface AdminContext {
  admin: { id: string; name: string; avatar: string };
  school: { id: string; name: string; state: string; district: string | null };
}

export interface StudentComplianceRow {
  userId: string;
  name: string;
  email: string;
  grade: string;
  avatar: string;
  verifiedHours: number;
  pendingHours: number;
  flaggedCount: number;
  lastActivity: string | null;
}

export interface FlaggedLogRow {
  id: string;
  studentName: string;
  studentEmail: string;
  shiftTitle: string;
  orgName: string;
  activity: string;
  hours: number;
  status: LogStatus;
  completedAt: string;
}

export async function getAdminContext(
  userId: string,
): Promise<AdminContext | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { school: true },
  });

  if (!user || user.role !== "SCHOOL_ADMIN" || !user.school) {
    return null;
  }

  return {
    admin: {
      id: user.id,
      name: `${user.firstName} ${user.lastName}`,
      avatar:
        user.avatar ?? monogramAvatar(`${user.firstName} ${user.lastName}`),
    },
    school: {
      id: user.school.id,
      name: user.school.name,
      state: user.school.state,
      district: user.school.district,
    },
  };
}

/**
 * Compliance master-list for one school. FERPA: every query here is scoped
 * to the admin's own schoolId — never cross-school.
 */
export async function getSchoolCompliance(
  schoolId: string,
): Promise<StudentComplianceRow[]> {
  const students = await prisma.user.findMany({
    where: { schoolId, role: "STUDENT" },
    include: { shiftLogs: true },
    orderBy: [{ lastName: "asc" }, { firstName: "asc" }],
  });

  return students.map((s) => {
    const verified = s.shiftLogs.filter((l) => l.status === "verified");
    const pending = s.shiftLogs.filter((l) => l.status === "pending");
    const flagged = s.shiftLogs.filter((l) => l.status === "flagged");
    const last = s.shiftLogs
      .map((l) => l.completedAt)
      .sort((a, b) => b.getTime() - a.getTime())[0];

    return {
      userId: s.id,
      name: `${s.firstName} ${s.lastName}`,
      email: s.email,
      grade: s.grade ?? "",
      avatar:
        s.avatar ?? monogramAvatar(`${s.firstName} ${s.lastName}`),
      verifiedHours: verified.reduce((sum, l) => sum + l.hours, 0),
      pendingHours: pending.reduce((sum, l) => sum + l.hours, 0),
      flaggedCount: flagged.length,
      lastActivity: last?.toISOString() ?? null,
    };
  });
}

/** Flagged + pending logs for the school — the fraud-review surface. */
export async function getFlaggedLogsForSchool(
  schoolId: string,
): Promise<FlaggedLogRow[]> {
  const logs = await prisma.shiftLog.findMany({
    where: {
      status: { in: ["flagged", "pending"] },
      user: { schoolId },
    },
    include: { user: true, shift: { include: { org: true } } },
    orderBy: { completedAt: "desc" },
  });

  return logs.map((log) => ({
    id: log.id,
    studentName: `${log.user.firstName} ${log.user.lastName}`,
    studentEmail: log.user.email,
    shiftTitle: log.shift.title,
    orgName: log.shift.org.name,
    activity: log.activity,
    hours: log.hours,
    status: log.status as LogStatus,
    completedAt: log.completedAt.toISOString(),
  }));
}

export interface SchoolStats {
  studentCount: number;
  verifiedHours: number;
  pendingCount: number;
  flaggedCount: number;
  organizationCount: number;
}

export async function getSchoolStats(schoolId: string): Promise<SchoolStats> {
  const [studentCount, verified, pendingCount, flaggedCount, orgCount] =
    await Promise.all([
      prisma.user.count({ where: { schoolId, role: "STUDENT" } }),
      prisma.shiftLog.aggregate({
        where: { status: "verified", user: { schoolId } },
        _sum: { hours: true },
      }),
      prisma.shiftLog.count({
        where: { status: "pending", user: { schoolId } },
      }),
      prisma.shiftLog.count({
        where: { status: "flagged", user: { schoolId } },
      }),
      prisma.organization.count(),
    ]);

  return {
    studentCount,
    verifiedHours: verified._sum.hours ?? 0,
    pendingCount,
    flaggedCount,
    organizationCount: orgCount,
  };
}
