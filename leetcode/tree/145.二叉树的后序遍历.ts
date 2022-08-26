/*
 * @lc app=leetcode.cn id=145 lang=typescript
 *
 * [145] 二叉树的后序遍历
 *
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/description/
 *
 * algorithms
 * Hard (63.43%)
 * Likes:    281
 * Dislikes: 0
 * Total Accepted:    69.7K
 * Total Submissions: 98K
 * Testcase Example:  '[1,null,2,3]'
 *
 * 给定一个二叉树，返回它的 后序 遍历。
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
 * 输出: [3,2,1]
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
var postorderTraversal = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  postorder(root);
  return res;

  function postorder(node: TreeNode | null): void {
    if (node) {
      postorder(node.left);
      postorder(node.right);
      res.push(node.val);
    }
  }
};

// iterative -> inverse preorder
var postorderTraversal = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  const stack: TreeNode[] = [];

  stack.push(root);
  while (stack.length) {
    const node = stack.pop()!;
    res.unshift(node!.val); // unshift -> opposite to preorder

    // first left last right -> opposite to preorder
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return res;
};
// @lc code=end

// iteration2
var postorderTraversal = function (root: TreeNode | null): number[] {
  const res: number[] = [];
  if (!root) return res;
  const stack: TreeNode[] = [];
  let prev: TreeNode | null = root;

  while (root || stack.length) {
    while (root) {
      stack.push(root);
      root = root.left;
    }
    root = stack.pop()!; // the node of minimal value (left bottom)
    if (!root.right || root.right === prev) {
      res.push(root.val);
      prev = root;
      root = null;
    } else {
      stack.push(root);
      root = root.right;
    }
  }

  return res;
};
