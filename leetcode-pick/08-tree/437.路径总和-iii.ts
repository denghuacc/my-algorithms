/*
 * @lc app=leetcode.cn id=437 lang=typescript
 *
 * [437] 路径总和 III
 *
 * https://leetcode-cn.com/problems/path-sum-iii/description/
 *
 * algorithms
 * Medium (55.90%)
 * Likes:    580
 * Dislikes: 0
 * Total Accepted:    52.5K
 * Total Submissions: 93.9K
 * Testcase Example:  '[10,5,-3,3,2,null,11,3,-2,null,1]\n8'
 *
 * 给定一个二叉树，它的每个结点都存放着一个整数值。
 *
 * 找出路径和等于给定数值的路径总数。
 *
 * 路径不需要从根节点开始，也不需要在叶子节点结束，但是路径方向必须是向下的（只能从父节点到子节点）。
 *
 * 二叉树不超过1000个节点，且节点数值范围是 [-1000000,1000000] 的整数。
 *
 * 示例：
 *
 * root = [10,5,-3,3,2,null,11,3,-2,null,1], sum = 8
 *
 * ⁠     10
 * ⁠    /  \
 * ⁠   5   -3
 * ⁠  / \    \
 * ⁠ 3   2   11
 * ⁠/ \   \
 * 3  -2   1
 *
 * 返回 3。和等于 8 的路径有:
 *
 * 1.  5 -> 3
 * 2.  5 -> 2 -> 1
 * 3.  -3 -> 11
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
// brute force
var pathSum = function (root: TreeNode | null, sum: number): number {
  if (!root) return 0;
  return (
    calcPathSum(root, sum) + pathSum(root.left, sum) + pathSum(root.right, sum)
  );

  function calcPathSum(node: TreeNode | null, sum: number): number {
    if (!node) return 0;
    sum -= node.val;
    return (
      (sum === 0 ? 1 : 0) +
      calcPathSum(node.left, sum) +
      calcPathSum(node.right, sum)
    );
  }
};

// backtracking
var pathSum = function (root: TreeNode | null, sum: number): number {
  // Map<prefix sum, count>
  const map: Map<number, number> = new Map();
  map.set(0, 1);
  return calcPathSum(root, sum, 0);

  function calcPathSum(node: TreeNode | null, sum: number, subset: number) {
    let res = 0;
    if (!node) return 0;
    subset += node.val;
    res += map.get(subset - sum) ?? 0;
    map.set(subset, (map.get(subset) ?? 0) + 1);
    res +=
      calcPathSum(node.left, sum, subset) +
      calcPathSum(node.right, sum, subset);
    map.set(subset, map.get(subset)! - 1); // rollback
    return res;
  }
};
// @lc code=end
