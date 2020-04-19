/*
 * @lc app=leetcode.cn id=102 lang=javascript
 *
 * [102] 二叉树的层次遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (52.91%)
 * Likes:    446
 * Dislikes: 0
 * Total Accepted:    104.7K
 * Total Submissions: 170.3K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）。
 *
 *
 *
 * 示例：
 * 二叉树：[3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 * 返回其层次遍历结果：
 *
 * [
 * ⁠ [3],
 * ⁠ [9,20],
 * ⁠ [15,7]
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
 * recursion
 */
var levelOrder = function (root) {
  const levels = []
  if (root == null) return []
  _levelOrder(root, 0)
  return levels

  function _levelOrder(root, level) {
    if (levels.length == level) levels.push([])
    levels[level].push(root.val)
    if (root.left != null) _levelOrder(root.left, level + 1)
    if (root.right != null) _levelOrder(root.right, level + 1)
  }
}
// @lc code=end

// iteration
var levelOrder = function (root) {
  const levels = []
  if (root == null) return []

  const queue = []
  queue.push(root)
  let level = 0
  while (queue.length !== 0) {
    levels.push([])
    const levelLength = queue.length

    for (let i = 0; i < levelLength; ++i) {
      const root = queue.shift()
      levels[level].push(root.val)
      if (root.left != null) queue.push(root.left)
      if (root.right != null) queue.push(root.right)
    }
    level++
  }
  return levels
}
