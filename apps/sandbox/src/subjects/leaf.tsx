import { memo } from "react";

export interface LeafProps {
  readonly label: string;
  readonly value: number;
}

export function PlainLeaf({ label, value }: LeafProps) {
  return (
    <span data-subject="leaf">
      {label}: {value}
    </span>
  );
}

export const MemoLeaf = memo(PlainLeaf);
MemoLeaf.displayName = "MemoLeaf";
