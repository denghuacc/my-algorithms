/*
 * @lc app=leetcode.cn id=897 lang=typescript
 *
 * [897] 递增顺序搜索树
 *
 * https://leetcode-cn.com/problems/increasing-order-search-tree/description/
 *
 * algorithms
 * Easy (73.87%)
 * Likes:    166
 * Dislikes: 0
 * Total Accepted:    33K
 * Total Submissions: 44.7K
 * Testcase Example:  '[5,3,6,2,4,null,8,1,null,null,null,7,9]'
 *
 * 给你一棵二叉搜索树，请你 按中序遍历
 * 将其重新排列为一棵递增顺序搜索树，使树中最左边的节点成为树的根节点，并且每个节点没有左子节点，只有一个右子节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [5,3,6,2,4,null,8,1,null,null,null,7,9]
 * 输出：[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,1,7]
 * 输出：[1,null,5,null,7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数的取值范围是 [1, 100]
 * 0
 *
 *
 */

export {};

// Definition for a binary tree node.
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
var increasingBST = function (root: TreeNode | null): TreeNode | null {
  if (!root) return null;
  const arr: number[] = [];
  inordor(root, arr);
  const node = new TreeNode(arr[0]);
  let cur = node;
  for (let i = 1; i < arr.length; i++) {
    cur.right = new TreeNode(arr[i]);
    cur = cur.right;
  }
  return node;

  function inordor(root: TreeNode | null, arr: number[]) {
    if (root) {
      inordor(root.left, arr);
      arr.push(root.val);
      inordor(root.right, arr);
    }
  }
};

// iterative
var increasingBST = function (root: TreeNode | null): TreeNode | null {
  const stack: TreeNode[] = [];
  const dummy = new TreeNode(-1);
  let node = dummy;

  let cur = root;
  while (cur || stack.length) {
    while (cur) {
      stack.push(cur);
      cur = cur.left;
    }
    cur = stack.pop()!;
    node.right = new TreeNode(cur.val);
    node = node.right;
    cur = cur.right;
  }

  return dummy.right;
};

// @lc code=end
