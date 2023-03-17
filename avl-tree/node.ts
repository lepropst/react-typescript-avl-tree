export class Node<K, V> {
  public left: Node<K, V> | null = null;
  public right: Node<K, V> | null = null;
  public height: number | null = null;

  constructor(public key: K, public value: V | undefined) {}
  public rotateRight(): Node<K, V> {
    //     b                           a
    //    / \                         / \
    //   a   e -> b.rotateRight() -> c   b
    //  / \                             / \
    // c   d                           d   e
    const tmp = <Node<K, V>>this.left;
    this.left = tmp.right;
    tmp.right = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    tmp.height = Math.max(tmp.leftHeight, this.height) + 1;
    return tmp;
  }

  /**
   * Performs a left rotate on this node.
   * @return The root of the sub-tree; the node where this node used to be.
   * @throws If Node.right is null.
   */
  public rotateLeft(): Node<K, V> {
    //   a                              b
    //  / \                            / \
    // c   b   -> a.rotateLeft() ->   a   e
    //    / \                        / \
    //   d   e                      c   d
    const other = <Node<K, V>>this.right;
    this.right = other.left;
    other.left = this;
    this.height = Math.max(this.leftHeight, this.rightHeight) + 1;
    other.height = Math.max(other.rightHeight, this.height) + 1;
    return other;
  }

  /**
   * Convenience function to get the height of the left child of the node,
   * returning -1 if the node is null.
   * @return The height of the left child, or -1 if it doesn't exist.
   */
  public get leftHeight(): number {
    if (this.left === null) {
      return -1;
    }
    return this.left.height || 0;
  }

  /**
   * Convenience function to get the height of the right child of the node,
   * returning -1 if the node is null.
   * @return The height of the right child, or -1 if it doesn't exist.
   */
  public get rightHeight(): number {
    if (this.right === null) {
      return -1;
    }
    return this.right.height || 0;
  }
}
