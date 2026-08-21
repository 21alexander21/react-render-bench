# Architecture

## Shell

`apps/shell` owns the user interface, run configuration, sandbox selection, orchestration, result analysis, and charts. It sends one run request and remains idle until the sandbox returns a result or error.

The shell must not render progress during measurement because the iframe shares the browser main thread.

## Sandbox

`apps/sandbox` runs inside an iframe with a separate React instance and DOM. It owns the subject registry, production profiling build, warm-up phase, measured phase, and raw sample arrays.

The sandbox has minimal dependencies and no presentation responsibility. It flushes samples once at the end of a run.

Compiler-on and compiler-off outputs are separate bundles with one build-flag difference.

## Protocol

`packages/protocol` is the single typed source of truth for shell-to-sandbox messages, run configuration, metadata, raw results, and errors.

Both applications depend on public protocol exports. The protocol depends on neither application.

## Data flow

```text
user configures run
  -> shell sends typed run message
  -> sandbox warms up
  -> sandbox records raw samples
  -> sandbox sends one result
  -> shell computes distributions and noise floor
  -> shell renders results
```

## Deferred boundaries

Statistics remain in the shell until their size or CPU cost justifies a worker or a shared analysis package. Subjects remain in the sandbox until reuse justifies a separate package. No task runner is added until workspace scripts become a demonstrated bottleneck.
