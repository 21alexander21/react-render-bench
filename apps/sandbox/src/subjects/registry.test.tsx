import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LEAF_PROPS } from "./leaf-props.ts";
import { getSubject, SUBJECT_REGISTRY } from "./registry.ts";

describe("subject registry", () => {
  it("exposes the leaf subject and both benchmark variants", () => {
    expect(Object.keys(SUBJECT_REGISTRY)).toEqual(["leaf"]);
    expect(Object.keys(SUBJECT_REGISTRY.leaf.variants).sort()).toEqual(["memo", "plain"]);
  });

  it("renders equivalent output for the plain and memo variants", () => {
    const plain = getSubject("leaf", "plain");
    const memo = getSubject("leaf", "memo");

    expect(renderToStaticMarkup(createElement(plain.component, plain.props))).toBe(
      renderToStaticMarkup(createElement(memo.component, memo.props)),
    );
  });

  it("reuses immutable props for every lookup", () => {
    const plain = getSubject("leaf", "plain");
    const memo = getSubject("leaf", "memo");

    expect(plain.props).toBe(LEAF_PROPS);
    expect(memo.props).toBe(LEAF_PROPS);
    expect(Object.isFrozen(plain.props)).toBe(true);
  });
});
