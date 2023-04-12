class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
export default class BinaryTree {
  constructor() {
    this.root = new Node();
    this.root.left = new Node();
    this.root.right = new Node();
  }
  inOrderTraverse() {
    const traverse = (node) => {
      if (node != null) {
        traverse(node.left);
        console.log(node.data);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }
  preOrderTraverse() {
    const traverse = (node) => {
      if (node != null) {
        console.log(node.data);
        traverse(node.left);
        traverse(node.right);
      }
    };
    traverse(this.root);
  }
  postOrderTraverse() {
    const traverse = (node) => {
      if (node != null) {
        traverse(node.left);
        traverse(node.right);
        console.log(node.data);
      }
    };
    traverse(this.root);
  }
}
