# Context guide

## Goal

Give an agent enough context to make the next correct decision without loading the entire repository.

## Recommended order

1. Read `AGENTS.md`.
2. Inspect `git status --short`.
3. Find relevant files with `rg` or `rg --files`.
4. Read the smallest useful file sections.
5. Read `METHODOLOGY.md` only for measurement-related work.
6. Run the narrowest verification that proves the change.

Avoid reading `pnpm-lock.yaml`, generated output, coverage data, benchmark results, or complete dependency trees unless they are directly relevant.

Do not repeat discovery that is already recorded in the current task context. Summarize stable facts and refer back to their source path.

## Task size

Prefer a sequence of atomic changes. Each change should have one purpose, a bounded file set, and an observable verification result.

If a task appears too large, split it by behavior or boundary. Use subagents only when the task must remain one unit and has clearly independent workstreams. The primary agent remains responsible for coordination, review, and final verification.
