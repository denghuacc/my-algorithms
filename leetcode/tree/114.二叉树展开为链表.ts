/*
 * @lc app=leetcode.cn id=114 lang=typescript
 *
 * [114] 二叉树展开为链表
 *
 * https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/description/
 *
 * algorithms
 * Medium (56.91%)
 * Likes:    468
 * Dislikes: 0
 * Total Accepted:    63.1K
 * Total Submissions: 89.6K
 * Testcase Example:  '[1,2,5,3,4,null,6]'
 *
 * 给定一个二叉树，原地将它展开为一个单链表。
 *
 *
 *
 * 例如，给定二叉树
 *
 * ⁠   1
 * ⁠  / \
 * ⁠ 2   5
 * ⁠/ \   \
 * 3   4   6
 *
 * 将其展开为：
 *
 * 1
 * ⁠\
 * ⁠ 2
 * ⁠  \
 * ⁠   3
 * ⁠    \
 * ⁠     4
 * ⁠      \
 * ⁠       5
 * ⁠        \
 * ⁠         6
 *
 */

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
/**
 Do not return anything, modify root in-place instead.
 */
// preorder + recursive
var flatten = function (root: TreeNode | null): void {
  const list: TreeNode[] = [];
  preorder(root, list);
  for (let i = 1; i < list.length; i++) {
    const prev = list[i - 1];
    const cur = list[i];
    prev.left = null;
    prev.right = cur;
  }

  function preorder(node: TreeNode | null, list: TreeNode[]) {
    if (node) {
      list.push(node);
      preorder(node.left, list);
      preorder(node.right, list);
    }
  }
};

// preorder + iterative
var flatten = function (root: TreeNode | null): void {
  const list: TreeNode[] = [];
  const stack: TreeNode[] = [];
  let node = root;

  while (node || stack.length) {
    while (node) {
      list.push(node);
      stack.push(node);
      node = node.left;
    }
    node = stack.pop()!;
    node = node.right;
  }

  for (let i = 1; i < list.length; i++) {
    const prev = list[i - 1];
    const cur = list[i];
    prev.left = null;
    prev.right = cur;
  }
};

// preorder + iterative 2
var flatten = function (root: TreeNode | null): void {
  if (!root) return;
  const stack: TreeNode[] = [];
  stack.push(root);
  let prev: TreeNode | null = null;
  while (stack.length) {
    const cur = stack.pop()!;
    if (prev) {
      prev!.left = null;
      prev!.right = cur;
    }
    const left = cur.left;
    const right = cur.right;
    if (right) stack.push(right);
    if (left) stack.push(left);
    prev = cur;
  }
};

// 寻找前驱节点
var flatten = function (root: TreeNode | null): void {
  let cur = root;
  while (cur) {
    if (cur.left) {
      const next = cur.left;
      let predecessor = next;
      while (predecessor.right) {
        predecessor = predecessor.right;
      }
      predecessor.right = cur.right;
      cur.left = null;
      cur.right = next;
    }
    cur = cur.right;
  }
};
// @lc code=end
