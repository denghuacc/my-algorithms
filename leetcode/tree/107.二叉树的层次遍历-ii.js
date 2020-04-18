/*
 * @lc app=leetcode.cn id=107 lang=javascript
 *
 * [107] 二叉树的层次遍历 II
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/description/
 *
 * algorithms
 * Easy (58.38%)
 * Likes:    216
 * Dislikes: 0
 * Total Accepted:    50.9K
 * Total Submissions: 78.6K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 * 返回其自底向上的层次遍历为：
 *
 * [
 * ⁠ [15,7],
 * ⁠ [9,20],
 * ⁠ [3]
 * ]
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
 * @return {number[][]}
 */
var levelOrderBottom = function (root) {
  const ret = []
  levelOrder(root, 0)
  return ret.reverse()

  function levelOrder(node, level) {
    if (node == null) return
    ret[level] ? ret[level].push(node.val) : (ret[level] = [node.val])
    level++
    levelOrder(node.left, level)
    levelOrder(node.right, level)
  }
}

var levelOrderBottom = function (root) {
  const ret = []
  if (root == null) return ret
  const queue = []
  queue.push(root)

  while (queue.length !== 0) {
    const size = queue.length
    const levels = []
    for (let i = 0; i < size; i++) {
      const node = queue.shift()
      levels.push(node.val)
      if (node.left != null) queue.push(node.left)
      if (node.right != null) queue.push(node.right)
    }
    ret.unshift(levels)
  }

  return ret
}
// @lc code=end
