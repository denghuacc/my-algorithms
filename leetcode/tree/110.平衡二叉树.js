/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
 *
 * https://leetcode-cn.com/problems/balanced-binary-tree/description/
 *
 * algorithms
 * Easy (45.89%)
 * Likes:    284
 * Dislikes: 0
 * Total Accepted:    64.9K
 * Total Submissions: 127.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，判断它是否是高度平衡的二叉树。
 *
 * 本题中，一棵高度平衡二叉树定义为：
 *
 *
 * 一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
 *
 *
 * 示例 1:
 *
 * 给定二叉树 [3,9,20,null,null,15,7]
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回 true 。
 *
 * 示例 2:
 *
 * 给定二叉树 [1,2,2,3,3,null,null,4,4]
 *
 * ⁠      1
 * ⁠     / \
 * ⁠    2   2
 * ⁠   / \
 * ⁠  3   3
 * ⁠ / \
 * ⁠4   4
 *
 *
 * 返回 false 。
 *
 *
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
 * 自顶向下的递归
 */
var isBalanced = function (root) {
  if (root == null) return true
  return (
    Math.abs(height(root.left) - height(root.right)) < 2 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  )

  // 节点的高度
  function height(root) {
    if (root == null) return -1
    return 1 + Math.max(height(root.left), height(root.right))
  }
}

// 自底向上的递归
var isBalanced = function (root) {
  return isBalancedTree(root).balanced

  function isBalancedTree(root) {
    if (root == null) return new TreeInfo(-1, true)

    const left = isBalancedTree(root.left)
    if (!left.balanced) return new TreeInfo(-1, false)

    const right = isBalancedTree(root.right)
    if (!right.balanced) return new TreeInfo(-1, false)

    if (Math.abs(left.height - right.height) < 2) {
      return new TreeInfo(Math.max(left.height, right.height) + 1, true)
    }

    return new TreeInfo(-1, false)
  }

  function TreeInfo(height, balanced) {
    this.height = height
    this.balanced = balanced
  }
}

// 自底向上的递归2
var isBalanced = function (root) {
  return height(root) !== -1

  function height(root) {
    if (root == null) return 0
    const left = height(root.left)
    if (left === -1) return -1
    const right = height(root.right)
    if (right === -1) return -1
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
  }
}
// @lc code=end
