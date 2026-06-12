"use client";

import { useTransition } from "react";
import { AlertTriangle, BadgeCheck } from "lucide-react";
import type { OrgPendingLogView } from "@kora/db";
import { flagLogAction, verifyLogAction } from "./actions";

export function PendingLogsTable({ logs }: { logs: OrgPendingLogView[] }) {
  const [pending, startTransition] = useTransition();

  if (logs.length === 0) {
    return (
      <p className="rounded-card bg-surface px-6 py-10 text-center text-[14px] text-muted shadow-card">
        No hours waiting for review. Students who scan your live check-in code
        are verified automatically.
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
            <th className="px-6 py-4">Activity</th>
            <th className="px-6 py-4">Hours</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id} className="border-t border-black/5">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={log.studentAvatar}
                    alt=""
                    className="h-9 w-9 rounded-full bg-accent-lavender"
                  />
                  <span className="text-[14px] font-semibold">
                    {log.studentName}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 text-[13px]">{log.shiftTitle}</td>
              <td className="px-6 py-4 text-[13px] text-muted">
                {log.activity}
              </td>
              <td className="px-6 py-4 text-[14px] font-bold">
                {log.hours} hrs
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
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      startTransition(() => verifyLogAction(log.id))
                    }
                    className="inline-flex items-center gap-1.5 rounded-pill bg-primary px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
                  >
                    <BadgeCheck size={14} />
                    Verify
                  </button>
                  {log.status !== "flagged" ? (
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        startTransition(() => flagLogAction(log.id))
                      }
                      className="rounded-pill bg-accent-lavender px-4 py-2 text-[13px] font-semibold text-muted transition hover:bg-danger hover:text-white disabled:opacity-60"
                    >
                      Flag
                    </button>
                  ) : null}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
