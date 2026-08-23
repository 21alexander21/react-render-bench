import { PROTOCOL_VERSION } from "@react-render-bench/protocol";
import { describe, expect, it, vi } from "vitest";

import { announceSandboxReady, getParentOrigin } from "./readiness.ts";

describe("sandbox ready announcement", () => {
  it("sends one typed ready message to the configured parent origin", () => {
    const target = { postMessage: vi.fn() };
    const metadata = {
      buildVariant: "compiler-off",
      profilingBuild: true,
      reactVersion: "19.2.8",
    } as const;

    announceSandboxReady(target, "http://localhost:3000", metadata);

    expect(target.postMessage).toHaveBeenCalledOnce();
    expect(target.postMessage).toHaveBeenCalledWith(
      {
        metadata,
        protocolVersion: PROTOCOL_VERSION,
        type: "ready",
      },
      "http://localhost:3000",
    );
  });

  it("reads an exact parent origin from the sandbox URL", () => {
    expect(
      getParentOrigin("http://localhost:3001/?parentOrigin=http%3A%2F%2Flocalhost%3A3000"),
    ).toBe("http://localhost:3000");
  });

  it("rejects a missing parent origin and origins containing extra URL data", () => {
    expect(() => getParentOrigin("http://localhost:3001/")).toThrow(
      "Sandbox parent origin is missing or invalid.",
    );
    expect(() =>
      getParentOrigin("http://localhost:3001/?parentOrigin=http%3A%2F%2Flocalhost%3A3000%2Fpath"),
    ).toThrow("Sandbox parent origin is missing or invalid.");
    expect(() => getParentOrigin("http://localhost:3001/?parentOrigin=invalid")).toThrow(
      "Sandbox parent origin is missing or invalid.",
    );
  });
});
