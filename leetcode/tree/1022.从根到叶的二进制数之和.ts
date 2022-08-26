/*
 * @lc app=leetcode.cn id=1022 lang=typescript
 *
 * [1022] 从根到叶的二进制数之和
 *
 * https://leetcode.cn/problems/sum-of-root-to-leaf-binary-numbers/description/
 *
 * algorithms
 * Easy (73.26%)
 * Likes:    158
 * Dislikes: 0
 * Total Accepted:    30.7K
 * Total Submissions: 41.9K
 * Testcase Example:  '[1,0,1,0,1,0,1]'
 *
 * 给出一棵二叉树，其上每个结点的值都是 0 或 1 。每一条从根到叶的路径都代表一个从最高有效位开始的二进制数。
 *
 *
 * 例如，如果路径为 0 -> 1 -> 1 -> 0 -> 1，那么它表示二进制数 01101，也就是 13 。
 *
 *
 * 对树上的每一片叶子，我们都要找出从根到该叶子的路径所表示的数字。
 *
 * 返回这些数字之和。题目数据保证答案是一个 32 位 整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,0,1,0,1,0,1]
 * 输出：22
 * 解释：(100) + (101) + (110) + (111) = 4 + 5 + 6 + 7 = 22
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [0]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在 [1, 1000] 范围内
 * Node.val 仅为 0 或 1
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
// dfs
var sumRootToLeaf = function (root: TreeNode | null): number {
  if (!root) return 0;
  const res: string[] = [];
  dfs(root, "");
  return res.reduce((a, b) => a + parseInt(b, 2), 0);

  function dfs(node: TreeNode | null, path: string) {
    if (!node) return;
    if (!node.left && !node.right) {
      res.push(path + node.val);
    }
    dfs(node.left, path + node.val);
    dfs(node.right, path + node.val);
  }
};

// improved dfs ✅
var sumRootToLeaf = function (root: TreeNode | null): number {
  return dfs(root, 0);

  function dfs(node: TreeNode | null, val: number): number {
    if (!node) return 0;
    val = val * 2 + node.val;
    if (!node.left && !node.right) return val;
    return dfs(node.left, val) + dfs(node.right, val);
  }
};
// @lc code=end
