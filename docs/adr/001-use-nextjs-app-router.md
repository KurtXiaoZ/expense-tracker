# ADR 001: Use Next.js App Router

## Date

2026-06-01

## Context

The project is a full-stack expense tracker that needs routing, layouts, server-rendered page shells, route handlers, and production deployment with low operational overhead.

The project also needs to support hands-on practice with modern React and Next.js patterns.

## Decision

We will use Next.js App Router as the application shell.

## Options Considered

### Option 1: Next.js App Router

Use the App Router for layouts, pages, Server Components, route handlers, and server-side composition.

Pros:

- Native fit for modern Next.js projects.
- Supports Server Components and server-side data access patterns.
- Works well on Vercel.
- Keeps frontend and backend entry points in one application.

Cons:

- Requires understanding Server Components and client/server boundaries.
- Some patterns differ from older Pages Router examples.

### Option 2: Next.js Pages Router

Use the older Pages Router.

Pros:

- Mature and widely documented.
- Simpler mental model for older Next.js projects.

Cons:

- Less aligned with current Next.js direction.
- Does not exercise App Router patterns.

### Option 3: Separate frontend and backend apps

Use a standalone React frontend and a separate backend service.

Pros:

- Clear deployment boundary between frontend and backend.
- Backend can be framework-agnostic.

Cons:

- More operational overhead.
- More setup than this practice project needs.

## Rationale

The App Router best matches the project's learning goals and deployment target. It provides a single application boundary while still supporting server-side functionality for auth, API routes, and future data workflows.

## Consequences

### Positive

- The app can use layouts, Server Components, route handlers, and server actions when appropriate.
- Deployment to Vercel stays straightforward.

### Negative

- Contributors need to understand when code runs on the server versus the client.

### Neutral / Follow-Up

- Client-heavy workflows should still use client components where interaction and TanStack Query hooks are needed.

## Implementation Notes

- Keep route and layout files under `app/`.
- Use Server Components for page shells and server-only composition.
- Use client components for interactive UI and TanStack Query hooks.

## Related Decisions

- ADR 002: Use tRPC And TanStack Query For App Data
- ADR 006: Deploy On Vercel
