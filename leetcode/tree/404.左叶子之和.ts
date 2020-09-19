/*
 * @lc app=leetcode.cn id=404 lang=typescript
 *
 * [404] 左叶子之和
 *
 * https://leetcode-cn.com/problems/sum-of-left-leaves/description/
 *
 * algorithms
 * Easy (55.56%)
 * Likes:    190
 * Dislikes: 0
 * Total Accepted:    37.2K
 * Total Submissions: 66.6K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 计算给定二叉树的所有左叶子之和。
 *
 * 示例：
 *
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
 *
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
var sumOfLeftLeaves = function (root: TreeNode | null): number {
  let total = 0;
  dfs(root);
  return total;

  function dfs(node: TreeNode | null) {
    if (node) {
      if (node?.left && isLeafNode(node.left)) {
        total += node.left.val;
      }
      if (node?.left) dfs(node.left);
      if (node?.right) dfs(node.right);
    }
  }

  function isLeafNode(node: TreeNode) {
    return node.left === null && node.right === null;
  }
};

// iterative
var sumOfLeftLeaves = function (root: TreeNode | null): number {
  let total = 0;
  if (!root) return total;
  const stack: TreeNode[] = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.pop()!;
    if (node.left && isLeafNode(node.left)) {
      total += node.left.val;
    }
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return total;

  function isLeafNode(node: TreeNode) {
    return node.left === null && node.right === null;
  }
};
// @lc code=end
