# Repo Insights UI

Modern SaaS app built with Next.js 16, TypeScript, Tailwind CSS v4, TanStack Query v5.

## Quick Start

```bash
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm install
npm run dev
```

## Vercel Deploy

Set this environment variable in Vercel:

```bash
NEXT_PUBLIC_API_URL=https://your-api-domain
```

Backend requirements for a Vercel frontend deployment:

- The API must allow your Vercel frontend origin in CORS.
- The API must allow credentials if refresh/auth cookies are used.
- Any auth cookies used across different domains must be sent with `SameSite=None; Secure`.
- The API should continue returning the login access token, since the UI now persists it client-side across refresh and reopen.

## Stack
- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4** with dark theme design tokens
- **TanStack Query v5** — caching, optimistic updates, background refresh
- **React Hook Form + Zod** — type-safe validated forms
- **Axios** — centralized client with JWT interceptor + silent refresh

## Auth Architecture
Access token lives **in memory only** (never localStorage). Refresh token in httpOnly cookie. On 401, the Axios interceptor silently refreshes and retries the original request. If refresh fails, redirects to /login.

## Pages
| Route | Access | Description |
|-------|--------|-------------|
| /login | Public | Email + password + workspace |
| /signup | Public | Name + email + password + workspace name |
| /dashboard | Protected | Stats, teams overview, subscription status |
| /teams | Protected | Teams CRUD with optimistic updates |
| /settings | Protected | Profile edit + read-only account info |
| /billing | Protected | Plans, subscription, upgrade/cancel |
| /admin | Admin only | All users table with role/status |

## Query Keys
`["me"]` · `["tenant"]` · `["teams"]` · `["subscription"]` · `["plans"]` · `["admin","users"]`
