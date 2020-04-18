/*
 * @lc app=leetcode.cn id=100 lang=javascript
 *
 * [100] 相同的树
 *
 * https://leetcode-cn.com/problems/same-tree/description/
 *
 * algorithms
 * Easy (50.90%)
 * Likes:    340
 * Dislikes: 0
 * Total Accepted:    77.5K
 * Total Submissions: 135.7K
 * Testcase Example:  '[1,2,3]\n[1,2,3]'
 *
 * 给定两个二叉树，编写一个函数来检验它们是否相同。
 *
 * 如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。
 *
 * 示例 1:
 *
 * 输入:       1         1
 * ⁠         / \       / \
 * ⁠        2   3     2   3
 *
 * ⁠       [1,2,3],   [1,2,3]
 *
 * 输出: true
 *
 * 示例 2:
 *
 * 输入:      1          1
 * ⁠         /           \
 * ⁠        2             2
 *
 * ⁠       [1,2],     [1,null,2]
 *
 * 输出: false
 *
 *
 * 示例 3:
 *
 * 输入:       1         1
 * ⁠         / \       / \
 * ⁠        2   1     1   2
 *
 * ⁠       [1,2,1],   [1,1,2]
 *
 * 输出: false
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 * 递归
 */
var isSameTree = function (p, q) {
  if (p == null && q == null) return true
  if (p == null || q == null) return false
  if (p.val !== q.val) return false
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
}

// 迭代
var isSameTree = function (p, q) {
  if (p == null && q == null) return true
  if (!check(p, q)) return false

  const depP = []
  const depQ = []
  depP.push(p)
  depQ.push(q)

  while (depP.length !== 0) {
    p = depP.shift()
    q = depQ.shift()
    if (!check(p, q)) return false
    if (p != null) {
      if (!check(p.left, q.left)) return false
      if (p.left != null) {
        depP.push(p.left)
        depQ.push(q.left)
      }

      if (!check(p.right, q.right)) return false
      if (p.right != null) {
        depP.push(p.right)
        depQ.push(q.right)
      }
    }
  }

  return true

  function check(p, q) {
    if (p == null && q == null) return true
    if (p == null || q == null) return false
    if (p.val !== q.val) return false
    return true
  }
}
// @lc code=end
