/*
 * @lc app=leetcode.cn id=94 lang=typescript
 *
 * [94] 二叉树的中序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-inorder-traversal/description/
 *
 * algorithms
 * Medium (63.61%)
 * Likes:    462
 * Dislikes: 0
 * Total Accepted:    137.8K
 * Total Submissions: 194.2K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的中序 遍历。
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
 * 输出: [1,3,2]
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
var inorderTraversal = function (root: TreeNode): number[] {
  const ret: number[] = [];
  inOrder(root, ret);
  return ret;

  function inOrder(node: TreeNode, arr: number[]) {
    if (node) {
      if (node.left) inOrder(node.left, arr);
      ret.push(node.val);
      if (node.right) inOrder(node.right, arr);
    }
  }
};
// @lc code=end

// iterative
var inorderTraversal = function (root: TreeNode): number[] {
  const ret = [];
  const stack = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left!;
    }
    cur = stack.pop()!;
    ret.push(cur.val);
    cur = cur.right!;
  }
  return ret;
};

// 线索二叉树
var inorderTraversal = function (root: TreeNode): number[] {
  const ret = [];
  let cur = root;
  let prev;

  while (cur) {
    if (!cur.left) {
      ret.push(cur.val);
      cur = cur.right!;
    } else {
      prev = cur.left;
      while (prev.right) {
        prev = prev.right;
      }
      prev.right = cur;
      let temp = cur;
      cur = cur.left;
      temp.left = null;
    }
  }
  return ret;
};
