# ADR 005: Use Auth.js With Google OAuth

## Date

2026-06-01

## Context

The app is private and intended for a small known user set. It needs authentication before real expense data is added.

The project should avoid custom password handling unless there is a specific learning goal for building email/password auth.

## Decision

We will use Auth.js with Google OAuth for authentication.

## Options Considered

### Option 1: Auth.js With Google OAuth

Use Auth.js and Google as the OAuth provider.

Pros:

- Avoids storing user passwords.
- Reduces need for password reset and email verification flows.
- Works with Next.js.
- Good fit for a private app with a small known user set.

Cons:

- Requires Google Cloud OAuth configuration.
- Requires environment variables for provider credentials.

### Option 2: Custom Email And Password

Build signup and login with email and password.

Pros:

- Good learning exercise for auth fundamentals.
- Full control over the login flow.

Cons:

- Requires password hashing, reset flows, rate limiting, and careful security handling.
- More risk and scope than this app needs.

### Option 3: Hosted Auth Provider

Use a hosted provider such as Clerk or Supabase Auth.

Pros:

- Polished auth experience.
- Many features out of the box.

Cons:

- Adds another platform dependency.
- Less direct practice with Auth.js.

## Rationale

Auth.js with Google OAuth gives the app a practical authentication path without custom password risk. It is enough for a private production deployment used by a small number of known users.

## Consequences

### Positive

- Users can sign in with Google.
- The app can read the current session with `auth()`.
- Password storage is avoided.

### Negative

- Google OAuth client settings must be kept in sync with local and production URLs.
- Access control still needs an app-level email allowlist.

### Neutral / Follow-Up

- Add an email allowlist before storing real expense data.
- Add a custom login page after the basic flow is stable.

## Implementation Notes

- Keep Auth.js setup in `auth.ts`.
- Keep the route handler in `app/api/auth/[...nextauth]/route.ts`.
- Keep session refresh proxy wiring in `proxy.ts`.
- Required env vars are `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET`.
- Configure the Google OAuth callback URL as `/api/auth/callback/google`.

## Related Decisions

- ADR 001: Use Next.js App Router
- ADR 006: Deploy On Vercel
