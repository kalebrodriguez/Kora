import Link from "next/link";
import { ArrowRight, CalendarDays, Plus, QrCode, Users } from "lucide-react";
import {
  getModeratorContext,
  getOrgShifts,
  getPendingLogsForOrg,
} from "@kora/db";
import { requireRole } from "@/lib/auth/session";
import { PendingLogsTable } from "./pending-logs-table";

export const metadata = {
  title: "Kora — Organization Portal",
};

export default async function OrgDashboardPage() {
  const user = await requireRole("ORG_MODERATOR");
  const context = await getModeratorContext(user.id);
  if (!context) {
    return null;
  }

  const [shifts, pendingLogs] = await Promise.all([
    getOrgShifts(context.org.id),
    getPendingLogsForOrg(context.org.id),
  ]);

  const upcoming = shifts.filter(
    (s) => new Date(s.scheduledAt).getTime() > Date.now() - 24 * 60 * 60 * 1000,
  );

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold">
          Welcome back, {context.moderator.name.split(" ")[0]}
        </h1>
        <p className="mt-1 text-[14px] text-muted">
          Display check-in codes at your shifts and verify student hours.
        </p>
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-[20px] font-bold">
            <CalendarDays size={20} className="text-primary" />
            Your shifts
          </h2>
          <Link
            href="/org/shifts/new"
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-primary-deep"
          >
            <Plus size={16} strokeWidth={2.4} />
            New shift
          </Link>
        </div>
        {upcoming.length === 0 ? (
          <p className="rounded-card bg-surface px-6 py-10 text-center text-[14px] text-muted shadow-card">
            No upcoming shifts.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {upcoming.map((shift) => (
              <Link
                key={shift.id}
                href={`/org/shifts/${shift.id}`}
                className="group flex flex-col rounded-card bg-surface p-5 shadow-card transition hover:shadow-raised"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <h3 className="text-[16px] font-bold leading-snug">
                    {shift.title}
                  </h3>
                  {shift.activeQr ? (
                    <span className="flex shrink-0 items-center gap-1 rounded-pill bg-accent-sky px-2.5 py-1 text-[11px] font-semibold text-icon-sky">
                      <QrCode size={12} />
                      Code live
                    </span>
                  ) : null}
                </div>
                <p className="text-[13px] text-muted">{shift.date}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-black/5 pt-3 text-[13px] text-muted">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} />
                    {shift.committedCount} committed
                  </span>
                  {shift.pendingLogCount > 0 ? (
                    <span className="rounded-pill bg-accent-pink px-2.5 py-0.5 text-[11px] font-semibold text-icon-pink">
                      {shift.pendingLogCount} pending
                    </span>
                  ) : null}
                  <span className="ml-auto flex items-center gap-1 font-semibold text-primary">
                    Manage
                    <ArrowRight
                      size={14}
                      className="transition group-hover:translate-x-0.5"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-[20px] font-bold">Verification queue</h2>
        <PendingLogsTable logs={pendingLogs} />
      </section>
    </>
  );
}
