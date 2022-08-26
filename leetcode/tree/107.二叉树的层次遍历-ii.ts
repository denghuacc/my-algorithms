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
  const res: number[][] = [];
  levelOrder(root, 0);
  return res.reverse();

  function levelOrder(node: TreeNode | null, level: number) {
    if (!node) return;
    if (res.length === level) {
      res[level] = [node.val];
    } else {
      res[level].push(node.val);
    }
    level++;
    levelOrder(node.left, level);
    levelOrder(node.right, level);
  }
};

// iterative
var levelOrderBottom = function (root: TreeNode | null): number[][] {
  const res: number[][] = [];
  if (!root) return res;
  const queue: TreeNode[] = [];
  queue.push(root);

  while (queue.length) {
    const size = queue.length;
    const level: number[] = [];

    // only handle all nodes before size index
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    res.push(level);
  }

  return res.reverse();
};
// @lc code=end
