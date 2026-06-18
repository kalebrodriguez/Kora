# Kora — Claude Context

## What This Is
Kora is an API-first SaaS platform for high school community service compliance.
B2B revenue model: $5K–$10K annual licenses to school districts.
Built by a high school founder with extreme founder-market fit.

## Current State (2026-06-18)
**The MVP loop is fully functional on a real local stack** — no mock data:
student commits to shift → moderator displays HMAC-signed QR code →
student checks in → verified hours flow to ledger/goals/notifications.
Moderators can also manually verify/flag pending hours, and publish new
shifts (/org/shifts/new). Admins onboard partner orgs + moderator logins
(/admin/organizations/new).

**Self-serve sign-up at `/signup`** — pick a role: Student (joins an existing
school), Organization (creates org + moderator login), or School admin
(bootstraps a new School + first admin). Admin state choices are limited to
compliance-supported states (FL, WA). No seeded accounts by default.

`npm run setup && npm run dev` — starts a **brand-new empty database**, zero
env vars needed. `npm run db:reset` re-empties it; `npm run setup:demo`
loads the old demo data/accounts (password `demo1234`) for reference.

## Monorepo Layout
- `apps/web` — Student portal (`app/(student)`) + Org portal (`app/org`) + Admin console (`app/admin`) + `/login`
- `apps/admin` — unused boilerplate (admin console lives in apps/web/app/admin)
- `packages/db` — Prisma schema (SQLite), client, **all DB queries**, seed
- `services/matching-engine` — Python FastAPI AI matching (Phase 3 — empty)

## Stack
- Next.js 16 App Router + TypeScript, Tailwind v4 (design tokens in `app/globals.css`)
- React Server Components fetch data; mutations are Server Actions
- Prisma + SQLite (`packages/db/dev.db`; path defaulted in `next.config.js`)
- Auth: HMAC-signed session cookie (`apps/web/lib/auth/session.ts`),
  roles STUDENT / ORG_MODERATOR / SCHOOL_ADMIN, guards via `requireRole()` in layouts
- Client data layer: `apps/web/lib/student-data.tsx` — server-seeded React context
  exposing `useStore()` / `useStudentData()` / `useNotificationsStore()`

## Key Constraints
1. FERPA — student data is always scoped, never cross-school
2. QR verification uses HMAC-signed tokens (`lib/qr-token.ts`) — never expose raw
   shift/user IDs in codes; sessions expire in 15 min, one redemption per student
3. Hours require ORG_MODERATOR verification (QR scan or manual queue) before
   they count toward any requirement — only `status === "verified"` counts
4. Compliance rules live in `apps/web/lib/compliance/rules.json` — never hardcode
   state logic or hour thresholds inline
5. Fraud rule: 3+ students logging identical unverified hours within 10 min are
   flagged (`createPendingLog` in packages/db)

## Data Model (packages/db/schema.prisma)
SQLite: no enums (validated strings), no scalar lists (JSON-encoded strings).
User, School, Organization (1:1 moderator User), Shift, Commitment, SavedShift,
OrgFollow, ShiftLog (status verified|pending|flagged), QrSession, Notification.

## Commands
- `npm run dev` — all apps (web on :3000)
- `npm run setup` — db:push + db:seed (resets demo data)
- `npm run build` / `npm run lint` — must stay green
- `npm run db:studio` — Prisma Studio

## Still Client-Side Only (intentional, post-MVP)
- Messages threads + friends rail (`lib/messages-store.ts`, seeded from `lib/ui-data.ts`)
- Avatar builder config (`lib/profile-store.ts`; skills DO persist to DB)

## Do Not
- Do not write raw SQL — use Prisma
- Do not import `@prisma/client` in app code — always go through `@kora/db` queries
- Do not hardcode school IDs, state logic, or hour thresholds inline
- Do not use `any` TypeScript types
- Do not bypass `requireRole()` on new routes
