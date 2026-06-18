"use client";

import { useActionState } from "react";
import type { SignupSchool } from "@kora/db";
import { signup, type SignupState } from "./actions";

const GRADES = [9, 10, 11, 12] as const;

export function SignupForm({ schools }: { schools: SignupSchool[] }) {
  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    signup,
    { error: null },
  );

  const fieldClass =
    "w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary";

  const soleSchool = schools.length === 1 ? schools[0] : undefined;

  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <form action={formAction} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="firstName"
              className="mb-1 block text-sm font-medium text-ink"
            >
              First name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              className={fieldClass}
              placeholder="Maya"
            />
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="mb-1 block text-sm font-medium text-ink"
            >
              Last name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              className={fieldClass}
              placeholder="Chen"
            />
          </div>
        </div>

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
            className={fieldClass}
            placeholder="you@school.org"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor="schoolId"
              className="mb-1 block text-sm font-medium text-ink"
            >
              School
            </label>
            <select
              id="schoolId"
              name="schoolId"
              required
              defaultValue={soleSchool ? soleSchool.id : ""}
              className={fieldClass}
            >
              {!soleSchool ? (
                <option value="" disabled>
                  Select your school
                </option>
              ) : null}
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="gradeLevel"
              className="mb-1 block text-sm font-medium text-ink"
            >
              Grade
            </label>
            <select
              id="gradeLevel"
              name="gradeLevel"
              required
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                Select
              </option>
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}th Grade
                </option>
              ))}
            </select>
          </div>
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
            autoComplete="new-password"
            required
            minLength={8}
            className={fieldClass}
            placeholder="At least 8 characters"
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
          {pending ? "Creating account…" : "Create student account"}
        </button>
      </form>
    </div>
  );
}
