import { useEffect, useRef, useState } from "react";

import { subscribeToSandboxReady } from "./readiness.ts";

const SANDBOX_ORIGIN = "http://localhost:3001";

export function Shell(): React.ReactNode {
  const sandboxFrame = useRef<HTMLIFrameElement>(null);
  const [sandboxReady, setSandboxReady] = useState(false);
  const [sandboxUrl, setSandboxUrl] = useState<string>();

  useEffect(() => {
    const unsubscribe = subscribeToSandboxReady({
      eventTarget: window,
      expectedBuildVariant: "compiler-off",
      expectedOrigin: SANDBOX_ORIGIN,
      getExpectedSource: () => sandboxFrame.current?.contentWindow,
      onReady: () => {
        setSandboxReady(true);
      },
    });

    const nextSandboxUrl = new URL(SANDBOX_ORIGIN);
    nextSandboxUrl.searchParams.set("parentOrigin", window.location.origin);
    setSandboxUrl(nextSandboxUrl.href);

    return unsubscribe;
  }, []);

  return (
    <main>
      <p className="eyebrow">React Render Bench</p>
      <h1>Shell</h1>
      <p>Sandbox status: {sandboxReady ? "ready" : "initializing"}</p>
      {sandboxUrl === undefined ? null : (
        <iframe ref={sandboxFrame} src={sandboxUrl} title="Benchmark sandbox" />
      )}
    </main>
  );
}
