import { PageShell } from "@/components/student/page-shell";
import { RequirementsCarousel } from "@/components/student/requirements-carousel";
import { ShiftsCarousel } from "@/components/student/shifts-carousel";
import { HoursTable } from "@/components/student/hours-table";

export default function StudentDashboardPage() {
  return (
    <PageShell showRightRail>
      <RequirementsCarousel />
      <ShiftsCarousel />
      <HoursTable />
    </PageShell>
  );
}
