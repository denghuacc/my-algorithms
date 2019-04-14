class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
  }
}

class BSTMap {
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

  add(key, value) {
    this.root = this._add(this.root, key, value)
  }

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
      node.value = value
    }

    return node
  }

  _getNode(node, key) {
    if (node === null) {
      return null
    }

    if (key === node.key) {
      return node
    } else if (key < node.key) {
      return this._getNode(node.left, key)
    } else {
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

  _minimum(node) {
    if (node.left === null) {
      return node
    }

    return this._minimum(node.left)
  }

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
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        return rightNode
      }

      if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        return leftNode
      }

      const successor = this._minimum(node.right)
      successor.right = this._removeMin(node.right)
      successor.left = node.left

      node.left = node.right = null
      return successor
    }
  }
}

module.exports = BSTMap
