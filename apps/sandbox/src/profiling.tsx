import type { SandboxMetadata } from "@react-render-bench/protocol";
import { Profiler, type ProfilerOnRenderCallback, version } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";

const PROFILER_CHECK_ID = "profiling-build-check";

interface ProfilerTiming {
  readonly actualDuration: number;
  readonly baseDuration: number;
}

export function getVerifiedSandboxMetadata(): SandboxMetadata {
  verifyProfilerTiming();

  return {
    buildVariant: "compiler-off",
    profilingBuild: true,
    reactVersion: version,
  };
}

function verifyProfilerTiming(): void {
  const container = document.createElement("div");
  const root = createRoot(container);
  let timing: ProfilerTiming | undefined;

  const onRender: ProfilerOnRenderCallback = (...parameters) => {
    const actualDuration = parameters[2];
    const baseDuration = parameters[3];
    timing = { actualDuration, baseDuration };
  };

  flushSync(() => {
    root.render(
      // biome-ignore lint/performance/noJsxPropsBind: This verifier renders once before the sandbox starts.
      <Profiler id={PROFILER_CHECK_ID} onRender={onRender}>
        <span />
      </Profiler>,
    );
  });
  root.unmount();

  assertProfilerTiming(timing);
}

export function assertProfilerTiming(timing: ProfilerTiming | undefined): void {
  if (
    timing === undefined ||
    !Number.isFinite(timing.actualDuration) ||
    !Number.isFinite(timing.baseDuration)
  ) {
    throw new Error("React Profiler timing is unavailable in the sandbox build.");
  }
}
