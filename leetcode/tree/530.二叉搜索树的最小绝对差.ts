/*
 * @lc app=leetcode.cn id=530 lang=typescript
 *
 * [530] 二叉搜索树的最小绝对差
 *
 * https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/description/
 *
 * algorithms
 * Easy (58.06%)
 * Likes:    136
 * Dislikes: 0
 * Total Accepted:    20.8K
 * Total Submissions: 35.8K
 * Testcase Example:  '[1,null,3,2]'
 *
 * 给你一棵所有节点为非负值的二叉搜索树，请你计算树中任意两节点的差的绝对值的最小值。
 *
 *
 *
 * 示例：
 *
 * 输入：
 *
 * ⁠  1
 * ⁠   \
 * ⁠    3
 * ⁠   /
 * ⁠  2
 *
 * 输出：
 * 1
 *
 * 解释：
 * 最小绝对差为 1，其中 2 和 1 的差的绝对值为 1（或者 2 和 3）。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中至少有 2 个节点。
 * 本题与 783 https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/
 * 相同
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
// the same as leetcode 783
// recursive + inOrder
var getMinimumDifference = function (root: TreeNode | null): number {
  const arr: number[] = [];
  inOrder(root);
  let min = Infinity;
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    min = Math.min(min, diff);
  }
  return min;

  // BST 中序遍历是升序排序，不用再排序
  // 后续只要比较相邻的元素的差值就可以得出最小差值
  function inOrder(node: TreeNode | null) {
    if (node) {
      if (node.left) inOrder(node.left);
      arr.push(node.val);
      if (node.right) inOrder(node.right);
    }
  }
};

// recursive + inOrder 2
var getMinimumDifference = function (root: TreeNode | null): number {
  let prev: number | null = null;
  let min = Infinity;
  inOrder(root);
  return min;

  // BST 中序遍历是升序排序，不用再排序
  // 在中序遍历时进行比较
  function inOrder(node: TreeNode | null) {
    if (node) {
      if (node.left) inOrder(node.left);
      if (prev !== null) {
        min = Math.min(min, node.val - prev);
      }
      prev = node.val;
      if (node.right) inOrder(node.right);
    }
  }
};

// iterative + inOrder
var getMinimumDifference = function (root: TreeNode | null): number {
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

  let min = Infinity;
  for (let i = 1; i < arr.length; i++) {
    const diff = arr[i] - arr[i - 1];
    min = Math.min(min, diff);
  }
  return min;
};

// iterative + inOrder 2
var getMinimumDifference = function (root: TreeNode | null): number {
  let prev: number | null = null;
  const stack: TreeNode[] = [];
  let cur = root;
  let min = Infinity;

  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop()!;
    if (prev !== null) {
      min = Math.min(min, cur.val - prev);
    }
    prev = cur.val;
    cur = cur.right;
  }

  return min;
};
// @lc code=end
