import { getActiveQrTokenForStudent } from "@kora/db";
import { PageShell } from "@/components/student/page-shell";
import { LogHoursPageClient } from "@/components/student/log-hours-page-client";
import { requireRole } from "@/lib/auth/session";

export default async function LogHoursPage() {
  const user = await requireRole("STUDENT");
  const demoToken = await getActiveQrTokenForStudent(user.id);

  return (
    <PageShell>
      <LogHoursPageClient demoToken={demoToken ?? undefined} />
    </PageShell>
  );
}
