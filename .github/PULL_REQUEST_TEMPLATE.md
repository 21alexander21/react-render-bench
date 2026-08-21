## Purpose

<!-- Explain one logical change and why it is needed. -->

## Scope

- [ ] The change is atomic and independently reviewable.
- [ ] Large work was split into smaller changes where practical.
- [ ] Unrelated refactoring is excluded.

## Measurement impact

<!-- List affected methodology constraints, or write "None". -->

## Verification

<!-- List exact commands and manual checks with their results. -->

- [ ] `corepack pnpm format:check`
- [ ] `corepack pnpm lint`
- [ ] `corepack pnpm typecheck`
- [ ] `corepack pnpm check`

## Safety

- [ ] No secrets, credentials, local agent settings, or sensitive output are included.
- [ ] New executable dependencies, skills, MCP servers, or actions were reviewed and pinned.
- [ ] User-visible limitations and remaining uncertainty are documented.
