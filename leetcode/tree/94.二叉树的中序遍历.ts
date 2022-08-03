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
var inorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  inorder(root);
  return ret;

  function inorder(node: TreeNode | null) {
    if (node) {
      inorder(node.left);
      ret.push(node.val);
      inorder(node.right);
    }
  }
};
// @lc code=end

// iterative
var inorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left!; // LIFO -> the smallest value first out
    }
    cur = stack.pop()!; // left node
    ret.push(cur.val); // add up node value
    cur = cur.right!; // right node
  }
  return ret;
};

// morris
var inorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  let cur = root;
  let prev: TreeNode | null = null;

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
      const tmp = cur;
      cur = cur.left;
      tmp.left = null;
    }
  }

  return ret;
};

// morris - Threaded Binary Tree

// If current does not have left child

// a. Add current’s value

// b. Go to the right, i.e., current = current.right

// Else

// a. In current's left subtree, make current the right child of the rightmost node

// b. Go to this left child, i.e., current = current.left
