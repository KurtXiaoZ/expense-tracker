# Architecture

## Context

This repo is a full-stack expense tracker built with Next.js. The app should support practical expense-tracking workflows while also providing hands-on practice with tRPC and TanStack Query.

## Current Direction

Use Next.js as the application shell, with a typed backend API powered by tRPC.

Recommended stack:

- Next.js App Router for routing, layouts, and server-rendered page shells
- tRPC for application API procedures
- TanStack Query for client-side data fetching, caching, mutations, and invalidation
- Postgres as the primary database
- Prisma for schema, migrations, and typed database access
- Zod for validating procedure inputs
- Auth.js with Google OAuth for authentication

## Data Flow

Most expense-tracking workflows should use this flow:

```txt
Client component
  -> tRPC query or mutation
    -> server router procedure
      -> validate input with Zod
      -> check Auth.js session and user ownership
      -> read or write Postgres through Prisma
  -> TanStack Query updates or invalidates cached data
```

Server Components can still be used for page shells, layouts, and server-only composition. CRUD-heavy app workflows should prefer tRPC hooks so the project exercises TanStack Query patterns.

## Backend Boundaries

Keep backend logic in server-only modules.

Suggested structure:

```txt
server/
  db.ts
  trpc.ts
  routers/
    _app.ts
    transactions.ts
    categories.ts
    accounts.ts

lib/
  validations/
    transaction.ts
    category.ts
    account.ts
```

Guidelines:

- Put tRPC procedures in `server/routers`.
- Put shared Zod schemas in `lib/validations`.
- Keep database access inside server code.
- Scope every user-owned query by `userId`.
- Get the current user from the Auth.js session before reading or mutating user-owned data.
- Keep UI state and API state separate.
- Do not put UI-specific behavior in tRPC routers.

## Authentication Direction

Use Auth.js with Google OAuth. This keeps password handling out of the app and lets the project focus on expense-tracking workflows.

Current auth files:

```txt
auth.ts
proxy.ts
app/api/auth/[...nextauth]/route.ts
```

Auth flow:

```txt
User clicks "Sign in with Google"
  -> Auth.js redirects to Google OAuth
  -> Google returns to /api/auth/callback/google
  -> Auth.js creates a session
  -> app reads the current user with auth()
```

Because this is a private app for a small known user set, restrict access by email in the Auth.js configuration before adding real expense data. Only the approved Google accounts should be allowed to sign in.

Required environment variables:

```txt
AUTH_SECRET
AUTH_GOOGLE_ID
AUTH_GOOGLE_SECRET
```

When deploying to Vercel, add the production app URL to the Google OAuth client:

```txt
Authorized JavaScript origins:
https://your-app.vercel.app

Authorized redirect URIs:
https://your-app.vercel.app/api/auth/callback/google
```

## Database Direction

Use Postgres because expense tracking is relational.

Expected early entities:

- users
- accounts
- categories
- transactions
- budgets
- recurring transactions, later

Money should be stored as integer minor units, not floating-point values.

Example:

```txt
amountCents: integer
currency: text
```

Every user-owned table should include ownership and audit fields where appropriate:

```txt
userId
createdAt
updatedAt
```

Add indexes for common filters:

- `userId`
- transaction date
- account id
- category id
- recurring transaction status, later

## tRPC And TanStack Query Conventions

Use tRPC procedures for app data operations.

Example procedure names:

- `transactions.list`
- `transactions.create`
- `transactions.update`
- `transactions.delete`
- `categories.list`
- `accounts.list`

Use TanStack Query invalidation after mutations first. Add optimistic updates only after the basic data flow is stable.

Mutation rules:

- Validate input with Zod.
- Check authentication.
- Check ownership for updates and deletes.
- Return the changed entity or enough data to update the UI.
- Invalidate related queries after success.

## API Routes And Server Actions

Prefer tRPC for application CRUD because this project intentionally practices tRPC and TanStack Query.

Use Route Handlers only when an HTTP endpoint is needed outside the app UI, such as:

- webhooks
- public API endpoints
- file upload callbacks
- integrations with third-party services

Use Server Actions sparingly. They are acceptable for isolated server-only form workflows, but should not replace tRPC for the main expense-tracking data layer.

## First Milestone

Build the first vertical slice around transactions:

1. Add database schema for accounts, categories, and transactions.
2. Add tRPC routers for listing and mutating transactions.
3. Add category and account list procedures.
4. Build a transaction form.
5. Build a transaction list.
6. Add month/category/account filters.
7. Invalidate affected queries after create, update, and delete mutations.
