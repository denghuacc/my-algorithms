/*
 * @lc app=leetcode.cn id=112 lang=typescript
 *
 * [112] 路径总和
 *
 * https://leetcode-cn.com/problems/path-sum/description/
 *
 * algorithms
 * Easy (44.26%)
 * Likes:    271
 * Dislikes: 0
 * Total Accepted:    66.3K
 * Total Submissions: 134.1K
 * Testcase Example:  '[5,4,8,11,null,13,4,7,2,null,null,null,1]\n22'
 *
 * 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例:
 * 给定如下二叉树，以及目标和 sum = 22，
 *
 * ⁠             5
 * ⁠            / \
 * ⁠           4   8
 * ⁠          /   / \
 * ⁠         11  13  4
 * ⁠        /  \      \
 * ⁠       7    2      1
 *
 *
 * 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。
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
var hasPathSum = function (root: TreeNode | null, sum: number): boolean {
  if (!root) return false;
  sum -= root.val;
  if (!root.left && !root.right) return sum === 0;
  return hasPathSum(root.left, sum) || hasPathSum(root.right, sum);
};

// iterative
var hasPathSum = function (root: TreeNode | null, sum: number): boolean {
  if (!root) return false;

  const nodeStack: Array<TreeNode | null> = [];
  const sumStack: number[] = [];
  nodeStack.push(root);
  sumStack.push(sum - root.val);

  let node: TreeNode;
  let currentSum: number;
  while (nodeStack.length) {
    node = nodeStack.pop()!;
    currentSum = sumStack.pop()!;

    if (!node?.right && !node?.left && currentSum === 0) return true;
    if (node?.right) {
      nodeStack.push(node.right);
      sumStack.push(currentSum - node.right.val);
    }
    if (node?.left) {
      nodeStack.push(node.left);
      sumStack.push(currentSum - node.left.val);
    }
  }

  return false;
};
// @lc code=end
