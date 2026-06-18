import Link from "next/link";
import { redirect } from "next/navigation";
import { getSessionUser, roleHome } from "@/lib/auth/session";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Sign in — Kora",
};

export default async function LoginPage() {
  const user = await getSessionUser();
  if (user) {
    redirect(roleHome(user.role));
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-card bg-primary text-2xl font-bold text-white">
            K
          </div>
          <h1 className="text-2xl font-bold text-ink">Welcome to Kora</h1>
          <p className="mt-1 text-sm text-muted">
            Verified community service hours, one source of truth.
          </p>
        </div>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted">
          New student?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </main>
  );
}
