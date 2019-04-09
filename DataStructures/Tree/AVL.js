class Node {
  constructor(key) {
    this.key = key // 节点的值
    this.left = null // 节点的左子节点
    this.right = null // 节点的右子节点
  }
}

/**
 * @name AVL Adelson-Velskii-Landi 树，也叫 自平衡树
 * @description BST存在一个问题：取决于你添加的节点数，树的一条边可能会非常深；
 * 也就是说，树的一条分支会有很多层，而其他的分支却只有几层；
 * AVL树是一种自平衡二叉搜索树；
 * 意思是任何一个节点左右两侧子树的高度之差最多为 1
 * 也就是说这种树会在添加或移除节点时尽量试着成为一棵完全树
 * @description 将 BST 修改成 AVL，需要修改节点插入方法 `insertNode`
 */
class AVL {
  constructor() {
    this.root = null
  }

  insert(key) {
    const newNode = new Node(key)
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)

        // 确认是否平衡
        if (node.left !== null) {
          if (this.heightNode(node.left) - this.heightNode(node.right) > 1) {
            if (newNode < node.left.key) {
              node = this.rotationLL(node)
            } else {
              node = this.rotationLR(node)
            }
          }
        }
      }
    } else {
      if (node.right === null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)

        // 确认是否平衡
        if (node.right !== null) {
          if (this.heightNode(node.right) - this.heightNode(node.left) > 1) {
            if (newNode > node.right.key) {
              node = this.rotationRR(node)
            } else {
              node = this.rotationRL(node)
            }
          }
        }
      }
    }
  }

  heightNode(node) {
    if (node === null) {
      return -1
    } else {
      return (
        Math.max(this.heightNode(node.left), this.heightNode(node.right)) + 1
      )
    }
  }

  rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }
  rotationLL(node) {
    const tmp = node.left
    node.left = tmp.right
    tmp.right = node
    return tmp
  }
  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }
  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback)
  }

  inOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback)
      callback(node.key)
      this.inOrderTraverseNode(node.right, callback)
    }
  }

  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback)
  }

  preOrderTraverseNode(node, callback) {
    if (node !== null) {
      callback(node.key)
      this.preOrderTraverseNode(node.left, callback)
      this.preOrderTraverseNode(node.right, callback)
    }
  }

  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback)
  }

  postOrderTraverseNode(node, callback) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback)
      this.postOrderTraverseNode(node.right, callback)
      callback(node.key)
    }
  }

  min() {
    return this.minNode(this.root)
  }

  minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left
      }
      return node.key
    }
    return null
  }

  max() {
    return this.maxNode(this.root)
  }

  maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right
      }
      return node.key
    }
    return null
  }

  search(key) {
    return this.searchNode(this.root, key)
  }

  searchNode(node, key) {
    if (node === null) {
      return false
    }
    if (key < node.key) {
      return this.searchNode(node.left, key)
    } else if (key > node.key) {
      return this.searchNode(node.right, key)
    } else {
      return true
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key)
  }

  removeNode(node, key) {
    if (node === null) {
      return null
    }

    if (key < node.key) {
      node.left = this.removeNode(node.left, key)
      return node
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key)
      return node
    } else {
      if (node.left === null && node.right === null) {
        node = null
        return node
      }
      if (node.left === null) {
        node = node.right
        return node
      } else if (node.right === null) {
        node = node.left
        return node
      }
      const aux = this.findMinNode(node.right)
      node.key = aux.key
      node.right = this.removeNode(node.right, aux.key)
      return node
    }
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left
    }
    return node
  }
}

// test
let bst = new AVL()
bst.insert(23)
bst.insert(45)
bst.insert(16)
bst.insert(37)
bst.insert(3)
bst.insert(99)
bst.insert(22)

// 中序遍历
console.log('inOrderTraverse:')
bst.inOrderTraverse(x => console.log(x))

// 先序遍历
console.log('preOrderTraverse:')
bst.preOrderTraverse(x => console.log(x))

// 后续遍历
console.log('postOrderTraverse:')
bst.postOrderTraverse(x => console.log(x))

// 查找最小值
console.log('min', bst.min())

// 查找最大值
console.log('max', bst.max())

// 查找指定值
console.log('search', bst.search(23))

// 删除指定值
bst.inOrderTraverse(x => console.log(x))
bst.remove(37)
console.log('remove 37')
bst.inOrderTraverse(x => console.log(x))
