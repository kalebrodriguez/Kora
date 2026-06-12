"use client";

// DB-backed replacement for the old mock-store. The (student) layout fetches
// everything server-side and seeds this provider; mutations fire server
// actions and update local state optimistically.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  commitToShiftAction,
  markAllNotificationsReadAction,
  markNotificationReadAction,
  toggleFollowOrgAction,
  toggleSavedShiftAction,
} from "@/app/(student)/actions";
import type {
  AppNotification,
  CategoryProgress,
  MonthlyHours,
  OrgModerator,
  Organization,
  Shift,
  ShiftLog,
  StudentProfile,
} from "@/lib/types/student";

export interface StudentBundle {
  student: StudentProfile;
  shifts: Shift[];
  organizations: Organization[];
  hoursLog: ShiftLog[];
  moderators: OrgModerator[];
  notifications: AppNotification[];
  categories: CategoryProgress[];
  monthlyHours: MonthlyHours[];
}

interface StudentDataValue extends StudentBundle {
  setShifts: React.Dispatch<React.SetStateAction<Shift[]>>;
  setOrganizations: React.Dispatch<React.SetStateAction<Organization[]>>;
  setNotifications: React.Dispatch<React.SetStateAction<AppNotification[]>>;
}

const StudentDataContext = createContext<StudentDataValue | null>(null);

export function StudentDataProvider({
  bundle,
  children,
}: {
  bundle: StudentBundle;
  children: React.ReactNode;
}) {
  const [shifts, setShifts] = useState(bundle.shifts);
  const [organizations, setOrganizations] = useState(bundle.organizations);
  const [notifications, setNotifications] = useState(bundle.notifications);

  // Re-sync whenever the server re-renders the layout (revalidatePath).
  useEffect(() => setShifts(bundle.shifts), [bundle.shifts]);
  useEffect(() => setOrganizations(bundle.organizations), [bundle.organizations]);
  useEffect(() => setNotifications(bundle.notifications), [bundle.notifications]);

  const value = useMemo<StudentDataValue>(
    () => ({
      ...bundle,
      shifts,
      organizations,
      notifications,
      setShifts,
      setOrganizations,
      setNotifications,
    }),
    [bundle, shifts, organizations, notifications],
  );

  return (
    <StudentDataContext.Provider value={value}>
      {children}
    </StudentDataContext.Provider>
  );
}

export function useStudentData(): StudentDataValue {
  const ctx = useContext(StudentDataContext);
  if (!ctx) {
    throw new Error("useStudentData must be used inside StudentDataProvider");
  }
  return ctx;
}

/** Lookup helpers matching the old mock-data getModeratorById/ForOrg API. */
export function useModeratorLookup() {
  const { moderators, organizations } = useStudentData();

  return useMemo(() => {
    const byId = new Map(moderators.map((m) => [m.id, m]));
    const byOrg = new Map(
      organizations.map((o) => [o.id, byId.get(o.moderatorId)]),
    );
    return {
      getModeratorById: (id: string) => byId.get(id),
      getModeratorForOrg: (orgId: string) => byOrg.get(orgId),
    };
  }, [moderators, organizations]);
}

/** Same API as the old useMockStore, now backed by the database. */
export function useStore() {
  const { shifts, organizations, setShifts, setOrganizations } =
    useStudentData();

  const commitToShift = useCallback(
    (shiftId: string): boolean => {
      const shift = shifts.find((s) => s.id === shiftId);
      if (!shift || shift.committed || shift.spotsLeft <= 0) {
        return false;
      }
      setShifts((prev) =>
        prev.map((s) =>
          s.id === shiftId
            ? { ...s, committed: true, spotsLeft: s.spotsLeft - 1 }
            : s,
        ),
      );
      void commitToShiftAction(shiftId);
      return true;
    },
    [shifts, setShifts],
  );

  const isCommitted = useCallback(
    (shiftId: string) => shifts.some((s) => s.id === shiftId && s.committed),
    [shifts],
  );

  const toggleSavedShift = useCallback(
    (shiftId: string): boolean => {
      const shift = shifts.find((s) => s.id === shiftId);
      const nextSaved = !(shift?.saved ?? false);
      setShifts((prev) =>
        prev.map((s) => (s.id === shiftId ? { ...s, saved: nextSaved } : s)),
      );
      void toggleSavedShiftAction(shiftId);
      return nextSaved;
    },
    [shifts, setShifts],
  );

  const isSaved = useCallback(
    (shiftId: string) => shifts.some((s) => s.id === shiftId && s.saved),
    [shifts],
  );

  const toggleFollowOrg = useCallback(
    (orgId: string): boolean => {
      const org = organizations.find((o) => o.id === orgId);
      const nextFollowing = !(org?.following ?? false);
      setOrganizations((prev) =>
        prev.map((o) =>
          o.id === orgId ? { ...o, following: nextFollowing } : o,
        ),
      );
      void toggleFollowOrgAction(orgId);
      return nextFollowing;
    },
    [organizations, setOrganizations],
  );

  const isFollowing = useCallback(
    (orgId: string) => organizations.some((o) => o.id === orgId && o.following),
    [organizations],
  );

  const getShifts = useCallback(() => shifts, [shifts]);
  const getCommittedShifts = useCallback(
    () => shifts.filter((s) => s.committed),
    [shifts],
  );
  const getOrganizations = useCallback(() => organizations, [organizations]);

  return useMemo(
    () => ({
      commitToShift,
      isCommitted,
      toggleSavedShift,
      isSaved,
      toggleFollowOrg,
      isFollowing,
      getShifts,
      getCommittedShifts,
      getOrganizations,
    }),
    [
      commitToShift,
      isCommitted,
      toggleSavedShift,
      isSaved,
      toggleFollowOrg,
      isFollowing,
      getShifts,
      getCommittedShifts,
      getOrganizations,
    ],
  );
}

/** Same API as the old useNotificationsStore, now backed by the database. */
export function useNotificationsStore() {
  const { notifications, setNotifications } = useStudentData();

  const markRead = useCallback(
    (notificationId: string) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n)),
      );
      void markNotificationReadAction(notificationId);
    },
    [setNotifications],
  );

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    void markAllNotificationsReadAction();
  }, [setNotifications]);

  return { notifications, markRead, markAllRead };
}
