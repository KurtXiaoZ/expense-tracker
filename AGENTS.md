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

Examples:

- `feat: add selector button component`
- `fix: preserve selector button selected state`
- `chore: update husky pre-commit hook`
