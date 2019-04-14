// 颜色静态变量
const RED = true
const BLACK = false

class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.color = RED // 节点颜色（布尔值） 红色 or 黑色
  }
}

/**
 * @name RedBlackTree 红黑树
 * @description 本例使用左倾斜 左倾斜的为红色节点
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

  _isRed(node) {
    if (node === null) {
      return BLACK
    }
    return node.color
  }

  //   node                     x
  //  /   \     左旋转         /  \
  // T1   x   --------->   node   T3
  //     / \              /   \
  //    T2 T3            T1   T2
  // 左旋转
  _leftRotate(node) {
    const x = node.right

    // 左旋转
    node.right = x.left
    x.left = node

    // 更新颜色
    x.color = node.color
    node.color = RED

    return x
  }

  //     node                   x
  //    /   \     右旋转       /  \
  //   x    T2   ------->   y   node
  //  / \                       /  \
  // y  T1                     T1  T2
  // 右旋转
  _rightRotate(node) {
    const x = node.left

    // 右旋转
    node.left = x.right
    x.right = node

    // 更新颜色
    x.color = node.color
    node.color = RED

    return x
  }

  // 颜色翻转
  _flipColors(node) {
    node.color = RED
    node.left.color = BLACK
    node.right.color = BLACK
  }

  // 向红黑树中添加新的元素(key, value)
  add(key, value) {
    this.root = this._add(this.root, key, value)
    this.root.color = BLACK // 最终根节点为黑色节点
  }

  // 向以 node 为根的红黑树中插入元素 (key, value)，递归算法
  // 返回插入新节点后红黑树的根
  _add(node, key, value) {
    if (node === null) {
      this.size++
      return new Node(key, value)
    }

    if (key < node.key) {
      node.left = this._add(node.left, key, value)
    } else if (key > node.key) {
      node.right = this._add(node.right, key, value)
    } else {
      // key === node.key
      node.value = value
    }

    // 红黑树颜色旋转和颜色翻转
    // 左孩子不是红色，右孩子是红色
    if (!this._isRed(node.left) && this._isRed(node.right)) {
      node = this._leftRotate(node)
    }

    // 左孩子是红色，左孩子的左孩子还是红色
    if (this._isRed(node.left) && this._isRed(node.left.left)) {
      node = this._rightRotate(node)
    }

    // 左孩子是红色，右孩子也是红色
    if (this._isRed(node.left) && this._isRed(node.right)) {
      this._flipColors(node)
    }

    return node
  }

  // 返回以 node 为根节点的红黑树中，key 所在的节点
  _getNode(node, key) {
    if (node === null) {
      return null
    }

    if (key === node.key) {
      return node
    } else if (key < node.key) {
      return this._getNode(node.left, key)
    } else {
      // key > node.key
      return this._getNode(node.right, key)
    }
  }

  contains(key) {
    return this._getNode(this.root, key) !== null
  }

  get(key) {
    const node = this._getNode(this.root, key)
    return node === null ? null : node.value
  }

  set(key, newValue) {
    const node = this._getNode(this.root, key)

    if (node === null) {
      throw new Error(key + " doesn't exist!")
    }

    node.value = newValue
  }

  // 返回以 node 为根的红黑树的最小值所在的节点
  _minimum(node) {
    if (node.left === null) {
      return node
    }

    return this._minimum(node.left)
  }

  // 删除掉以 node 为根的红黑树中的最小节点
  // 返回删除节点后新的红黑树的根
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

  // 从红黑树中删除键为 key 的节点
  remove(key) {
    const node = this._getNode(this.root, key)

    if (node !== null) {
      this.root = this._remove(this.root, key)
      return node.value
    }

    return null
  }

  _remove(node, key) {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = this._remove(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this._remove(node.right, key)
      return node
    } else {
      // key === node.key
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

module.exports = RedBlackTree
