import { PROTOCOL_VERSION } from "@react-render-bench/protocol";
import { describe, expect, it, vi } from "vitest";

import { createReadyMessageHandler, subscribeToSandboxReady } from "./readiness.ts";

const expectedOrigin = "http://localhost:3001";
const expectedSource = {};
const readyMessage = {
  metadata: {
    buildVariant: "compiler-off",
    profilingBuild: true,
    reactVersion: "19.2.8",
  },
  protocolVersion: PROTOCOL_VERSION,
  type: "ready",
} as const;

function createHandler(onReady = vi.fn()) {
  return {
    handler: createReadyMessageHandler({
      expectedBuildVariant: "compiler-off",
      expectedOrigin,
      getExpectedSource: () => expectedSource,
      onReady,
    }),
    onReady,
  };
}

describe("sandbox readiness", () => {
  it("accepts one valid ready message", () => {
    const { handler, onReady } = createHandler();
    const event = { data: readyMessage, origin: expectedOrigin, source: expectedSource };

    handler(event);
    handler(event);

    expect(onReady).toHaveBeenCalledOnce();
    expect(onReady).toHaveBeenCalledWith(readyMessage);
  });

  it("ignores messages from another origin or source", () => {
    const { handler, onReady } = createHandler();

    handler({ data: readyMessage, origin: "https://example.com", source: expectedSource });
    handler({ data: readyMessage, origin: expectedOrigin, source: {} });

    expect(onReady).not.toHaveBeenCalled();
  });

  it("ignores malformed and incompatible runtime payloads", () => {
    const { handler, onReady } = createHandler();

    for (const data of [
      { type: "ready" },
      { ...readyMessage, metadata: { ...readyMessage.metadata, profilingBuild: false } },
      {
        ...readyMessage,
        metadata: { ...readyMessage.metadata, buildVariant: "compiler-on" },
      },
      { ...readyMessage, type: "result" },
    ]) {
      handler({ data, origin: expectedOrigin, source: expectedSource });
    }

    expect(onReady).not.toHaveBeenCalled();
  });

  it("removes the same listener during cleanup", () => {
    const eventTarget = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    };
    const cleanup = subscribeToSandboxReady({
      eventTarget,
      expectedBuildVariant: "compiler-off",
      expectedOrigin,
      getExpectedSource: () => expectedSource,
      onReady: vi.fn(),
    });

    const listener = eventTarget.addEventListener.mock.calls[0]?.[1];
    cleanup();

    expect(eventTarget.addEventListener).toHaveBeenCalledOnce();
    expect(eventTarget.removeEventListener).toHaveBeenCalledWith("message", listener);
  });
});
