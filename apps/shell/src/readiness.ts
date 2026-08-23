import {
  type BuildVariant,
  type ReadyMessage,
  validateSandboxMessage,
} from "@react-render-bench/protocol";

interface MessageEventData {
  readonly data: unknown;
  readonly origin: string;
  readonly source: unknown;
}

interface MessageEventTarget {
  addEventListener(type: "message", listener: (event: MessageEvent<unknown>) => void): void;
  removeEventListener(type: "message", listener: (event: MessageEvent<unknown>) => void): void;
}

interface SandboxReadySubscription {
  readonly eventTarget: MessageEventTarget;
  readonly expectedBuildVariant: BuildVariant;
  readonly expectedOrigin: string;
  readonly getExpectedSource: () => unknown;
  readonly onReady: (message: ReadyMessage) => void;
}

interface ReadyMessageHandlerOptions extends Omit<SandboxReadySubscription, "eventTarget"> {}

export function createReadyMessageHandler({
  expectedBuildVariant,
  expectedOrigin,
  getExpectedSource,
  onReady,
}: ReadyMessageHandlerOptions): (event: MessageEventData) => void {
  let ready = false;

  return (event) => {
    if (ready || event.origin !== expectedOrigin || event.source !== getExpectedSource()) {
      return;
    }

    const result = validateSandboxMessage(event.data);

    if (
      !result.success ||
      result.value.type !== "ready" ||
      !result.value.metadata.profilingBuild ||
      result.value.metadata.buildVariant !== expectedBuildVariant
    ) {
      return;
    }

    ready = true;
    onReady(result.value);
  };
}

export function subscribeToSandboxReady(options: SandboxReadySubscription): () => void {
  const listener = createReadyMessageHandler(options);
  options.eventTarget.addEventListener("message", listener);

  return () => {
    options.eventTarget.removeEventListener("message", listener);
  };
}
