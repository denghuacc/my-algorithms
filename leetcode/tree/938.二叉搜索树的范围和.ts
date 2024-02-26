/*
 * @lc app=leetcode.cn id=938 lang=typescript
 *
 * [938] 二叉搜索树的范围和
 *
 * https://leetcode-cn.com/problems/range-sum-of-bst/description/
 *
 * algorithms
 * Easy (78.12%)
 * Likes:    185
 * Dislikes: 0
 * Total Accepted:    56.2K
 * Total Submissions: 70.7K
 * Testcase Example:  '[10,5,15,3,7,null,18]\n7\n15'
 *
 * 给定二叉搜索树的根结点 root，返回值位于范围 [low, high] 之间的所有结点的值的和。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [10,5,15,3,7,null,18], low = 7, high = 15
 * 输出：32
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10
 * 输出：23
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [1, 2 * 10^4] 内
 * 1
 * 1
 * 所有 Node.val 互不相同
 *
 *
 */

export {};

//  Definition for a binary tree node.
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
var rangeSumBST = function (
  root: TreeNode | null,
  low: number,
  high: number
): number {
  if (!root) return 0;
  if (root.val < low) return rangeSumBST(root.right, low, high);
  if (root.val > high) return rangeSumBST(root.left, low, high);
  return (
    root.val +
    rangeSumBST(root.left, low, high) +
    rangeSumBST(root.right, low, high)
  );
};

// iterative
var rangeSumBST = function (
  root: TreeNode | null,
  low: number,
  high: number
): number {
  if (!root) return 0;
  let sum = 0;
  const queue: TreeNode[] = [root];
  while (queue.length) {
    const node = queue.shift()!;
    if (node.val < low) {
      if (node.right) queue.push(node.right);
    } else if (node.val > high) {
      if (node.left) queue.push(node.left);
    } else {
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return sum;
};

// @lc code=end
