/*
 * @lc app=leetcode.cn id=783 lang=typescript
 *
 * [783] 二叉搜索树节点最小距离
 *
 * https://leetcode-cn.com/problems/minimum-distance-between-bst-nodes/description/
 *
 * algorithms
 * Easy (53.65%)
 * Likes:    79
 * Dislikes: 0
 * Total Accepted:    17.3K
 * Total Submissions: 32.3K
 * Testcase Example:  '[4,2,6,1,3,null,null]'
 *
 * 给定一个二叉搜索树的根节点 root，返回树中任意两节点的差的最小值。
 *
 *
 *
 * 示例：
 *
 * 输入: root = [4,2,6,1,3,null,null]
 * 输出: 1
 * 解释:
 * 注意，root是树节点对象(TreeNode object)，而不是数组。
 *
 * 给定的树 [4,2,6,1,3,null,null] 可表示为下图:
 *
 * ⁠         4
 * ⁠       /   \
 * ⁠     2      6
 * ⁠    / \
 * ⁠   1   3
 *
 * 最小的差值是 1, 它是节点1和节点2的差值, 也是节点3和节点2的差值。
 *
 *
 *
 * 注意：
 *
 *
 * 二叉树的大小范围在 2 到 100。
 * 二叉树总是有效的，每个节点的值都是整数，且不重复。
 * 本题与 530：https://leetcode-cn.com/problems/minimum-absolute-difference-in-bst/
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
// the same as leetcode 530
// recursive + inOrder
var minDiffInBST = function (root: TreeNode | null): number {
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
var minDiffInBST = function (root: TreeNode | null): number {
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
var minDiffInBST = function (root: TreeNode | null): number {
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
var minDiffInBST = function (root: TreeNode | null): number {
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
