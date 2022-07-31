/*
 * @lc app=leetcode.cn id=1161 lang=typescript
 *
 * [1161] 最大层内元素和
 *
 * https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (62.93%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    22K
 * Total Submissions: 33.6K
 * Testcase Example:  '[1,7,0,7,-8,null,null]'
 *
 * 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 *
 * 请返回层内元素之和 最大 的那几层（可能只有一层）的层号，并返回其中 最小 的那个。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,7,0,7,-8,null,null]
 * 输出：2
 * 解释：
 * 第 1 层各元素之和为 1，
 * 第 2 层各元素之和为 7 + 0 = 7，
 * 第 3 层各元素之和为 7 + -8 = -1，
 * 所以我们返回第 2 层的层号，它的层内元素之和最大。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [989,null,10250,98693,-89388,null,null,null,-32127]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在 [1, 10^4]范围内
 * -10^5 <= Node.val <= 10^5
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
// bfs
var maxLevelSum = function (root: TreeNode | null): number {
  const queue: TreeNode[] = [root!];
  let maxSum = -Infinity;
  let level = 1;
  let res = 1;

  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    if (sum > maxSum) {
      maxSum = sum;
      res = level;
    }
    level++;
  }

  return res;
};

// dfs
var maxLevelSum = function (root: TreeNode | null): number {
  const sumArr: number[] = [];
  dfs(root!, 0);

  let level = 0;
  for (let i = 0; i < sumArr.length; i++) {
    if (sumArr[level] < sumArr[i]) {
      level = i;
    }
  }
  return level + 1;

  function dfs(node: TreeNode, level: number) {
    if (sumArr.length === level) {
      sumArr.push(node.val);
    } else {
      sumArr[level] += node.val;
    }

    if (node.left) {
      dfs(node.left, level + 1);
    }
    if (node.right) {
      dfs(node.right, level + 1);
    }
  }
};
// @lc code=end
