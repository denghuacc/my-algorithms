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
  const ret: number[] = [];
  postorder(root, ret);
  return ret;

  function postorder(node: TreeNode | null, arr: number[]) {
    if (node) {
      postorder(node.left, arr);
      postorder(node.right, arr);
      ret.push(node.val);
    }
  }
};

// iterative -> 逆前序
var postorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  const stack: TreeNode[] = [];
  if (!root) return ret;

  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    ret.unshift(node!.val); // unshift -> 和 preorder 相反

    // 先 left 后 right -> 和 preorder 进栈相反
    if (node?.left) stack.push(node.left);
    if (node?.right) stack.push(node.right);
  }

  return ret;
};

// iteration2
var postorderTraversal = function (root: TreeNode | null): number[] {
  const ret: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;
  let top = null;

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack[stack.length - 1];

    if (!cur.right || cur.right == top) {
      ret.push(cur.val);
      stack.pop();
      top = cur;
      cur = null;
    } else {
      cur = cur.right;
    }
  }

  return ret;
};
// @lc code=end
