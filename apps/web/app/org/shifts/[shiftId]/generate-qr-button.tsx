"use client";

import { useTransition } from "react";
import { QrCode } from "lucide-react";
import { generateQrAction } from "../../actions";

export function GenerateQrButton({
  shiftId,
  label,
}: {
  shiftId: string;
  label: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => startTransition(() => generateQrAction(shiftId))}
      className="inline-flex items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-[14px] font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
    >
      <QrCode size={16} />
      {pending ? "Generating…" : label}
    </button>
  );
}
