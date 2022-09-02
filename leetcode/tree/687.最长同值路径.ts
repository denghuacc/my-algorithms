/*
 * @lc app=leetcode.cn id=687 lang=typescript
 *
 * [687] 最长同值路径
 *
 * https://leetcode.cn/problems/longest-univalue-path/description/
 *
 * algorithms
 * Medium (45.40%)
 * Likes:    633
 * Dislikes: 0
 * Total Accepted:    55.3K
 * Total Submissions: 120.2K
 * Testcase Example:  '[5,4,5,1,1,null,5]'
 *
 * 给定一个二叉树的 root ，返回 最长的路径的长度 ，这个路径中的 每个节点具有相同值 。 这条路径可以经过也可以不经过根节点。
 *
 * 两个节点之间的路径长度 由它们之间的边数表示。
 *
 *
 *
 * 示例 1:
 *
 *
 *
 *
 * 输入：root = [5,4,5,1,1,5]
 * 输出：2
 *
 *
 * 示例 2:
 *
 *
 *
 *
 * 输入：root = [1,4,5,4,4,5]
 * 输出：2
 *
 *
 *
 *
 * 提示:
 *
 *
 * 树的节点数的范围是 [0, 10^4]
 * -1000 <= Node.val <= 1000
 * 树的深度将不超过 1000
 *
 *
 */

export {};

//  Definition for a binary tree node.
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
function longestUnivaluePath(root: TreeNode | null): number {
  let res = 0;
  dfs(root);
  return res;

  function dfs(root: TreeNode | null) {
    if (!root) return 0;
    const leftPath = dfs(root.left);
    const rightPath = dfs(root.right);
    let left = 0;
    let right = 0;
    if (root.left?.val === root.val) {
      left = leftPath + 1;
    }
    if (root.right?.val === root.val) {
      right = rightPath + 1;
    }
    res = Math.max(res, left + right);
    return Math.max(left, right);
  }
}
// @lc code=end
