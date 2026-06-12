import Link from "next/link";
import { Plus } from "lucide-react";
import { getHoursLog } from "@kora/db";
import { PageShell } from "@/components/student/page-shell";
import { PageHeader } from "@/components/student/page-header";
import { HoursLedger } from "@/components/student/hours-ledger";
import { requireRole } from "@/lib/auth/session";

export default async function HoursPage() {
  const user = await requireRole("STUDENT");
  const logs = await getHoursLog(user.id);

  return (
    <PageShell>
      <PageHeader
        title="My Hours"
        description="Full service hour ledger"
        action={
          <Link
            href="/log-hours"
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-primary-deep"
          >
            <Plus size={16} strokeWidth={2.4} />
            Log Hours
          </Link>
        }
      />
      <HoursLedger logs={logs} />
    </PageShell>
  );
}
