/*
 * @lc app=leetcode.cn id=559 lang=typescript
 *
 * [559] N 叉树的最大深度
 *
 * https://leetcode-cn.com/problems/maximum-depth-of-n-ary-tree/description/
 *
 * algorithms
 * Easy (71.58%)
 * Likes:    152
 * Dislikes: 0
 * Total Accepted:    44.9K
 * Total Submissions: 62.7K
 * Testcase Example:  '[1,null,3,2,4,null,5,6]'
 *
 * 给定一个 N 叉树，找到其最大深度。
 *
 * 最大深度是指从根节点到最远叶子节点的最长路径上的节点总数。
 *
 * N 叉树输入按层序遍历序列化表示，每组子节点由空值分隔（请参见示例）。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,null,3,2,4,null,5,6]
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：root =
 * [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树的深度不会超过 1000 。
 * 树的节点数目位于 [0, 10^4] 之间。
 *
 *
 */

export {};

// Definition for Node.
class Node {
  val: number;
  children: Node[];
  constructor(val?: number, children?: Node[]) {
    this.val = val === undefined ? 0 : val;
    this.children = children === undefined ? [] : children;
  }
}

// @lc code=start
// recursive
var maxDepth = function (root: Node): number {
  if (!root) {
    return 0;
  } else if (!root.children.length) {
    return 1;
  } else {
    let max = 0;
    for (const node of root.children) {
      max = Math.max(maxDepth(node), max);
    }
    return max + 1;
  }
};

// bfs + iterative
var maxDepth = function (root: Node): number {
  if (!root) return 0;
  const queue: Node[] = [root];
  let max = 0;

  while (queue.length) {
    let size = queue.length;
    while (size > 0) {
      const node = queue.shift()!;
      if (node.children.length) {
        for (const child of node.children) {
          queue.push(child);
        }
      }
      size--;
    }
    max++; // max depth add 1 per loop
  }

  return max;
};
// @lc code=end
