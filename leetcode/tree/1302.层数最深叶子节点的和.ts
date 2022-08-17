/*
 * @lc app=leetcode.cn id=1302 lang=typescript
 *
 * [1302] 层数最深叶子节点的和
 *
 * https://leetcode.cn/problems/deepest-leaves-sum/description/
 *
 * algorithms
 * Medium (82.59%)
 * Likes:    105
 * Dislikes: 0
 * Total Accepted:    34.8K
 * Total Submissions: 41K
 * Testcase Example:  '[1,2,3,4,5,null,6,7,null,null,null,null,8]'
 *
 * 给你一棵二叉树的根节点 root ，请你返回 层数最深的叶子节点的和 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,2,3,4,5,null,6,7,null,null,null,null,8]
 * 输出：15
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [6,7,8,2,7,1,3,9,null,1,4,null,null,null,5]
 * 输出：19
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [1, 10^4] 之间。
 * 1
 *
 *
 */

export {};

// Definition for a binary tree node.
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
var deepestLeavesSum = function (root: TreeNode | null): number {
  if (!root) return -1;
  const queue: TreeNode[] = [root];
  let level: number[] = [];
  while (queue.length) {
    const size = queue.length;
    const curLevel = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      curLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level = curLevel;
  }
  return level.reduce((a, b) => a + b, 0);
};

// bfs2
var deepestLeavesSum = function (root: TreeNode | null): number {
  if (!root) return -1;
  const queue: TreeNode[] = [root];
  let sum = 0;
  while (queue.length) {
    const size = queue.length;
    sum = 0;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      sum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return sum;
};

// dfs
var deepestLeavesSum = function (root: TreeNode | null): number {
  const sumArr: number[] = [];
  dfs(root, 0);
  return sumArr[sumArr.length - 1];

  function dfs(node: TreeNode | null, level: number) {
    if (node) {
      if (level === sumArr.length) {
        sumArr.push(node.val);
      } else {
        sumArr[level] += node.val;
      }
      if (node.left) dfs(node.left, level + 1);
      if (node.right) dfs(node.right, level + 1);
    }
  }
};

// dfs2
var deepestLeavesSum = function (root: TreeNode | null): number {
  let maxLevel = -1;
  let sum = 0;
  dfs(root, 0);
  return sum;

  function dfs(node: TreeNode | null, level: number) {
    if (node) {
      if (level > maxLevel) {
        maxLevel = level;
        sum = node.val;
      } else if (level === maxLevel) {
        sum += node.val;
      }
      if (node.left) dfs(node.left, level + 1);
      if (node.right) dfs(node.right, level + 1);
    }
  }
};
// @lc code=end
