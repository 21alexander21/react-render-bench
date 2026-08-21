# Development roadmap

This roadmap describes outcomes and order, not fixed dates. GitHub Issues will hold implementation-sized work after the remote repository exists.

## Planning rules

- Keep roadmap items outcome-focused.
- Split milestone work into atomic issues that normally map to one pull request.
- Use a parent issue for a milestone-sized initiative and sub-issues for its deliverables.
- Record blocking relationships with issue dependencies.
- Detail only the current milestone and the next likely milestone.
- Do not create a GitHub Project until repository issues alone become hard to navigate.
- Keep temporary implementation plans under `docs/plans/active` and archive them when complete.

## M0 — Project foundation

Status: completed.

- Create workspace and package boundaries.
- Configure strict TypeScript 7 and Biome.
- Add portable agent instructions and project-specific benchmark guidance.
- Define security and secret-handling rules.
- Document GitHub Flow, versioning, and release metadata.
- Record the initial benchmark methodology.

## M1 — Trustworthy vertical slice

Outcome: run one controlled plain-versus-memo benchmark locally and return trustworthy raw samples.

1. Define protocol types and runtime message validation.
2. Configure the shell and sandbox Rsbuild applications.
3. Configure React 19 production profiling in the sandbox.
4. Add one deterministic `leaf` subject with plain and memo variants.
5. Implement the shell-to-sandbox readiness handshake.
6. Send one run request with a unique run identifier.
7. Run and discard warm-up commits.
8. Collect Profiler actual and base durations in flat arrays.
9. Collect frame-to-frame durations.
10. Send one final result without progress events.
11. Display run metadata and raw sample counts.
12. Add focused tests for measurement invariants.

## M2 — Honest analysis

Outcome: report useful distributions and state clearly when a comparison is within noise.

1. Implement and test percentile calculation.
2. Add mean and sample variance.
3. Add dropped-frame observations.
4. Run repeated benchmark pairs.
5. Design and document the first noise-floor estimator.
6. Add an explicit `within noise` conclusion.
7. Avoid false precision in labels and formatting.
8. Add statistical fixtures, edge cases, and limitation notes.

The noise-floor design requires methodology review before implementation.

## M3 — Subject and compiler matrix

Outcome: compare plain, memo, and compiler variants across controlled scenarios.

1. Add `wide` and `expensive` subjects.
2. Define a typed subject registry.
3. Add validated scenario parameters.
4. Build compiler-off and compiler-on sandboxes.
5. Keep the compiler transform flag as the only intended build difference.
6. Verify bundle configuration parity.
7. Select sandbox variants from the shell.
8. Run comparable variant pairs.
9. Record exact build metadata in every result.

## M4 — Results interface

Outcome: provide a minimal, accessible interface for configuration and interpretation.

1. Add a validated run configuration form.
2. Keep the shell idle and locked during measurement.
3. Add a results summary table.
4. Add a distribution visualization.
5. Present the noise floor and conclusion prominently.
6. Label heap observations as coarse and garbage-collection-confounded.
7. Add accessible empty, running, result, and error states.
8. Verify the complete flow and common viewports with Playwright.

## M5 — Reproducibility and reliability

Outcome: make individual results inspectable and portable without adding server-side history.

1. Export sanitized raw-result JSON.
2. Import and validate exported results.
3. Add environment and configuration fingerprints.
4. Detect profiling-build and sandbox-variant mismatches.
5. Handle aborted and timed-out runs.
6. Add browser capability reporting.
7. Add long-task observations.
8. Add optional coarse heap observations.
9. Document exact analysis algorithms and limitations.

Result persistence, accounts, and server-side sharing remain out of scope.

## M6 — CI and deployment

Outcome: verify every pull request and publish preview and production builds on Vercel.

1. Add GitHub Actions for install, Biome, typecheck, tests, and build.
2. Pin every action to an immutable commit revision.
3. Add required checks to the `main` ruleset.
4. Configure static Vercel deployment for the shell and sandbox assets.
5. Verify preview deployments.
6. Add production headers without enabling premature cross-origin isolation.
7. Enable the Release Please workflow.
8. Publish the first pre-1.0 GitHub Release.

## M7 — Public preview readiness

Outcome: make the repository understandable and reproducible for an external contributor.

1. Complete the README quickstart.
2. Add architecture and methodology diagrams.
3. Add current screenshots.
4. Add and validate the development container.
5. Add contribution examples.
6. Review licenses and dependency notices.
7. Verify setup from a clean clone.
8. Publish `v0.1.0`.

## Deferred ideas

- Persistent result history and sharing.
- A plugin system for custom subjects.
- Loading real application components as subjects.
- Cross-origin isolated sandbox and precise memory measurement.
- React 18 compatibility.
