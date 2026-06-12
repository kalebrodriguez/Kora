# Kora Architecture

## System Overview

```
[Student Browser] ──→ apps/web /(student)  ─┐
[Org Browser]     ──→ apps/web /org        ─┼─→ Server Components + Server Actions ──→ @kora/db (Prisma) ──→ SQLite (packages/db/dev.db)
[Admin Browser]   ──→ apps/web /admin      ─┘
```

One Next.js app serves all three portals, separated by route groups and
role guards. All database access goes through typed query functions in
`packages/db` — app code never touches the Prisma client directly.

## Auth Flow

Local session auth (no external provider):

1. `/login` posts to a Server Action → `authenticateUser` (scrypt password check)
2. On success the server sets `kora_session`: an HMAC-SHA256-signed cookie
   containing `{ userId, role, exp }` (secret: `AUTH_SECRET`, 7-day TTL)
3. Every portal layout calls `requireRole(role)` — unauthenticated users
   are redirected to `/login`, wrong-role users to their own portal home

Roles:
- STUDENT — browse/commit to shifts, check in with QR codes, hours ledger, goals
- ORG_MODERATOR — publish shifts, display check-in codes, verify/flag hours
- SCHOOL_ADMIN — compliance master-list scoped to their school, CSV export,
  onboard partner organizations

## QR Verification Flow

The moderator displays the code; students scan it. Raw shift/user IDs never
appear in the QR payload.

1. Moderator opens the shift in `/org` → "Display check-in code"
2. Server generates `kora.v1.<HMAC(shiftId:issuedAt, QR_HMAC_SECRET)>` and
   stores it as a QrSession (15-minute expiry; prior sessions deactivate)
3. Student enters/scans the code on `/log-hours`
4. Server looks up the session, re-verifies the HMAC, checks commitment,
   and rejects double redemption (one redemption per student per code)
5. A verified ShiftLog is written atomically (verifiedBy = moderator) and
   the student gets an in-app notification — hours immediately count

Students who miss the scan can request manual verification; those logs sit
in the org portal's verification queue as `pending`.

## Fraud Detection

If 3+ students create identical unverified logs (same shift, same hours)
within 10 minutes, all of them are flagged for review (`createPendingLog`).
Flagged logs surface in both the org queue and the admin console.

## Multi-Tenant Data Isolation (FERPA)

Student data queries in the admin console are always scoped to the admin's
own `schoolId` (`getSchoolCompliance`, `getFlaggedLogsForSchool`,
`getSchoolStats`) — never cross-school. Org moderators only see logs and
rosters belonging to their own organization (ownership checked in every
mutation).

## Compliance Rules Engine

State requirements live in `apps/web/lib/compliance/rules.json`, never
hardcoded in UI or queries:

```json
{
  "FL": {
    "graduation": { "default": 40 },
    "brightFutures": { "gold": 100, "silver": 75 },
    "categories": { "community": 15, "environment": 15, "education": 10 }
  },
  "WA": { "graduation": { "default": 40 }, "categories": { "…": 0 } }
}
```

Only `status === "verified"` logs count toward any requirement.

## Database

SQLite via Prisma for zero-config local development. SQLite has no enums or
scalar lists, so roles/statuses are validated strings and skills/categories
are JSON-encoded arrays (`packages/db/src/json.ts`). Swapping the datasource
`provider` to `postgresql` is the intended production path.

## Phase 3 (not built)

`services/matching-engine` (Python FastAPI + embeddings) will replace the
current skill-tag-overlap matching in `apps/web/lib/matching.ts`.
