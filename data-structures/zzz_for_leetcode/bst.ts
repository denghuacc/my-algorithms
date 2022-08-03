class BSTNode<T> {
  constructor(
    public val: T,
    public left?: BSTNode<T>,
    public right?: BSTNode<T>
  ) {}
}

export default class BST<T = number> {
  root: BSTNode<T> | undefined;
  count: number;
  getComparedNumber: (val: T) => number;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  constructor(getComparedNumber = (val: any) => val) {
    this.getComparedNumber = getComparedNumber;
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  add(val: T) {
    this.root = this.addNode(this.root, val);
  }

  private addNode(root: BSTNode<T> | undefined, val: T): BSTNode<T> {
    if (!root) {
      this.count++;
      return new BSTNode(val);
    }

    const valNumber = this.getComparedNumber(val);
    const nodeNumber = this.getComparedNumber(root.val);

    if (valNumber < nodeNumber) {
      root.left = this.addNode(root.left, val);
    } else if (valNumber > nodeNumber) {
      root.right = this.addNode(root.right, val);
    }

    return root;
  }

  contains(val: T): boolean {
    return this.containsNode(this.root, val);
  }

  private containsNode(root: BSTNode<T> | undefined, val: T): boolean {
    if (!root) return false;

    const valNumber = this.getComparedNumber(val);
    const nodeNumber = this.getComparedNumber(root.val);

    if (valNumber === nodeNumber) {
      return true;
    } else if (valNumber < nodeNumber) {
      return this.containsNode(root.left, val);
    } else {
      return this.containsNode(root.right, val);
    }
  }

  min(): T | undefined {
    if (!this.root) return undefined;
    return this.minNode(this.root).val;
  }

  private minNode(root: BSTNode<T>): BSTNode<T> {
    if (!root.left) return root;
    return this.minNode(root.left);
  }

  max(): T | undefined {
    if (!this.root) return undefined;
    return this.maxNode(this.root).val;
  }

  private maxNode(root: BSTNode<T>): BSTNode<T> {
    if (!root.right) return root;
    return this.maxNode(root.right);
  }

  removeMin(): T | undefined {
    const ret = this.min();
    this.root = this.removeMinNode(this.root);
    return ret ? ret : undefined;
  }

  private removeMinNode(root: BSTNode<T> | undefined): BSTNode<T> | undefined {
    if (!root) return undefined;
    if (!root.left) {
      const rightNode = root.right;
      root.right = undefined;
      this.count--;
      return rightNode;
    }

    root.left = this.removeMinNode(root.left);
    return root;
  }

  removeMax(): T | undefined {
    const ret = this.max();
    this.root = this.removeMaxNode(this.root);
    return ret;
  }

  private removeMaxNode(root: BSTNode<T> | undefined): BSTNode<T> | undefined {
    if (!root) return undefined;
    if (!root.right) {
      const leftNode = root.left;
      root.left = undefined;
      this.count--;
      return leftNode;
    }

    root.right = this.removeMaxNode(root.right);
    return root;
  }

  remove(val: T) {
    this.root = this.removeNode(this.root, val);
  }

  protected removeNode(
    root: BSTNode<T> | undefined,
    val: T
  ): BSTNode<T> | undefined {
    if (!root) return undefined;

    const valNumber = this.getComparedNumber(val);
    const nodeNumber = this.getComparedNumber(root.val);

    if (valNumber < nodeNumber) {
      root.left = this.removeNode(root.left, val);
      return root;
    } else if (valNumber > nodeNumber) {
      root.right = this.removeNode(root.right, val);
      return root;
    } else if (valNumber === nodeNumber) {
      // 待删除节点左子树为空的情况
      if (!root.left) {
        const rightNode = root.right;
        root.right = undefined;
        this.count--;
        return rightNode;
      }

      // 待删除节点右子树为空的情况
      if (!root.right) {
        const leftNode = root.left;
        root.left = undefined;
        this.count--;
        return leftNode;
      }

      // 待删除节点左右子树均不为空的情况
      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      const successor = this.minNode(root.right);
      successor.right = this.removeMinNode(root.right);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }

  inOrder(arr: T[] = []) {
    this.inOrderTree(this.root, arr);
  }

  private inOrderTree(root: BSTNode<T> | undefined, arr: T[] = []) {
    if (root) {
      this.inOrderTree(root.left, arr);
      arr.push(root.val);
      this.inOrderTree(root.right, arr);
    }
  }

  toArray(): T[] {
    const arr: T[] = [];
    this.inOrderTree(this.root, arr);
    return arr;
  }
}
