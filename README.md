# React Render Bench

React Render Bench is an experimental web application for controlled React rendering micro-benchmarks. It compares variants such as plain components, `React.memo`, and React Compiler builds while reporting distributions and an explicit noise floor.

The project is in its foundation stage. The workspace and methodology are present, but the benchmark runner and user interface are not implemented yet.

## Why

Micro-benchmarks are easy to distort. This project treats trust in the result as the product: production builds, isolated execution, discarded warm-up samples, raw distributions, and clear statements when a difference is within noise.

## Workspace

- `apps/shell`: configuration, orchestration, analysis, and result presentation.
- `apps/sandbox`: isolated React runtime, subjects, runner, and raw samples.
- `packages/protocol`: typed messages shared by the shell and sandbox.

## Requirements

- Node.js 24 or newer
- Corepack

## Setup

```bash
corepack pnpm install --frozen-lockfile
corepack pnpm check
```

Read `METHODOLOGY.md` before changing measurement behavior. Read `CONTRIBUTING.md` before opening a pull request.

See `ROADMAP.md` for planned milestones and `docs/plans/README.md` for task-planning conventions.

## Status

The initial target is one deployed plain-versus-memo comparison with p50, p95, and a measured noise floor.

## License

MIT
