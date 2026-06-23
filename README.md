# Youssif Salama — Portfolio (Next.js + JSON CMS)

A futuristic, animated full-stack developer portfolio built with **Next.js 14 (App Router)**.
No external database — content lives in **JSON files** under `data/`, edited through a built-in
password-protected **CMS** at `/admin`.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then set ADMIN_PASSWORD
npm run dev
```

Open http://localhost:3000 — the CMS is at http://localhost:3000/admin

Requires Node.js 18.17+ (Node 20 LTS recommended).

## What's inside

| Route | What it is |
|-------|------------|
| `/` | Animated landing page (hero particle-network canvas, typing rotator, count-up stats, interactive skill tabs, experience timeline, projects grid, contact) |
| `/projects/[slug]` | A dedicated case-study page per project — cover image, overview, highlights, stack, and a live-preview link |
| `/admin` | CMS dashboard — list, create, edit, delete projects |
| `/admin/login` | Password gate (uses `ADMIN_PASSWORD`) |

## The "database" — JSON files

- **`data/profile.json`** — your name, summary, stats, skills, and work experience.
- **`data/projects.json`** — the project list. The CMS reads and rewrites this file.

Edit them by hand, or use the CMS. Changes appear immediately (pages are
rendered dynamically, no rebuild needed).

## The CMS

1. Go to `/admin` → you'll be sent to `/admin/login`.
2. Enter the password from `.env.local` (`ADMIN_PASSWORD`, default `changeme`).
3. Add / edit / delete projects. Cover images can be a URL **or** uploaded
   (saved to `public/uploads/`). Each project gets its own `/projects/<slug>` page.

> Auth is a simple signed cookie checked in `middleware.js` (page access) and inside
> the write API routes. It's deliberately lightweight — for a public production deploy,
> swap in a real auth provider (NextAuth, Clerk, etc.).

## Project structure

```
app/
  page.js                 landing page (server component)
  layout.js, globals.css  fonts, theme tokens, keyframes
  components/             Hero, Stats, Skills, Reveal, ProjectCard, Nav, SectionHead
  projects/[slug]/        per-project case-study page
  admin/                  CMS: login, dashboard, new/edit, ProjectForm
  api/
    projects/             GET list / POST create, GET/PUT/DELETE by slug
    auth/                 login / logout
    upload/               cover-image upload
data/                     profile.json + projects.json  (the JSON "database")
lib/db.js                 read/write helpers for the JSON files
lib/auth.js               cookie-based admin auth
middleware.js             guards /admin
public/images/            profile photo + generated SVG cover placeholders
```

## Deploying

Because the app **writes to JSON files at runtime**, it needs a host with a
persistent/writable filesystem (a VPS, a long-running Node container, Render, Railway,
Fly.io, etc.). Serverless platforms like Vercel have a read-only filesystem, so the
CMS write features won't persist there — for that, move `lib/db.js` to a real database
(the rest of the app stays the same).

## Notes

- Fonts: Space Grotesk + JetBrains Mono (loaded from Google Fonts).
- Cover images shipped here are generated SVG placeholders — replace them with real
  screenshots via the CMS.
- Colors use `oklch()` — supported in all current evergreen browsers.
