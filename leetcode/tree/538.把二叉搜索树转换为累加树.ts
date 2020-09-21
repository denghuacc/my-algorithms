/*
 * @lc app=leetcode.cn id=538 lang=typescript
 *
 * [538] 把二叉搜索树转换为累加树
 *
 * https://leetcode-cn.com/problems/convert-bst-to-greater-tree/description/
 *
 * algorithms
 * Easy (63.32%)
 * Likes:    338
 * Dislikes: 0
 * Total Accepted:    41.6K
 * Total Submissions: 65.4K
 * Testcase Example:  '[5,2,13]'
 *
 * 给定一个二叉搜索树（Binary Search Tree），把它转换成为累加树（Greater
 * Tree)，使得每个节点的值是原来的节点值加上所有大于它的节点值之和。
 *
 *
 *
 * 例如：
 *
 * 输入: 原始二叉搜索树:
 * ⁠             5
 * ⁠           /   \
 * ⁠          2     13
 *
 * 输出: 转换为累加树:
 * ⁠            18
 * ⁠           /   \
 * ⁠         20     13
 *
 *
 *
 *
 * 注意：本题和 1038:
 * https://leetcode-cn.com/problems/binary-search-tree-to-greater-sum-tree/ 相同
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
var convertBST = function (root: TreeNode | null): TreeNode | null {
  let sum = 0;
  dfs(root);
  return root;

  // inverse inorder
  function dfs(node: TreeNode | null) {
    if (node) {
      dfs(node.right); // first search right child because its value is bigger
      sum += node.val; // add up all right child value
      node.val = sum; // assign total value to current right child
      dfs(node.left); // finally search left child
    }
  }
};
// @lc code=end

// morris
var convertBST = function (root: TreeNode | null): TreeNode | null {
  let sum = 0;
  let node = root;
  while (node) {
    // if right child is null traverse left child
    if (!node.right) {
      sum += node.val;
      node.val = sum;
      node = node.left;
    }
    // if right child is exist
    else {
      let successor = getSuccessor(node);
      if (!successor.left) {
        successor.left = node;
        node = node.right;
      } else {
        successor.left = null;
        sum += node.val;
        node.val = sum;
        node = node.left;
      }
    }
  }
  return root;

  // get the leftmost child of current right child as successor
  function getSuccessor(node: TreeNode): TreeNode {
    let successor = node.right!;
    while (successor.left && successor.left !== node) {
      successor = successor.left;
    }
    return successor;
  }
};
