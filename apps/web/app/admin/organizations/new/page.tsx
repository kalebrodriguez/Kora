import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { requireRole } from "@/lib/auth/session";
import { NewOrgForm } from "./new-org-form";

export const metadata = {
  title: "Onboard organization — Kora",
};

export default async function NewOrganizationPage() {
  await requireRole("SCHOOL_ADMIN");

  return (
    <>
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:underline"
      >
        <ArrowLeft size={16} />
        Admin console
      </Link>

      <div className="mb-8">
        <h1 className="text-[26px] font-extrabold">Onboard an organization</h1>
        <p className="mt-1 text-[14px] text-muted">
          Creates the partner organization and its moderator login. The
          moderator can then publish shifts and verify student hours.
        </p>
      </div>

      <div className="max-w-2xl rounded-card bg-surface p-6 shadow-card">
        <NewOrgForm />
      </div>
    </>
  );
}
