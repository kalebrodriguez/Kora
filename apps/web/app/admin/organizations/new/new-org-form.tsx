"use client";

import { useActionState } from "react";
import {
  createOrganizationAction,
  type CreateOrgState,
} from "../../actions";

const CATEGORIES = [
  { key: "community", label: "Community" },
  { key: "environment", label: "Environment" },
  { key: "education", label: "Education" },
] as const;

const inputClass =
  "w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary";
const labelClass = "mb-1 block text-sm font-medium text-ink";

export function NewOrgForm() {
  const [state, formAction, pending] = useActionState<CreateOrgState, FormData>(
    createOrganizationAction,
    { error: null },
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Organization name
        </label>
        <input
          id="name"
          name="name"
          required
          maxLength={80}
          className={inputClass}
          placeholder="Riverside Animal Rescue"
        />
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          required
          rows={2}
          maxLength={300}
          className={inputClass}
          placeholder="What does this organization do for volunteers?"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className={labelClass}>Categories</span>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <label
                key={c.key}
                className="flex cursor-pointer items-center gap-2 rounded-pill bg-accent-lavender px-4 py-2 text-sm font-semibold text-ink has-checked:bg-primary has-checked:text-white"
              >
                <input
                  type="checkbox"
                  name="categories"
                  value={c.key}
                  defaultChecked={c.key === "community"}
                  className="sr-only"
                />
                {c.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="distance" className={labelClass}>
            Distance from school (optional)
          </label>
          <input
            id="distance"
            name="distance"
            className={inputClass}
            placeholder="2.5 mi"
          />
        </div>
      </div>

      <fieldset className="rounded-card border border-chart-track p-4">
        <legend className="px-2 text-sm font-bold text-ink">
          Moderator account
        </legend>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="moderatorFirstName" className={labelClass}>
              First name
            </label>
            <input
              id="moderatorFirstName"
              name="moderatorFirstName"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="moderatorLastName" className={labelClass}>
              Last name
            </label>
            <input
              id="moderatorLastName"
              name="moderatorLastName"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="moderatorEmail" className={labelClass}>
              Email (their login)
            </label>
            <input
              id="moderatorEmail"
              name="moderatorEmail"
              type="email"
              required
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="moderatorPassword" className={labelClass}>
              Temporary password
            </label>
            <input
              id="moderatorPassword"
              name="moderatorPassword"
              type="text"
              required
              minLength={8}
              className={inputClass}
              placeholder="min 8 characters"
            />
          </div>
          <div className="col-span-2">
            <label htmlFor="moderatorRoleTitle" className={labelClass}>
              Role title (optional)
            </label>
            <input
              id="moderatorRoleTitle"
              name="moderatorRoleTitle"
              className={inputClass}
              placeholder="Volunteer Coordinator"
            />
          </div>
        </div>
      </fieldset>

      {state.error ? (
        <p className="text-sm font-medium text-danger">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-pill bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
      >
        {pending ? "Creating…" : "Create organization"}
      </button>
    </form>
  );
}
