"use client";

import { useActionState, useState } from "react";
import { login, type LoginState } from "./actions";

const DEMO_ACCOUNTS = [
  {
    label: "Student",
    name: "Maya Chen",
    email: "student@demo.kora",
    detail: "Dashboard, events, QR check-in, hours ledger",
  },
  {
    label: "Org moderator",
    name: "Marcus Webb",
    email: "org@demo.kora",
    detail: "Hope Community Kitchen — QR display + verification",
  },
  {
    label: "School admin",
    name: "Dana Whitfield",
    email: "admin@demo.kora",
    detail: "Lincoln High — compliance master-list, flagged hours, export",
  },
] as const;

const DEMO_PASSWORD = "demo1234";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    { error: null },
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <form action={formAction} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-ink"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
            placeholder="you@school.org"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-ink"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </div>
        {state.error ? (
          <p className="text-sm font-medium text-danger">{state.error}</p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-pill bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>

      <div className="mt-6 border-t border-chart-track pt-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
          Demo accounts · password {DEMO_PASSWORD}
        </p>
        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.email}
              type="button"
              onClick={() => {
                setEmail(account.email);
                setPassword(DEMO_PASSWORD);
              }}
              className="w-full rounded-chip bg-accent-lavender px-3 py-2 text-left transition hover:bg-accent-sky"
            >
              <span className="block text-sm font-semibold text-ink">
                {account.label} — {account.name}
              </span>
              <span className="block text-xs text-muted">{account.detail}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
