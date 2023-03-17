import { BalanceState } from "./constants";
import { Node } from "./node";
const COUNT = [10];

export default class Tree<K, V> {
  private root: Node<K, V> | null = null;
  private _size: number = 0;
  private compare: (a: K, b: K) => number;
  constructor(compare?: (a: K, b: K) => number) {
    this.compare = compare ? compare : this._defaultCompare;
  }
  public getRoot() {
    return this.root;
  }
  private _defaultCompare(a: K, b: K): number {
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    return 0;
  }
  public insert(key: K, value?: V) {
    this.root = this._insert(key, value, this.root);
    this._size++;
  }
  private _insert(
    key: K,
    value: V | undefined,
    root: Node<K, V> | null
  ): Node<K, V> {
    if (root === null) {
      return new Node(key, value);
    }
    const comparison = this.compare(key, root.key);
    if (comparison < 0) {
      root.left = this._insert(key, value, root.left);
    } else if (comparison > 0) {
      root.right = this._insert(key, value, root.right);
    } else {
      this._size--;
      return root;
    }
    root.height = Math.max(root.leftHeight, root.rightHeight) + 1;
    const balanceState = this.getBalanceState(root);
    if (balanceState === BalanceState.UNBALANCED_LEFT) {
      // Left left case
      if (
        this.getBalanceState(<Node<K, V>>root.left) === BalanceState.BALANCED ||
        this.getBalanceState(<Node<K, V>>root.left) ===
          BalanceState.SLIGHTLY_UNBALANCED_LEFT
      ) {
        console.log("left left case");
        return root.rotateRight();
      }
      // Left right case
      console.log("Left right case");
      // this._getBalanceState(root.left) === BalanceState.SLIGHTLY_UNBALANCED_RIGHT
      root.left = (<Node<K, V>>root.left).rotateLeft();
      return root.rotateRight();
    }

    if (balanceState === BalanceState.UNBALANCED_RIGHT) {
      // Right right case
      if (
        this.getBalanceState(<Node<K, V>>root.right) ===
          BalanceState.BALANCED ||
        this.getBalanceState(<Node<K, V>>root.right) ===
          BalanceState.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        console.log("right right case");
        return root.rotateLeft();
      }
      // Right left case
      // this._getBalanceState(root.right) === BalanceState.SLIGHTLY_UNBALANCED_LEFT
      console.log("Right left case");
      root.right = (<Node<K, V>>root.right).rotateRight();
      return root.rotateLeft();
    }

    return root;
  }

  public get(key: K): V | undefined | null {
    if (this.root === null) {
      return null;
    }

    const result = this._get(key, this.root);
    if (result === null) {
      return null;
    }

    return result.value;
  }

  /**
   * Gets the value of a node within the tree with a specific key.
   * @param key The key being searched for.
   * @param root The root of the tree to search in.
   * @return The value of the node or null if it doesn't exist.
   */
  private _get(key: K, root: Node<K, V>): Node<K, V> | null {
    const result = this.compare(key, root.key);
    if (result === 0) {
      return root;
    }

    if (result < 0) {
      if (!root.left) {
        return null;
      }
      return this._get(key, root.left);
    }

    if (!root.right) {
      return null;
    }
    return this._get(key, root.right);
  }

  /**
   * Gets whether a node with a specific key is within the tree.
   * @param key The key being searched for.
   * @return Whether a node with the key exists.
   */
  public contains(key: K): boolean {
    if (this.root === null) {
      return false;
    }

    return !!this._get(key, this.root);
  }

  /**
   * @return The minimum key in the tree or null if there are no nodes.
   */
  public findMinimum(): K | null {
    if (this.root === null) {
      return null;
    }
    return this._minValueNode(this.root).key;
  }

  /**
   * Gets the maximum key in the tree or null if there are no nodes.
   */
  public findMaximum(): K | null {
    if (this.root === null) {
      return null;
    }
    return this._maxValueNode(this.root).key;
  }

  /**
   * Gets the size of the tree.
   */
  public get size(): number {
    return this._size;
  }

  /**
   * Gets whether the tree is empty.
   */
  public get isEmpty(): boolean {
    return this._size === 0;
  }

  /**
   * Gets the minimum value node, rooted in a particular node.
   * @param root The node to search.
   * @return The node with the minimum key in the tree.
   */
  private _minValueNode(root: Node<K, V>): Node<K, V> {
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current;
  }

  /**
   * Gets the maximum value node, rooted in a particular node.
   * @param root The node to search.
   * @return The node with the maximum key in the tree.
   */
  private _maxValueNode(root: Node<K, V>): Node<K, V> {
    let current = root;
    while (current.right) {
      current = current.right;
    }
    return current;
  }

  private getBalanceState(node: Node<K, V>): typeof BalanceState[string] {
    const heightDifference = node.leftHeight - node.rightHeight;
    switch (heightDifference) {
      case -2:
        return BalanceState.UNBALANCED_RIGHT;
      case -1:
        return BalanceState.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceState.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceState.UNBALANCED_LEFT;
      default:
        return BalanceState.BALANCED;
    }
  }
}
