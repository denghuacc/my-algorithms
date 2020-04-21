/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Hard (63.43%)
 * Likes:    281
 * Dislikes: 0
 * Total Accepted:    69.7K
 * Total Submissions: 98K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
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
 * 输出: [3,2,1]
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
var postorderTraversal = function (root) {
  const ret = []
  postorder(root, ret)
  return ret

  function postorder(node, arr) {
    if (node != null) {
      postorder(node.left, arr)
      postorder(node.right, arr)
      ret.push(node.val)
    }
  }
}
// @lc code=end

// iteration -> 逆前序
var postorderTraversal = function (root) {
  const ret = []
  const stack = []
  if (root == null) return ret

  stack.push(root)
  while (stack.length !== 0) {
    const node = stack.pop()
    ret.unshift(node.val) // unshift -> 和 preorder 相反

    // 先进 left 后进 right -> 和 preorder 进栈相反
    if (node.left != null) stack.push(node.left)
    if (node.right != null) stack.push(node.right)
  }

  return ret
}

// iteration2
var postorderTraversal = function (root) {
  const ret = []
  const stack = []
  let cur = root
  let top = null

  while (cur != null || stack.length !== 0) {
    while (cur != null) {
      stack.push(cur)
      cur = cur.left
    }
    cur = stack[stack.length - 1]

    if (cur.right == null || cur.right == top) {
      ret.push(cur.val)
      stack.pop()
      top = cur
      cur = null
    } else {
      cur = cur.right
    }
  }

  return ret
}
