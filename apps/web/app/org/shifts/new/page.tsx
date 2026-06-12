import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { NewShiftForm } from "./new-shift-form";

export const metadata = {
  title: "New shift — Kora",
};

export default async function NewShiftPage() {
  await requireRole("ORG_MODERATOR");

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
        <h1 className="text-[26px] font-extrabold">Create a shift</h1>
        <p className="mt-1 text-[14px] text-muted">
          Published shifts appear instantly on every student&apos;s Events page.
        </p>
      </div>

      <div className="max-w-2xl rounded-card bg-surface p-6 shadow-card">
        <NewShiftForm />
      </div>
    </>
  );
}
