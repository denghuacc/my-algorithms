/*
 * @lc app=leetcode.cn id=965 lang=typescript
 *
 * [965] 单值二叉树
 *
 * https://leetcode.cn/problems/univalued-binary-tree/description/
 *
 * algorithms
 * Easy (68.67%)
 * Likes:    125
 * Dislikes: 0
 * Total Accepted:    50.2K
 * Total Submissions: 71K
 * Testcase Example:  '[1,1,1,1,1,null,1]'
 *
 * 如果二叉树每个节点都具有相同的值，那么该二叉树就是单值二叉树。
 *
 * 只有给定的树是单值二叉树时，才返回 true；否则返回 false。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：[1,1,1,1,1,null,1]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：[2,2,2,5,2]
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定树的节点数范围是 [1, 100]。
 * 每个节点的值都是整数，范围为 [0, 99] 。
 *
 *
 */

export {};

// Definition for a binary tree node.
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
// iterative
var isUnivalTree = function (root: TreeNode | null): boolean {
  if (root === null) return true;
  const val = root.val;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node.val !== val) {
      return false;
    }
    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  return true;
};

// recursive
var isUnivalTree = function (root: TreeNode | null): boolean {
  return isUnivalTreeHelper(root, root?.val);

  function isUnivalTreeHelper(
    node: TreeNode | null,
    val: number | undefined
  ): boolean {
    if (node === null) {
      return true;
    }
    if (node.val !== val) {
      return false;
    }
    return (
      isUnivalTreeHelper(node.left, val) && isUnivalTreeHelper(node.right, val)
    );
  }
};
// @lc code=end
