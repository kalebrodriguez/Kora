"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    { error: null },
  );

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
    </div>
  );
}
