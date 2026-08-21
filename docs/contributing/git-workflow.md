# Git workflow

## Branches

`main` is the only long-lived branch. Create a short-lived branch for one logical change:

```text
feat/compiler-variant
fix/warmup-samples
docs/noise-floor
chore/update-biome
```

Do not create `develop`, release branches, or personal long-lived branches.

## Atomic changes

Each pull request must be independently understandable, verifiable, and safe to revert. Split large work by behavior or package boundary before implementation.

Complete a large task as one pull request only when decomposition would break correctness or create unusable intermediate states. Subagents may help only when that indivisible task contains non-overlapping workstreams. The primary agent reviews and reconciles every result.

## Pull requests

Use a Conventional Commit title:

```text
feat(shell): add run configuration
fix(sandbox): discard warm-up commits
docs: clarify heap limitations
```

Intermediate branch commits may use informal messages. GitHub squash-merges the pull request, and the pull request title becomes the commit on `main`.

The pull request records intent, discussion, verification, and trade-offs. Create a separate issue only when planning or discussion should happen before code exists.

## Main ruleset

After the initial bootstrap is pushed, configure a GitHub ruleset for `main`:

- require a pull request;
- require squash merge;
- require linear history;
- require conversation resolution;
- block force pushes;
- block branch deletion;
- require zero approvals while there is one maintainer;
- add required checks when CI is introduced.

Enable automatic deletion of merged branches. Keep merge queue and required signed commits disabled until they solve a demonstrated problem.

Repository settings are external changes. Agents must obtain user approval before applying or changing them.
