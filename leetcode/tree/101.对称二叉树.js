/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
 *
 * https://leetcode-cn.com/problems/symmetric-tree/description/
 *
 * algorithms
 * Easy (44.66%)
 * Likes:    712
 * Dislikes: 0
 * Total Accepted:    119.9K
 * Total Submissions: 236.3K
 * Testcase Example:  '[1,2,2,3,4,4,3]'
 *
 * 给定一个二叉树，检查它是否是镜像对称的。
 *
 *
 *
 * 例如，二叉树 [1,2,2,3,4,4,3] 是对称的。
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠/ \ / \
 * 3  4 4  3
 *
 *
 *
 *
 * 但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   2
 * ⁠  \   \
 * ⁠  3    3
 *
 *
 *
 *
 * 进阶：
 *
 * 你可以运用递归和迭代两种方法解决这个问题吗？
 *
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  return isMirror(root, root)

  function isMirror(t1, t2) {
    if (t1 == null && t2 == null) return true
    if (t1 == null || t2 == null) return false
    return (
      t1.val === t2.val &&
      isMirror(t1.left, t2.right) &&
      isMirror(t1.right, t2.left)
    )
  }
}
// @lc code=end

// 迭代
// JS 使用 LinkedListQueue 和数组都超时
var isSymmetric = function (root) {
  const queue = new LinkedListQueue()
  queue.enqueue(root)
  queue.enqueue(root)

  while (queue !== 0) {
    const t1 = queue.dequeue()
    const t2 = queue.dequeue()
    if (t1 == null && t2 == null) continue
    if (t1 == null || t2 == null) return false
    if (t1.val != t2.val) return false
    queue.enqueue(t1.left)
    queue.enqueue(t2.right)
    queue.enqueue(t1.right)
    queue.enqueue(t2.left)
  }
  return true
}

class Node {
  constructor(val = null, next = null) {
    this.val = val
    this.next = null
  }
}

/**
 * @name LinkedListQueue 队列 -> 使用链表实现队列
 * @description 这里使用了表头 head 和表尾 tail 属性，入列和出列都是 O(1)
 */
class LinkedListQueue {
  constructor() {
    this.head = null // 表头
    this.tail = null // 表尾
    this.size = 0
  }

  // 入列 O(1)
  enqueue(val) {
    if (this.tail == null) {
      this.tail = new Node(val)
      this.head = this.tail
    } else {
      this.tail.next = new Node(val)
      this.tail = this.tail.next
    }
    this.size++
  }

  // 出列 O(1)
  dequeue() {
    if (!this.isEmpty()) {
      const retNode = this.head
      this.head = this.head.next
      retNode.next = null

      if (this.head == null) {
        this.tail = null
      }
      this.size--
      return retNode.val
    }
  }

  // 获取队列的第一个元素 O(1)
  getFront() {
    if (!this.isEmpty()) {
      return this.head.val
    }
  }

  // 获取队列的元素数量 O(1)
  getSize() {
    return this.size
  }

  // 查询队列是否为空 O(1)
  isEmpty() {
    return this.size === 0
  }

  print() {
    let cur = this.head,
      str = 'Queue: front '

    // 遍历节点
    while (cur != null) {
      str += cur.val + ' -> '
      cur = cur.next
    }

    str += 'null tail'
    return str
  }
}
