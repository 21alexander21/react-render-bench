# Contributing

## Before starting

Read `AGENTS.md`, `METHODOLOGY.md`, and `docs/architecture.md`. Measurement validity takes priority over convenience.

## Development

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Use Node.js 24 or newer. Use Biome for formatting and linting. Do not add ESLint or Prettier.

## Changes

- Keep one logical change per pull request.
- Split large work into atomic, independently verifiable changes.
- Avoid unrelated refactoring.
- Add tests or deterministic validation for changed behavior.
- Explain methodology effects and remaining uncertainty.
- Do not include secrets or local agent settings.

Use a Conventional Commit title for the pull request, for example:

```text
feat(sandbox): collect profiler samples
fix(protocol): reject mismatched run identifiers
docs: explain noise-floor labels
```

Intermediate branch commits may be informal. Pull requests are squash-merged, and the pull request title becomes the commit on `main`.

## Verification

Run before requesting review:

```bash
corepack pnpm format:check
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm check
```

List any check that could not run and explain why.
