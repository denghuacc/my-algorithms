/*
 * @lc app=leetcode.cn id=515 lang=typescript
 *
 * [515] 在每个树行中找最大值
 *
 * https://leetcode.cn/problems/find-largest-value-in-each-tree-row/description/
 *
 * algorithms
 * Medium (65.80%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    73.6K
 * Total Submissions: 111.3K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给定一棵二叉树的根节点 root ，请找出该二叉树中每一层的最大值。
 *
 *
 *
 * 示例1：
 *
 *
 *
 *
 * 输入: root = [1,3,2,5,3,null,9]
 * 输出: [1,3,9]
 *
 *
 * 示例2：
 *
 *
 * 输入: root = [1,2,3]
 * 输出: [1,3]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 二叉树的节点个数的范围是 [0,10^4]
 * -2^31 <= Node.val <= 2^31 - 1
 *
 *
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
var largestValues = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  const queue: TreeNode[] = [root];

  while (queue.length) {
    const size = queue.length;
    let maxVal = -Infinity;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      maxVal = Math.max(maxVal, node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(maxVal);
  }

  return res;
};

// dfs
var largestValues = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  dfs(root, 0);
  return res;

  function dfs(node: TreeNode, depth: number) {
    if (!node) return;
    if (depth === res.length) {
      res.push(node.val);
    } else {
      res[depth] = Math.max(res[depth], node.val);
    }
    if (node.left) dfs(node.left, depth + 1);
    if (node.right) dfs(node.right, depth + 1);
  }
};

// @lc code=end
