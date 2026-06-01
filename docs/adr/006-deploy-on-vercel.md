# ADR 006: Deploy On Vercel

## Date

2026-06-01

## Context

The app needs a free production deployment target for a small personal practice project. It is built with Next.js and uses Auth.js, Prisma, and hosted Postgres.

The deployment target should support GitHub-based deployments and server-side Next.js features.

## Decision

We will deploy the app on Vercel.

## Options Considered

### Option 1: Vercel

Deploy the Next.js app to Vercel.

Pros:

- Native fit for Next.js.
- Easy GitHub integration.
- Free Hobby plan for personal non-commercial projects.
- Supports server-side Next.js features.

Cons:

- Hobby plan has usage and commercial-use limitations.
- Some behavior is platform-specific.

### Option 2: Netlify

Deploy the Next.js app to Netlify.

Pros:

- Good developer experience.
- Free tier available.

Cons:

- Slightly less direct for Next.js than Vercel.
- May require more attention to Next.js runtime support.

### Option 3: Cloudflare Pages

Deploy the app to Cloudflare Pages or Workers.

Pros:

- Generous free tier.
- Strong edge platform.

Cons:

- More runtime and adapter constraints for Next.js.
- Less straightforward for Prisma and Node.js-oriented server code.

## Rationale

Vercel is the lowest-friction production target for this Next.js app and fits the project's small personal usage profile.

## Consequences

### Positive

- Deployments can run from the GitHub `main` branch.
- Next.js server-side features should work with minimal configuration.
- Auth.js and route handlers can run in the default Node.js runtime.

### Negative

- Production environment variables must be configured in Vercel.
- Google OAuth production URLs must match the Vercel deployment URL.

### Neutral / Follow-Up

- Add a custom domain later if needed.
- Monitor free-tier usage if the app grows.

## Implementation Notes

- Required Vercel env vars are `AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `DATABASE_URL`, and `DIRECT_URL`.
- Use the pooled Neon connection string for `DATABASE_URL`.
- Use the direct Neon connection string for `DIRECT_URL`.
- Add the Vercel app URL to Google OAuth authorized origins and redirect URIs.
- Keep Prisma database access out of `proxy.ts`.

## Related Decisions

- ADR 001: Use Next.js App Router
- ADR 003: Use Prisma As The ORM
- ADR 005: Use Auth.js With Google OAuth
