/*
 * @lc app=leetcode.cn id=337 lang=typescript
 *
 * [337] 打家劫舍 III
 *
 * https://leetcode-cn.com/problems/house-robber-iii/description/
 *
 * algorithms
 * Medium (51.56%)
 * Likes:    407
 * Dislikes: 0
 * Total Accepted:    35.4K
 * Total Submissions: 61.5K
 * Testcase Example:  '[3,2,3,null,3,null,1]'
 *
 * 在上次打劫完一条街道之后和一圈房屋后，小偷又发现了一个新的可行窃的地区。这个地区只有一个入口，我们称之为“根”。
 * 除了“根”之外，每栋房子有且只有一个“父“房子与之相连。一番侦察之后，聪明的小偷意识到“这个地方的所有房屋的排列类似于一棵二叉树”。
 * 如果两个直接相连的房子在同一天晚上被打劫，房屋将自动报警。
 *
 * 计算在不触动警报的情况下，小偷一晚能够盗取的最高金额。
 *
 * 示例 1:
 *
 * 输入: [3,2,3,null,3,null,1]
 *
 * ⁠    3
 * ⁠   / \
 * ⁠  2   3
 * ⁠   \   \
 * ⁠    3   1
 *
 * 输出: 7
 * 解释: 小偷一晚能够盗取的最高金额 = 3 + 3 + 1 = 7.
 *
 * 示例 2:
 *
 * 输入: [3,4,5,1,3,null,1]
 *
 *     3
 * ⁠   / \
 * ⁠  4   5
 * ⁠ / \   \
 * ⁠1   3   1
 *
 * 输出: 9
 * 解释: 小偷一晚能够盗取的最高金额 = 4 + 5 = 9.
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
// dp timeout
var rob = function (root: TreeNode | null): number {
  const memo = new Map<TreeNode, number>();
  if (!root) return 0;
  if (memo.has(root)) return memo.get(root)!;
  const doIt =
    root.val +
    (!root.left ? 0 : rob(root.left.left) + rob(root.left.right)) +
    (!root.right ? 0 : rob(root.right.left) + rob(root.right.right));

  const notDoIt = rob(root.left) + rob(root.right);

  const ret = Math.max(doIt, notDoIt);
  memo.set(root, ret);
  return ret;
};

// dp2
var rob = function (root: TreeNode | null): number {
  const ret = dp(root!);
  return Math.max(ret[0], ret[1]);

  function dp(root: TreeNode | null): [number, number] {
    if (!root) return [0, 0];
    let left = dp(root.left);
    let right = dp(root.right);
    const doIt = root.val + left[0] + right[0];
    const notDoIt = Math.max(left[0], left[1]) + Math.max(right[0], right[1]);
    return [notDoIt, doIt];
  }
};
// @lc code=end
