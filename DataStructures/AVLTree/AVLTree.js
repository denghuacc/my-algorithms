class Node {
  constructor(key, value) {
    this.key = key
    this.value = value
    this.left = null
    this.right = null
    this.height = 1 // 树的高度值，初始为 1
  }
}
/**
 * @name AVLTree 自平衡树
 * @description
 * 使用 BSTMap 来修改
 */
class AVLTree {
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

  // 二叉树的中序遍历
  _inOrder(node, arr) {
    if (node === null) {
      return
    }

    this._inOrder(node.left, arr)
    arr.push(node.key)
    this._inOrder(node.right, arr)
  }

  // 判断该二叉树是否是一棵平衡二叉树
  isBalanced() {
    return this._isBalanced(this.root)
  }

  // 判断以 Node 为根的二叉树是否是一棵平衡二叉树，递归算法
  _isBalanced(node) {
    if (node === null) {
      return true
    }
    const balanceFactor = this._getBalancedFactor(node) // 平衡因子

    if (Math.abs(balanceFactor) > 1) {
      return false
    }

    // 只有节点的左右子树都是平衡二叉树， 它才是平衡二叉树
    return this._isBalanced(node.left) && this._isBalanced(node.right)
  }

  // 获取节点 node 的高度
  _getHeight(node) {
    if (node === null) {
      return 0
    }
    return node.height
  }

  // 获取节点 node 的平衡因子 左子树高度减去右子树高度的值
  _getBalancedFactor(node) {
    if (node === null) {
      return 0
    }
    return this._getHeight(node.left) - this._getHeight(node.right)
  }

  // 对节点 y 进行向右旋转操作，返回旋转后新的根节点 x
  //        y                              x
  //       / \                           /   \
  //      x   T4     向右旋转 (y)        z     y
  //     / \       - - - - - - - ->    / \   / \
  //    z   T3                       T1  T2 T3 T4
  //   / \
  // T1   T2
  _rightRotate(y) {
    const x = y.left
    const T3 = x.right

    // 向右旋转过程
    x.right = y
    y.left = T3

    // 更新高度，先更新 y 的高度， 再更新 x 的高度
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1

    return x
  }

  // 对节点 y 进行向左旋转操作，返回旋转后新的根节点 x
  //    y                             x
  //  /  \                          /   \
  // T1   x      向左旋转 (y)       y     z
  //     / \   - - - - - - - ->   / \   / \
  //   T2  z                     T1 T2 T3 T4
  //      / \
  //     T3 T4
  _leftRotate(y) {
    const x = y.right
    const T2 = x.left

    // 向左旋转过程
    x.left = y
    y.right = T2

    // 更新高度，先更新 y 的高度， 再更新 x 的高度
    y.height = Math.max(this._getHeight(y.left), this._getHeight(y.right)) + 1
    x.height = Math.max(this._getHeight(x.left), this._getHeight(x.right)) + 1

    return x
  }

  // 向 AVL 树中添加新的元素 (key, value)
  add(key, value) {
    this.root = this._add(this.root, key, value)
  }

  // 向以 node 为根的 AVL 树中插入元素 (key, value)，递归算法
  // 返回插入新节点后 AVL 树的根
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

    // 添加元素后需要维护树的平衡
    // 更新 height
    node.height =
      1 + Math.max(this._getHeight(node.left), this._getHeight(node.right))

    // 计算平衡因子
    const balanceFactor = this._getBalancedFactor(node)
    // if (Math.abs(balanceFactor) > 1) {
    //   console.log('unbalanced: ' + balanceFactor)
    // }

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && this._getBalancedFactor(node.left) >= 0) {
      return this._rightRotate(node)
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && this._getBalancedFactor(node.right) <= 0) {
      return this._leftRotate(node)
    }

    //       y                            y                         z
    //     /  \                         /  \                      /   \
    //    x    T4   向左旋转 (x)        z    T4   向右旋转 (y)      x     y
    //  /  \       - - - - - - ->    / \        - - - - - - ->  / \   / \
    // T1   z                       x  T3                      T1 T2 T3 T4
    //     / \                     / \
    //    T2 T3                   T1 T2
    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && this._getBalancedFactor(node.left) < 0) {
      node.left = this._leftRotate(node.left)
      return this._rightRotate(node)
    }

    //    y                         y                            z
    //  /  \                      /  \                         /   \
    // T1   x     向右旋转 (x)    T1    z       向左旋转 (y)     y     x
    //     / \   - - - - - - ->      /  \    - - - - - - ->  / \   / \
    //   z    T4                    T2   x                  T1 T2 T3 T4
    //  / \                             / \
    // T2 T3                           T3 T4
    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && this._getBalancedFactor(node.right) > 0) {
      node.right = this._rightRotate(node.right)
      return this._leftRotate(node)
    }

    return node
  }

  // 返回以node为根节点的 AVL 树中，key 所在的节点
  _getNode(node, key) {
    if (node === null) {
      return null
    }

    if (key === node.key) {
      return node
    } else if (key < node.key) {
      return this._getNode(node.left, key)
    } else {
      // if (key > node.key)
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

  // 返回以 node 为根的 AVL 树的最小值所在的节点
  _minimum(node) {
    if (node.left === null) {
      return node
    }

    return this._minimum(node.left)
  }

  // 从 AVL 树中删除键为 key 的节点
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

    let retNode // 创建一个返回的节点
    if (key < node.key) {
      node.left = this._remove(node.left, key)
      // return node
      retNode = node
    } else if (key > node.key) {
      node.right = this._remove(node.right, key)
      // return node
      retNode = node
    } else {
      // key === node.key
      // 逻辑需要改为互斥  if ... else if ...else
      if (node.left === null) {
        const rightNode = node.right
        node.right = null
        this.size--
        // return rightNode
        retNode = rightNode
      } else if (node.right === null) {
        const leftNode = node.left
        node.left = null
        this.size--
        // return leftNode
        retNode = leftNode
      }

      // 待删除节点左右子树均不为空的情况

      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      else {
        const successor = this._minimum(node.right)
        // successor.right = this._removeMin(node.right)
        successor.right = this._remove(node.right, successor.key) // 删除代码复用会 remove 的平衡逻辑
        successor.left = node.left

        node.left = node.right = null
        // return successor
        retNode = successor
      }
    }

    // retNode 可能为空
    if (retNode === null) {
      return null
    }

    // 删除元素后需要维护树的平衡，逻辑和添加元素一样
    // 更新 height
    retNode.height =
      1 +
      Math.max(this._getHeight(retNode.left), this._getHeight(retNode.right))

    // 计算平衡因子
    const balanceFactor = this._getBalancedFactor(retNode)
    // if (Math.abs(balanceFactor) > 1) {
    //   console.log('unbalanced: ' + balanceFactor)
    // }

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && this._getBalancedFactor(retNode.left) >= 0) {
      return this._rightRotate(retNode)
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && this._getBalancedFactor(retNode.right) <= 0) {
      return this._leftRotate(retNode)
    }

    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && this._getBalancedFactor(retNode.left) < 0) {
      retNode.left = this._leftRotate(retNode.left)
      return this._rightRotate(retNode)
    }

    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && this._getBalancedFactor(retNode.right) > 0) {
      retNode.right = this._rightRotate(retNode.right)
      return this._leftRotate(retNode)
    }

    return retNode
  }
}

module.exports = AVLTree
