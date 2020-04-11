/**
 * @name Node 二叉搜索树的节点
 */
class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.left = null
    this.right = null
  }
}

/**
 * @name BSTMap 映射
 * @description 使用二叉搜索树实现 ES6 映射 Map
 */
class BSTMap {
  constructor() {
    this.root = null
    this.size = 0
  }

  // 设置值 n(log2(n))
  set(key, val) {
    this.root = this._set(this.root, key, val)
    return this
  }

  _set(root, key, val) {
    if (root == null) {
      this.size++
      return new Node(key, val)
    }

    if (key < root.key) {
      root.left = this._set(root.left, key, val)
    } else if (key > root.key) {
      root.right = this._set(root.right, key, val)
    } else {
      root.val = val
    }

    return root
  }

  // 获取值 n(log2(n))
  get(key) {
    const node = this._getNode(this.root, key)
    return node == null ? undefined : node.val
  }

  // 查询值 n(log2(n))
  has(key) {
    return this._getNode(this.root, key) != null
  }

  // 清空值 O(1)
  clear() {
    this.root = null
    this.size = 0
  }

  // 删除值 n(log2(n))
  delete(key) {
    const node = this._getNode(this.root, key)

    if (node != null) {
      this.root = this._delete(this.root, key)
      return true
    }

    return false
  }

  _delete(root, key) {
    if (root == null) {
      return null
    }

    if (key < root.key) {
      root.left = this._delete(root.left, key)
      return root
    } else if (key > root.key) {
      root.right = this._delete(root.right, key)
      return root
    } else {
      if (root.left == null) {
        const rightNode = root.right
        root.right = null
        this.size--
        return rightNode
      }

      if (root.right == null) {
        const leftNode = root.left
        root.left = null
        this.size--
        return leftNode
      }

      const successor = this._minimum(root.right)
      successor.right = this._deleteMin(root.right)
      successor.left = root.left

      root.left = root.right = null
      return successor
    }
  }

  _minimum(root) {
    if (root.left == null) {
      return root
    }

    return this._minimum(root.left)
  }

  _deleteMin(root) {
    if (root.left == null) {
      const rightNode = root.right
      root.right = null
      this.size--
      return rightNode
    }

    root.left = this._deleteMin(root.left)
    return root
  }

  // 通过 key 获取对应的节点 辅助函数
  _getNode(root, key) {
    if (root == null) {
      return null
    }

    if (key === root.key) {
      return root
    } else if (key < root.key) {
      return this._getNode(root.left, key)
    } else {
      return this._getNode(root.right, key)
    }
  }
}

module.exports = BSTMap
