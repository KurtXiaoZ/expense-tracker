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

## Class Names

When a `className` string gets too long to read comfortably, break it into multiple lines using the `cn` utility from `@/lib/utils`.

Group classes by purpose so the styling remains easy to scan. Prefer groups such as:

- sizing and layout
- spacing
- border and surface styles
- typography and icon color
- transitions and animation
- interaction states such as hover, active, focus, disabled, and selected

## Storybook Tests

When writing Storybook interaction tests, use named `step` blocks for distinct setup, interaction, and assertion phases so test output stays easy to understand.
