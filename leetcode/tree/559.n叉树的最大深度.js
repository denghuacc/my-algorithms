/*
 * @lc app=leetcode.cn id=559 lang=javascript
 *
 * [559] N叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/description/
 *
 * algorithms
 * Easy (70.28%)
 * Likes:    112
 * Dislikes: 0
 * Total Accepted:    30.3K
 * Total Submissions: 43.1K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，找到其最大深度。
 *
 * 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 *
 * 例如，给定一个 3叉树 :
 *
 *
 *
 *
 *
 *
 *
 * 我们应返回其最大深度，3。
 *
 * 说明:
 *
 *
 * 树的深度不会超过 1000。
 * 树的节点总不会超过 5000。
 *
 */

// 解题思路 递归
// 1. root == null 深度 0
// 2. 没有 children 深度 1
// 3. 有 children ，取其中最大值 + 1

// 解题思路 迭代
// 1. root == null 深度 0
// 2. 创建 queue root 入列
// 3. root 出列，所有的 children 节点入列，如此循环
// 4. 每次循环深度 + 1

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node} root
 * @return {number}
 */
// recursive
var maxDepth = function (root) {
  if (!root) return 0;
  else if (!root.children.length) {
    return 1;
  } else {
    const heights = [];
    for (const node of root.children) {
      heights.push(maxDepth(node));
    }
    let max = 0;
    for (const height of heights) {
      max = Math.max(height, max);
    }

    return max + 1;
  }
};

// bfs iterative
var maxDepth = function (root) {
  if (!root) return 0;
  const queue = [];
  if (root) queue.push(root);
  let max = 0;

  while (queue.length) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift();
      if (node.children.length) {
        for (const child of node.children) {
          queue.push(child);
        }
      }
      size--;
    }
    max++; // 每次循环深度 + 1
  }

  return max;
};
