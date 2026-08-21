# Releases

## Version model

The repository has one SemVer version for the complete application. Internal workspace packages are private and do not have independent release lines.

The initial version is `0.1.0`:

- `fix` produces a patch release;
- `feat` produces a minor release;
- a breaking change before `1.0.0` produces a minor release;
- `1.0.0` means the methodology, protocol, and result format are stable.

## Release Please

Release Please reads Conventional Commit squash commits on `main` and maintains one release pull request. Merging that pull request will eventually:

1. update `CHANGELOG.md` and version files;
2. create a `vX.Y.Z` tag;
3. create a GitHub Release.

The configuration and version manifest are committed from the start. The GitHub Actions workflow is added later with CI and release automation. Until then, do not maintain a changelog manually and do not create automated releases.

Release creation is an external mutation and always requires explicit user approval.
