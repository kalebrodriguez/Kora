import {
  getHoursLog,
  getModerators,
  getNotifications,
  getOrganizationsForStudent,
  getShiftsForStudent,
  getStudentProfile,
} from "@kora/db";
import { Sidebar } from "@/components/student/sidebar";
import { requireRole } from "@/lib/auth/session";
import {
  getCategoryGoals,
  getVerifiedHoursByCategory,
} from "@/lib/compliance";
import {
  StudentDataProvider,
  type StudentBundle,
} from "@/lib/student-data";
import type {
  CategoryProgress,
  MonthlyHours,
  ShiftLog,
} from "@/lib/types/student";

const CATEGORY_META: ReadonlyArray<
  Pick<CategoryProgress, "key" | "label" | "tint">
> = [
  { key: "community", label: "Community", tint: "lavender" },
  { key: "environment", label: "Environment", tint: "sky" },
  { key: "education", label: "Education", tint: "pink" },
];

function buildCategories(logs: ShiftLog[], state: string): CategoryProgress[] {
  const goals = getCategoryGoals(state);
  const logged = getVerifiedHoursByCategory(logs);
  return CATEGORY_META.map((meta) => ({
    ...meta,
    logged: logged[meta.key],
    goal: goals[meta.key],
  }));
}

function buildMonthlyHours(logs: ShiftLog[]): MonthlyHours[] {
  const now = new Date();
  const months: MonthlyHours[] = [];

  for (let i = 4; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", { month: "short" });
    const value = logs
      .filter((log) => {
        if (log.status !== "verified") {
          return false;
        }
        const completed = new Date(log.completedAt);
        return (
          completed.getFullYear() === d.getFullYear() &&
          completed.getMonth() === d.getMonth()
        );
      })
      .reduce((sum, log) => sum + log.hours, 0);
    months.push({ label, value });
  }

  return months;
}

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireRole("STUDENT");

  const [student, shifts, organizations, hoursLog, moderators, notifications] =
    await Promise.all([
      getStudentProfile(user.id),
      getShiftsForStudent(user.id),
      getOrganizationsForStudent(user.id),
      getHoursLog(user.id),
      getModerators(),
      getNotifications(user.id),
    ]);

  const bundle: StudentBundle = {
    student,
    shifts,
    organizations,
    hoursLog,
    moderators,
    notifications,
    categories: buildCategories(hoursLog, student.schoolState),
    monthlyHours: buildMonthlyHours(hoursLog),
  };

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <StudentDataProvider bundle={bundle}>
        <div className="mx-auto flex max-w-shell">
          <Sidebar />
          {children}
        </div>
      </StudentDataProvider>
    </div>
  );
}
