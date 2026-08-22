import { describe, expect, it } from "vitest";

import { assertProfilerTiming } from "./profiling.tsx";

describe("profiling build verification", () => {
  it("accepts finite Profiler timing", () => {
    expect(() => {
      assertProfilerTiming({ actualDuration: 0, baseDuration: 0 });
    }).not.toThrow();
  });

  it("fails when Profiler timing is missing or invalid", () => {
    expect(() => {
      assertProfilerTiming(undefined);
    }).toThrow("React Profiler timing is unavailable in the sandbox build.");
    expect(() => {
      assertProfilerTiming({ actualDuration: Number.NaN, baseDuration: 0 });
    }).toThrow("React Profiler timing is unavailable in the sandbox build.");
  });
});
