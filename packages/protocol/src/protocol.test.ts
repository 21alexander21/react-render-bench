import { describe, expect, it } from "vitest";

import {
  MAX_COMMIT_COUNT,
  PROTOCOL_VERSION,
  validateRawResult,
  validateRunConfig,
  validateSandboxMessage,
  validateShellMessage,
} from "./index.ts";

const runId = "018f2f4a-5b6c-7d8e-9abc-0123456789ab";

const validConfig = {
  measuredCommitCount: 2,
  subjectId: "leaf",
  variant: "plain",
  warmupCommitCount: 1,
};

const validResult = {
  completedAt: "2026-08-22T12:01:00.000Z",
  config: validConfig,
  metadata: {
    buildVariant: "compiler-off",
    profilingBuild: true,
    reactVersion: "19.2.8",
    startedAt: "2026-08-22T12:00:00.000Z",
    userAgent: "Test browser",
  },
  runId,
  samples: {
    actualDurationMs: [1.25, 1.5],
    baseDurationMs: [2, 2.1],
    frameDurationMs: [16.6, 16.7],
    longTaskCount: 0,
    longTaskTotalDurationMs: 0,
  },
};

describe("shell message validation", () => {
  it("accepts a valid run message", () => {
    const result = validateShellMessage({
      config: validConfig,
      protocolVersion: PROTOCOL_VERSION,
      runId,
      type: "run",
    });

    expect(result.success).toBe(true);
  });

  it("rejects unknown message types and malformed identifiers", () => {
    expect(validateShellMessage({ type: "start" }).success).toBe(false);
    expect(
      validateShellMessage({
        config: validConfig,
        protocolVersion: PROTOCOL_VERSION,
        runId: "not-a-uuid",
        type: "run",
      }).success,
    ).toBe(false);
  });
});

describe("run configuration validation", () => {
  it("accepts boundary commit counts", () => {
    expect(
      validateRunConfig({
        ...validConfig,
        measuredCommitCount: MAX_COMMIT_COUNT,
        warmupCommitCount: 0,
      }).success,
    ).toBe(true);
  });

  it("rejects invalid numeric limits", () => {
    for (const measuredCommitCount of [0, -1, 1.5, Number.POSITIVE_INFINITY]) {
      expect(validateRunConfig({ ...validConfig, measuredCommitCount }).success).toBe(false);
    }

    expect(
      validateRunConfig({ ...validConfig, measuredCommitCount: MAX_COMMIT_COUNT + 1 }).success,
    ).toBe(false);
  });
});

describe("sandbox message validation", () => {
  it("accepts ready, result, and error messages", () => {
    expect(
      validateSandboxMessage({
        metadata: {
          buildVariant: "compiler-off",
          profilingBuild: true,
          reactVersion: "19.2.8",
        },
        protocolVersion: PROTOCOL_VERSION,
        type: "ready",
      }).success,
    ).toBe(true);
    expect(
      validateSandboxMessage({
        protocolVersion: PROTOCOL_VERSION,
        result: validResult,
        type: "result",
      }).success,
    ).toBe(true);
    expect(
      validateSandboxMessage({
        code: "run-failed",
        message: "The subject failed.",
        protocolVersion: PROTOCOL_VERSION,
        runId,
        type: "error",
      }).success,
    ).toBe(true);
  });
});

describe("raw result validation", () => {
  it("accepts valid flat sample arrays", () => {
    expect(validateRawResult(validResult).success).toBe(true);
  });

  it("rejects non-finite, negative, mismatched, and incomplete samples", () => {
    const invalidSampleSets = [
      { ...validResult.samples, actualDurationMs: [Number.NaN, 1] },
      { ...validResult.samples, baseDurationMs: [-1, 2] },
      { ...validResult.samples, frameDurationMs: [16.6] },
      {
        actualDurationMs: [1],
        baseDurationMs: [2],
        frameDurationMs: [16.6],
        longTaskCount: 0,
        longTaskTotalDurationMs: 0,
      },
    ];

    for (const samples of invalidSampleSets) {
      expect(validateRawResult({ ...validResult, samples }).success).toBe(false);
    }
  });
});
