export const BalanceState: { [key: string]: any } = {
  /** Right child's height is 2+ greater than left child's height */
  UNBALANCED_RIGHT: "UNBALANCED_RIGHT",
  /** Right child's height is 1 greater than left child's height */
  SLIGHTLY_UNBALANCED_RIGHT: "SLIGHTLY_UNBALANCED_RIGHT",
  /** Left and right children have the same height */
  BALANCED: "BALANCED",
  /** Left child's height is 1 greater than right child's height */
  SLIGHTLY_UNBALANCED_LEFT: "SLIGHTLY_UNBALANCED_LEFT",
  /** Left child's height is 2+ greater than right child's height */
  UNBALANCED_LEFT: "UNBALANCED_LEFT",
} as const;
