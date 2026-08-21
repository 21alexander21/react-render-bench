# Project Foundation Design

## Goal

Create a small, secure, AI-first foundation for `react-render-bench`. The repository must work well with different coding agents, with Claude Code and Codex as the first supported clients.

All committed instructions, configuration, documentation, and code comments must use plain English.

## Principles

- Keep one portable source of agent instructions.
- Keep agent-specific files small and free of duplicated policy.
- Use skills only when they add project-specific knowledge.
- Do not require Superpowers for routine work.
- Spend tokens and context carefully. Read only the files and ranges needed for the task.
- Treat benchmark validity as a product requirement.
- Never read, print, copy, or commit secrets.
- Keep local credentials and user-specific permissions outside Git.
- Pin executable tools and review third-party agent extensions before use.
- Keep changes atomic, controlled, and easy to review.

## Repository Layout

```text
.
|-- AGENTS.md
|-- CLAUDE.md
|-- README.md
|-- METHODOLOGY.md
|-- SECURITY.md
|-- CONTRIBUTING.md
|-- LICENSE
|-- .gitignore
|-- .editorconfig
|-- .env.example
|-- .npmrc
|-- .nvmrc
|-- biome.json
|-- package.json
|-- pnpm-lock.yaml
|-- pnpm-workspace.yaml
|-- tsconfig.base.json
|-- .mcp.json
|-- .codex/
|   `-- config.toml
|-- .claude/
|   `-- settings.json
|-- .agents/
|   |-- README.md
|   `-- skills/
|       `-- react-render-bench/
|           `-- SKILL.md
|-- docs/
|   |-- architecture.md
|   |-- decisions/
|   |   `-- README.md
|   |-- design/
|   |   `-- 2026-08-21-project-foundation.md
|   `-- ai/
|       |-- context-guide.md
|       |-- security.md
|       `-- setup.md
|-- apps/
|   |-- sandbox/
|   `-- shell/
`-- packages/
    `-- protocol/
```

The initial scaffold creates package boundaries and package manifests but does not implement the benchmark runner or user interface.

## Agent Instructions

`AGENTS.md` is the canonical instruction file. It describes the project, measurement invariants, package boundaries, standard commands, security rules, and the expected verification level.

`CLAUDE.md` is a small Claude Code adapter that imports or points to `AGENTS.md` and adds only Claude-specific behavior when required. Codex reads `AGENTS.md` directly.

Instructions must tell agents to:

- search with `rg` before opening broad parts of the repository;
- read targeted files and line ranges instead of dumping large files;
- avoid loading generated files and lockfiles unless the task requires them;
- avoid repeating context already present in the thread;
- use subagents only for independent work that benefits from parallel execution;
- use planning and workflow skills in proportion to task complexity;
- avoid applying Superpowers to every task;
- make small, reviewable changes;
- split large tasks into small changes with explicit boundaries;
- use subagents for a large indivisible task only after a practical decomposition has failed;
- keep each subagent scoped to a clear responsibility and reconcile its work before integration;
- run checks that match the risk of the change;
- never read secret values, even for diagnostics;
- ask for explicit approval before external writes, deployment, publishing, or destructive actions.

## Skills

The repository contains one project skill: `react-render-bench`. It holds non-obvious benchmark methodology and routing guidance that would otherwise consume the main instruction context.

The skill stays short and links to `METHODOLOGY.md` for details. It must not duplicate generic coding practices or force a large workflow onto simple tasks.

Third-party skills are optional. `docs/ai/setup.md` documents installation through the `skills` CLI. Every skill must be reviewed before installation, installed from a trusted and pinned source when possible, and updated intentionally. Telemetry is disabled in documented commands with `DISABLE_TELEMETRY=1`.

No broad skill pack is installed by default.

## MCP

The committed MCP configuration exposes only servers that add capabilities not already provided by the agent:

- Context7 for current library documentation;
- Playwright for browser-based verification;
- GitHub as an optional documented integration, not an enabled credential-bearing default.

Filesystem, shell, and Git MCP servers are excluded because Claude Code and Codex already provide these capabilities.

Executable MCP packages must use exact versions. Configurations must not contain tokens, inline credentials, shell interpolation that prints secrets, or automatic destructive actions. Local authorization state remains ignored.

The repository documents how to review the exact command and package source before enabling an MCP server. Remote servers must use HTTPS and client-managed authentication.

## Committed and Local Configuration

Committed files contain portable, non-secret defaults:

- `AGENTS.md` and `CLAUDE.md`;
- `.claude/settings.json` with safe deny rules and no credentials;
- `.codex/config.toml` with project-scoped safe defaults;
- `.mcp.json` with credential-free, pinned server declarations;
- `.env.example` with names and safe placeholders only;
- Biome, TypeScript, pnpm, workspace, and editor configuration;
- project skills and documentation.

