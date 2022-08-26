/*
 * @lc app=leetcode.cn id=113 lang=typescript
 *
 * [113] 路径总和 II
 *
 * https://leetcode-cn.com/problems/path-sum-ii/description/
 *
 * algorithms
 * Medium (51.32%)
 * Likes:    210
 * Dislikes: 0
 * Total Accepted:    44K
 * Total Submissions: 74.3K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,5,1]\n22'
 *
 * 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 * 给定如下二叉树，以及目标和 sum = 22，
 *
 * ⁠             5
 * ⁠            / \
 * ⁠           4   8
 * ⁠          /   / \
 * ⁠         11  13  4
 * ⁠        /  \    / \
 * ⁠       7    2  5   1
 *
 *
 * 返回:
 *
 * [
 * ⁠  [5,4,11,2],
 * ⁠  [5,8,4,5]
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
var pathSum = function (root: TreeNode | null, sum: number): number[][] {
  const res: number[][] = [];
  dfs(root, sum, []);
  return res;

  function dfs(root: TreeNode | null, sum: number, subset: number[]): void {
    if (!root) return;
    subset = subset.concat(root.val);
    if (!root.left && !root.right && root.val === sum) {
      res.push(subset.slice());
      return;
    }
    dfs(root.left, sum - root.val, subset);
    dfs(root.right, sum - root.val, subset);
  }
};

// iterative
var pathSum = function (root: TreeNode | null, sum: number): number[][] {
  const res: number[][] = [];
  if (!root) return res;
  const stack: [TreeNode, number, number[]][] = [];
  stack.push([root, sum, [root.val]]);

  while (stack.length) {
    const [node, num, subset] = stack.pop()!;
    if (!node.left && !node.right && node.val === num) res.push(subset.slice());
    if (node.right)
      stack.push([node.right, num - node.val, subset.concat(node.right.val)]);
    if (node.left)
      stack.push([node.left, num - node.val, subset.concat(node.left.val)]);
  }

  return res;
};
// @lc code=end
