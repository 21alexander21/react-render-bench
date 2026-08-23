import type { BenchmarkVariant, SubjectId } from "@react-render-bench/protocol";
import type { ElementType } from "react";
import { type LeafProps, MemoLeaf, PlainLeaf } from "./leaf.tsx";
import { LEAF_PROPS } from "./leaf-props.ts";

interface SubjectDefinition<Props> {
  readonly props: Readonly<Props>;
  readonly variants: Readonly<Record<BenchmarkVariant, ElementType<Props>>>;
}

const leafSubject: SubjectDefinition<LeafProps> = Object.freeze({
  props: LEAF_PROPS,
  variants: Object.freeze({
    memo: MemoLeaf,
    plain: PlainLeaf,
  }),
});

export const SUBJECT_REGISTRY: Readonly<Record<SubjectId, SubjectDefinition<LeafProps>>> =
  Object.freeze({
    leaf: leafSubject,
  });

export function getSubject(subjectId: SubjectId, variant: BenchmarkVariant) {
  const subject = SUBJECT_REGISTRY[subjectId];

  return Object.freeze({
    component: subject.variants[variant],
    props: subject.props,
  });
}
