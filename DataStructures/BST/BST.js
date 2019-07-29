const Stack = require('../Stack/Stack')
const Queue = require('../Queue/Queue')

/**
 * @name Node 节点
 * @description 树的节点；基本单位
 */
class Node {
  constructor(element) {
    this.element = element // 节点的值
    this.left = null // 节点的左子节点
    this.right = null // 节点的右子节点
  }
}

/**
 * @name BST 二叉搜索树
 * @description 二叉树每个节点的子节点不允许超过两个；
 * 可以高效的在树中插入、 查找和删除数据；
 * 二叉搜索树每个节点的值都比他的左子树的值大，比右子树的值小；
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

  // 向二分搜索树中添加新的元素
  add(element) {
    this.root = this._add(this.root, element)
  }

  // 向以 node 为根的二分搜索树中插入元素，递归算法
  // 返回插入新节点后二分搜索树的根
  _add(node, element) {
    if (node === null) {
      this.size++
      return new Node(element)
    }

    if (element < node.element) {
      node.left = this._add(node.left, element)
    } else if (element > node.element) {
      node.right = this._add(node.right, element)
    }

    return node
  }

  // 看二分搜索树中是否包含元素
  contains(element) {
    return this._contains(this.root, element)
  }

  // 看以 node 为根的二分搜索树中是否包含元素, 递归算法
  _contains(node, element) {
    if (node === null) {
      return false
    }

    if (element === node.element) {
      return true
    } else if (element < node.element) {
      return this._contains(node.left, element)
    } else {
      return this._contains(node.right, element)
    }
  }

  // 二分搜索树的前序遍历 = 深度优先搜索
  preOrder() {
    this._preOrder(this.root)
  }

  // 前序遍历以 node 为根的二分搜索树, 递归算法
  _preOrder(node) {
    if (node === null) return

    console.log(node.element)
    this._preOrder(node.left)
    this._preOrder(node.right)
  }

  // 二分搜索树的非递归前序遍历
  preOrderNR() {
    if (this.root === null) return

    const stack = new Stack()
    stack.push(this.root)

    while (!stack.isEmpty()) {
      let curNode = stack.pop()
      console.log(curNode.element)

      if (curNode.right !== null) {
        stack.push(curNode.right) // 右子节点树先入栈
      }

      if (curNode.left !== null) {
        stack.push(curNode.left)
      }
    }
  }

  // 二分搜索树的中序遍历
  inOrder() {
    this._inOrder(this.root)
  }

  // 中序遍历以 node 为根的二分搜索树, 递归算法
  _inOrder(node) {
    if (node === null) return

    this._inOrder(node.left)
    console.log(node.element)
    this._inOrder(node.right)
  }

  // 二分搜索树的后序遍历
  postOrder() {
    this._postOrder(this.root)
  }

  // 后序遍历以node为根的二分搜索树, 递归算法
  _postOrder(node) {
    if (node === null) return

    this._postOrder(node.left)
    this._postOrder(node.right)
    console.log(node.element)
  }

  // 二分搜索树的层序遍历 = 广度优先搜索
  levelOrder() {
    if (this.root === null) return

    const queue = new Queue()
    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      let curNode = queue.dequeue()
      console.log(curNode.element)

      if (curNode.left !== null) {
        queue.enqueue(curNode.left) // 左子节点树先入列
      }

      if (curNode.right !== null) {
        queue.enqueue(curNode.right)
      }
    }
  }

  // 寻找二分搜索树的最小元素
  minimum() {
    if (this.size === 0) return

    return this._minimum(this.root).element
  }

  // 返回以 node 为根的二分搜索树的最小值所在的节点
  _minimum(node) {
    if (node.left === null) {
      return node
    }

    return this._minimum(node.left)
  }

  // 寻找二分搜索树的最大元素
  maximum() {
    if (this.size === 0) return

    return this._maximum(this.root).element
  }

  // 返回以 node 为根的二分搜索树的最大值所在的节点
  _maximum(node) {
    if (node.right === null) {
      return node
    }

    return this._maximum(node.right)
  }

  // 从二分搜索树中删除最小值所在节点, 返回最小值
  removeMin() {
    const ret = this.minimum()
    this.root = this._removeMin(this.root)
    return ret
  }

  // 删除掉以 node 为根的二分搜索树中的最小节点
  // 返回删除节点后新的二分搜索树的根
  _removeMin(node) {
    if (node.left === null) {
      const rightNode = node.right
      node.right = null
      this.size--
      return rightNode
    }

    node.left = this._removeMin(node.left)
    return node
  }

  // 从二分搜索树中删除最大值所在节点
  removeMax() {
    const ret = this.maximum()
    this.root = this._removeMax(this.root)
    return ret
  }

  // 删除掉以 node 为根的二分搜索树中的最大节点
  // 返回删除节点后新的二分搜索树的根
  _removeMax(node) {
    if (node.right === null) {
      const leftNode = node.left
      node.left = null
      this.size--
      return leftNode
    }

    node.right = this._removeMax(node.right)
    return node
  }

  // 从二分搜索树中删除元素为 element 的节点
  remove(element) {
    this.root = this._remove(this.root, element)
  }

  // 删除掉以 node 为根的二分搜索树中值为 element 的节点, 递归算法
  // 返回删除节点后新的二分搜索树的根
  _remove(node, element) {
    if (node === null) {
      return null
    }

    if (element < node.element) {
      node.left = this._remove(node.left, element)
      return node
    } else if (element > node.element) {
      node.right = this._remove(node.right, element)
      return node
    } else {
      // element === node.element

      // 待删除节点左子树为空的情况
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        return rightNode
      }

      // 待删除节点右子树为空的情况
      if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        return leftNode
      }

      // 待删除节点左右子树均不为空的情况
      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      const successor = this._minimum(node.right)
      successor.right = this._removeMin(node.right)
      successor.left = node.left

      node.left = node.right = null
      return successor
    }
  }
}

module.exports = BST
