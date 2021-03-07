import { KVNode as Node, Color } from "../models/tree-models";

/**
 * @name RedBlackTree 红黑树
 * @description 红黑树也是一种自平衡树
 * 本例使用左倾斜 左倾斜的为红色节点
 * 《算法导论》红黑树的五个性质：
 * 1. 每个节点或者是红色的，或者是黑色的
 * 2. 根节点是黑色的
 * 3. 每一个叶子节点（最后的空节点）是黑色的
 * 4. 如果一个节点是红色的，那么它的孩子节点都是黑色的
 * 5. 从任意一个节点到叶子节点，经过的黑色节点是一样的
 */
export default class RedBlackTree<K, V> {
  root: Node<K, V> | undefined;
  protected count: number = 0;

  constructor() {}

  get size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  private isRed(root: Node<K, V> | undefined): boolean {
    if (!root) return false;
    return root.color === Color.RED ? true : false;
  }

  // 二叉树的前序遍历
  preOrder(arr: Array<K> = []): void {
    this.preOrderTree(this.root, arr);
  }

  private preOrderTree(root: Node<K, V> | undefined, arr: Array<K>): void {
    if (!root) return;

    arr.push(root.key);
    this.preOrderTree(root.left, arr);
    this.preOrderTree(root.right, arr);
  }

  // 二叉树的中序遍历
  inOrder(arr: Array<K> = []): void {
    this.inOrderTree(this.root, arr);
  }

  private inOrderTree(root: Node<K, V> | undefined, arr: Array<K>): void {
    if (!root) return;

    this.inOrderTree(root.left, arr);
    arr.push(root.key);
    this.inOrderTree(root.right, arr);
  }

  // 二叉树的后序遍历
  postOrder(arr: Array<K>): void {
    this.postOrderTree(this.root, arr);
  }

  private postOrderTree(root: Node<K, V> | undefined, arr: Array<K>): void {
    if (!root) return;

    this.postOrderTree(root.left, arr);
    arr.push(root.key);
    this.postOrderTree(root.right, arr);
  }

  // 树的层序遍历，需要借助队列 Queue 实现 -> 广度优先搜索 BFS
  levelOrder(arr: Array<K> = []): void {
    if (!this.root) return;

    const queue: Node<K, V>[] = [];
    queue.push(this.root);

    while (queue.length) {
      let curNode = queue.shift()!;
      arr.push(curNode.key);

      if (curNode.left) queue.push(curNode.left); // 左子节点树先入列
      if (curNode.right) queue.push(curNode.right);
    }
  }

  //   root                     x
  //  /   \     左旋转         /  \
  // T1   x   --------->   root   T3
  //     / \              /   \
  //    T2 T3            T1   T2
  // 左旋转
  private leftRotate(root: Node<K, V>): Node<K, V> | undefined {
    const x = root.right!;

    // 左旋转
    root.right = x.left;
    x.left = root;

    // 更新颜色
    x.color = root.color;
    root.color = Color.RED;

    return x;
  }

  //     root                   x
  //    /   \     右旋转       /  \
  //   x    T2   ------->   y   root
  //  / \                       /  \
  // y  T1                     T1  T2
  // 右旋转
  private rightRotate(root: Node<K, V>): Node<K, V> | undefined {
    const x = root.left!;

    // 右旋转
    root.left = x.right;
    x.right = root;

    // 更新颜色
    x.color = root.color;
    root.color = Color.RED;

    return x;
  }

  // 颜色翻转
  private flipColors(root: Node<K, V>): void {
    root.color = Color.RED;
    root.left!.color = Color.BLACK;
    root.right!.color = Color.BLACK;
  }

  // 向红黑树中添加新的元素(key, val)
  add(key: K, val: V): void {
    this.root = this.addNode(this.root, key, val);
    this.root!.color = Color.BLACK; // 最终根节点为黑色节点
  }

