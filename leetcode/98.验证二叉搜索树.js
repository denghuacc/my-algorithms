/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
 *
 * https://leetcode-cn.com/problems/validate-binary-search-tree/description/
 *
 * algorithms
 * Medium (24.10%)
 * Likes:    506
 * Dislikes: 0
 * Total Accepted:    90.1K
 * Total Submissions: 303.1K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
 *
 * 假设一个二叉搜索树具有如下特征：
 *
 *
 * 节点的左子树只包含小于当前节点的数。
 * 节点的右子树只包含大于当前节点的数。
 * 所有左子树和右子树自身必须也是二叉搜索树。
 *
 *
 * 示例 1:
 *
 * 输入:
 * ⁠   2
 * ⁠  / \
 * ⁠ 1   3
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入:
 * ⁠   5
 * ⁠  / \
 * ⁠ 1   4
 * / \
 * 3   6
 * 输出: false
 * 解释: 输入为: [5,1,4,null,null,3,6]。
 * 根节点的值为 5 ，但是其右子节点值为 4 。
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
 */
var isValidBST = function (root) {
  return _isValidBST(root, null, null)

  function _isValidBST(root, lower, upper) {
    if (root == null) return true

    const val = root.val
    if (lower != null && val <= lower) return false
    if (upper != null && val >= upper) return false

    if (!_isValidBST(root.right, val, upper)) return false
    if (!_isValidBST(root.left, lower, val)) return false

    return true
  }
}

// 迭代
var isValidBST = function (root) {
  const stack = [],
    lowers = [],
    uppers = []
  let lower = null,
    upper = null,
    val
  update(root, lower, upper)

  while (stack.length !== 0) {
    root = stack.pop()
    lower = lowers.pop()
    upper = uppers.pop()

    if (root == null) continue
    val = root.val
    if (lower != null && val <= lower) return false
    if (upper != null && val >= upper) return false
    update(root.right, val, upper)
    update(root.left, lower, val)
  }

  return true

  function update(root, lower, upper) {
    stack.push(root)
    lowers.push(lower)
    uppers.push(upper)
  }
}

// 中序遍历
var isValidBST = function (root) {
  const stack = []
  let inorder = -Number.MAX_SAFE_INTEGER

  while (stack.length !== 0 || root != null) {
    while (root != null) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    if (root.val <= inorder) return false
    inorder = root.val
    root = root.right
  }
  return true
}
// @lc code=end
