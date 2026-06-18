import Link from "next/link";
import { redirect } from "next/navigation";
import { listSignupSchools } from "@kora/db";
import { getSessionUser, roleHome } from "@/lib/auth/session";
import { listSupportedStates } from "@/lib/compliance";
import { SignupForm } from "./signup-form";

export const metadata = {
  title: "Create account — Kora",
};

export interface StateOption {
  code: string;
  name: string;
}

export default async function SignupPage() {
  const user = await getSessionUser();
  if (user) {
    redirect(roleHome(user.role));
  }

  const schools = await listSignupSchools();
  const states: StateOption[] = listSupportedStates();

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-card bg-primary text-2xl font-bold text-white">
            K
          </div>
          <h1 className="text-2xl font-bold text-ink">Create your account</h1>
          <p className="mt-1 text-sm text-muted">
            Choose your role to get started on Kora.
          </p>
        </div>

        <SignupForm schools={schools} states={states} />

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
