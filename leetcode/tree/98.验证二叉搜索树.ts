/*
 * @lc app=leetcode.cn id=98 lang=typescript
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

export {};

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

// @lc code=start
// recursive
var isValidBST = function (root: TreeNode | null): boolean {
  return isValid(root, -Infinity, Infinity);

  function isValid(
    root: TreeNode | null,
    lower: number,
    upper: number
  ): boolean {
    if (!root) return true;
    if (root.val <= lower || root.val >= upper) return false;
    return (
      isValid(root.left, lower, root.val) &&
      isValid(root.right, root.val, upper)
    );
  }
};

// inorder
var isValidBST = function (root: TreeNode | null): boolean {
  const stack: TreeNode[] = [];
  let inorderValue = -Infinity;

  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!;
    if (root.val <= inorderValue) return false;
    inorderValue = root.val;
    root = root.right;
  }
  return true;
};
// @lc code=end
