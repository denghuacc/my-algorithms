class AVLTreeNode<T> {
  val: T;
  left?: AVLTreeNode<T>;
  right?: AVLTreeNode<T>;
  height: number;

  constructor(val: T, left?: AVLTreeNode<T>, right?: AVLTreeNode<T>) {
    this.val = val;
    this.left = left;
    this.right = right;
    this.height = 1;
  }
}

/**
 * @name AVLTree AVL 树
 * @description  AVL 树是一种自平衡树
 * 特性：添加或移除节点时， AVL树会尝试自平衡，尽可能尝试转换为完全树。
 * 任意一个节点（不论深度）的左子树和右子树高度最多相差1。
 */
export default class AVLTree<T> {
  root?: AVLTreeNode<T> | undefined;
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

  // 判断该二叉树是否是一棵二分搜索树
  isBST(): boolean {
    const arr: T[] = [];
    this.inOrderTree(this.root, arr);
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        return false;
      }
    }
    return true;
  }

  // 二叉树的前序遍历
  preOrder(arr: T[] = []): void {
    this.preOrderTree(this.root, arr);
  }

  private preOrderTree(root: AVLTreeNode<T> | undefined, arr: T[]): void {
    if (!root) return;

    arr.push(root.val);
    this.preOrderTree(root.left, arr);
    this.preOrderTree(root.right, arr);
  }

  // 二叉树的中序遍历
  inOrder(arr: T[] = []): void {
    this.inOrderTree(this.root, arr);
  }

  private inOrderTree(root: AVLTreeNode<T> | undefined, arr: T[]): void {
    if (!root) return;

    this.inOrderTree(root.left, arr);
    arr.push(root.val);
    this.inOrderTree(root.right, arr);
  }

  // 二叉树的后序遍历
  postOrder(arr: T[] = []): void {
    this.postOrderTree(this.root, arr);
  }

  private postOrderTree(root: AVLTreeNode<T> | undefined, arr: T[]): void {
    if (!root) return;

    this.postOrderTree(root.left, arr);
    arr.push(root.val);
    this.postOrderTree(root.right, arr);
  }

  // 树的层序遍历，需要借助队列 Queue 实现 -> 广度优先搜索 BFS
  levelOrder(arr: T[] = []): void {
    if (!this.root) return;

    const queue: Array<AVLTreeNode<T>> = [];
    queue.push(this.root);

    while (queue.length) {
      const curNode = queue.shift()!;
      arr.push(curNode.val);

      if (curNode.left) queue.push(curNode.left); // 左子节点树先入列
      if (curNode.right) queue.push(curNode.right);
    }
  }

  // 判断该二叉树是否是一棵平衡二叉树
  isBalanced(): boolean {
    return this.isBalancedTree(this.root);
  }

  // 判断以 AVLTreeNode 为根的二叉树是否是一棵平衡二叉树，递归算法
  private isBalancedTree(root: AVLTreeNode<T> | undefined): boolean {
    if (!root) return true;

    const balanceFactor = this.getBalancedFactor(root); // 平衡因子

    if (Math.abs(balanceFactor) > 1) {
      return false;
    }

    // 只有节点的左右子树都是平衡二叉树， 它才是平衡二叉树
    return this.isBalancedTree(root.left) && this.isBalancedTree(root.right);
  }

  // 获取节点 root 的高度
  private getHeight(root: AVLTreeNode<T> | undefined): number {
    if (!root) return 0;
    return root.height;
  }

  // 获取节点 root 的平衡因子 左右子树高度差
  private getBalancedFactor(root: AVLTreeNode<T> | undefined): number {
    if (!root) return 0;
    return this.getHeight(root.left) - this.getHeight(root.right);
  }

  // 对节点 y 进行向右旋转操作，返回旋转后新的根节点 x
  //        y                              x
  //       / \                           /   \
  //      x   T4      向右旋转 (y)      z     y
  //     / \         - - - - - - ->    / \   / \
  //    z   T3                        T1 T2 T3 T4
  //   / \
  // T1   T2
  private rightRotate(y: AVLTreeNode<T>): AVLTreeNode<T> {
    const x = y.left!;
    const T3 = x.right;

    // 向右旋转过程
    x.right = y;
    y.left = T3;

    // 更新高度，先更新 y 的高度， 再更新 x 的高度
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // 对节点 y 进行向左旋转操作，返回旋转后新的根节点 x
  //    y                             x
  //  /  \                          /   \
  // T1   x      向左旋转 (y)      y     z
  //     / \    - - - - - - ->    / \   / \
  //   T2   z                    T1 T2 T3 T4
  //       / \
  //      T3 T4
  private leftRotate(y: AVLTreeNode<T>): AVLTreeNode<T> {
    const x = y.right!;
    const T2 = x.left;

    // 向左旋转过程
    x.left = y;
    y.right = T2;

    // 更新高度，先更新 y 的高度， 再更新 x 的高度
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  // 向 AVL 树中添加新的元素 val
  add(val: T): void {
    this.root = this.addNode(this.root, val);
  }

  addNode(
    root: AVLTreeNode<T> | undefined,
    val: T
  ): AVLTreeNode<T> | undefined {
    if (!root) {
      this.count++;
      return new AVLTreeNode(val);
    }

    if (val < root.val) {
      root.left = this.addNode(root.left, val);
    } else if (val > root.val) {
      root.right = this.addNode(root.right, val);
    } else {
      root.val = val;
    }

    // 添加元素后需要维护树的平衡
    // 更新 height
    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));

    // 计算平衡因子
    const balanceFactor = this.getBalancedFactor(root);

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && this.getBalancedFactor(root.left) >= 0) {
      return this.rightRotate(root);
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && this.getBalancedFactor(root.right) <= 0) {
      return this.leftRotate(root);
    }

    //       y                            y                          z
    //     /   \                        /   \                      /   \
    //    x     T4   向左旋转 (x)      z    T4   向右旋转 (y)     x     y
    //  /  \        - - - - - - ->    / \       - - - - - - ->   / \   / \
    // T1   z                        x  T3                      T1 T2 T3 T4
    //     / \                      / \
    //    T2 T3                    T1 T2
    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && this.getBalancedFactor(root.left) < 0) {
      root.left = this.leftRotate(root.left!);
      return this.rightRotate(root);
    }

    //    y                          y                             z
    //  /   \                      /   \                         /   \
    // T1    x     向右旋转 (x)   T1    z       向左旋转 (y)    y     x
    //      / \   - - - - - - ->       / \    - - - - - - ->   / \   / \
    //     z  T4                      T2  x                   T1 T2 T3 T4
    //    / \                            / \
    //   T2 T3                          T3 T4
    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && this.getBalancedFactor(root.right) > 0) {
      root.right = this.rightRotate(root.right!);
      return this.leftRotate(root);
    }

    return root;
  }

  // 返回以 node为根节点的 AVL 树中，val 所在的节点
  private getNode(
    root: AVLTreeNode<T> | undefined,
    val: T
  ): AVLTreeNode<T> | undefined {
    if (!root) return undefined;

    if (val === root.val) {
      return root;
    } else if (val < root.val) {
      return this.getNode(root.left, val);
    } else {
      return this.getNode(root.right, val);
    }
  }

  contains(val: T): boolean {
    return !!this.getNode(this.root, val);
  }

  get(val: T): T | undefined {
    const root = this.getNode(this.root, val);
    return !root ? undefined : root.val;
  }

  set(val: T, newVal: T): void {
    const root = this.getNode(this.root, val);

    if (!root) {
      throw new Error(val + " doesn't exist!");
    }

    root.val = newVal;
  }

  // 寻找二分搜索树的最小元素
  min(): T | undefined {
    if (!this.root) return;
    return this.minNode(this.root).val;
  }

  private minNode(root: AVLTreeNode<T>): AVLTreeNode<T> {
    if (!root.left) return root;
    return this.minNode(root.left);
  }

  // 寻找二分搜索树的最大元素
  max(): T | undefined {
    if (!this.root) return;
    return this.maxNode(this.root).val;
  }

  private maxNode(root: AVLTreeNode<T>): AVLTreeNode<T> {
    if (!root.right) return root;
    return this.maxNode(root.right);
  }

  // 从树中删除最小值所在节点, 返回最小值
  removeMin(): T | undefined {
    const ret = this.min();
    this.root = this.removeMinNode(this.root!);
    return ret;
  }

  private removeMinNode(root: AVLTreeNode<T>): AVLTreeNode<T> | undefined {
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
    this.root = this.removeMaxNode(this.root!);
    return ret;
  }

  private removeMaxNode(root: AVLTreeNode<T>): AVLTreeNode<T> | undefined {
    if (!root.right) {
      const leftNode = root.left;
      root.left = undefined;
      this.count--;
      return leftNode;
    }

    root.right = this.removeMaxNode(root.right);
    return root;
  }

  // 从 AVL 树中删除键为 val 的节点
  remove(val: T): T | undefined {
    const root = this.getNode(this.root, val);

    if (root) {
      this.root = this.removeNode(this.root, val)!;
      return root.val;
    }

    return undefined;
  }

  private removeNode(
    root: AVLTreeNode<T> | undefined,
    val: T
  ): AVLTreeNode<T> | undefined {
    if (!root) return undefined;

    let retNode; // 创建一个返回的节点
    if (val < root.val) {
      root.left = this.removeNode(root.left!, val)!;
      // return root
      retNode = root;
    } else if (val > root.val) {
      root.right = this.removeNode(root.right!, val)!;
      // return root
      retNode = root;
    } else {
      // val === root.val
      if (!root.left) {
        const rightNode = root.right;
        root.right = undefined;
        this.count--;
        retNode = rightNode;
      } else if (!root.right) {
        const leftNode = root.left;
        root.left = undefined;
        this.count--;
        retNode = leftNode;
      }

      // 待删除节点左右子树均不为空的情况

      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      else {
        const successor = this.minNode(root.right);
        successor.right = this.removeNode(root.right, successor.val)!; // 删除代码复用会 remove 的平衡逻辑
        successor.left = root.left;

        root.left = root.right = undefined;
        retNode = successor;
      }
    }

    // retNode 可能为空
    if (!retNode) return undefined;

    // 删除元素后需要维护树的平衡，逻辑和添加元素一样
    // 更新 height
    retNode.height =
      1 + Math.max(this.getHeight(retNode.left), this.getHeight(retNode.right));

    // 计算平衡因子
    const balanceFactor = this.getBalancedFactor(retNode);

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && this.getBalancedFactor(retNode.left) >= 0) {
      return this.rightRotate(retNode);
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && this.getBalancedFactor(retNode.right) <= 0) {
      return this.leftRotate(retNode);
    }

    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && this.getBalancedFactor(retNode.left) < 0) {
      retNode.left = this.leftRotate(retNode.left!);
      return this.rightRotate(retNode);
    }

    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && this.getBalancedFactor(retNode.right) > 0) {
      retNode.right = this.rightRotate(retNode.right!);
      return this.leftRotate(retNode);
    }

    return retNode;
  }
}
