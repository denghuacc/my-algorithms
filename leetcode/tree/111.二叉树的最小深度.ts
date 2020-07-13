/*
 * @lc app=leetcode.cn id=111 lang=typescript
 *
 * [111] 二叉树的最小深度
 *
 * https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/description/
 *
 * algorithms
 * Easy (36.66%)
 * Likes:    239
 * Dislikes: 0
 * Total Accepted:    65.1K
 * Total Submissions: 155.1K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，找出其最小深度。
 *
 * 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 *
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 * 返回它的最小深度  2.
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
var minDepth = function (root: TreeNode | null): number {
  if (!root) return 0;
  if (!root.left && !root.right) return 1;
  let min = Infinity;
  if (root.left) min = Math.min(minDepth(root.left), min);
  if (root.right) min = Math.min(minDepth(root.right), min);
  return min + 1;
};

// DFS iterative
var minDepth = function (root: TreeNode | null): number {
  const stack: Array<[TreeNode | null, number]> = [];
  if (!root) return 0;
  else stack.push([root, 1]);

  let min = Number.MAX_SAFE_INTEGER;
  while (stack.length) {
    const currentPair = stack.pop()!; // pop
    const root = currentPair[0]!;
    const currentDeep = currentPair[1];

    if (!root.left && !root.right) {
      min = Math.min(min, currentDeep);
    }
    if (root.left) stack.push([root.left, currentDeep + 1]);
    if (root.right) stack.push([root.right, currentDeep + 1]);
  }

  return min;
};

// BFS iterative
var minDepth = function (root: TreeNode | null): number {
  const stack: Array<[TreeNode | null, number]> = [];
  if (!root) return 0;
  else stack.push([root, 1]);

  let currentDeep = 0;
  while (stack.length) {
    const currentPair = stack.shift()!; // shift
    const root = currentPair[0]!;
    currentDeep = currentPair[1];

    if (!root.left && !root.right) break;
    if (root.left) stack.push([root.left, currentDeep + 1]);
    if (root.right) stack.push([root.right, currentDeep + 1]);
  }

  return currentDeep;
};
// @lc code=end
