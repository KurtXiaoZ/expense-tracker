# ADR 002: Use tRPC And TanStack Query For App Data

## Date

2026-06-01

## Context

The project should support practical expense-tracking CRUD workflows while also providing hands-on practice with tRPC and TanStack Query.

The app needs type-safe client/server calls, input validation, cache management, mutations, and invalidation.

## Decision

We will use tRPC for application API procedures and TanStack Query for client-side data fetching, caching, mutations, and invalidation.

## Options Considered

### Option 1: tRPC And TanStack Query

Use tRPC procedures as the primary app data API and consume them through TanStack Query hooks.

Pros:

- Strong TypeScript integration across client and server.
- Good fit for CRUD-heavy app workflows.
- Exercises the project's intended learning goals.
- TanStack Query provides caching, invalidation, and mutation state.

Cons:

- Adds setup and conventions beyond plain route handlers.
- Requires keeping API state separate from UI state.

### Option 2: Route Handlers With Fetch

Use Next.js route handlers and manual `fetch` calls.

Pros:

- Uses standard HTTP primitives.
- Good fit for public APIs and webhooks.

Cons:

- More manual typing and client/server contract management.
- Does not exercise tRPC patterns.

### Option 3: Server Actions For CRUD

Use Server Actions for most mutations and form workflows.

Pros:

- Simple for isolated server-only form submissions.
- Native Next.js feature.

Cons:

- Not the intended main data layer for this project.
- Less direct practice with TanStack Query caching and invalidation.

## Rationale

tRPC and TanStack Query directly support the project's learning goals and provide a type-safe data layer for transactions, accounts, categories, and future expense workflows.

## Consequences

### Positive

- Client code can call typed procedures.
- Mutations can invalidate related queries after success.
- Procedure inputs can be validated with Zod.

### Negative

- The app needs tRPC setup and router organization.
- Developers must avoid placing UI-specific behavior inside routers.

### Neutral / Follow-Up

- Optimistic updates should wait until the basic query and invalidation flow is stable.

## Implementation Notes

- Put tRPC procedures in `server/routers`.
- Put shared Zod schemas in `lib/validations`.
- Validate mutation inputs with Zod.
- Invalidate affected queries after create, update, and delete mutations.

## Related Decisions

- ADR 001: Use Next.js App Router
- ADR 007: Prefer tRPC Over API Routes And Server Actions For CRUD
