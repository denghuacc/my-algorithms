/*
 * @lc app=leetcode.cn id=894 lang=typescript
 *
 * [894] 所有可能的真二叉树
 *
 * https://leetcode.cn/problems/all-possible-full-binary-trees/description/
 *
 * algorithms
 * Medium (77.72%)
 * Likes:    356
 * Dislikes: 0
 * Total Accepted:    26.8K
 * Total Submissions: 33.9K
 * Testcase Example:  '7'
 *
 * 给你一个整数 n ，请你找出所有可能含 n 个节点的 真二叉树 ，并以列表形式返回。答案中每棵树的每个节点都必须符合 Node.val == 0 。
 *
 * 答案的每个元素都是一棵真二叉树的根节点。你可以按 任意顺序 返回最终的真二叉树列表。
 *
 * 真二叉树 是一类二叉树，树中每个节点恰好有 0 或 2 个子节点。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 7
 *
 * 输出：[[0,0,0,null,null,0,0,null,null,0,0],[0,0,0,null,null,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,null,null,null,null,0,0],[0,0,0,0,0,null,null,0,0]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3
 * 输出：[[0,0,0]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 20
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
function allPossibleFBT(n: number): Array<TreeNode | null> {
  const res: Array<TreeNode | null> = [];
  if (n % 2 === 0) {
    return res;
  }
  if (n === 1) {
    res.push(new TreeNode(0));
    return res;
  }
  for (let i = 1; i < n; i += 2) {
    const left = allPossibleFBT(i);
    const right = allPossibleFBT(n - i - 1);
    for (const l of left) {
      for (const r of right) {
        const node = new TreeNode(0, l, r);
        res.push(node);
      }
    }
  }
  return res;
}
// @lc code=end
