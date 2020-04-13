/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (63.61%)
 * Likes:    462
 * Dislikes: 0
 * Total Accepted:    137.8K
 * Total Submissions: 194.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的中序 遍历。
 *
 * 示例:
 *
 * 输入: [1,null,2,3]
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3
 *
 * 输出: [1,3,2]
 *
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
 * @return {number[]}
 * 递归
 */
var inorderTraversal = function (root) {
  const ret = []
  inOrder(root, ret)
  return ret

  function inOrder(root, arr) {
    if (root != null) {
      if (root.left != null) {
        inOrder(root.left, arr)
      }
      ret.push(root.val)
      if (root.right != null) {
        inOrder(root.right, arr)
      }
    }
  }
}

// 迭代
var inorderTraversal = function (root) {
  const ret = []
  const stack = []
  let curr = root
  while (curr != null || !stack.length === 0) {
    while (curr != null) {
      stack.push(curr)
      curr = curr.left
    }
    curr = stack.pop()
    ret.push(curr.val)
    curr = curr.right
  }
  return ret
}

// 线索二叉树
var inorderTraversal = function (root) {
  const ret = []
  let curr = root,
    prev
  while (curr != null) {
    if (curr.left == null) {
      ret.push(curr.val)
      curr = curr.right
    } else {
      prev = curr.left
      while (prev.right != null) {
        prev = prev.right
      }
      prev.right = curr
      let temp = curr
      curr = curr.left
      temp.left = null
    }
  }
  return ret
}
// @lc code=end
