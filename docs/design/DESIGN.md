---
project: ServeTrack — Student Volunteer Hours Dashboard
inspiration: "Coursue Learning Platform Dashboard (Fireart Studio) — https://dribbble.com/shots/23027887-Coursue-Learning-Platform-Dashboard"
source_of_truth: screenshot (Coursue UI rendered as PNG; tokens read visually, not via DOM crawl)
generated_at: "2026-06-05"
platform: desktop web (>=1280px, two-column shell)
audience: high schoolers tracking graduation service requirements + discovering local events
material: soft-flat (flat fills, generous radii, low-contrast lavender shadows)
tokens:
  colors:
    primary: "#6C5CE7"        # violet — brand, active nav, progress, primary chart bar
    primary_deep: "#5A4BD4"   # gradient end / pressed
    banner_from: "#7B6CF0"    # hero gradient start
    banner_to: "#6453E0"      # hero gradient end
    ink: "#1B1B2F"            # headings / primary text
    ink_button: "#161622"     # black pill CTA
    muted: "#8A8AA3"          # secondary text, labels
    background: "#F5F6FB"     # app canvas
    surface: "#FFFFFF"        # cards, sidebar
    accent_lavender: "#ECEAFB" # chip bg / follow button bg
    accent_pink: "#FBE4F1"    # branding chip bg
    accent_sky: "#DDF0FB"     # front-end chip bg
    icon_pink: "#EC68A6"
    icon_sky: "#4DB7E8"
    chart_track: "#CFC9F4"    # muted bar / progress track
    danger: "#F4663F"         # logout
    success: "#22C55E"        # verified / goal met
  typography:
    sans: "Plus Jakarta Sans"  # fallback: Inter, system-ui
    base: 14
    scale: [12, 14, 16, 20, 28, 40]   # caption, body, subhead, card-title, section, hero
  spacing:
    base: 4
    scale: [4, 8, 12, 16, 24, 32, 48]
  radii:
    chip: 12
    button: 12
    card: 20
    pill: 999
  shadows:
    card: "0 10px 30px rgba(82, 78, 137, 0.06)"
    raised: "0 16px 40px rgba(108, 92, 231, 0.14)"
---

# Overview

A **desktop dashboard** in a **soft-flat** material: white surfaces floating on a pale
lavender canvas, one saturated violet accent, friendly rounded geometry, and shadows
that are tinted lavender rather than grey. The single hero gradient is the only loud
element on the page — everything else is calm and high-legibility.

**Layout skeleton (three regions):**
- **Left rail (~240px, white):** logo, grouped nav (`OVERVIEW`, `FRIENDS`, `SETTINGS`).
- **Main column (fluid):** top bar (search + icons + profile) → hero banner →
  category stat cards → horizontal event carousel → data table.
- **Right rail (~360px, white card):** progress/statistic block → bar chart →
  people-to-follow list.

# Colors

| role | hex | usage |
|---|---|---|
| primary | `#6C5CE7` | active nav, progress fills, primary CTA accent, main chart bar |
| ink | `#1B1B2F` | headings, table text |
| muted | `#8A8AA3` | labels, captions, inactive nav |
| background | `#F5F6FB` | app canvas behind cards |
| surface | `#FFFFFF` | cards, sidebar, table |
| banner | `#7B6CF0 → #6453E0` | hero gradient (top-left to bottom-right) |
| black pill | `#161622` | primary CTA button ("Join Now" equivalent) |
| danger | `#F4663F` | logout |

**Category accents (paired bg + icon):** lavender `#ECEAFB`/`#6C5CE7` · pink
`#FBE4F1`/`#EC68A6` · sky `#DDF0FB`/`#4DB7E8`. Each domain (e.g. Community,
Environment, Education) gets one pair, used on its chip, icon, and progress.

# Typography

**Family:** Plus Jakarta Sans (geometric, slightly rounded, friendly) → Inter fallback.

| level | size | weight | use |
|---|---|---|---|
| hero | 40px | 700 | banner headline |
| section | 20–24px | 700 | "Continue Watching", "Statistic" |
| card title | 16px | 600 | course/event card name |
| body | 14px | 400–500 | table cells, list items |
| caption | 12px | 500 | "2/8 watched", overlines (`ONLINE COURSE`) |

Overlines are uppercase, tracked-out, muted. Numbers in stats are bold ink.

# Layout & Spacing

**Spacing base:** 4px grid. Card padding ~24px. Gap between cards ~24px.
**Card radius:** 20px. **Chips/buttons:** 12px. **Avatars & toggle pills:** full.
**Shadows:** lavender-tinted, very soft (`0 10px 30px rgba(82,78,137,.06)`); the
active/raised state lifts to a violet glow (`0 16px 40px rgba(108,92,231,.14)`).

# Components (observed in source)

- **Sidebar nav item** — icon + label; active = violet icon, bold ink label,
  subtle lavender pill; inactive = muted.
- **Stat chip card** — rounded-square tinted icon + caption ("2/8 watched") + title.
- **Hero banner** — gradient, overline, large headline, black pill CTA with circular
  arrow, decorative sparkles.
- **Media card (carousel)** — image w/ heart toggle, category chip, title, thin
  progress bar, mentor avatar + role.
- **Data table** — column heads (MENTOR / TYPE / DESC / ACTION), avatar+name+date cell,
  category chip, text, circular icon-button action.
- **Progress ring** — avatar inside a circular % track, badge with percent.
- **Bar chart** — alternating primary/`#CFC9F4` bars, light gridlines, axis labels.
- **Follow list row** — avatar (with + dot), name + role, pill "Follow" button.

# Remap → Volunteer Hours Dashboard

| Coursue element | ServeTrack element |
|---|---|
| Sidebar: Dashboard / Inbox / Lesson / Task / Group | Dashboard / Events / My Hours / Goals / Organizations |
| Friends list | Service buddies / classmates |
| Hero "Sharpen Your Skills" + Join Now | "You're 32 of 40 hours toward graduation" + Log Hours / Find Events |
| 3 stat chips (UI/UX, Branding, Front End) | 3 category cards (Community, Environment, Education) with hours/goal |
| Continue Watching carousel | Upcoming / nearby service events (date, org, spots left, RSVP heart) |
| Your Lesson table | Recent hours log (Org · Category · Activity · status: pending/verified) |
| Statistic ring 32% | Graduation requirement ring (hours logged ÷ required) |
| Bar chart (watch time per 10-day) | Hours logged per month |
| Your mentor + Follow | Local organizations / coordinators to follow |
| Good Morning Jason 🔥 | "Good morning, [name] — keep your streak going" |

# Do's & Don'ts

**Do**
- Keep exactly one saturated accent (violet); let white + lavender carry the rest.
- Tint shadows lavender, never grey — that's the signature softness.
- Use the three category color pairs consistently across chip, icon, and progress.
- Round generously (20px cards) and keep one loud gradient (hero only).

**Don't**
- Don't add a second bright color to compete with violet.
- Don't use hard grey drop-shadows or sharp corners — breaks the soft-flat feel.
- Don't crowd cards; the look depends on whitespace and a strict 4px rhythm.

---
_Authored from the Coursue screenshot following the `extract-design` skill's DESIGN.md
convention. The auto-crawl of the Dribbble URL captured Dribbble's own site chrome
(`#0d0c22`, `#ea4c89`, Mona Sans) — not usable; these tokens were read from the image._
