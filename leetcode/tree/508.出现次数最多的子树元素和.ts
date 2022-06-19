/*
 * @lc app=leetcode.cn id=508 lang=typescript
 *
 * [508] 出现次数最多的子树元素和
 *
 * https://leetcode.cn/problems/most-frequent-subtree-sum/description/
 *
 * algorithms
 * Medium (68.84%)
 * Likes:    163
 * Dislikes: 0
 * Total Accepted:    22.9K
 * Total Submissions: 32K
 * Testcase Example:  '[5,2,-3]'
 *
 * 给你一个二叉树的根结点 root ，请返回出现次数最多的子树元素和。如果有多个元素出现的次数相同，返回所有出现次数最多的子树元素和（不限顺序）。
 *
 * 一个结点的 「子树元素和」 定义为以该结点为根的二叉树上所有结点的元素之和（包括结点本身）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入: root = [5,2,-3]
 * 输出: [2,-3,4]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入: root = [5,2,-5]
 * 输出: [2]
 *
 *
 *
 *
 * 提示:
 *
 *
 * 节点数在 [1, 10^4] 范围内
 * -10^5 <= Node.val <= 10^5
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
function findFrequentTreeSum(root: TreeNode | null): number[] {
  if (!root) return [];
  const map = new Map<number, number>();
  dfs(root);
  const res: number[] = [];
  let max = -Infinity;
  for (const [key, value] of map) {
    if (value > max) {
      res.length = 0;
      max = value;
    }
    if (value === max) {
      res.push(key);
    }
  }
  return res;

  function dfs(node: TreeNode | null): number {
    if (!node) return 0;
    const left = dfs(node.left);
    const right = dfs(node.right);
    const sum = left + right + node.val;
    map.set(sum, (map.get(sum) || 0) + 1);
    return sum;
  }
}
// @lc code=end
