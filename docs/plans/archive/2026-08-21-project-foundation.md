# Project Foundation Implementation Plan

**Status:** Completed on 2026-08-21 in commit `ca2b103`.

**Goal:** Create a secure, portable, AI-first monorepo foundation for `react-render-bench` without implementing the benchmark application.

**Architecture:** Keep shared agent policy in `AGENTS.md`, use small Claude and Codex adapters, and keep project-specific benchmark knowledge in one narrow skill. Use a pnpm workspace with strict TypeScript 7 and Biome, plus lightweight GitHub Flow and release metadata that do not require CI yet.

**Tech stack:** Node.js 24, pnpm 11.22.0, TypeScript 7.0.2, Biome 2.5.9, GitHub Rulesets, Dependabot, Release Please, MCP, Agent Skills.

**Spec:** `docs/design/2026-08-21-project-foundation.md`

## Global constraints

- Write all repository instructions, configuration documentation, and comments in plain English.
- Do not read or commit secrets.
- Keep executable dependencies pinned to exact versions.
- Keep changes atomic and reviewable.
- Do not use subagents because this foundation can be decomposed safely.
- Do not commit any changes as part of this execution.
- Defer CI, deployment, and application implementation.

## Task 1: Workspace and strict toolchain

**Files:** `package.json`, `pnpm-workspace.yaml`, `tsconfig.base.json`, `biome.json`, `.npmrc`, `.nvmrc`, `.editorconfig`, `.gitignore`, `.env.example`, package manifests and placeholder source files under `apps/` and `packages/`.

- [x] Create the pnpm workspace with private packages for `shell`, `sandbox`, and `protocol`.
- [x] Pin pnpm 11.22.0, TypeScript 7.0.2, and Biome 2.5.9.
- [x] Configure strict TypeScript checks and safe ESM module behavior.
- [x] Configure Biome with all stable rules, import organization, strict formatting, and narrow documented exceptions required by configuration files.
- [x] Add root scripts for format, lint, typecheck, and the combined check.
- [x] Install dependencies and create `pnpm-lock.yaml`.
- [x] Run `pnpm check` and fix configuration errors.

## Task 2: Portable agent policy and project skill

**Files:** `AGENTS.md`, `CLAUDE.md`, `.agents/README.md`, `.agents/skills/react-render-bench/SKILL.md`, `docs/ai/context-guide.md`, `docs/ai/security.md`, `docs/ai/setup.md`.

- [x] Write canonical agent rules with measurement invariants, atomic-change policy, context limits, permissions, verification, and secret handling.
- [x] Add a minimal Claude adapter that imports the canonical policy.
- [x] Create one narrow benchmark-methodology skill with progressive disclosure to `METHODOLOGY.md`.
- [x] Document trusted skill review and `skills` CLI usage with telemetry disabled.
- [x] Validate the skill with the bundled skill validator.

## Task 3: Safe Claude, Codex, and MCP configuration

**Files:** `.claude/settings.json`, `.codex/config.toml`, `.mcp.json`, local-only patterns in `.gitignore`, and `docs/ai/setup.md`.

- [x] Add safe, credential-free project settings for Claude and Codex.
- [x] Configure only pinned Context7 and Playwright MCP declarations that can be reviewed before execution.
- [x] Document GitHub as an optional locally authorized integration rather than committing credentials.
- [x] Ignore local permission overrides, OAuth state, credentials, and agent caches.
- [x] Parse JSON and TOML configuration files locally.

## Task 4: Project and methodology documentation

**Files:** `README.md`, `METHODOLOGY.md`, `SECURITY.md`, `CONTRIBUTING.md`, `LICENSE`, `docs/architecture.md`, `docs/decisions/README.md`.

- [x] Describe the project purpose and MVP without claiming unimplemented functionality.
- [x] Record all non-negotiable measurement constraints from the approved brief.
- [x] Document vulnerability reporting and secret-handling expectations.
- [x] Document local setup, atomic pull requests, Conventional PR titles, and verification commands.
- [x] Document architecture boundaries and the lightweight ADR policy.

## Task 5: GitHub Flow and repository automation metadata

**Files:** `.github/dependabot.yml`, `.github/ISSUE_TEMPLATE/bug.yml`, `.github/ISSUE_TEMPLATE/feature.yml`, `.github/ISSUE_TEMPLATE/config.yml`, `.github/PULL_REQUEST_TEMPLATE.md`, `docs/contributing/git-workflow.md`, `docs/contributing/releases.md`, `release-please-config.json`, `.release-please-manifest.json`.

- [x] Configure weekly grouped pnpm minor and patch dependency updates, separate major updates, and GitHub Actions updates.
- [x] Add concise issue forms and an atomic-change pull request template.
- [x] Document GitHub Flow, squash merging, branch names, and the future `main` ruleset.
- [x] Configure a single Release Please component at version `0.1.0` without adding a workflow.
- [x] Document SemVer and release PR behavior.

## Task 6: Full verification

**Files:** all created files.

- [x] Run `pnpm format:check`.
- [x] Run `pnpm lint`.
- [x] Run `pnpm typecheck`.
- [x] Run `pnpm check`.
- [x] Validate JSON, JSONC, YAML, and TOML files with available local parsers.
- [x] Scan tracked and untracked filenames for likely secrets without reading secret contents.
- [x] Review `git diff --check`, `git status --short`, and the final file tree.
- [x] Report the uncommitted result and any GitHub settings that must be applied after the remote repository exists.
