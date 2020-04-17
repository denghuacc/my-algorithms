import { Node } from '../models/tree-models'

/**
 * @name BST 二叉搜索树
 * @description
 * 特性①：二叉树每个节点的子节点不允许超过两个。
 * 特性②：二叉搜索树每个节点的值都比他的左子树的值大，比右子树的值小。
 * 应用：可以高效的在树中插入、 查找和删除数据。
 */
export default class BST<T> {
  root: Node<T> | undefined
  size: number = 0

  constructor() {}

  getSize() {
    return this.size
  }

  isEmpty() {
    return this.size === 0
  }

  // 向二分搜索树中添加值
  add(key: T) {
    this.root = this.addNode(this.root!, key)
  }

  private addNode(root: Node<T>, key: T): Node<T> {
    if (root == null) {
      this.size++
      return new Node(key)
    }

    if (key < root.key) {
      root.left = this.addNode(root.left!, key)
    } else if (key > root.key) {
      root.right = this.addNode(root.right!, key)
    }

    return root
  }

  // 看二分搜索树中是否包含值
  contains(key: T) {
    return this.containsNode(this.root!, key)
  }

  private containsNode(root: Node<T>, key: T): boolean {
    if (root == null) return false

    if (key === root.key) {
      return true
    } else if (key < root.key) {
      return this.containsNode(root.left!, key)
    } else {
      return this.containsNode(root.right!, key)
    }
  }

  // 二分搜索树的前序遍历 -> 深度优先搜索 DFS
  preOrder(arr: Array<T> = []) {
    this.preOrderTree(this.root!, arr)
  }

  private preOrderTree(root: Node<T>, arr: Array<T> = []) {
    if (root != null) {
      arr.push(root.key)
      this.preOrderTree(root.left!, arr)
      this.preOrderTree(root.right!, arr)
    }
  }

  // 二分搜索树的非递归前序遍历，需要借助栈 Stack 实现
  preOrderNR(arr: Array<T> = []) {
    if (this.root != null) {
      const stack: Array<Node<T>> = []
      stack.push(this.root)

      while (stack.length) {
        let curNode = stack.pop()
        arr.push(curNode!.key)

        if (curNode!.right != null) {
          stack.push(curNode!.right) // 右子节点树先入栈
        }

        if (curNode!.left != null) {
          stack.push(curNode!.left)
        }
      }
    }
  }

  // 二分搜索树的中序遍历 -> 数值升序排列
  inOrder(arr: Array<T> = []) {
    this.inOrderTree(this.root!, arr)
  }

  private inOrderTree(root: Node<T>, arr: Array<T> = []) {
    if (root != null) {
      this.inOrderTree(root.left!, arr)
      arr.push(root.key)
      this.inOrderTree(root.right!, arr)
    }
  }

  // 二分搜索树的后序遍历
  postOrder(arr: Array<T> = []) {
    this.postOrderTree(this.root!, arr)
  }

  private postOrderTree(root: Node<T>, arr: Array<T> = []) {
    if (root != null) {
      this.postOrderTree(root.left!, arr)
      this.postOrderTree(root.right!, arr)
      arr.push(root.key)
    }
  }

  // 二分搜索树的层序遍历，需要借助队列 Queue 实现 -> 广度优先搜索 BFS
  levelOrder(arr: Array<T> = []) {
    if (this.root != null) {
      const queue: Array<Node<T>> = []
      queue.push(this.root)

      while (queue.length) {
        let curNode = queue.shift()
        arr.push(curNode!.key)

        if (curNode!.left != null) {
          queue.push(curNode!.left) // 左子节点树先入列
        }

        if (curNode!.right != null) {
          queue.push(curNode!.right)
        }
      }
    }
  }

  // 寻找二分搜索树的最小元素
  min() {
    if (this.root == null) return undefined
    return this.minNode(this.root).key
  }

  private minNode(root: Node<T>): Node<T> {
    if (root.left == null) return root
    return this.minNode(root.left)
  }

  // 寻找二分搜索树的最大元素
  max() {
    if (this.root == null) return undefined
    return this.maxNode(this.root).key
  }

  private maxNode(root: Node<T>): Node<T> {
    if (root.right == null) return root
    return this.maxNode(root.right)
  }

  // 从二分搜索树中删除最小值所在节点, 返回最小值
  removeMin() {
    const ret = this.min()
    this.root = this.removeMinNode(this.root!)
    return ret != null ? ret : undefined
  }

  private removeMinNode(root: Node<T>) {
    if (root.left == null) {
      const rightNode = root.right
      root.right = undefined
      this.size--
      return rightNode
    }

    root.left = this.removeMinNode(root.left)
    return root
  }

  // 从二分搜索树中删除最大值所在节点
  removeMax() {
    const ret = this.max()
    this.root = this.removeMaxNode(this.root!)
    return ret
  }

  private removeMaxNode(root: Node<T>) {
    if (root.right == null) {
      const leftNode = root.left
      root.left = undefined
      this.size--
      return leftNode
    }

    root.right = this.removeMaxNode(root.right)
    return root
  }

  // 从二分搜索树中删除值为 key 的节点
  remove(key: T) {
    this.root = this.removeNode(this.root!, key)
  }

  protected removeNode(root: Node<T>, key: T) {
    if (root == null) return undefined

    if (key < root.key) {
      root.left = this.removeNode(root.left!, key)
      return root
    } else if (key > root.key) {
      root.right = this.removeNode(root.right!, key)
      return root
    } else {
      // key === root.key

      // 待删除节点左子树为空的情况
      if (root.left == null) {
        const rightNode = root.right
        root.right = undefined
        this.size--
        return rightNode
      }

      // 待删除节点右子树为空的情况
      if (root.right == null) {
        const leftNode = root.left
        root.left = undefined
        this.size--
        return leftNode
      }

      // 待删除节点左右子树均不为空的情况
      // 找到比待删除节点大的最小节点, 即待删除节点右子树的最小节点
      // 用这个节点顶替待删除节点的位置
      const successor = this.minNode(root.right!)
      successor.right = this.removeMinNode(root.right!)
      successor.left = root.left

      root.left = root.right = undefined
      return successor
    }
  }
}
