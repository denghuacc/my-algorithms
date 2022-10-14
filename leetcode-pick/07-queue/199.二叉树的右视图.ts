/*
 * @lc app=leetcode.cn id=199 lang=typescript
 *
 * [199] 二叉树的右视图
 *
 * https://leetcode-cn.com/problems/binary-tree-right-side-view/description/
 *
 * algorithms
 * Medium (64.25%)
 * Likes:    318
 * Dislikes: 0
 * Total Accepted:    66.7K
 * Total Submissions: 103.9K
 * Testcase Example:  '[1,2,3,null,5,null,4]'
 *
 * 给定一棵二叉树，想象自己站在它的右侧，按照从顶部到底部的顺序，返回从右侧所能看到的节点值。
 *
 * 示例:
 *
 * 输入: [1,2,3,null,5,null,4]
 * 输出: [1, 3, 4]
 * 解释:
 *
 * ⁠  1            <---
 * ⁠/   \
 * 2     3         <---
 * ⁠\     \
 * ⁠ 5     4       <---
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
// dfs
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  const levels: number[][] = [];
  dfs(root, 0);
  for (const level of levels) {
    res.push(level.pop()!); // push the last one of level
  }

  return res;

  function dfs(node: TreeNode, depth: number) {
    if (levels.length === depth) levels.push([]);
    levels[depth].push(node.val);
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};

// dfs2
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  let maxDepth = -1;
  dfs(root, 0);
  return res;

  function dfs(node: TreeNode, depth: number) {
    if (depth > maxDepth) {
      maxDepth = depth;
      res.push(node.val);
    }

    // prioritize process right child
    // and the next loop can get its value (the right side value)
    if (node.right) dfs(node.right, depth + 1);
    if (node.left) dfs(node.left, depth + 1);
  }
};

// bfs
var rightSideView = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
      // push last node val in this loop
      // pushing children to queue in this loop not disturb the size
      if (i === size - 1) {
        res.push(node.val);
      }
    }
  }

  return res;
};
// @lc code=end
