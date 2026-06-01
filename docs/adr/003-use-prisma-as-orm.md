# ADR 003: Use Prisma As The ORM

## Date

2026-06-01

## Context

The app needs schema management, migrations, and typed database access for relational expense-tracking data.

The project uses TypeScript and should keep database access predictable and easy to learn.

## Decision

We will use Prisma as the ORM.

## Options Considered

### Option 1: Prisma

Use Prisma for schema modeling, migrations, generated types, and database access.

Pros:

- Strong TypeScript developer experience.
- Clear schema file and migration workflow.
- Good fit for a practice project.
- Works with Postgres and Neon.

Cons:

- Adds generated client artifacts.
- Requires care with serverless connection handling.

### Option 2: Drizzle

Use Drizzle for schema and typed SQL-oriented database access.

Pros:

- Closer to SQL.
- Strong TypeScript support.
- More explicit control over queries.

Cons:

- Slightly more manual for a first vertical slice.
- Less beginner-friendly than Prisma for this project.

### Option 3: Raw SQL

Use SQL queries directly through a Postgres driver.

Pros:

- Maximum control.
- No ORM abstraction.

Cons:

- More manual typing and migration management.
- Higher risk of inconsistent query patterns.

## Rationale

Prisma gives the smoothest path for schema, migrations, and typed access while the project focuses on learning the full app architecture.

## Consequences

### Positive

- Database models can be defined in one Prisma schema.
- Prisma Client provides typed queries.
- Migrations can be tracked in the repo.

### Negative

- Generated Prisma output must be ignored or managed deliberately.
- Runtime database access must stay on the server.

### Neutral / Follow-Up

- Prisma CLI should use the direct Neon connection string.
- Runtime database access should use the pooled Neon connection string.

## Implementation Notes

- Keep Prisma schema in `prisma/schema.prisma`.
- Keep Prisma config in `prisma.config.ts`.
- Use `DATABASE_URL` for runtime database access.
- Use `DIRECT_URL` for Prisma CLI operations.
- Do not put Prisma database access inside `proxy.ts`.

## Related Decisions

- ADR 004: Use Postgres As The Primary Database
- ADR 006: Deploy On Vercel