Ignored local files contain user-specific or sensitive state:

- `.env` and environment variants, except `.env.example`;
- private keys, certificates, tokens, credential stores, and auth caches;
- Claude local settings and permission overrides;
- Codex local overrides and state;
- local MCP overrides and OAuth state;
- benchmark output, coverage, build output, caches, and logs.

Agents may check whether a secret file exists and may inspect its filename. They must not open or print its contents.

## Toolchain

- pnpm workspaces manage the monorepo.
- TypeScript 7 is pinned to an exact stable version and runs through `tsc`.
- All TypeScript projects extend `tsconfig.base.json`.
- The base configuration enables the strictest practical compiler checks, including strict null checks, exact optional properties, unchecked indexed access checks, override checks, and safe module syntax.
- Biome replaces ESLint and Prettier.
- The root Biome configuration uses all stable lint rules as its baseline.
- Rules that conflict with React, generated code, or benchmark mechanics are disabled only with a written reason.
- Nursery rules are enabled individually after review, not as an unstable blanket preset.
- Biome organizes imports and enforces formatting in CI.
- Package boundaries are enforced with package exports, TypeScript project references where supported, and explicit dependency declarations. A package must not import another package through its internal source path.

## Git Workflow

Use GitHub Flow with `main` as the only long-lived branch. Work happens in short-lived branches named with a change type and a short subject, such as `feat/compiler-variant` or `fix/warmup-samples`.

Every change after the initial repository bootstrap goes through a pull request. A pull request represents one logical change and is merged with squash merge. The pull request title follows Conventional Commits and becomes the commit on `main`. Intermediate branch commits may be informal because they are not preserved on `main`.

The repository keeps a linear history. Pull requests preserve the detailed record: intent, review discussion, verification, and trade-offs. Issues are optional for small changes. Architecture Decision Records are used only for decisions that need durable context.

Large tasks must be decomposed into small, independently reviewable changes before implementation. A large task may be completed as one unit with subagents only when it cannot be decomposed without breaking its correctness or producing unusable intermediate states. Subagents must have narrow scopes, must not edit overlapping files without coordination, and their output must be reviewed and integrated by the primary agent.

The `main` ruleset will require pull requests, squash merge, linear history, and resolved conversations. It will block force pushes and deletion. It starts with zero required approvals for a solo maintainer. Required checks are added when CI is introduced. Merge queue and required signed commits remain disabled until they solve a demonstrated need.

## Versioning and Releases

Use one SemVer version for the complete application, starting at `0.1.0`. Workspace packages remain private and do not receive independent versions.

Conventional Commit types on squash commits drive version changes:

- `fix` produces a patch release;
- `feat` produces a minor release;
- a breaking change before `1.0.0` produces a minor release;
- `1.0.0` marks a stable methodology, protocol, and result format.

Release Please is the selected release automation. Its configuration and manifest are committed now, but its GitHub Actions workflow is deferred until repository workflows are enabled. Later, merging the release pull request will update the changelog, create a `vX.Y.Z` tag, and create a GitHub Release.

The repository does not maintain changelog entries by hand. Pull request titles and descriptions must be clear enough to produce useful release notes.

## GitHub Automation and Tools

Dependabot is the initial dependency automation because it is native to GitHub and sufficient for this monorepo. Minor and patch updates are grouped weekly, major updates remain separate, security updates are enabled, and automatic merge is disabled until CI exists. Renovate is deferred until the project needs custom managers or more complex coordinated updates.

The repository includes pull request and issue templates. `CODEOWNERS` is deferred while there is one maintainer. CI, deployment, merge queue, and automatic releases are separate later changes.

Agents use GitHub tools with a read-first policy. Prefer `gh` for reproducible repository operations and a GitHub MCP server for discovery and structured reading. Before push, pull request creation, review submission, merge, release, or repository-setting changes, obtain explicit user authorization. Never pass tokens on the command line or inspect credential storage.

## Verification

The initial scaffold must pass:

```text
pnpm install --frozen-lockfile
pnpm format:check
pnpm lint
pnpm typecheck
pnpm check
```

Configuration files must parse successfully. The project skill must pass the available skill validator. The Git status must show only the intended uncommitted scaffold because this task does not include a commit.

## Deferred Work

- React shell implementation;
- profiling sandbox implementation;
- benchmark subjects and runner;
- statistics and charts;
- deployment configuration;
- CI workflows beyond the local command contract;
- GitHub repository creation or remote configuration.
