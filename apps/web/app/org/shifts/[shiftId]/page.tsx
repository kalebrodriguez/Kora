import Link from "next/link";
import { notFound } from "next/navigation";
import QRCode from "qrcode";
import { ArrowLeft, BadgeCheck, Clock, Users } from "lucide-react";
import { getModeratorContext, getOrgShifts, getShiftRoster } from "@kora/db";
import { requireRole } from "@/lib/auth/session";
import { GenerateQrButton } from "./generate-qr-button";

export default async function OrgShiftPage({
  params,
}: {
  params: Promise<{ shiftId: string }>;
}) {
  const { shiftId } = await params;
  const user = await requireRole("ORG_MODERATOR");
  const context = await getModeratorContext(user.id);
  if (!context) {
    return null;
  }

  const shifts = await getOrgShifts(context.org.id);
  const shift = shifts.find((s) => s.id === shiftId);
  if (!shift) {
    notFound();
  }

  const roster = await getShiftRoster(shift.id);
  const qrDataUrl = shift.activeQr
    ? await QRCode.toDataURL(shift.activeQr.token, { width: 280, margin: 1 })
    : null;

  return (
    <>
      <Link
        href="/org"
        className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        All shifts
      </Link>

      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold">{shift.title}</h1>
        <p className="mt-1 text-[14px] text-muted">
          {shift.date} · {shift.hours} hrs · {shift.committedCount} committed ·{" "}
          {shift.spotsLeft} spots left
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-card bg-surface p-6 shadow-card">
          <h2 className="mb-2 text-[18px] font-bold">Check-in code</h2>
          <p className="mb-5 text-[13px] text-muted">
            Display this at the end of the shift. Students scan it (or type the
            code) to log verified hours instantly. Codes expire after 15
            minutes.
          </p>

          {qrDataUrl && shift.activeQr ? (
            <div className="flex flex-col items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrDataUrl}
                alt="Shift check-in QR code"
                className="rounded-card border border-black/5"
              />
              <p className="max-w-full break-all rounded-chip bg-canvas px-4 py-2 text-center font-mono text-[12px] text-muted">
                {shift.activeQr.token}
              </p>
              <p className="flex items-center gap-1.5 text-[12px] text-muted">
                <Clock size={13} />
                Expires{" "}
                {new Date(shift.activeQr.expiresAt).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </p>
              <GenerateQrButton shiftId={shift.id} label="Regenerate code" />
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 rounded-card bg-canvas py-10">
              <p className="text-[14px] text-muted">No active code.</p>
              <GenerateQrButton shiftId={shift.id} label="Display check-in code" />
            </div>
          )}
        </section>

        <section className="rounded-card bg-surface p-6 shadow-card">
          <h2 className="mb-4 flex items-center gap-2 text-[18px] font-bold">
            <Users size={18} className="text-primary" />
            Roster
          </h2>
          {roster.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-muted">
              No students have committed yet.
            </p>
          ) : (
            <ul className="flex flex-col">
              {roster.map((entry, i) => (
                <li
                  key={entry.userId}
                  className={`flex items-center gap-3 py-3 ${
                    i !== 0 ? "border-t border-dashed border-black/10" : ""
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={entry.avatar}
                    alt=""
                    className="h-10 w-10 rounded-full bg-accent-lavender"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold">
                      {entry.name}
                    </p>
                    <p className="text-[12px] text-muted">
                      Committed{" "}
                      {new Date(entry.committedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {entry.logStatus === "verified" ? (
                    <span className="inline-flex items-center gap-1 rounded-pill bg-accent-sky px-2.5 py-1 text-[11px] font-semibold text-icon-sky">
                      <BadgeCheck size={12} />
                      {entry.loggedHours} hrs verified
                    </span>
                  ) : entry.logStatus ? (
                    <span className="inline-flex items-center rounded-pill bg-accent-lavender px-2.5 py-1 text-[11px] font-semibold capitalize text-pending">
                      {entry.logStatus}
                    </span>
                  ) : (
                    <span className="text-[12px] text-muted">Not checked in</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}
