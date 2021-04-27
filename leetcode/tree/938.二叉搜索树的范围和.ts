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
  const arr: number[] = [];
  inorder(root, arr);
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const val = arr[i];
    if (val >= low) {
      sum += val;
    }
    if (val === high) break;
  }

  return sum;

  function inorder(node: TreeNode | null, arr: number[]) {
    if (node) {
      inorder(node.left, arr);
      arr.push(node.val);
      inorder(node.right, arr);
    }
  }
};

// iterative
var rangeSumBST = function (
  root: TreeNode | null,
  low: number,
  high: number
): number {
  let sum = 0;
  const stack: TreeNode[] = [];

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }

    root = stack.pop()!;
    if (root.val >= low && root.val <= high) {
      sum += root.val;
    }
    root = root.right;
  }

  return sum;
};
// @lc code=end
