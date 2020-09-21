/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N叉树的层序遍历
 *
 * https://leetcode-cn.com/problems/n-ary-tree-level-order-traversal/description/
 *
 * algorithms
 * Medium (66.46%)
 * Likes:    109
 * Dislikes: 0
 * Total Accepted:    29.7K
 * Total Submissions: 44.7K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，返回其节点值的层序遍历。 (即从左到右，逐层遍历)。
 *
 * 例如，给定一个 3叉树 :
 *
 *
 *
 *
 *
 *
 *
 * 返回其层序遍历:
 *
 * [
 * ⁠    [1],
 * ⁠    [3,2,4],
 * ⁠    [5,6]
 * ]
 *
 *
 *
 *
 * 说明:
 *
 *
 * 树的深度不会超过 1000。
 * 树的节点总数不会超过 5000。
 *
 */

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
 * @return {number[][]}
 */
// recursive
var levelOrder = function (root) {
  const levels = [];
  dfs(root, 0);
  return levels;

  function dfs(node, level) {
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
var levelOrder = function (root) {
  const levels = [];
  if (!root) return levels;
  const queue = [];
  queue.push(root);
  let level = 0;

  while (queue.length) {
    levels.push([]);
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
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

// iterative 2
var levelOrder = function (root) {
  const levels = [];
  if (!root) return levels;
  const queue = [];
  queue.push(root);

  while (queue.length) {
    const level = [];
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      level.push(node.val);
      if (node.children.length) {
        queue.push(...node.children);
      }
    }
    levels.push(level);
  }

  return levels;
};
// @lc code=end
