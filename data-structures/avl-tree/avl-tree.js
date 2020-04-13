/**
 * @name Node 节点
 * @description 树的节点
 */
class Node {
  constructor(key, val) {
    this.key = key
    this.val = val
    this.left = null
    this.right = null
    this.height = 1 // 树的高度值，初始为 1
  }
}
/**
 * @name AVLTree AVL 树
 * @description  AVL 树是一种自平衡树
 * 特性：添加或移除节点时， AVL树会尝试自平衡，尽可能尝试转换为完全树。
 * 任意一个节点（不论深度）的左子树和右子树高度最多相差1。
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

    const stack = []
    stack.push(this.root)

    while (stack.length !== 0) {
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

    const queue = []
    queue.push(this.root)

    while (queue.length !== 0) {
      let curNode = queue.shift()
      arr.push(curNode.key)

      if (curNode.left != null) {
        queue.push(curNode.left) // 左子节点树先入列
      }

      if (curNode.right != null) {
        queue.push(curNode.right)
      }
    }
  }

  // 判断该二叉树是否是一棵平衡二叉树
  isBalanced() {
    return this._isBalanced(this.root)
  }

  // 判断以 Node 为根的二叉树是否是一棵平衡二叉树，递归算法
  _isBalanced(root) {
    if (root == null) {
      return true
    }
    const balanceFactor = this._getBalancedFactor(root) // 平衡因子

    if (Math.abs(balanceFactor) > 1) {
      return false
    }

    // 只有节点的左右子树都是平衡二叉树， 它才是平衡二叉树
    return this._isBalanced(root.left) && this._isBalanced(root.right)
  }

  // 获取节点 root 的高度
  _getHeight(root) {
    if (root == null) {
      return 0
    }
    return root.height
  }

  // 获取节点 root 的平衡因子 左子树高度减去右子树高度的值
  _getBalancedFactor(root) {
    if (root == null) {
      return 0
    }
    return this._getHeight(root.left) - this._getHeight(root.right)
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

  // 向 AVL 树中添加新的元素 (key, val)
  add(key, val) {
    this.root = this._add(this.root, key, val)
  }

  // 向以 root 为根的 AVL 树中插入元素 (key, val)，递归算法
  // 返回插入新节点后 AVL 树的根
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
      root.val = val
    }

    // 添加元素后需要维护树的平衡
    // 更新 height
    root.height =
      1 + Math.max(this._getHeight(root.left), this._getHeight(root.right))

    // 计算平衡因子
    const balanceFactor = this._getBalancedFactor(root)
    // if (Math.abs(balanceFactor) > 1) {
    //   console.log('unbalanced: ' + balanceFactor)
    // }

    // 平衡维护
    // LL 节点左孩子比右孩子高 且 左节点的左孩子比右孩子也更高 【父子节点高低一样 左左】
    if (balanceFactor > 1 && this._getBalancedFactor(root.left) >= 0) {
      return this._rightRotate(root)
    }

    // RR RL 节点右孩子比左孩子高 且 右节点的右孩子比左孩子也更高 【父子节点高低一样 右右】
    if (balanceFactor < -1 && this._getBalancedFactor(root.right) <= 0) {
      return this._leftRotate(root)
    }

    //       y                            y                         z
    //     /  \                         /  \                      /   \
    //    x    T4   向左旋转 (x)        z    T4   向右旋转 (y)      x     y
    //  /  \       - - - - - - ->    / \        - - - - - - ->  / \   / \
    // T1   z                       x  T3                      T1 T2 T3 T4
    //     / \                     / \
    //    T2 T3                   T1 T2
    // LR 节点左孩子比右孩子高 且 左节点的右孩子比左孩子也更高 【父子节点高低不一样 左右】
    if (balanceFactor > 1 && this._getBalancedFactor(root.left) < 0) {
      root.left = this._leftRotate(root.left)
      return this._rightRotate(root)
    }

    //    y                         y                            z
    //  /  \                      /  \                         /   \
    // T1   x     向右旋转 (x)    T1    z       向左旋转 (y)     y     x
    //     / \   - - - - - - ->      /  \    - - - - - - ->  / \   / \
    //   z    T4                    T2   x                  T1 T2 T3 T4
    //  / \                             / \
    // T2 T3                           T3 T4
    // RL 节点右孩子比左孩子高 且 右节点的左孩子比右孩子也更高 【父子节点高低不一样 右左】
    if (balanceFactor < -1 && this._getBalancedFactor(root.right) > 0) {
      root.right = this._rightRotate(root.right)
      return this._leftRotate(root)
    }

    return root
  }

  // 返回以 node为根节点的 AVL 树中，key 所在的节点
  _getNode(root, key) {
    if (root == null) {
      return null
    }

    if (key === root.key) {
      return root
    } else if (key < root.key) {
      return this._getNode(root.left, key)
    } else {
      // if (key > root.key)
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

  set(key, newValue) {
    const root = this._getNode(this.root, key)

    if (root == null) {
      throw new Error(key + " doesn't exist!")
    }

    root.val = newValue
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

  // 从 AVL 树中删除键为 key 的节点
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

    let retNode // 创建一个返回的节点
    if (key < root.key) {
      root.left = this._remove(root.left, key)
      // return root
      retNode = root
    } else if (key > root.key) {
      root.right = this._remove(root.right, key)
      // return root
      retNode = root
    } else {
      // key === root.key
      // 逻辑需要改为互斥  if ... else if ...else
      if (root.left == null) {
        const rightNode = root.right
        root.right = null
        this.size--
        // return rightNode
        retNode = rightNode
      } else if (root.right == null) {
        const leftNode = root.left
        root.left = null
        this.size--
        // return leftNode
        retNode = leftNode
      }

      // 待删除节点左右子树均不为空的情况

      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      else {
        const successor = this._minimum(root.right)
        // successor.right = this._removeMin(root.right)
        successor.right = this._remove(root.right, successor.key) // 删除代码复用会 remove 的平衡逻辑
        successor.left = root.left

        root.left = root.right = null
        // return successor
        retNode = successor
      }
    }

    // retNode 可能为空
    if (retNode == null) {
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
