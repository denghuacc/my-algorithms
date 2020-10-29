/*
 * @lc app=leetcode.cn id=129 lang=typescript
 *
 * [129] 求根到叶子节点数字之和
 *
 * https://leetcode-cn.com/problems/sum-root-to-leaf-numbers/description/
 *
 * algorithms
 * Medium (64.96%)
 * Likes:    224
 * Dislikes: 0
 * Total Accepted:    47K
 * Total Submissions: 71.7K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个二叉树，它的每个结点都存放一个 0-9 的数字，每条从根到叶子节点的路径都代表一个数字。
 *
 * 例如，从根到叶子节点路径 1->2->3 代表数字 123。
 *
 * 计算从根到叶子节点生成的所有数字之和。
 *
 * 说明: 叶子节点是指没有子节点的节点。
 *
 * 示例 1:
 *
 * 输入: [1,2,3]
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * 输出: 25
 * 解释:
 * 从根到叶子节点路径 1->2 代表数字 12.
 * 从根到叶子节点路径 1->3 代表数字 13.
 * 因此，数字总和 = 12 + 13 = 25.
 *
 * 示例 2:
 *
 * 输入: [4,9,0,5,1]
 * ⁠   4
 * ⁠  / \
 * ⁠ 9   0
 * / \
 * 5   1
 * 输出: 1026
 * 解释:
 * 从根到叶子节点路径 4->9->5 代表数字 495.
 * 从根到叶子节点路径 4->9->1 代表数字 491.
 * 从根到叶子节点路径 4->0 代表数字 40.
 * 因此，数字总和 = 495 + 491 + 40 = 1026.
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
// dfs
var sumNumbers = function (root: TreeNode | null): number {
  return dfs(root, 0);

  function dfs(root: TreeNode | null, prevSum: number): number {
    if (!root) return 0;
    const sum = prevSum * 10 + root.val;
    if (!root.left && !root.right) {
      return sum;
    } else {
      return dfs(root.left, sum) + dfs(root.right, sum);
    }
  }
};

// bfs
var sumNumbers = function (root: TreeNode | null): number {
  if (!root) return 0;
  let sum = 0;
  const nodeQueue: TreeNode[] = [];
  const numQueue: number[] = [];
  nodeQueue.push(root);
  numQueue.push(root.val);

  while (nodeQueue.length) {
    const { left, right } = nodeQueue.shift()!;
    const num = numQueue.shift()!;
    if (!left && !right) {
      sum += num;
    } else {
      if (left) {
        nodeQueue.push(left);
        numQueue.push(num * 10 + left.val);
      }
      if (right) {
        nodeQueue.push(right);
        numQueue.push(num * 10 + right.val);
      }
    }
  }

  return sum;
};
// @lc code=end