  // 向以 root 为根的红黑树中插入元素 (key, val)，递归算法
  // 返回插入新节点后红黑树的根
  private addNode(root: Node<K, V> | undefined, key: K, val: V): Node<K, V> {
    if (!root) {
      this.count++;
      return new Node(key, val);
    }

    if (key < root.key) {
      root.left = this.addNode(root.left, key, val);
    } else if (key > root.key) {
      root.right = this.addNode(root.right, key, val);
    } else {
      // key === root.key
      root.val = val;
    }

    // 红黑树颜色旋转和颜色翻转
    // 左孩子不是红色，右孩子是红色
    if (!this.isRed(root.left) && this.isRed(root.right)) {
      root = this.leftRotate(root)!;
    }

    // 左孩子是红色，左孩子的左孩子还是红色
    if (this.isRed(root.left) && this.isRed(root.left!.left)) {
      root = this.rightRotate(root)!;
    }

    // 左孩子是红色，右孩子也是红色
    if (this.isRed(root.left) && this.isRed(root.right!)) {
      this.flipColors(root);
    }

    return root;
  }

  // 返回以 root 为根节点的红黑树中，key 所在的节点
  private getNode(
    root: Node<K, V> | undefined,
    key: K
  ): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key === root.key) {
      return root;
    } else if (key < root.key) {
      return this.getNode(root.left, key);
    } else {
      // key > root.key
      return this.getNode(root.right, key);
    }
  }

  contains(key: K): boolean {
    return !!this.getNode(this.root, key);
  }

  get(key: K): V | undefined {
    const root = this.getNode(this.root, key);
    return !root ? undefined : root.val;
  }

  set(key: K, newVal: V): void {
    const root = this.getNode(this.root, key);

    if (!root) {
      throw new Error(key + " doesn't exist!");
    }

    root.val = newVal;
  }

  // 寻找二分搜索树的最小元素
  minimum(): K | undefined {
    if (this.count === 0) return undefined;
    return this.minimumNode(this.root)?.key;
  }

  private minimumNode(root: Node<K, V> | undefined): Node<K, V> | undefined {
    if (!root) return undefined;
    if (!root.left) return root;
    return this.minimumNode(root.left);
  }

  // 寻找二分搜索树的最大元素
  maximum(): K | undefined {
    if (!this.count) return undefined;
    return this.maximumNode(this.root)?.key;
  }

  private maximumNode(root: Node<K, V> | undefined): Node<K, V> | undefined {
    if (!root) return undefined;
    if (!root.right) return root;
    return this.maximumNode(root.right);
  }

  // 从树中删除最小值所在节点, 返回最小值
  removeMin(): K | undefined {
    const ret = this.minimum();
    this.root = this.removeMinNode(this.root!);
    return ret;
  }

  private removeMinNode(root: Node<K, V>): Node<K, V> | undefined {
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
  removeMax(): K | undefined {
    const ret = this.maximum();
    this.root = this.removeMaxNode(this.root!);
    return ret;
  }

  private removeMaxNode(root: Node<K, V>): Node<K, V> | undefined {
    if (!root.right) {
      const leftNode = root.left;
      root.left = undefined;
      this.count--;
      return leftNode;
    }

    root.right = this.removeMaxNode(root.right);
    return root;
  }

  // 从红黑树中删除键为 key 的节点
  remove(key: K): V | undefined {
    const root = this.getNode(this.root, key);

    if (root) {
      this.root = this.removeNode(this.root, key);
      return root.val;
    }

    return undefined;
  }

  private removeNode(
    root: Node<K, V> | undefined,
    key: K
  ): Node<K, V> | undefined {
    if (!root) return undefined;

    if (key < root.key) {
      root.left = this.removeNode(root.left, key);
      return root;
    } else if (key > root.key) {
      root.right = this.removeNode(root.right, key);
      return root;
    } else {
      // key === root.key
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
      const successor = this.minimumNode(root.right)!;
      successor.right = this.removeMinNode(root.right);
      successor.left = root.left;

      root.left = root.right = undefined;
      return successor;
    }
  }

  // 判断该二叉树是否是一棵二分搜索树
  isBST(): boolean {
    let arr: Array<K> = [];
    this.inOrderTree(this.root, arr);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    return true;
  }
}
