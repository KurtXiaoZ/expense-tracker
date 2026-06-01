# Agent Instructions

## Commit Titles

Follow the existing commit title convention whenever creating commits.

This repo uses Conventional Commit titles:

```txt
type: short imperative description
```

Common types:

- `feat:` for user-facing features or new components
- `fix:` for bug fixes
- `chore:` for tooling, config, and maintenance
- `refactor:` for internal code changes without behavior changes
- `test:` for test-only changes
- `docs:` for documentation-only changes

Before committing, inspect recent git history and match the existing title style.

When asked to create a git commit, propose the commit title first and get explicit human confirmation before running `git commit`.

Examples:

- `feat: add selector button component`
- `fix: preserve selector button selected state`
- `chore: update husky pre-commit hook`

## Validation

Do not run `npm run lint` by default after every change.

Choose validation based on the risk and type of change:

- For documentation-only changes, inspect the diff instead of running lint.
- For narrow code changes, run the most relevant targeted check.
- For broad code changes, shared behavior changes, or pre-commit confidence, run the broader validation command that best matches the work.

## Class Names

When a `className` string gets too long to read comfortably, break it into multiple lines using the `cn` utility from `@/lib/utils`.

Group classes by purpose so the styling remains easy to scan. Prefer groups such as:

- sizing and layout
- spacing
- border and surface styles
- typography and icon color
- transitions and animation
- interaction states such as hover, active, focus, disabled, and selected
