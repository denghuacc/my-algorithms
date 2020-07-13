/*
 * @lc app=leetcode.cn id=107 lang=typescript
 *
 * [107] 二叉树的层次遍历 II
 *
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal-ii/description/
 *
 * algorithms
 * Easy (58.38%)
 * Likes:    216
 * Dislikes: 0
 * Total Accepted:    50.9K
 * Total Submissions: 78.6K
 * Testcase Example:  '[3,9,20,null,null,15,7]'
 *
 * 给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
 *
 * 例如：
 * 给定二叉树 [3,9,20,null,null,15,7],
 *
 * ⁠   3
 * ⁠  / \
 * ⁠ 9  20
 * ⁠   /  \
 * ⁠  15   7
 *
 *
 * 返回其自底向上的层次遍历为：
 *
 * [
 * ⁠ [15,7],
 * ⁠ [9,20],
 * ⁠ [3]
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
// recursive
var levelOrderBottom = function (root: TreeNode | null): number[][] {
  const ret: number[][] = [];
  levelOrder(root, 0);
  return ret.reverse();

  function levelOrder(node: TreeNode | null, level: number) {
    if (!node) return;
    ret[level] ? ret[level].push(node.val) : (ret[level] = [node.val]);
    level++;
    levelOrder(node.left, level);
    levelOrder(node.right, level);
  }
};

// iterative
var levelOrderBottom = function (root: TreeNode | null): number[][] {
  const ret: number[][] = [];
  if (!root) return ret;
  const queue: Array<TreeNode | null> = [];
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    const levels = [];
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      levels.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    ret.unshift(levels);
  }

  return ret;
};
// @lc code=end
