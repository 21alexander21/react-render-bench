---
name: react-render-bench
description: Apply React Render Bench measurement constraints when changing the sandbox, runner, subjects, protocol, statistics, result labels, or benchmark methodology. Do not use for ordinary repository maintenance.
---

# React Render Bench

Protect measurement validity before optimizing developer experience.

## Use this skill when

- changing how a run is isolated, scheduled, sampled, or reported;
- adding or changing benchmark subjects or variants;
- changing React build aliases, production settings, or compiler variants;
- changing the shell-to-sandbox protocol;
- changing statistics, noise-floor estimation, or result labels.

## Workflow

1. Read `METHODOLOGY.md` and the relevant architecture section.
2. Identify which measurement invariants the change touches.
3. Keep measurement code isolated from shell rendering and per-sample state updates.
4. Add a focused test or deterministic validation for every changed invariant.
5. Report limitations and sources of noise plainly.

Do not claim that a timing difference is meaningful when it is within the measured noise floor. Do not present heap deltas as a headline metric.
