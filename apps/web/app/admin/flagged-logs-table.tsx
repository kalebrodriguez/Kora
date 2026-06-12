import { AlertTriangle } from "lucide-react";
import type { FlaggedLogRow } from "@kora/db";

export function FlaggedLogsTable({ logs }: { logs: FlaggedLogRow[] }) {
  if (logs.length === 0) {
    return (
      <p className="rounded-card bg-surface px-6 py-10 text-center text-[14px] text-muted shadow-card">
        Nothing needs review. Hours are verified by organization moderators at
        the source.
      </p>
    );
  }

  return (
    <div className="overflow-hidden rounded-card bg-surface shadow-card">
      <table className="w-full text-left">
        <thead>
          <tr className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
            <th className="px-6 py-4">Student</th>
            <th className="px-6 py-4">Shift</th>
            <th className="px-6 py-4">Organization</th>
            <th className="px-6 py-4">Hours</th>
            <th className="px-6 py-4">Date</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-black/5">
              <td className="px-6 py-4">
                <p className="text-[14px] font-semibold">{log.studentName}</p>
                <p className="text-[12px] text-muted">{log.studentEmail}</p>
              </td>
              <td className="px-6 py-4 text-[13px]">{log.shiftTitle}</td>
              <td className="px-6 py-4 text-[13px] text-muted">
                {log.orgName}
              </td>
              <td className="px-6 py-4 text-[14px] font-bold">
                {log.hours} hrs
              </td>
              <td className="px-6 py-4 text-[13px] text-muted">
                {new Date(log.completedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-6 py-4">
                {log.status === "flagged" ? (
                  <span className="inline-flex items-center gap-1 rounded-pill bg-accent-pink px-2.5 py-1 text-[11px] font-semibold text-flagged">
                    <AlertTriangle size={12} />
                    Flagged
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-pill bg-accent-lavender px-2.5 py-1 text-[11px] font-semibold text-pending">
                    Pending
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
