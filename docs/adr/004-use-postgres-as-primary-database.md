# ADR 004: Use Postgres As The Primary Database

## Date

2026-06-01

## Context

Expense tracking is relational. Transactions belong to users, accounts, and categories, and future features may include budgets and recurring transactions.

The app also needs a production database that works with Prisma and can be hosted for free or at very low cost.

## Decision

We will use Postgres as the primary database.

## Options Considered

### Option 1: Postgres

Use Postgres for relational app data.

Pros:

- Strong fit for relational data.
- Mature and widely supported.
- Works well with Prisma.
- Available through free hosted providers such as Neon.

Cons:

- Requires schema and migration management.
- Requires connection handling for serverless deployment.

### Option 2: SQLite

Use SQLite for local or simple hosted data.

Pros:

- Very simple local setup.
- Good for prototypes.

Cons:

- Less suitable for hosted serverless production usage.
- Not the target database for the intended deployment.

### Option 3: Document Database

Use a document database such as MongoDB.

Pros:

- Flexible document structure.
- Useful for less relational data models.

Cons:

- Poorer fit for transactions, accounts, categories, budgets, and reporting.
- Less aligned with the current architecture.

## Rationale

Postgres matches the app's relational data model and gives a production-ready path with Prisma, Neon, and Vercel.

## Consequences

### Positive

- Tables can model users, accounts, categories, transactions, budgets, and recurring transactions.
- Relational constraints and indexes can protect data integrity and query performance.

### Negative

- Schema changes require migrations.
- Hosted database credentials must be managed carefully.

### Neutral / Follow-Up

- Money should be stored as integer minor units, such as `amountCents`.
- User-owned tables should include ownership fields and audit timestamps.

## Implementation Notes

- Use `userId` to scope user-owned data.
- Add indexes for common filters such as `userId`, transaction date, account id, and category id.
- Use Neon Postgres for hosted production data.

## Related Decisions

- ADR 003: Use Prisma As The ORM
- ADR 006: Deploy On Vercel
