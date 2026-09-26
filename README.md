# Zenithbe (client)

Next.js (App Router + TypeScript) frontend for Zenithbe. Talks to the
Node.js API in `../server` for real accounts, applications, and the
admin panel — see that folder's README for how to run it.

## Structure

- `app/layout.tsx` — root layout, wraps the app in `AuthProvider`, loads
  the three Google Fonts (Fraunces, IBM Plex Sans, IBM Plex Mono) via
  `next/font/google`
- `app/globals.css` — the full design system (colors, dark mode, layout,
  every section's styles, the auth pages/gate, and the admin dashboard)
- `app/page.tsx` — assembles the homepage from the section components
- `app/login/page.tsx`, `app/signup/page.tsx` — login and signup
- `app/admin/page.tsx` — admin dashboard: review applications, mark
  accepted/rejected/certified, see all accounts (admin accounts only)
- `components/`
  - `Nav.tsx` — sticky nav bar; shows "Log in" when signed out, an
    "Admin" link for admins, or "Hi, [name] · Log out" when signed in
  - `Hero.tsx` — hero with the typing terminal animation
  - `Programs.tsx` — 3/6/9-month timeline bars
  - `Courses.tsx` — grid of all 9 software courses
  - `Process.tsx` — 5-step "how it works" list
  - `Certificate.tsx` — certificate mock-up
  - `Apply.tsx` — requires an account; submits straight to the server
  - `Footer.tsx`
  - `AuthContext.tsx` — talks to the server's `/api/auth` routes, keeps
    the session token in localStorage
  - `Reveal.tsx` — scroll-reveal wrapper (IntersectionObserver)
  - `PeakMark.tsx` — the shared mountain-peak logo mark

## Running it

This needs the server running too (`../server`, its own README has
setup steps).

```bash
npm install
cp .env.local.example .env.local   # points at the server; edit if it's not on localhost:4000
npm run dev
```

Open http://localhost:3000. Log in with the admin account seeded by the
server (from its `.env`) to reach `/admin`, or sign up as a student to
try the apply flow.

## Build for production

```bash
npm run build
npm run start
```

Set `NEXT_PUBLIC_API_URL` to your deployed server's URL before building.
