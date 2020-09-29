/*
 * @lc app=leetcode.cn id=103 lang=typescript
 *
 * [103] 二叉树的锯齿形层次遍历
 *
 * 给定一个二叉树，返回其节点值的锯齿形层次遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）
 *
 *
 *
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 *     3
 *    / \
 *   9  20
 *     /  \
 *    15   7
 *
 * 返回锯齿形层次遍历如下：
 *
 * [
 *  [3],
 *  [20,9],
 *  [15,7]
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
// dfs
var zigzagLevelOrder = function (root: TreeNode | null): number[][] {
  if (!root) return [];
  const levels: number[][] = [];
  levelOrder(root, 0);
  for (let i = 0; i < levels.length; i++) {
    if (i % 2 !== 0) levels[i].reverse(); // reverse
  }
  return levels;

  // level order
  function levelOrder(node: TreeNode, level: number) {
    if (levels.length === level) levels.push([]);
    levels[level].push(node.val);
    if (node.left) levelOrder(node.left, level + 1);
    if (node.right) levelOrder(node.right, level + 1);
  }
};

// bfs
var zigzagLevelOrder = function (root: TreeNode | null): number[][] {
  if (!root) return [];
  const levels: number[][] = [];
  const queue: (TreeNode | null)[] = [];
  queue.push(root);
  let level = 0;
  while (queue.length) {
    levels.push([]);
    const levelLength = queue.length;

    for (let i = 0; i < levelLength; i++) {
      const node = queue.shift()!;
      levels[level].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    level++;
  }

  for (let i = 0; i < levels.length; i++) {
    if (i % 2 !== 0) levels[i].reverse(); // reverse
  }
  return levels;
};

// dfs2
var zigzagLevelOrder = function (root: TreeNode | null): number[][] {
  if (!root) return [];
  const levels: number[][] = [];
  dfs(root, 0, levels);
  return levels;

  function dfs(node: TreeNode, level: number, levels: number[][]) {
    if (level >= levels.length) {
      const tmp: number[] = [];
      tmp.push(node.val);
      levels.push(tmp);
    } else {
      if (level % 2 === 0) {
        levels[level].push(node.val);
      } else {
        levels[level].unshift(node.val);
      }
    }

    if (node.left) dfs(node.left, level + 1, levels);
    if (node.right) dfs(node.right, level + 1, levels);
  }
};
// @lc code=end

// bfs2
var zigzagLevelOrder = function (root: TreeNode | null): number[][] {
  if (!root) return [];
  const levels: number[][] = [];
  const queue: (TreeNode | null)[] = [];
  queue.push(root);
  queue.push(null); // separator
  let subset: number[] = [];
  let isOrderLeft = true; // from left to right

  while (queue.length) {
    const node = queue.shift();
    if (node) {
      if (isOrderLeft) {
        subset.push(node.val);
      } else {
        subset.unshift(node.val);
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    } else {
      levels.push(subset);
      subset = [];
      if (queue.length) {
        queue.push(null); // add separator
      }
      isOrderLeft = !isOrderLeft; // toggle
    }
  }

  return levels;
};
