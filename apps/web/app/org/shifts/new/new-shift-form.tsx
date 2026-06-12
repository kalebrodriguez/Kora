"use client";

import { useActionState } from "react";
import { createShiftAction, type CreateShiftState } from "../../actions";

const CATEGORIES = [
  { key: "community", label: "Community" },
  { key: "environment", label: "Environment" },
  { key: "education", label: "Education" },
] as const;

const inputClass =
  "w-full rounded-chip border border-chart-track bg-canvas px-3 py-2 text-sm text-ink outline-none focus:border-primary";
const labelClass = "mb-1 block text-sm font-medium text-ink";

export function NewShiftForm() {
  const [state, formAction, pending] = useActionState<CreateShiftState, FormData>(
    createShiftAction,
    { error: null },
  );

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="title" className={labelClass}>
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          maxLength={120}
          className={inputClass}
          placeholder="Weekend Food Bank Sorting Shift"
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
          rows={3}
          maxLength={500}
          className={inputClass}
          placeholder="What will student volunteers do?"
        />
      </div>

      <div>
        <span className={labelClass}>Category</span>
        <div className="flex gap-2">
          {CATEGORIES.map((c, i) => (
            <label
              key={c.key}
              className="flex cursor-pointer items-center gap-2 rounded-pill bg-accent-lavender px-4 py-2 text-sm font-semibold text-ink has-checked:bg-primary has-checked:text-white"
            >
              <input
                type="radio"
                name="categoryKey"
                value={c.key}
                defaultChecked={i === 0}
                className="sr-only"
              />
              {c.label}
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input id="date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="time" className={labelClass}>
            Start time
          </label>
          <input
            id="time"
            name="time"
            type="time"
            required
            defaultValue="09:00"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="durationHrs" className={labelClass}>
            Duration (hours)
          </label>
          <input
            id="durationHrs"
            name="durationHrs"
            type="number"
            min="0.5"
            max="12"
            step="0.5"
            required
            defaultValue="3"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="slots" className={labelClass}>
            Volunteer slots
          </label>
          <input
            id="slots"
            name="slots"
            type="number"
            min="1"
            max="200"
            required
            defaultValue="10"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="skills" className={labelClass}>
          Skills (comma-separated)
        </label>
        <input
          id="skills"
          name="skills"
          className={inputClass}
          placeholder="teamwork, outdoor, communication"
        />
        <p className="mt-1 text-xs text-muted">
          Used to match the shift to students&apos; skill profiles.
        </p>
      </div>

      <div>
        <label htmlFor="img" className={labelClass}>
          Image URL (optional)
        </label>
        <input
          id="img"
          name="img"
          type="url"
          className={inputClass}
          placeholder="https://… (defaults to a category image)"
        />
      </div>

      {state.error ? (
        <p className="text-sm font-medium text-danger">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="rounded-pill bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-deep disabled:opacity-60"
      >
        {pending ? "Publishing…" : "Publish shift"}
      </button>
    </form>
  );
}
