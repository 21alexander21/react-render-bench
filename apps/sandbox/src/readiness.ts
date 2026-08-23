import {
  createReadyMessage,
  type ReadyMessage,
  type SandboxMetadata,
} from "@react-render-bench/protocol";

interface MessageTarget {
  postMessage(message: ReadyMessage, targetOrigin: string): void;
}

export function getParentOrigin(locationUrl: string): string {
  const parentOrigin = new URL(locationUrl).searchParams.get("parentOrigin");

  if (parentOrigin === null || !URL.canParse(parentOrigin)) {
    throw new Error("Sandbox parent origin is missing or invalid.");
  }

  const parsedParentOrigin = new URL(parentOrigin);

  if (
    parsedParentOrigin.origin !== parentOrigin ||
    (parsedParentOrigin.protocol !== "http:" && parsedParentOrigin.protocol !== "https:")
  ) {
    throw new Error("Sandbox parent origin is missing or invalid.");
  }

  return parentOrigin;
}

export function announceSandboxReady(
  target: MessageTarget,
  targetOrigin: string,
  metadata: SandboxMetadata,
): void {
  target.postMessage(createReadyMessage(metadata), targetOrigin);
}
