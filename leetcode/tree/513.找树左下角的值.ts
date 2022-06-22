/*
 * @lc app=leetcode.cn id=513 lang=typescript
 *
 * [513] 找树左下角的值
 *
 * https://leetcode.cn/problems/find-bottom-left-tree-value/description/
 *
 * algorithms
 * Medium (73.13%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    104.6K
 * Total Submissions: 141.7K
 * Testcase Example:  '[2,1,3]'
 *
 * 给定一个二叉树的 根节点 root，请找出该二叉树的 最底层 最左边 节点的值。
 *
 * 假设二叉树中至少有一个节点。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入: root = [2,1,3]
 * 输出: 1
 *
 *
 * 示例 2:
 *
 * ⁠
 *
 *
 * 输入: [1,2,3,4,null,5,6,null,null,7]
 * 输出: 7
 *
 *
 *
 *
 * 提示:
 *
 *
 * 二叉树的节点个数的范围是 [1,10^4]
 * -2^31
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
var findBottomLeftValue = function (root: TreeNode): number {
  const queue: TreeNode[] = [];
  queue.push(root);
  let res = root.val;

  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      if (i === 0) {
        res = node.val;
      }
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return res;
};

// bfs2 ✅
var findBottomLeftValue = function (root: TreeNode): number {
  const queue: TreeNode[] = [];
  queue.push(root);
  let res = root.val;

  while (queue.length) {
    const node = queue.shift()!;
    if (node.right) queue.push(node.right); // right node enqueue first
    if (node.left) queue.push(node.left);
    res = node.val; // the last one is the leftest node for this level
  }
  return res;
};

// dfs
var findBottomLeftValue = function (root: TreeNode): number {
  let res = root.val;
  let curDepth = 0;
  dfs(root, 0);
  return res;

  function dfs(node: TreeNode, depth: number) {
    if (!node) {
      return;
    }
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
    if (depth > curDepth) {
      curDepth = depth;
      res = node.val; // the leftest node value
    }
  }
  return res;
};
// @lc code=end
