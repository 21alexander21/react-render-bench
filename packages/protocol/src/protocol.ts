import {
  array,
  type BaseIssue,
  type BaseSchema,
  boolean,
  check,
  finite,
  type InferOutput,
  integer,
  isoTimestamp,
  literal,
  maxLength,
  maxValue,
  minValue,
  nonEmpty,
  number,
  optional,
  picklist,
  pipe,
  regex,
  safeParse,
  strictObject,
  string,
  variant,
} from "valibot";

export const PROTOCOL_VERSION = 1;
export const MAX_COMMIT_COUNT = 100_000;
export const BENCHMARK_VARIANTS = ["plain", "memo"] as const;
export const BUILD_VARIANTS = ["compiler-off", "compiler-on"] as const;
const MAX_VERSION_LENGTH = 64;
const MAX_TEXT_LENGTH = 1024;

const runIdSchema = pipe(
  string(),
  regex(
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu,
    "Run identifier must be a UUID.",
  ),
);
const commitCountSchema = pipe(
  number(),
  finite(),
  integer(),
  minValue(0),
  maxValue(MAX_COMMIT_COUNT),
);
const sampleCountSchema = pipe(commitCountSchema, minValue(1));
const durationSchema = pipe(number(), finite(), minValue(0));
const durationSamplesSchema = pipe(array(durationSchema), maxLength(MAX_COMMIT_COUNT));

export const runConfigSchema = strictObject({
  measuredCommitCount: sampleCountSchema,
  subjectId: literal("leaf"),
  variant: picklist(BENCHMARK_VARIANTS),
  warmupCommitCount: commitCountSchema,
});

const sandboxMetadataSchema = strictObject({
  buildVariant: picklist(BUILD_VARIANTS),
  profilingBuild: boolean(),
  reactVersion: pipe(string(), nonEmpty(), maxLength(MAX_VERSION_LENGTH)),
});

const rawSamplesSchema = pipe(
  strictObject({
    actualDurationMs: durationSamplesSchema,
    baseDurationMs: durationSamplesSchema,
    frameDurationMs: durationSamplesSchema,
    longTaskCount: commitCountSchema,
    longTaskTotalDurationMs: durationSchema,
  }),
  check(
    ({ actualDurationMs, baseDurationMs, frameDurationMs }) =>
      actualDurationMs.length === baseDurationMs.length &&
      actualDurationMs.length === frameDurationMs.length,
    "Raw sample arrays must have equal lengths.",
  ),
);

export const rawResultSchema = pipe(
  strictObject({
    completedAt: pipe(string(), isoTimestamp()),
    config: runConfigSchema,
    metadata: strictObject({
      ...sandboxMetadataSchema.entries,
      startedAt: pipe(string(), isoTimestamp()),
      userAgent: pipe(string(), nonEmpty(), maxLength(MAX_TEXT_LENGTH)),
    }),
    runId: runIdSchema,
    samples: rawSamplesSchema,
  }),
  check(
    ({ config, samples }) => samples.actualDurationMs.length === config.measuredCommitCount,
    "Raw sample count must match the run configuration.",
  ),
);

const runMessageSchema = strictObject({
  config: runConfigSchema,
  protocolVersion: literal(PROTOCOL_VERSION),
  runId: runIdSchema,
  type: literal("run"),
});

const readyMessageSchema = strictObject({
  metadata: sandboxMetadataSchema,
  protocolVersion: literal(PROTOCOL_VERSION),
  type: literal("ready"),
});

const resultMessageSchema = strictObject({
  protocolVersion: literal(PROTOCOL_VERSION),
  result: rawResultSchema,
  type: literal("result"),
});

const protocolErrorCodeSchema = picklist([
  "invalid-message",
  "run-failed",
  "unsupported-config",
] as const);

const protocolErrorSchema = strictObject({
  code: protocolErrorCodeSchema,
  message: pipe(string(), nonEmpty(), maxLength(MAX_TEXT_LENGTH)),
  protocolVersion: literal(PROTOCOL_VERSION),
  runId: optional(runIdSchema),
  type: literal("error"),
});

export const shellMessageSchema = variant("type", [runMessageSchema]);
export const sandboxMessageSchema = variant("type", [
  readyMessageSchema,
  resultMessageSchema,
  protocolErrorSchema,
]);

export type BenchmarkVariant = InferOutput<typeof runConfigSchema>["variant"];
export type BuildVariant = InferOutput<typeof sandboxMetadataSchema>["buildVariant"];
export type RunConfig = InferOutput<typeof runConfigSchema>;
export type SubjectId = RunConfig["subjectId"];
export type SandboxMetadata = InferOutput<typeof sandboxMetadataSchema>;
export type RawSamples = InferOutput<typeof rawSamplesSchema>;
export type RawResult = InferOutput<typeof rawResultSchema>;
export type RunMessage = InferOutput<typeof runMessageSchema>;
export type ReadyMessage = InferOutput<typeof readyMessageSchema>;
export type ResultMessage = InferOutput<typeof resultMessageSchema>;
export type ProtocolError = InferOutput<typeof protocolErrorSchema>;
export type ProtocolErrorCode = InferOutput<typeof protocolErrorCodeSchema>;
export type ShellMessage = InferOutput<typeof shellMessageSchema>;
export type SandboxMessage = InferOutput<typeof sandboxMessageSchema>;

export interface ValidationIssue {
  readonly message: string;
  readonly path: string;
}

export type ValidationResult<T> =
  | { readonly success: true; readonly value: T }
  | { readonly issues: readonly ValidationIssue[]; readonly success: false };

export function createReadyMessage(metadata: SandboxMetadata): ReadyMessage {
  return {
    metadata,
    protocolVersion: PROTOCOL_VERSION,
    type: "ready",
  };
}

function validate<Schema extends BaseSchema<unknown, unknown, BaseIssue<unknown>>>(
  schema: Schema,
  input: unknown,
): ValidationResult<InferOutput<Schema>> {
  const result = safeParse(schema, input);

  if (result.success) {
    return { success: true, value: result.output };
  }

  return {
    issues: result.issues.map((issue) => ({
      message: issue.message,
      path: issue.path?.map((item) => String(item.key)).join(".") ?? "",
    })),
    success: false,
  };
}

export function validateRunConfig(input: unknown): ValidationResult<RunConfig> {
  return validate(runConfigSchema, input);
}

export function validateRawResult(input: unknown): ValidationResult<RawResult> {
  return validate(rawResultSchema, input);
}

export function validateShellMessage(input: unknown): ValidationResult<ShellMessage> {
  return validate(shellMessageSchema, input);
}

export function validateSandboxMessage(input: unknown): ValidationResult<SandboxMessage> {
  return validate(sandboxMessageSchema, input);
}
