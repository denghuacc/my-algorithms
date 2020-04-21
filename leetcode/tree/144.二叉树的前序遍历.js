/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Medium (56.37%)
 * Likes:    238
 * Dislikes: 0
 * Total Accepted:    92K
 * Total Submissions: 141.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 前序 遍历。
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
 * 输出: [1,2,3]
 *
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
 * recursion
 */
var preorderTraversal = function (root) {
  const ret = []
  preorder(root, ret)
  return ret

  function preorder(node, arr) {
    if (node != null) {
      ret.push(node.val)
      preorder(node.left, arr)
      preorder(node.right, arr)
    }
  }
}

// iteration
var preorderTraversal = function (root) {
  const ret = []
  const stack = []
  if (root == null) return ret

  stack.push(root)
  while (stack.length !== 0) {
    const node = stack.pop()
    ret.push(node.val) // top -> bottom

    // 先进 right 后进 left
    // 栈：后进先出 pop 时先 left 后 right
    if (node.right != null) stack.push(node.right)
    if (node.left != null) stack.push(node.left)
  }

  return ret
}

// Morris
var preorderTraversal = function (root) {
  const ret = []

  let node = root
  while (node != null) {
    if (node.left == null) {
      ret.push(node.val)
      node = node.right
    } else {
      let pred = node.left
      while (pred.right != null && pred.right != node) {
        pred = pred.right
      }

      if (pred.right == null) {
        ret.push(node.val)
        pred.right = node
        node = node.left
      } else {
        pred.right = null
        node = node.right
      }
    }
  }

  return ret
}
// @lc code=end
