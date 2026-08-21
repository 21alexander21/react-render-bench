# Agent setup

## Shared instructions

`AGENTS.md` is the canonical policy. Codex reads it directly. Claude Code uses the small `CLAUDE.md` adapter.

Keep personal settings in ignored local files:

- `.claude/settings.local.json`
- `.codex/config.local.toml`
- `.mcp.local.json`

Do not put tokens or credentials in project files.

## Skills

The project skill lives at `.agents/skills/react-render-bench/SKILL.md`.

Before installing a third-party skill, inspect its repository and every executable resource. Install only the needed skill, not an entire pack by default. Disable skills CLI telemetry for project operations:

```bash
DISABLE_TELEMETRY=1 npx --yes skills@<reviewed-version> add <owner>/<repository> --skill <skill-name>
```

Replace every angle-bracket value after reviewing the exact package version, source repository, skill contents, and install destination. Do not use `@latest` in repository automation.

## MCP

The committed MCP configuration is credential-free. Review every command before enabling it in an agent client. GitHub access is optional and must use the client's local OAuth or `gh auth` session.

Do not copy authentication tokens into `.mcp.json`, shell history, issue bodies, or pull requests.

The default project servers are:

- Context7 for current library documentation;
- Playwright MCP for browser verification.

Both commands use exact package versions. They still execute third-party code, so review package provenance and changes before updating them.

GitHub MCP is not enabled in committed configuration. Claude and Codex can use the locally authenticated GitHub connector when available. The `gh` CLI is the preferred fallback for reproducible GitHub operations.
