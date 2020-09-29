/*
 * @lc app=leetcode.cn id=144 lang=typescript
 *
 * [144] 二叉树的前序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/description/
 *
 * algorithms
 * Medium (56.37%)
 * Likes:    238
 * Dislikes: 0
 * Total Accepted:    92K
 * Total Submissions: 141.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 前序 遍历。
 *
 * 示例:
 *
 * 输入: [1,null,2,3]
 * ⁠  1
 * ⁠   \
 * ⁠    2
 * ⁠   /
 * ⁠  3
 *
 * 输出: [1,2,3]
 *
 *
 * 进阶: 递归算法很简单，你可以通过迭代算法完成吗？
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
var preorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  preorder(root);
  return ret;

  function preorder(node: TreeNode | null) {
    if (node) {
      ret.push(node.val);
      preorder(node.left);
      preorder(node.right);
    }
  }
};

// iterative
var preorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  if (!root) return ret;
  const stack: TreeNode[] = [];
  stack.push(root);

  while (stack.length) {
    const node = stack.pop()!;
    ret.push(node.val);

    // first right last left
    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }

  return ret;
};

// morris
var preorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];

  let node = root;
  while (node) {
    if (!node.left) {
      ret.push(node.val);
      node = node.right;
    } else {
      let pred = node.left;
      while (pred.right && pred.right !== node) {
        pred = pred.right;
      }

      if (!pred.right) {
        ret.push(node.val);
        pred.right = node;
        node = node.left;
      } else {
        pred.right = null;
        node = node.right;
      }
    }
  }

  return ret;
};
// @lc code=end
