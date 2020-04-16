/*
 * @lc app=leetcode.cn id=111 lang=javascript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (36.66%)
 * Likes:    239
 * Dislikes: 0
 * Total Accepted:    65.1K
 * Total Submissions: 155.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 *
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最小深度  2.
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
 * @return {number}
 * recursion
 */
var minDepth = function (root) {
  if (root == null) return 0
  if (root.left == null && root.right == null) return 1
  let min = Number.MAX_SAFE_INTEGER
  if (root.left != null) min = Math.min(minDepth(root.left), min)
  if (root.right != null) min = Math.min(minDepth(root.right), min)
  return min + 1
}

// DFS iteration
var minDepth = function (root) {
  const stack = []
  if (root == null) {
    return 0
  } else {
    stack.push([root, 1])
  }

  let min = Number.MAX_SAFE_INTEGER
  while (stack.length !== 0) {
    const currentPair = stack.pop() // pop
    const root = currentPair[0]
    const currentDeep = currentPair[1]

    if (root.left == null && root.right == null) {
      min = Math.min(min, currentDeep)
    }
    if (root.left != null) stack.push([root.left, currentDeep + 1])
    if (root.right != null) stack.push([root.right, currentDeep + 1])
  }

  return min
}

// BFS iteration
var minDepth = function (root) {
  const stack = []
  if (root == null) {
    return 0
  } else {
    stack.push([root, 1])
  }

  let currentDeep = 0
  while (stack.length !== 0) {
    const currentPair = stack.shift() // shift
    const root = currentPair[0]
    currentDeep = currentPair[1]

    if (root.left == null && root.right == null) break
    if (root.left != null) stack.push([root.left, currentDeep + 1])
    if (root.right != null) stack.push([root.right, currentDeep + 1])
  }

  return currentDeep
}

// @lc code=end
