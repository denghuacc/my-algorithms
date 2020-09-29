/*
 * @lc app=leetcode.cn id=230 lang=typescript
 *
 * [230] 二叉搜索树中第K小的元素
 *
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-bst/description/
 *
 * algorithms
 * Medium (71.82%)
 * Likes:    276
 * Dislikes: 0
 * Total Accepted:    69.4K
 * Total Submissions: 96.6K
 * Testcase Example:  '[3,1,4,null,2]\n1'
 *
 * 给定一个二叉搜索树，编写一个函数 kthSmallest 来查找其中第 k 个最小的元素。
 *
 * 说明：
 * 你可以假设 k 总是有效的，1 ≤ k ≤ 二叉搜索树元素个数。
 *
 * 示例 1:
 *
 * 输入: root = [3,1,4,null,2], k = 1
 * ⁠  3
 * ⁠ / \
 * ⁠1   4
 * ⁠ \
 * 2
 * 输出: 1
 *
 * 示例 2:
 *
 * 输入: root = [5,3,6,2,4,null,null,1], k = 3
 * ⁠      5
 * ⁠     / \
 * ⁠    3   6
 * ⁠   / \
 * ⁠  2   4
 * ⁠ /
 * ⁠1
 * 输出: 3
 *
 * 进阶：
 * 如果二叉搜索树经常被修改（插入/删除操作）并且你需要频繁地查找第 k 小的值，你将如何优化 kthSmallest 函数？
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
// recursive + inOrder
var kthSmallest = function (root: TreeNode | null, k: number): number {
  const arr: number[] = [];
  inOrder(root);
  return arr.slice(k - 1)[0];

  function inOrder(node: TreeNode | null) {
    if (node) {
      if (node.left) inOrder(node.left);
      arr.push(node.val);
      if (node.right) inOrder(node.right);
    }
  }
};

// recursive + inOrder 2
var kthSmallest = function (root: TreeNode | null, k: number): number {
  let ret = Infinity;
  inOrder(root);
  return ret;

  function inOrder(node: TreeNode | null) {
    if (node) {
      if (node.left) inOrder(node.left);
      // 直接在这里获取第 k 个最小值
      if (--k === 0) {
        ret = node.val;
      }
      if (node.right) inOrder(node.right);
    }
  }
};

// iterative + inOrder
var kthSmallest = function (root: TreeNode | null, k: number): number {
  const arr: number[] = [];
  const stack: TreeNode[] = [];
  let cur = root;

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop()!;
    arr.push(cur.val);
    cur = cur.right;
  }

  return arr.slice(k - 1)[0];
};

// iterative + inOrder 2
var kthSmallest = function (root: TreeNode | null, k: number): number {
  let ret = Infinity;
  const stack: TreeNode[] = [];
  let cur = root;

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop()!;
    if (--k === 0) {
      ret = cur.val;
    }
    cur = cur.right;
  }

  return ret;
};
// @lc code=end
