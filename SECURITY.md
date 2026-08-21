# Security policy

## Reporting a vulnerability

Do not open a public issue for a vulnerability that could expose credentials, execute untrusted code, or compromise users. Use GitHub private vulnerability reporting when it is enabled for the repository.

If private reporting is not available, contact the repository owner through a private channel listed on their GitHub profile. Do not include real secrets or unnecessary personal data in a report.

## Supported versions

The project is pre-release. Security fixes apply to the current `main` branch until the first public release policy is defined.

## Development rules

- Never commit credentials, tokens, private keys, certificates, or environment files.
- Do not read secret values during agent-assisted development.
- Review and pin executable dependencies, MCP servers, skills, and GitHub Actions.
- Keep browser automation and benchmark pages free of untrusted executable input.
- Report dependency vulnerabilities through GitHub security tooling.
