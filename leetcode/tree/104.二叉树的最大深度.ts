/*
 * @lc app=leetcode.cn id=104 lang=typescript
 *
 * [104] 二叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (66.70%)
 * Likes:    497
 * Dislikes: 0
 * Total Accepted:    154.2K
 * Total Submissions: 212K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最大深度。
 *
 * 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例：
 * 给定二叉树 [3,9,20,null,null,15,7]，
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最大深度 3 。
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

// 解题思路 递归
// 1. root == null 深度 0
// 2. 分别求出 left 和 right 的深度
// 3. 取最大值 + 1 为 root 的最大深度

// 解题思路 迭代
// 1. root == null 深度 0
// 2. 创建 queue， root 和它的深度入列
// 3. root 出列，如果有左右子节点入列，如此循环
// 4. 每次循环深度 + 1

// @lc code=start
// recursive
var maxDepth = function (root: TreeNode | null): number {
  if (!root) return 0;
  else {
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    return Math.max(left, right) + 1;
  }
};

// bfs iterative
var maxDepth = function (root: TreeNode | null): number {
  if (!root) return 0;
  const queue: TreeNode[] = [];
  queue.push(root);
  let max = 0;

  while (queue.length) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      size--;
    }
    max++; // 每次循环深度 + 1
  }

  return max;
};
// @lc code=end
