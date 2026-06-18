import Link from "next/link";
import { redirect } from "next/navigation";
import { listSignupSchools } from "@kora/db";
import { getSessionUser, roleHome } from "@/lib/auth/session";
import { SignupForm } from "./signup-form";

export const metadata = {
  title: "Create account — Kora",
};

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) {
    redirect(roleHome(user.role));
  }

  const schools = await listSignupSchools();

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-card bg-primary text-2xl font-bold text-white">
            K
          </div>
          <h1 className="text-2xl font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-muted">
            Find opportunities and prove your verified service hours.
          </p>
        </div>

        {schools.length === 0 ? (
          <div className="rounded-card bg-surface p-6 text-center text-sm text-muted shadow-card">
            No schools are set up on Kora yet. Ask your school administrator to
            onboard your school first.
          </div>
        ) : (
          <SignupForm schools={schools} />
        )}

        <p className="mt-6 text-center text-sm text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
