/*
 * @lc app=leetcode.cn id=429 lang=typescript
 *
 * [429] N 叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (68.21%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    41.1K
 * Total Submissions: 60.2K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的层序遍历。（即从左到右，逐层遍历）。
 *
 * 树的序列化输入是用层序遍历，每组子节点都由 null 值分隔（参见示例）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：[[1],[3,2,4],[5,6]]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：[[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树的高度不会超过 1000
 * 树的节点总数在 [0, 10^4] 之间
 *
 *
 */

export {};

//  Definition for node.
class Node {
  val: number;
  children: Node[];
  constructor(val?: number) {
    this.val = val === undefined ? 0 : val;
    this.children = [];
  }
}

// @lc code=start
// recursive
var levelOrder = function (root: Node | null): number[][] {
  const levels: number[][] = [];
  dfs(root, 0);
  return levels;

  function dfs(node: Node | null, level: number) {
    if (!node) return;
    if (levels.length === level) levels.push([]);
    levels[level].push(node.val);
    if (node.children.length) {
      for (const child of node.children) {
        dfs(child, level + 1);
      }
    }
  }
};

// iterative
var levelOrder = function (root: Node | null): number[][] {
  const levels: number[][] = [];
  if (!root) return levels;
  const queue: Node[] = [];
  queue.push(root);
  let level = 0;

  while (queue.length) {
    levels.push([]);
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      levels[level].push(node.val);
      if (node.children.length) {
        for (const child of node.children) {
          queue.push(child);
        }
      }
    }
    level++;
  }

  return levels;
};

// iterative ✅
var levelOrder = function (root: Node | null): number[][] {
  const levels: number[][] = [];
  if (!root) return levels;
  let queue: Node[] = [];
  queue.push(root);

  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue[i];
      level.push(node.val);
      if (node.children.length) {
        queue.push(...node.children);
      }
    }
    levels.push(level);
    queue = queue.slice(size); // slice improve performance
  }

  return levels;
};
// @lc code=end
