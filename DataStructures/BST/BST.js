const Stack = require('../Stack/Stack')
const Queue = require('../Queue/Queue')

/**
 * @name Node 节点
 * @description 树的节点
 */
class Node {
  constructor(val) {
    this.val = val // 节点的值
    this.left = null // 节点的左子节点
    this.right = null // 节点的右子节点
  }
}

/**
 * @name BST 二叉搜索树
 * @description
 * 特性①：二叉树每个节点的子节点不允许超过两个。
 * 特性②：二叉搜索树每个节点的值都比他的左子树的值大，比右子树的值小。
 * 应用：可以高效的在树中插入、 查找和删除数据。
 */
class BST {
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

  // 向二分搜索树中添加值
  add(val) {
    this.root = this._add(this.root, val)
  }

  _add(root, val) {
    if (root == null) {
      this.size++
      return new Node(val)
    }

    if (val < root.val) {
      root.left = this._add(root.left, val)
    } else if (val > root.val) {
      root.right = this._add(root.right, val)
    }

    return root
  }

  // 看二分搜索树中是否包含值
  contains(val) {
    return this._contains(this.root, val)
  }

  _contains(root, val) {
    if (root == null) return false

    if (val === root.val) {
      return true
    } else if (val < root.val) {
      return this._contains(root.left, val)
    } else {
      return this._contains(root.right, val)
    }
  }

  // 二分搜索树的前序遍历 -> 深度优先搜索 DFS
  preOrder(arr) {
    this._preOrder(this.root, arr)
  }

  _preOrder(root, arr = []) {
    if (root == null) return

    // console.log(root.val)
    arr.push(root.val)
    this._preOrder(root.left, arr)
    this._preOrder(root.right, arr)
  }

  // 二分搜索树的非递归前序遍历，需要借助栈 Stack 实现
  preOrderNR(arr = []) {
    if (this.root == null) return

    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      let curNode = stack.pop()
      // console.log(curNode.val)
      arr.push(curNode.val)

      if (curNode.right != null) {
        stack.push(curNode.right) // 右子节点树先入栈
      }

      if (curNode.left != null) {
        stack.push(curNode.left)
      }
    }
  }

  // 二分搜索树的中序遍历 -> 数值升序排列
  inOrder(arr) {
    this._inOrder(this.root, arr)
  }

  _inOrder(root, arr = []) {
    if (root == null) return

    this._inOrder(root.left, arr)
    // console.log(root.val)
    arr.push(root.val)
    this._inOrder(root.right, arr)
  }

  // 二分搜索树的后序遍历
  postOrder(arr) {
    this._postOrder(this.root, arr)
  }

  _postOrder(root, arr = []) {
    if (root == null) return

    this._postOrder(root.left, arr)
    this._postOrder(root.right, arr)
    // console.log(root.val)
    arr.push(root.val)
  }

  // 二分搜索树的层序遍历，需要借助队列 Queue 实现 -> 广度优先搜索 BFS
  levelOrder(arr = []) {
    if (this.root == null) return

    const queue = new Queue()
    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      let curNode = queue.dequeue()
      // console.log(curNode.val)
      arr.push(curNode.val)

      if (curNode.left != null) {
        queue.enqueue(curNode.left) // 左子节点树先入列
      }

      if (curNode.right != null) {
        queue.enqueue(curNode.right)
      }
    }
  }

  // 寻找二分搜索树的最小元素
  minimum() {
    if (this.size === 0) return
    return this._minimum(this.root).val
  }

  _minimum(root) {
    if (root.left == null) return root
    return this._minimum(root.left)
  }

  // 寻找二分搜索树的最大元素
  maximum() {
    if (this.size === 0) return
    return this._maximum(this.root).val
  }

  _maximum(root) {
    if (root.right == null) return root
    return this._maximum(root.right)
  }

  // 从二分搜索树中删除最小值所在节点, 返回最小值
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

  // 从二分搜索树中删除值为 val 的节点
  remove(val) {
    this.root = this._remove(this.root, val)
  }

  _remove(root, val) {
    if (root == null) return null

    if (val < root.val) {
      root.left = this._remove(root.left, val)
      return root
    } else if (val > root.val) {
      root.right = this._remove(root.right, val)
      return root
    } else {
      // val === root.val

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
}

module.exports = BST
