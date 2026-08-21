# Measurement methodology

## Principle

Trust in the number is the product. A result must describe its uncertainty and must not imply a meaningful difference when the observed delta is within the noise floor.

## Isolation

The user interface runs in the shell application. The measured subject runs in a same-origin iframe with its own React instance, scheduler, DOM, and performance timeline.

The iframe still shares the browser main thread with the shell. During a measurement run, the shell must perform no React renders. The sandbox sends one final result or one error and sends no progress messages.

## React build

The sandbox uses React 19 in production mode with the React DOM profiling build. A plain production React DOM build disables useful Profiler timing fields and is not valid for this benchmark.

Measured subjects are never wrapped in Strict Mode. Development builds are never used for reference measurements.

## Run lifecycle

1. Load a production sandbox bundle.
2. Verify the sandbox variant and profiling-build metadata.
3. Run warm-up commits and discard every warm-up sample.
4. Run the configured number of measured commits.
5. Append raw measurements to flat arrays without updating React state per sample.
6. Send one result message after the run.
7. Analyze and render results in the shell only after measurement has ended.

## Raw measurements

The sandbox records:

- Profiler actual duration per commit;
- Profiler base duration per commit;
- frame-to-frame duration for the complete browser-visible cost;
- long-task count and total duration;
- optional coarse heap observations when the browser exposes them.

Heap observations are affected by garbage collection. They are a diagnostic smell test, not a headline metric.

## Analysis

Results report distributions, including at least p50 and p95. Analysis also reports mean, variance, dropped-frame observations, and a noise-floor estimate from repeated runs.

A comparison inside the noise floor is labeled as inconclusive or within noise. It is not presented as a win or regression.

## Variant control

Compiler-on and compiler-off sandbox bundles use the same build pipeline. The React Compiler transform flag is the only intended difference.

Subjects in the first slice receive constant props so memoization behavior is deterministic. Later scenarios must document every controlled input.

## Environment

Reference measurements run client-side in a real browser on stable hardware. Codespaces and other virtualized development environments are suitable for building the project, not for reference measurements.

Every exported result must include the React version, build variant, profiling-build flag, user agent, run configuration, and start time.

## Changes to this document

Any change that weakens isolation, changes sampling, changes statistical interpretation, or changes result labels requires an explicit methodology review in the pull request.
