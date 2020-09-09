import { Node } from "../models/tree-models";

/**
 * @name BST 二叉搜索树
 * @description
 * 特性①：二叉树每个节点的子节点不允许超过两个。
 * 特性②：二叉搜索树每个节点的值都比他的左子树的值大，比右子树的值小。
 * 应用：可以高效的在树中插入、 查找和删除数据。
 */
export default class BST<T> {
  root: Node<T> | undefined;
  protected count: number = 0;

  constructor() {}

  get size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  // 向二分搜索树中添加值 O(logN)
  add(key: T): void {
    this.root = this.addNode(this.root!, key);
  }

  private addNode(root: Node<T>, key: T): Node<T> {
    if (root == null) {
      this.count++;
      return new Node(key);
    }

    if (key < root.key) {
      root.left = this.addNode(root.left!, key);
    } else if (key > root.key) {
      root.right = this.addNode(root.right!, key);
    }

    return root;
  }

  // 看二分搜索树中是否包含值 O(logN)
  contains(key: T): boolean {
    return this.containsNode(this.root!, key);
  }

  private containsNode(root: Node<T>, key: T): boolean {
    if (root == null) return false;

    if (key === root.key) {
      return true;
    } else if (key < root.key) {
      return this.containsNode(root.left!, key);
    } else {
      return this.containsNode(root.right!, key);
    }
  }

  // 二分搜索树的前序递归遍历-> 深度优先搜索 DFS
  preOrder(arr: T[] = []): void {
    this.preOrderTree(this.root!, arr);
  }

  private preOrderTree(root: Node<T>, arr: T[] = []): void {
    if (root != null) {
      arr.push(root.key);
      this.preOrderTree(root.left!, arr);
      this.preOrderTree(root.right!, arr);
    }
  }

  // 二分搜索树的前序迭代遍历
  preOrderIterative(arr: T[] = []): void {
    if (this.root != null) {
      const stack: Node<T>[] = [];
      stack.push(this.root);

      while (stack.length !== 0) {
        let curNode = stack.pop();
        arr.push(curNode!.key);

        // 先 right 后 left 后进先出
        if (curNode!.right != null) stack.push(curNode!.right);
        if (curNode!.left != null) stack.push(curNode!.left);
      }
    }
  }

  // 二分搜索树的中序递归遍历 -> 数值升序排列
  inOrder(arr: T[] = []): void {
    this.inOrderTree(this.root!, arr);
  }

  private inOrderTree(root: Node<T>, arr: T[] = []): void {
    if (root != null) {
      this.inOrderTree(root.left!, arr);
      arr.push(root.key);
      this.inOrderTree(root.right!, arr);
    }
  }

  // 二分搜索树的中序迭代遍历
  inOrderIterative(arr: T[] = []): void {
    if (this.root != null) {
      const stack: Node<T>[] = [];
      let curNode = this.root;

      while (curNode != null || stack.length !== 0) {
        while (curNode != null) {
          stack.push(curNode);
          curNode = curNode.left!;
        }
        curNode = stack.pop()!;
        arr.push(curNode.key);
        curNode = curNode.right!;
      }
    }
  }

  // 二分搜索树的后序递归遍历
  postOrder(arr: T[] = []): void {
    this.postOrderTree(this.root!, arr);
  }

  private postOrderTree(root: Node<T>, arr: T[] = []): void {
    if (root != null) {
      this.postOrderTree(root.left!, arr);
      this.postOrderTree(root.right!, arr);
      arr.push(root.key);
    }
  }

  // 二分搜索树的后序迭代遍历 -> 逆前序迭代遍历
  postOrderIterative(arr: T[] = []): void {
    if (this.root != null) {
      const stack: Node<T>[] = [];
      stack.push(this.root);

      while (stack.length !== 0) {
        let curNode = stack.pop();
        arr.unshift(curNode!.key); // 与 push 相反

        // 先 left 后 right
        if (curNode?.left != null) stack.push(curNode.left);
        if (curNode?.right != null) stack.push(curNode.right);
      }
    }
  }

  // 二分搜索树的层序遍历 -> 广度优先搜索 BFS
  levelOrder(arr: T[] = []): void {
    if (this.root != null) {
      const queue: Node<T>[] = [];
      queue.push(this.root);

      while (queue.length) {
        let curNode = queue.shift();
        arr.push(curNode!.key);

        if (curNode!.left != null) {
          queue.push(curNode!.left); // 左子节点树先入列
        }

        if (curNode!.right != null) {
          queue.push(curNode!.right);
        }
      }
    }
  }

  // 寻找二分搜索树的最小元素
  min(): T | undefined {
    if (this.root == null) return undefined;
    return this.minNode(this.root).key;
  }

  private minNode(root: Node<T>): Node<T> {
    if (root.left == null) return root;
    return this.minNode(root.left);
  }

  // 寻找二分搜索树的最大元素
  max(): T | undefined {
    if (this.root == null) return undefined;
    return this.maxNode(this.root).key;
  }

  private maxNode(root: Node<T>): Node<T> {
    if (root.right == null) return root;
    return this.maxNode(root.right);
  }

  // 从二分搜索树中删除最小值所在节点, 返回最小值
  removeMin(): T | undefined {
    const ret = this.min();
    this.root = this.removeMinNode(this.root!);
    return ret != null ? ret : undefined;
  }

  private removeMinNode(root: Node<T>): Node<T> | undefined {
    if (root.left == null) {
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
    this.root = this.removeMaxNode(this.root!);
    return ret;
  }

  private removeMaxNode(root: Node<T>): Node<T> | undefined {
    if (root.right == null) {
      const leftNode = root.left;
      root.left = undefined;
      this.count--;
      return leftNode;
    }

    root.right = this.removeMaxNode(root.right);
    return root;
  }

  // 从二分搜索树中删除值为 key 的节点
  remove(key: T): void {
    this.root = this.removeNode(this.root!, key);
  }

  protected removeNode(root: Node<T>, key: T): Node<T> | undefined {
    if (root == null) return undefined;

    if (key < root.key) {
      root.left = this.removeNode(root.left!, key);
      return root;
    } else if (key > root.key) {
      root.right = this.removeNode(root.right!, key);
      return root;
    } else if (key === root.key) {
      // 待删除节点左子树为空的情况
      if (root.left == null) {
        const rightNode = root.right;
        root.right = undefined;
        this.count--;
        return rightNode;
      }

      // 待删除节点右子树为空的情况
      if (root.right == null) {
        const leftNode = root.left;
        root.left = undefined;
        this.count--;
        return leftNode;
      }

      // 待删除节点左右子树均不为空的情况
      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      const successor = this.minNode(root.right!);
      successor.right = this.removeMinNode(root.right!);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }
}
