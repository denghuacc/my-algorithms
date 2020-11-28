/*
 * @lc app=leetcode.cn id=222 lang=typescript
 *
 * [222] 完全二叉树的节点个数
 *
 * https://leetcode-cn.com/problems/count-complete-tree-nodes/description/
 *
 * algorithms
 * Medium (37.99%)
 * Likes:    193
 * Dislikes: 0
 * Total Accepted:    25.7K
 * Total Submissions: 36.3K
 * Testcase Example:  '[1,2,3,4,5,6]'
 *
 * 给出一个完全二叉树，求出该树的节点个数。
 *
 * 说明：
 *
 *
 * 完全二叉树的定义如下：在完全二叉树中，除了最底层节点可能没填满外，其余每层节点数都达到最大值，并且最下面一层的节点都集中在该层最左边的若干位置。若最底层为第
 * h 层，则该层包含 1~ 2^h 个节点。
 *
 * 示例:
 *
 * 输入:
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   3
 * ⁠/ \  /
 * 4  5 6
 *
 * 输出: 6
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
var countNodes = function (root: TreeNode | null): number {
  return root ? 1 + countNodes(root.left) + countNodes(root.right) : 0;
};

// binary search
var countNodes = function (root: TreeNode | null): number {
  if (!root) return 0;
  const depth = computeDepth(root);
  if (depth === 0) return 1;
  let left = 1;
  let right = Math.pow(2, depth) - 1;

  while (left <= right) {
    let pivot = left + Math.floor((right - left) / 2);
    if (exists(pivot, depth, root)) {
      left = pivot + 1;
    } else {
      right = pivot - 1;
    }
  }

  return Math.pow(2, depth) - 1 + left;

  function computeDepth(node: TreeNode): number {
    let depth = 0;
    while (node.left) {
      node = node.left;
      depth++;
    }
    return depth;
  }

  function exists(idx: number, depth: number, node: TreeNode): boolean {
    let left = 0;
    let right = Math.pow(2, depth) - 1;
    let pivot: number;

    for (let i = 0; i < depth; i++) {
      pivot = left + Math.floor((right - left) / 2);
      if (idx <= pivot) {
        node = node.left!;
        right = pivot;
      } else {
        node = node.right!;
        left = pivot + 1;
      }
    }

    return node !== null;
  }
};

// binary search 2
var countNodes = function (root: TreeNode | null): number {
  if (!root) return 0;
  const leftDepth = getDepth(root.left);
  const rightDepth = getDepth(root.right);

  if (leftDepth === rightDepth) {
    return Math.pow(2, leftDepth) + countNodes(root.right);
  } else {
    return Math.pow(2, rightDepth) + countNodes(root.left);
  }

  function getDepth(node: TreeNode | null) {
    let depth = 0;
    while (node) {
      depth += 1;
      node = node.left;
    }
    return depth;
  }
};
// @lc code=end
