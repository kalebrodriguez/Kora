import {
  AlertTriangle,
  BadgeCheck,
  Building2,
  Clock,
  Users,
} from "lucide-react";
import {
  getAdminContext,
  getFlaggedLogsForSchool,
  getSchoolCompliance,
  getSchoolStats,
} from "@kora/db";
import { requireRole } from "@/lib/auth/session";
import { getGraduationRequirement } from "@/lib/compliance";
import { ComplianceTable } from "./compliance-table";
import { FlaggedLogsTable } from "./flagged-logs-table";

const STAT_CARDS = [
  { key: "studentCount", label: "Students", icon: Users, tint: "bg-accent-lavender text-primary" },
  { key: "verifiedHours", label: "Verified hours", icon: BadgeCheck, tint: "bg-accent-sky text-icon-sky" },
  { key: "pendingCount", label: "Pending logs", icon: Clock, tint: "bg-accent-pink text-icon-pink" },
  { key: "flaggedCount", label: "Flagged logs", icon: AlertTriangle, tint: "bg-accent-pink text-flagged" },
  { key: "organizationCount", label: "Partner orgs", icon: Building2, tint: "bg-accent-lavender text-primary" },
] as const;

export default async function AdminDashboardPage() {
  const user = await requireRole("SCHOOL_ADMIN");
  const context = await getAdminContext(user.id);
  if (!context) {
    return null;
  }

  const [stats, compliance, flagged] = await Promise.all([
    getSchoolStats(context.school.id),
    getSchoolCompliance(context.school.id),
    getFlaggedLogsForSchool(context.school.id),
  ]);

  const hoursRequired = getGraduationRequirement(context.school.state);

  return (
    <>
      <div className="mb-8">
        <h1 className="text-[28px] font-extrabold">Compliance overview</h1>
        <p className="mt-1 text-[14px] text-muted">
          Verified service hours across {context.school.name}. Graduation
          requirement: {hoursRequired} hours.
        </p>
      </div>

      <section className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-5">
        {STAT_CARDS.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.key}
              className="flex items-center gap-3 rounded-card bg-surface p-4 shadow-card"
            >
              <span
                className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${card.tint}`}
              >
                <Icon size={20} strokeWidth={2.2} />
              </span>
              <span>
                <span className="block text-[22px] font-extrabold leading-none">
                  {stats[card.key]}
                </span>
                <span className="mt-1 block text-[12px] text-muted">
                  {card.label}
                </span>
              </span>
            </div>
          );
        })}
      </section>

      <section className="mb-10">
        <ComplianceTable
          rows={compliance}
          hoursRequired={hoursRequired}
          schoolName={context.school.name}
        />
      </section>

      <section>
        <h2 className="mb-4 text-[20px] font-bold">
          Needs review — pending & flagged hours
        </h2>
        <FlaggedLogsTable logs={flagged} />
      </section>
    </>
  );
}
