# Kora
> The API-first, AI-routed system of record for high school community service.

## What is Kora?
Kora replaces forged paper signatures and legacy software (x2VOL) with a verified,
skill-matched platform for student community service hours (AI matching is Phase 3).

**Three portals. One source of truth.** Self-serve sign-up at `/signup`
creates accounts for any role; instances start empty.
- **Student Dashboard** — matched shifts, QR-verified check-in, hours ledger ✅ live
- **Organization Portal** — shift builder, live QR check-in codes, roster, verification queue ✅ live
- **Admin Console** — compliance master-list, flagged-hours review, CSV export, org onboarding ✅ live

## Getting Started

```bash
git clone https://github.com/kalebrodriguez/Kora.git kora
cd kora
npm install
npm run setup     # creates an EMPTY local SQLite database (no demo data)
npm run dev       # http://localhost:3000
```

No API keys or external services required — the app runs fully local
(SQLite via Prisma, built-in session auth).

### Starting from scratch (the default)

Kora boots **completely blank** — no schools, orgs, students, or shifts.
Open `http://localhost:3000`, get sent to the sign-in page, and click
**Create an account**. The sign-up page (`/signup`) creates real, persisted
accounts for any of three roles:

| Role | Creates | Notes |
|---|---|---|
| **School admin** | A new school + the first admin login | Bootstraps everything; state limited to FL/WA (the states with compliance rules) |
| **Organization** | An org profile + a moderator login | Can immediately publish shifts and run QR check-in |
| **Student** | A student joined to an existing school | Needs a school to exist first |

On a fresh instance, create them in that order (**admin → organization →
student**) — students can only join a school that already exists.

> Use `npm run dev` for day-to-day work. `npm run setup` and
> `npm run db:reset` **wipe the database back to empty**, so don't run them
> once you have accounts you want to keep.

### Want sample data instead?

```bash
npm run setup:demo   # loads a demo school, 8 orgs, shifts, logs, and accounts
```

This seeds a ready-to-explore dataset with these logins (password `demo1234`):

| Account | Role | What you can do |
|---|---|---|
| `student@demo.kora` | Student (Maya Chen) | Dashboard, commit to shifts, check in with QR codes, hours ledger, goals |
| `org@demo.kora` | Org moderator (Marcus Webb) | Display check-in codes, view roster, verify/flag pending hours |
| `admin@demo.kora` | School admin (Dana Whitfield) | Compliance master-list, flagged hours, CSV export |
| `jordan@demo.kora`, `sofia@demo.kora` | Students | Extra roster members |

### The verification loop

1. Sign in as the **student** → commit to a shift on **Events**
2. Sign in as the **moderator** (incognito window) → open the shift → **Display check-in code**
3. Back as the student → **Log Hours** → enter/scan the code → hours are verified instantly
4. Verified hours flow into the ledger, dashboard, goals, and notifications
5. Students who miss the scan can be verified manually from the org **Verification queue**

## Directory Structure

| Path | Description |
|---|---|
| [`apps/web`](./apps/web) | Student dashboard + org portal + QR check-in flow |
| [`apps/web/app/admin`](./apps/web/app/admin) | School admin console (compliance, export) |
| [`packages/db`](./packages/db) | Prisma schema, SQLite client, all DB queries, seed |
| [`services/matching-engine`](./services/matching-engine) | Python FastAPI AI matching (Phase 3 — empty) |
| [`docs/architecture.md`](./docs/architecture.md) | System design, auth flow, QR scheme |
| [`CLAUDE.md`](./CLAUDE.md) | AI coding context for Claude Code |

## Tech Stack
| Layer | Tech |
|---|---|
| Frontend | Next.js 16 (App Router), Tailwind CSS v4 |
| Backend | React Server Components + Server Actions |
| Database | SQLite via Prisma (swap `provider` for Postgres in prod) |
| Auth | HMAC-signed session cookies, role-based guards |
| QR Verification | HMAC-signed tokens, 15-min expiry, one redemption per student |
| Compliance | JSON rules engine (FL Bright Futures, graduation thresholds) |

## Commands

```bash
npm run dev        # start all apps (web on :3000)
npm run build      # full monorepo build
npm run lint       # eslint, zero warnings
npm run setup      # reset to an EMPTY database (alias for db:reset)
npm run setup:demo # push schema + seed the demo dataset
npm run db:reset   # drop all data, recreate empty schema
npm run db:push    # push Prisma schema to SQLite (no data change)
npm run db:seed    # (re)seed the demo dataset
npm run db:studio  # Prisma Studio
```

## Roadmap
- [x] MVP: Student dashboard + QR check-in (real DB + auth)
- [x] Organization portal: QR display + verification queue + shift builder
- [x] Admin console: compliance master-list + CSV export + org onboarding
- [x] Self-serve sign-up for all three roles (empty-by-default instances)
- [ ] AI matching engine (FastAPI + embeddings)
- [ ] More state rules + seeded multi-state schools (engine already covers FL & WA)
- [ ] Production deploy: Postgres + managed auth

## Status
✅ MVP loop functional — Tampa, FL beta targeting robotics teams + FBLA chapters
