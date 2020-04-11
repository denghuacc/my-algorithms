const Stack = require('../Stack/Stack')
const Queue = require('../Queue/Queue')

// 颜色静态变量
const RED = true
const BLACK = false

class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.left = null
    this.right = null
    this.color = RED // 节点颜色（布尔值） 红色 or 黑色
  }
}

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
class RedBlackTree {
  constructor() {
    this.root = null
    this.size = 0
  }

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  _isRed(root) {
    if (root == null) {
      return BLACK
    }
    return root.color
  }

  // 二叉树的前序遍历
  preOrder(arr) {
    this._preOrder(this.root, arr)
  }

  _preOrder(root, arr) {
    if (root == null) return

    arr.push(root.key)
    this._preOrder(root.left, arr)
    this._preOrder(root.right, arr)
  }

  // 树的非递归前序遍历，需要借助栈 Stack 实现
  preOrderNR(arr = []) {
    if (this.root == null) return

    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      let curNode = stack.pop()
      // console.log(curNode.val)
      arr.push(curNode.key)

      if (curNode.right != null) {
        stack.push(curNode.right) // 右子节点树先入栈
      }

      if (curNode.left != null) {
        stack.push(curNode.left)
      }
    }
  }

  // 二叉树的中序遍历
  inOrder(arr) {
    this._inOrder(this.root, arr)
  }

  _inOrder(root, arr) {
    if (root == null) return

    this._inOrder(root.left, arr)
    arr.push(root.key)
    this._inOrder(root.right, arr)
  }

  // 二叉树的后序遍历
  postOrder(arr) {
    this._postOrder(this.root, arr)
  }

  _postOrder(root, arr) {
    if (root == null) return

    this._postOrder(root.left, arr)
    arr.push(root.key)
    this._postOrder(root.right, arr)
  }

  // 树的层序遍历，需要借助队列 Queue 实现 -> 广度优先搜索 BFS
  levelOrder(arr = []) {
    if (this.root == null) return

    const queue = new Queue()
    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      let curNode = queue.dequeue()
      arr.push(curNode.key)

      if (curNode.left != null) {
        queue.enqueue(curNode.left) // 左子节点树先入列
      }

      if (curNode.right != null) {
        queue.enqueue(curNode.right)
      }
    }
  }

  //   root                     x
  //  /   \     左旋转         /  \
  // T1   x   --------->   root   T3
  //     / \              /   \
  //    T2 T3            T1   T2
  // 左旋转
  _leftRotate(root) {
    const x = root.right

    // 左旋转
    root.right = x.left
    x.left = root

    // 更新颜色
    x.color = root.color
    root.color = RED

    return x
  }

  //     root                   x
  //    /   \     右旋转       /  \
  //   x    T2   ------->   y   root
  //  / \                       /  \
  // y  T1                     T1  T2
  // 右旋转
  _rightRotate(root) {
    const x = root.left

    // 右旋转
    root.left = x.right
    x.right = root

    // 更新颜色
    x.color = root.color
    root.color = RED

    return x
  }

  // 颜色翻转
  _flipColors(root) {
    root.color = RED
    root.left.color = BLACK
    root.right.color = BLACK
  }

  // 向红黑树中添加新的元素(key, val)
  add(key, val) {
    this.root = this._add(this.root, key, val)
    this.root.color = BLACK // 最终根节点为黑色节点
  }

  // 向以 root 为根的红黑树中插入元素 (key, val)，递归算法
  // 返回插入新节点后红黑树的根
  _add(root, key, val) {
    if (root == null) {
      this.size++
      return new Node(key, val)
    }

    if (key < root.key) {
      root.left = this._add(root.left, key, val)
    } else if (key > root.key) {
      root.right = this._add(root.right, key, val)
    } else {
      // key === root.key
      root.val = val
    }

    // 红黑树颜色旋转和颜色翻转
    // 左孩子不是红色，右孩子是红色
    if (!this._isRed(root.left) && this._isRed(root.right)) {
      root = this._leftRotate(root)
    }

    // 左孩子是红色，左孩子的左孩子还是红色
    if (this._isRed(root.left) && this._isRed(root.left.left)) {
      root = this._rightRotate(root)
    }

    // 左孩子是红色，右孩子也是红色
    if (this._isRed(root.left) && this._isRed(root.right)) {
      this._flipColors(root)
    }

    return root
  }

  // 返回以 root 为根节点的红黑树中，key 所在的节点
  _getNode(root, key) {
    if (root == null) {
      return null
    }

    if (key === root.key) {
      return root
    } else if (key < root.key) {
      return this._getNode(root.left, key)
    } else {
      // key > root.key
      return this._getNode(root.right, key)
    }
  }

  contains(key) {
    return this._getNode(this.root, key) != null
  }

  get(key) {
    const root = this._getNode(this.root, key)
    return root == null ? null : root.val
  }

  set(key, newVal) {
    const root = this._getNode(this.root, key)

    if (root == null) {
      throw new Error(key + " doesn't exist!")
    }

    root.val = newVal
  }

  // 寻找二分搜索树的最小元素
  minimum() {
    if (this.size === 0) return
    return this._minimum(this.root).key
  }

  _minimum(root) {
    if (root.left == null) return root
    return this._minimum(root.left)
  }

  // 寻找二分搜索树的最大元素
  maximum() {
    if (this.size === 0) return
    return this._maximum(this.root).key
  }

  _maximum(root) {
    if (root.right == null) return root
    return this._maximum(root.right)
  }

  // 从树中删除最小值所在节点, 返回最小值
  removeMin() {
    const ret = this.minimum()
    this.root = this._removeMin(this.root)
    return ret
  }

  _removeMin(root) {
    if (root.left == null) {
      const rightNode = root.right
      root.right = null
      this.size--
      return rightNode
    }

    root.left = this._removeMin(root.left)
    return root
  }

  // 从二分搜索树中删除最大值所在节点
  removeMax() {
    const ret = this.maximum()
    this.root = this._removeMax(this.root)
    return ret
  }

  _removeMax(root) {
    if (root.right == null) {
      const leftNode = root.left
      root.left = null
      this.size--
      return leftNode
    }

    root.right = this._removeMax(root.right)
    return root
  }

  // 从红黑树中删除键为 key 的节点
  remove(key) {
    const root = this._getNode(this.root, key)

    if (root != null) {
      this.root = this._remove(this.root, key)
      return root.val
    }

    return null
  }

  _remove(root, key) {
    if (root == null) {
      return null
    }

    if (key < root.key) {
      root.left = this._remove(root.left, key)
      return root
    } else if (key > root.key) {
      root.right = this._remove(root.right, key)
      return root
    } else {
      // key === root.key
      // 待删除节点左子树为空的情况
      if (root.left == null) {
        const rightNode = root.right
        root.right = null
        this.size--
        return rightNode
      }

      // 待删除节点右子树为空的情况
      if (root.right == null) {
        const leftNode = root.left
        root.left = null
        this.size--
        return leftNode
      }

      // 待删除节点左右子树均不为空的情况

      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      const successor = this._minimum(root.right)
      successor.right = this._removeMin(root.right)
      successor.left = root.left

      root.left = root.right = null
      return successor
    }
  }

  // 判断该二叉树是否是一棵二分搜索树
  isBST() {
    let arr = []
    this._inOrder(this.root, arr)
    for (let i = 1; i < arr.length; i++) {
      if (arr[i - 1] > arr[i]) {
        return false
      }
    }
    return true
  }

  // TODO
  // isBalanced() {}
}

module.exports = RedBlackTree
