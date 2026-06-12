import type { Prisma } from "@prisma/client";
import { formatLogDate, formatShiftDate } from "./format";
import { parseStringArray } from "./json";
import type {
  CategoryKey,
  LogStatus,
  ShiftLogView,
  ShiftView,
  TintKey,
} from "./types";

const FALLBACK_IMG =
  "https://api.dicebear.com/9.x/shapes/svg?seed=Kora&backgroundColor=ECEAFB";

export type ShiftWithOrg = Prisma.ShiftGetPayload<{
  include: { org: true; _count: { select: { commitments: true } } };
}>;

export type LogWithShiftOrg = Prisma.ShiftLogGetPayload<{
  include: { shift: { include: { org: true } } };
}>;

export function shiftToView(
  shift: ShiftWithOrg,
  opts: { saved: boolean; committed: boolean },
): ShiftView {
  const spotsLeft = Math.max(
    shift.slots - shift.externalSignups - shift._count.commitments,
    0,
  );

  return {
    id: shift.id,
    title: shift.title,
    description: shift.description,
    org: shift.org.name,
    orgId: shift.orgId,
    moderatorId: shift.org.moderatorId ?? "",
    category: shift.category,
    categoryKey: shift.categoryKey as CategoryKey,
    categoryTint: shift.categoryTint as TintKey,
    date: formatShiftDate(shift.scheduledAt),
    scheduledAt: shift.scheduledAt.toISOString(),
    spotsLeft,
    slots: shift.slots,
    hours: shift.durationHrs,
    img: shift.img ?? FALLBACK_IMG,
    saved: opts.saved,
    skills: parseStringArray(shift.skills),
    committed: opts.committed,
  };
}

export function logToView(log: LogWithShiftOrg): ShiftLogView {
  return {
    id: log.id,
    shiftId: log.shiftId,
    org: log.shift.org.name,
    date: formatLogDate(log.completedAt),
    category: log.shift.category,
    categoryKey: log.shift.categoryKey as CategoryKey,
    categoryTint: log.shift.categoryTint as TintKey,
    activity: log.activity,
    hours: log.hours,
    status: log.status as LogStatus,
    avatar: log.shift.org.avatar ?? FALLBACK_IMG,
    qrToken: log.qrToken,
    qrExpiresAt: log.qrExpiresAt?.toISOString() ?? null,
    verifiedAt: log.verifiedAt?.toISOString() ?? null,
    completedAt: log.completedAt.toISOString(),
  };
}
