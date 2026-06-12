"use client";

import { Download } from "lucide-react";
import type { StudentComplianceRow } from "@kora/db";

function statusFor(
  row: StudentComplianceRow,
  hoursRequired: number,
): { label: string; className: string } {
  if (row.flaggedCount > 0) {
    return {
      label: "Review",
      className: "bg-accent-pink text-flagged",
    };
  }
  if (row.verifiedHours >= hoursRequired) {
    return { label: "Complete", className: "bg-accent-sky text-icon-sky" };
  }
  if (row.verifiedHours >= hoursRequired * 0.5) {
    return { label: "On track", className: "bg-accent-lavender text-primary" };
  }
  return { label: "Behind", className: "bg-accent-pink text-icon-pink" };
}

/** PowerSchool-style CSV export, generated client-side. */
function exportCsv(
  rows: StudentComplianceRow[],
  hoursRequired: number,
  schoolName: string,
) {
  const header = [
    "Student",
    "Email",
    "Grade",
    "Verified Hours",
    "Required Hours",
    "Pending Hours",
    "Flagged Logs",
    "Status",
  ];
  const lines = rows.map((row) => {
    const status = statusFor(row, hoursRequired).label;
    return [
      row.name,
      row.email,
      row.grade,
      row.verifiedHours,
      hoursRequired,
      row.pendingHours,
      row.flaggedCount,
      status,
    ]
      .map((v) => `"${String(v).replaceAll('"', '""')}"`)
      .join(",");
  });

  const blob = new Blob([[header.join(","), ...lines].join("\n")], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${schoolName.toLowerCase().replaceAll(" ", "-")}-service-hours.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export function ComplianceTable({
  rows,
  hoursRequired,
  schoolName,
}: {
  rows: StudentComplianceRow[];
  hoursRequired: number;
  schoolName: string;
}) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-[20px] font-bold">Compliance master-list</h2>
        <button
          type="button"
          onClick={() => exportCsv(rows, hoursRequired, schoolName)}
          className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-primary-deep"
        >
          <Download size={16} />
          Export CSV
        </button>
      </div>

      <div className="overflow-hidden rounded-card bg-surface shadow-card">
        <table className="w-full text-left">
          <thead>
            <tr className="text-[12px] font-semibold uppercase tracking-[0.08em] text-muted">
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Grade</th>
              <th className="px-6 py-4">Verified</th>
              <th className="px-6 py-4">Progress</th>
              <th className="px-6 py-4">Pending</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const pct = Math.min(
                Math.round((row.verifiedHours / hoursRequired) * 100),
                100,
              );
              const status = statusFor(row, hoursRequired);
              return (
                <tr key={row.userId} className="border-t border-black/5">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={row.avatar}
                        alt=""
                        className="h-9 w-9 rounded-full bg-accent-lavender"
                      />
                      <div>
                        <p className="text-[14px] font-semibold">{row.name}</p>
                        <p className="text-[12px] text-muted">{row.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-muted">
                    {row.grade}
                  </td>
                  <td className="px-6 py-4 text-[14px] font-bold">
                    {row.verifiedHours}/{hoursRequired} hrs
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-1.5 w-32 overflow-hidden rounded-pill bg-canvas">
                      <div
                        className="h-full rounded-pill bg-primary"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[13px] text-muted">
                    {row.pendingHours > 0 ? `${row.pendingHours} hrs` : "—"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-pill px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                    >
                      {status.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
