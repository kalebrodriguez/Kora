// View-model types returned by @kora/db queries. Structurally identical to
// the UI types in apps/web/lib/types/student.ts so components can consume
// query results directly.

export type CategoryKey = "community" | "environment" | "education";
export type TintKey = "lavender" | "pink" | "sky";
export type LogStatus = "verified" | "pending" | "flagged";
export type RoleName = "STUDENT" | "ORG_MODERATOR" | "SCHOOL_ADMIN";

export interface SessionUser {
  id: string;
  email: string;
  role: RoleName;
  firstName: string;
  lastName: string;
}

export interface StudentProfile {
  id: string;
  name: string;
  firstName: string;
  grade: string;
  avatar: string;
  schoolId: string;
  schoolState: string;
  skills: string[];
  hoursLogged: number;
  streakWeeks: number;
}

export interface ShiftView {
  id: string;
  title: string;
  description: string;
  org: string;
  orgId: string;
  moderatorId: string;
  category: string;
  categoryKey: CategoryKey;
  categoryTint: TintKey;
  date: string;
  scheduledAt: string;
  spotsLeft: number;
  slots: number;
  hours: number;
  img: string;
  saved: boolean;
  skills: string[];
  committed: boolean;
}

export interface ShiftLogView {
  id: string;
  shiftId: string;
  org: string;
  date: string;
  category: string;
  categoryKey: CategoryKey;
  categoryTint: TintKey;
  activity: string;
  hours: number;
  status: LogStatus;
  avatar: string;
  qrToken: string | null;
  qrExpiresAt: string | null;
  verifiedAt: string | null;
  completedAt: string;
}

export interface OrgModeratorView {
  id: string;
  name: string;
  avatar: string;
  roleTitle: string;
  totalVerifications: number;
}

export interface OrganizationView {
  id: string;
  name: string;
  description: string;
  categories: CategoryKey[];
  distance: string;
  verified: boolean;
  avatar: string;
  following: boolean;
  upcomingShifts: number;
  moderatorId: string;
}

export type NotificationKind = "hours_verified" | "motivation" | "milestone";

export interface NotificationView {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  read: boolean;
  createdAt: string;
  href?: string;
}

// ---- Org portal views ----

export interface OrgShiftView extends ShiftView {
  committedCount: number;
  pendingLogCount: number;
  verifiedLogCount: number;
  activeQr: { token: string; issuedAt: number; expiresAt: string } | null;
}

export interface OrgPendingLogView {
  id: string;
  shiftId: string;
  shiftTitle: string;
  studentName: string;
  studentAvatar: string;
  activity: string;
  hours: number;
  status: LogStatus;
  completedAt: string;
}

export interface OrgRosterEntry {
  userId: string;
  name: string;
  avatar: string;
  committedAt: string;
  logStatus: LogStatus | null;
  loggedHours: number | null;
}

export interface QrSessionInfo {
  shiftId: string;
  token: string;
  issuedAt: number;
  expiresAt: string;
  active: boolean;
}
