/*
 * @lc app=leetcode.cn id=637 lang=typescript
 *
 * [637] 二叉树的层平均值
 *
 * https://leetcode-cn.com/problems/average-of-levels-in-binary-tree/description/
 *
 * algorithms
 * Easy (65.12%)
 * Likes:    159
 * Dislikes: 0
 * Total Accepted:    25.1K
 * Total Submissions: 38.6K
 * Testcase Example:  '[3,9,20,15,7]'
 *
 * 给定一个非空二叉树, 返回一个由每层节点平均值组成的数组。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 * 输出：[3, 14.5, 11]
 * 解释：
 * 第 0 层的平均值是 3 ,  第1层是 14.5 , 第2层是 11 。因此返回 [3, 14.5, 11] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 节点值的范围在32位有符号整数范围内。
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
// recursive dfs
var averageOfLevels = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  const tmp: number[][] = [];
  levelOrder(root, 0);

  for (const arr of tmp) {
    ret.push(getAverageOfArray(arr));
  }

  return ret;

  // 层序遍历获取每层的值
  function levelOrder(node: TreeNode | null, level: number) {
    if (!node) return;
    tmp[level] ? tmp[level].push(node.val) : (tmp[level] = [node.val]);
    level++;
    levelOrder(node.left, level);
    levelOrder(node.right, level);
  }

  // 求数组的平均值
  function getAverageOfArray(arr: number[]): number {
    let total = 0;
    let len = arr.length;
    for (const num of arr) total += num;
    return total / len;
  }
};
// @lc code=end

// iterative bfs
var averageOfLevels = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  if (!root) return ret;
  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    let count = 0;

    // 一次性全部取出每层的所有节点
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      sum += node.val;
      count += 1;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    ret.push(sum / count);
  }

  return ret;
};

// dfs2
var averageOfLevels = function (root: TreeNode | null): number[] {
  // Map<树的层级数，[每层的值的个数，每层的值的和]>
  const map: Map<number, [number, number]> = new Map();
  const ret: number[] = [];
  dfs(root, 0);

  for (const [_, val] of map.entries()) {
    ret.push(val[1] / val[0]);
  }
  return ret;

  function dfs(node: TreeNode | null, i: number) {
    if (!node) return;
    if (map.has(i)) {
      const pair = map.get(i)!;
      pair[0] += 1;
      pair[1] += node.val;
    } else {
      map.set(i, [1, node.val]);
    }

    dfs(node.left, i + 1);
    dfs(node.right, i + 1);
  }
};
