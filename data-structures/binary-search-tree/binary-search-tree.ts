class BSTNode<T> {
  val: T;
  left?: BSTNode<T>;
  right?: BSTNode<T>;

  constructor(val: T, left?: BSTNode<T>, right?: BSTNode<T>) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * @name BST 二叉搜索树
 * @description
 * 特性①：二叉树每个节点的子节点不允许超过两个。
 * 特性②：二叉搜索树每个节点的值都比他的左子树的值大，比右子树的值小。
 * 应用：可以高效的在树中插入、 查找和删除数据。
 */
export default class BST<T> {
  root: BSTNode<T> | undefined;
  protected count: number;

  constructor() {
    this.count = 0;
  }

  get size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  // 向二分搜索树中添加值 O(logN)
  add(val: T): void {
    this.root = this.addNode(this.root, val);
  }

  private addNode(root: BSTNode<T> | undefined, val: T): BSTNode<T> {
    if (!root) {
      this.count++;
      return new BSTNode(val);
    }

    if (val < root.val) {
      root.left = this.addNode(root.left, val);
    } else if (val > root.val) {
      root.right = this.addNode(root.right, val);
    }

    return root;
  }

  // 看二分搜索树中是否包含值 O(logN)
  contains(val: T): boolean {
    return this.containsNode(this.root, val);
  }

  private containsNode(root: BSTNode<T> | undefined, val: T): boolean {
    if (!root) return false;

    if (val === root.val) {
      return true;
    } else if (val < root.val) {
      return this.containsNode(root.left, val);
    } else {
      return this.containsNode(root.right, val);
    }
  }

  // 二分搜索树的前序递归遍历 -> 深度优先搜索 DFS
  preOrder(arr: T[] = []): void {
    this.preOrderTree(this.root, arr);
  }

  private preOrderTree(root: BSTNode<T> | undefined, arr: T[] = []): void {
    if (root) {
      arr.push(root.val);
      this.preOrderTree(root.left, arr);
      this.preOrderTree(root.right, arr);
    }
  }

  // 二分搜索树的前序迭代遍历
  preOrderIterative(arr: T[] = []): void {
    if (this.root) {
      const stack: BSTNode<T>[] = [];
      stack.push(this.root);

      while (stack.length) {
        const curNode = stack.pop()!;
        arr.push(curNode.val);

        // 先 right 后 left 后进先出
        if (curNode.right) stack.push(curNode.right);
        if (curNode.left) stack.push(curNode.left);
      }
    }
  }

  // 二分搜索树的中序递归遍历 -> 数值升序排列
  inOrder(arr: T[] = []): void {
    this.inOrderTree(this.root, arr);
  }

  private inOrderTree(root: BSTNode<T> | undefined, arr: T[] = []): void {
    if (root) {
      this.inOrderTree(root.left, arr);
      arr.push(root.val);
      this.inOrderTree(root.right, arr);
    }
  }

  // 二分搜索树的中序迭代遍历
  inOrderIterative(arr: T[] = []): void {
    if (this.root) {
      const stack: BSTNode<T>[] = [];
      let curNode = this.root;

      while (curNode || stack.length) {
        while (curNode) {
          stack.push(curNode);
          curNode = curNode.left!;
        }
        curNode = stack.pop()!;
        arr.push(curNode.val);
        curNode = curNode.right!;
      }
    }
  }

  // 二分搜索树的后序递归遍历
  postOrder(arr: T[] = []): void {
    this.postOrderTree(this.root, arr);
  }

  private postOrderTree(root: BSTNode<T> | undefined, arr: T[] = []): void {
    if (root) {
      this.postOrderTree(root.left, arr);
      this.postOrderTree(root.right, arr);
      arr.push(root.val);
    }
  }

  // 二分搜索树的后序迭代遍历 -> 逆前序迭代遍历
  postOrderIterative(arr: T[] = []): void {
    if (this.root) {
      const stack: BSTNode<T>[] = [];
      stack.push(this.root);

      while (stack.length) {
        const curNode = stack.pop()!;
        arr.unshift(curNode.val); // 与 push 相反

        // 先 left 后 right
        if (curNode.left) {
          stack.push(curNode.left);
        }
        if (curNode.right) {
          stack.push(curNode.right);
        }
      }
    }
  }

  // 二分搜索树的层序遍历 -> 广度优先搜索 BFS
  levelOrder(arr: T[] = []): void {
    if (this.root) {
      const queue: BSTNode<T>[] = [];
      queue.push(this.root);

      while (queue.length) {
        const curNode = queue.shift()!;
        arr.push(curNode.val);

        if (curNode.left) {
          queue.push(curNode.left); // 左子节点树先入列
        }
        if (curNode.right) {
          queue.push(curNode.right);
        }
      }
    }
  }

  // 寻找二分搜索树的最小元素
  min(): T | undefined {
    if (!this.root) return undefined;
    return this.minNode(this.root).val;
  }

  private minNode(root: BSTNode<T>): BSTNode<T> {
    if (!root.left) return root;
    return this.minNode(root.left);
  }

  // 寻找二分搜索树的最大元素
  max(): T | undefined {
    if (!this.root) return undefined;
    return this.maxNode(this.root).val;
  }

  private maxNode(root: BSTNode<T>): BSTNode<T> {
    if (!root.right) return root;
    return this.maxNode(root.right);
  }

  // 从二分搜索树中删除最小值所在节点, 返回最小值
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

  // 从二分搜索树中删除最大值所在节点
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

  // 从二分搜索树中删除值为 val 的节点
  remove(val: T): void {
    this.root = this.removeNode(this.root, val);
  }

  protected removeNode(
    root: BSTNode<T> | undefined,
    val: T
  ): BSTNode<T> | undefined {
    if (!root) return undefined;

    if (val < root.val) {
      root.left = this.removeNode(root.left, val);
      return root;
    } else if (val > root.val) {
      root.right = this.removeNode(root.right, val);
      return root;
    } else if (val === root.val) {
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
}
