/*
 * @lc app=leetcode.cn id=1080 lang=typescript
 *
 * [1080] 根到叶路径上的不足节点
 *
 * https://leetcode.cn/problems/insufficient-nodes-in-root-to-leaf-paths/description/
 *
 * algorithms
 * Medium (52.56%)
 * Likes:    116
 * Dislikes: 0
 * Total Accepted:    12K
 * Total Submissions: 20.9K
 * Testcase Example:  '[1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14]\n1'
 *
 * 给你二叉树的根节点 root 和一个整数 limit ，请你同时删除树中所有 不足节点 ，并返回最终二叉树的根节点。
 *
 * 假如通过节点 node 的每种可能的 “根-叶” 路径上值的总和全都小于给定的 limit，则该节点被称之为 不足节点 ，需要被删除。
 *
 * 叶子节点，就是没有子节点的节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,2,3,4,-99,-99,7,8,9,-99,-99,12,13,-99,14], limit = 1
 * 输出：[1,2,3,4,null,null,7,8,9,null,14]
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [5,4,8,11,null,17,4,7,1,null,null,5,3], limit = 22
 * 输出：[5,4,8,11,null,17,4,7,null,null,null,5]
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,2,-3,-5,null,4,null], limit = -1
 * 输出：[1,null,-3,4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点数目在范围 [1, 5000] 内
 * -10^5 <= Node.val <= 10^5
 * -10^9 <= limit <= 10^9
 *
 *
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
function sufficientSubset(
  root: TreeNode | null,
  limit: number
): TreeNode | null {
  const hasCheck = check(root, 0, limit);
  return hasCheck ? root : null;

  function check(node: TreeNode | null, sum: number, limit: number): boolean {
    if (node === null) {
      return false;
    }
    if (node.left === null && node.right === null) {
      return node.val + sum >= limit;
    }
    const checkLeft = check(node.left, node.val + sum, limit);
    const checkRight = check(node.right, node.val + sum, limit);
    if (!checkLeft) {
      node.left = null;
    }
    if (!checkRight) {
      node.right = null;
    }
    return checkLeft || checkRight;
  }
}
// @lc code=end
