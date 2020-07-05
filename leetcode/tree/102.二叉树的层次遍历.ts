/*
 * @lc app=leetcode.cn id=102 lang=typescript
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
var levelOrder = function (root: TreeNode | null): number[][] {
  const levels: number[][] = [];
  if (!root) return [];
  order(root, 0);
  return levels;

  function order(root: TreeNode, level: number) {
    if (levels.length == level) levels.push([]);
    levels[level].push(root.val);
    if (root.left) order(root.left, level + 1);
    if (root.right) order(root.right, level + 1);
  }
};
// @lc code=end

// iterative
var levelOrder = function (root: TreeNode | null): number[][] {
  const levels: number[][] = [];
  if (root == null) return [];

  const queue: Array<TreeNode | null> = [];
  queue.push(root);
  let level = 0;
  while (queue.length) {
    levels.push([]);
    const levelLength = queue.length;

    for (let i = 0; i < levelLength; ++i) {
      const root = queue.shift()!;
      levels[level].push(root.val);
      if (root.left) queue.push(root.left);
      if (root.right) queue.push(root.right);
    }
    level++;
  }
  return levels;
};
