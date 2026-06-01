# ADR 007: Prefer tRPC Over API Routes And Server Actions For CRUD

## Date

2026-06-01

## Context

The app will include CRUD-heavy workflows for transactions, accounts, categories, budgets, and related filters.

The project intentionally practices tRPC and TanStack Query. Next.js also offers route handlers and Server Actions, so the architecture needs a clear boundary for when each should be used.

## Decision

We will prefer tRPC for application CRUD workflows.

Route handlers should be reserved for HTTP endpoints needed outside the app UI. Server Actions should be used sparingly for isolated server-only form workflows.

## Options Considered

### Option 1: tRPC For CRUD

Use tRPC as the main application data layer.

Pros:

- Matches the project learning goals.
- Gives typed procedures for app workflows.
- Integrates well with TanStack Query.

Cons:

- Requires tRPC router and client setup.
- Less useful for public HTTP endpoints.

### Option 2: Route Handlers For CRUD

Use Next.js route handlers for all app data operations.

Pros:

- Standard HTTP interface.
- Good for webhooks, public APIs, and integrations.

Cons:

- More manual client/server typing.
- Does not exercise tRPC as the main data layer.

### Option 3: Server Actions For CRUD

Use Server Actions for most data writes and reads.

Pros:

- Native Next.js feature.
- Convenient for simple form submissions.

Cons:

- Can blur the main data access pattern.
- Does not center TanStack Query caching and invalidation.

## Rationale

tRPC gives the cleanest main app data boundary for this project's goals. Route handlers and Server Actions still have a place, but they should not replace tRPC for the core expense-tracking data layer.

## Consequences

### Positive

- CRUD workflows have a consistent API pattern.
- TanStack Query can manage cache, mutation state, and invalidation.

### Negative

- Some simple workflows may require more setup than a Server Action.
- Contributors must understand when route handlers or Server Actions are appropriate.

### Neutral / Follow-Up

- Use route handlers for webhooks, public API endpoints, file upload callbacks, and third-party integrations.
- Use Server Actions only for isolated server-only form workflows.

## Implementation Notes

- Define procedures such as `transactions.list`, `transactions.create`, `transactions.update`, and `transactions.delete`.
- Invalidate related TanStack Query caches after successful mutations.
- Keep ownership checks inside server-side procedure logic.

## Related Decisions

- ADR 002: Use tRPC And TanStack Query For App Data
