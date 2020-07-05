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
var isValidBST = function (root: TreeNode | null): boolean {
  return isValid(root, 0, 0);

  function isValid(root: TreeNode | null, lower: number, upper: number) {
    if (root == null) return true;

    const val = root.val;

    if (lower != null && val <= lower) return false;
    if (upper != null && val >= upper) return false;

    if (!isValid(root.right, val, upper)) return false;
    if (!isValid(root.left, lower, val)) return false;

    return true;
  }
};

// iterative
var isValidBST = function (root: TreeNode | null): boolean {
  const stack: Array<TreeNode | null> = [];
  const lowers: number[] = [];
  const uppers: number[] = [];
  let lower = Infinity;
  let upper = Infinity;
  let val;
  update(root, lower, upper);

  while (stack.length) {
    root = stack.pop()!;
    lower = lowers.pop()!;
    upper = uppers.pop()!;

    if (root == null) continue;
    val = root.val;
    if (lower != null && val <= lower) return false;
    if (upper != null && val >= upper) return false;
    update(root.right, val, upper!);
    update(root.left, lower!, val);
  }

  return true;

  function update(root: TreeNode | null, lower: number, upper: number) {
    stack.push(root);
    lowers.push(lower);
    uppers.push(upper);
  }
};

// inorder
var isValidBST = function (root: TreeNode | null): boolean {
  const stack: Array<TreeNode | null> = [];
  let inorder = -Number.MAX_SAFE_INTEGER;

  while (stack.length || root) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!;
    if (root.val <= inorder) return false;
    inorder = root.val;
    root = root.right;
  }
  return true;
};
// @lc code=end
