/*
 * @lc app=leetcode.cn id=662 lang=typescript
 *
 * [662] 二叉树最大宽度
 *
 * https://leetcode.cn/problems/maximum-width-of-binary-tree/description/
 *
 * algorithms
 * Medium (41.33%)
 * Likes:    446
 * Dislikes: 0
 * Total Accepted:    60.4K
 * Total Submissions: 143.4K
 * Testcase Example:  '[1,3,2,5,3,null,9]'
 *
 * 给你一棵二叉树的根节点 root ，返回树的 最大宽度 。
 *
 * 树的 最大宽度 是所有层中最大的 宽度 。
 *
 *
 *
 * 每一层的 宽度 被定义为该层最左和最右的非空节点（即，两个端点）之间的长度。将这个二叉树视作与满二叉树结构相同，两端点间会出现一些延伸到这一层的
 * null 节点，这些 null 节点也计入长度。
 *
 * 题目数据保证答案将会在  32 位 带符号整数范围内。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：root = [1,3,2,5,3,null,9]
 * 输出：4
 * 解释：最大宽度出现在树的第 3 层，宽度为 4 (5,3,null,9) 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [1,3,2,5,null,null,9,6,null,7]
 * 输出：7
 * 解释：最大宽度出现在树的第 4 层，宽度为 7 (6,null,null,null,null,null,7) 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：root = [1,3,2,5]
 * 输出：2
 * 解释：最大宽度出现在树的第 2 层，宽度为 2 (3,2) 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中节点的数目范围是 [1, 3000]
 * -100 <= Node.val <= 100
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
// bfs
var widthOfBinaryTree = function (root: TreeNode | null): number {
  if (!root) return 0;
  const queue: [TreeNode, bigint][] = [[root, 0n]];
  let maxWidth = 1n;

  while (queue.length) {
    const width = queue[queue.length - 1][1] - queue[0][1] + 1n;
    if (width > maxWidth) {
      maxWidth = width;
    }
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const [node, idx] = queue.shift()!;
      if (node.left) queue.push([node.left, 2n * idx]);
      if (node.right) queue.push([node.right, 2n * idx + 1n]);
    }
  }

  return Number(maxWidth);
};

// dfs
var widthOfBinaryTree = function (root: TreeNode | null): number {
  const levels: [TreeNode, bigint][][] = [];
  dfs(root!, 0n, 0);

  let maxWidth = -Infinity;
  for (let i = 0; i < levels.length; i++) {
    const list = levels[i];
    const width = Number(list[list.length - 1][1] - list[0][1] + 1n);
    maxWidth = Math.max(maxWidth, width);
  }
  return maxWidth;

  function dfs(node: TreeNode, idx: bigint, level: number) {
    if (levels.length === level) {
      levels[level] = [[node, idx]];
    } else {
      levels[level].push([node, idx]);
    }
    if (node.left) dfs(node.left, 2n * idx, level + 1);
    if (node.right) dfs(node.right, 2n * idx + 1n, level + 1);
  }
};
// @lc code=end
