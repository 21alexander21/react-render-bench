# AI development security

## Secrets

Agents must not read secret values. Sensitive files include environment files, private keys, certificates, credential stores, authentication caches, OAuth state, and local agent configuration.

An agent may check whether a sensitive file exists and may inspect its filename. It must not open, print, summarize, copy, edit, or commit the contents.

Use `.env.example` for public variable names and safe examples. Keep real values in local environment variables or an approved secret manager.

## Third-party tools

Treat skills, MCP servers, package lifecycle scripts, and GitHub Actions as executable supply-chain dependencies.

- Review the source, requested permissions, command, arguments, and network access.
- Prefer official or well-maintained sources.
- Pin exact package versions and immutable action revisions where possible.
- Do not enable an MCP server only because it is popular.
- Do not add filesystem, shell, or Git MCP servers when the agent already has those capabilities.
- Keep remote authentication in the client credential store, never in committed files.

## External changes

Require explicit user approval before pushing, opening or merging pull requests, publishing releases, deploying, changing repository settings, or sending data to a new external service.
