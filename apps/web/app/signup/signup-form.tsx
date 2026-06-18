"use client";

import { useActionState, useState } from "react";
import { GraduationCap, Building2, ShieldCheck } from "lucide-react";
import type { SignupSchool } from "@kora/db";
import type { StateOption } from "./page";
import { signup, type SignupRole, type SignupState } from "./actions";

const GRADES = [9, 10, 11, 12] as const;

const CATEGORY_OPTIONS = [
  { key: "community", label: "Community" },
  { key: "environment", label: "Environment" },
  { key: "education", label: "Education" },
] as const;

const ROLE_TABS: { role: SignupRole; label: string; icon: typeof GraduationCap }[] = [
  { role: "student", label: "Student", icon: GraduationCap },
  { role: "organization", label: "Organization", icon: Building2 },
  { role: "admin", label: "School admin", icon: ShieldCheck },
];

const FIELD =
  "w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <span className="mb-1 block text-sm font-medium text-ink">{label}</span>
      {children}
    </div>
  );
}

export function SignupForm({
  schools,
  states,
}: {
  schools: SignupSchool[];
  states: StateOption[];
}) {
  const [role, setRole] = useState<SignupRole>("student");
  const [state, formAction, pending] = useActionState<SignupState, FormData>(
    signup,
    { error: null },
  );

  const soleSchool = schools.length === 1 ? schools[0] : undefined;
  const noSchools = schools.length === 0;

  const nameLabels =
    role === "organization"
      ? { first: "Coordinator first name", last: "Coordinator last name" }
      : { first: "First name", last: "Last name" };

  const submitLabel =
    role === "student"
      ? "Create student account"
      : role === "organization"
        ? "Create organization account"
        : "Create school + admin account";

  return (
    <div className="rounded-card bg-surface p-6 shadow-card">
      <div className="mb-5 grid grid-cols-3 gap-1 rounded-pill bg-canvas p-1">
        {ROLE_TABS.map((tab) => {
          const Icon = tab.icon;
          const active = role === tab.role;
          return (
            <button
              key={tab.role}
              type="button"
              onClick={() => setRole(tab.role)}
              className={`flex items-center justify-center gap-1.5 rounded-pill px-2 py-2 text-[12px] font-semibold transition ${
                active
                  ? "bg-primary text-white shadow-card"
                  : "text-muted hover:text-ink"
              }`}
            >
              <Icon size={14} strokeWidth={2.2} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="role" value={role} />

        {role === "student" && noSchools ? (
          <p className="rounded-chip bg-accent-pink px-3 py-3 text-sm text-ink">
            No schools are on Kora yet. Ask your school administrator to create
            the school first (the “School admin” tab), then sign up as a student.
          </p>
        ) : null}

        {/* Organization-only profile fields */}
        {role === "organization" ? (
          <>
            <Field label="Organization name">
              <input name="orgName" type="text" required className={FIELD} placeholder="Hope Community Kitchen" />
            </Field>
            <Field label="Description">
              <textarea
                name="description"
                required
                rows={2}
                className={FIELD}
                placeholder="What your organization does and how students help."
              />
            </Field>
            <Field label="Focus areas">
              <div className="flex flex-wrap gap-2">
                {CATEGORY_OPTIONS.map((c) => (
                  <label
                    key={c.key}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-pill border border-chart-track bg-canvas px-3 py-1.5 text-sm text-ink has-[:checked]:border-primary has-[:checked]:bg-accent-lavender"
                  >
                    <input type="checkbox" name="categories" value={c.key} className="accent-primary" />
                    {c.label}
                  </label>
                ))}
              </div>
            </Field>
          </>
        ) : null}

        {/* Admin-only school fields */}
        {role === "admin" ? (
          <>
            <Field label="School name">
              <input name="schoolName" type="text" required className={FIELD} placeholder="Lincoln High" />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="State">
                <select name="state" required defaultValue="" className={FIELD}>
                  <option value="" disabled>
                    Select
                  </option>
                  {states.map((s) => (
                    <option key={s.code} value={s.code}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="District (optional)">
                <input name="district" type="text" className={FIELD} placeholder="County schools" />
              </Field>
            </div>
          </>
        ) : null}

        {/* Shared identity fields */}
        <div className="grid grid-cols-2 gap-3">
          <Field label={nameLabels.first}>
            <input name="firstName" type="text" autoComplete="given-name" required className={FIELD} />
          </Field>
          <Field label={nameLabels.last}>
            <input name="lastName" type="text" autoComplete="family-name" required className={FIELD} />
          </Field>
        </div>

        <Field label="Email">
          <input name="email" type="email" autoComplete="email" required className={FIELD} placeholder="you@example.org" />
        </Field>

        {/* Student-only school + grade */}
        {role === "student" && !noSchools ? (
          <div className="grid grid-cols-2 gap-3">
            <Field label="School">
              <select name="schoolId" required defaultValue={soleSchool ? soleSchool.id : ""} className={FIELD}>
                {!soleSchool ? (
                  <option value="" disabled>
                    Select your school
                  </option>
                ) : null}
                {schools.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Grade">
              <select name="gradeLevel" required defaultValue="" className={FIELD}>
                <option value="" disabled>
                  Select
                </option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>
                    {g}th Grade
                  </option>
                ))}
              </select>
            </Field>
          </div>
        ) : null}

        <Field label="Password">
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={FIELD}
            placeholder="At least 8 characters"
          />
        </Field>

        {state.error ? (
          <p className="text-sm font-medium text-danger">{state.error}</p>
        ) : null}

        <button
          type="submit"
          disabled={pending || (role === "student" && noSchools)}
          className="w-full rounded-pill bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
        >
          {pending ? "Creating account…" : submitLabel}
        </button>
      </form>
    </div>
  );
}
