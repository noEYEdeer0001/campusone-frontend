# CampusOne Web -- Phase 1

Next.js 15/16 (App Router) + TypeScript + Tailwind v4 + hand-built shadcn-pattern components.

## Setup

```bash
npm install
cp .env.local.example .env.local   # point BACKEND_API_URL at your running Express backend
npm run dev
```

## What's in Phase 1

- Landing page (`/`)
- Login / Register (`/login`, `/register`) -- calls your real Express Auth module via
  this app's own Route Handlers (see below)
- Protected Dashboard shell (`/dashboard`)
- Full responsive layout: Sidebar (desktop), Navbar, mobile nav drawer (Sheet)
- Dark / light / system theme toggle (next-themes)
- Toast notifications (sonner)
- Loading states, error boundary, 404 page

## Auth architecture -- read this before touching auth code

Your Express backend issues JWTs via `Authorization: Bearer` headers, not cookies.
This app introduces a thin Route Handler layer (`app/api/auth/*`) that:

1. Receives login/register requests from the browser
2. Calls your real Express endpoints server-side (`lib/server/express-client.ts`)
3. Stores the returned tokens in **httpOnly cookies** (invisible to browser JS --
   real XSS protection your Express backend's own header-based design doesn't give you
   for free)
4. On every page load, `GET /api/auth/me` decodes the access token's claims (or
   silently rotates it via your refresh endpoint if expired) to reconstruct "who is
   logged in" -- there is no `GET /users/me` on your backend yet, so this is
   necessarily claims-only (id, email, role, universityId, isEmailVerified), not a
   full profile. Swap this out the moment your Users module ships.

## Known gaps, flagged not hidden

- **No university-listing endpoint exists on your backend.** The Register form has a
  plain "University ID" text field, not a dropdown, because inventing a
  `GET /universities` endpoint wasn't authorized. Swap this the moment that endpoint
  exists.
- **Google Fonts require internet access at build time** (`next/font/google`). This
  sandbox couldn't reach `fonts.googleapis.com` to verify the final build with real
  fonts -- I verified the entire rest of the build (all routes, all types) with
  system fonts substituted temporarily, then restored the real Google Fonts setup for
  delivery. This will build fine with normal internet access.
