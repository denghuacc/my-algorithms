/*
 * @lc app=leetcode.cn id=1161 lang=typescript
 *
 * [1161] 最大层内元素和
 *
 * https://leetcode.cn/problems/maximum-level-sum-of-a-binary-tree/description/
 *
 * algorithms
 * Medium (62.93%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    22K
 * Total Submissions: 33.6K
 * Testcase Example:  '[1,7,0,7,-8,null,null]'
 *
 * 给你一个二叉树的根节点 root。设根节点位于二叉树的第 1 层，而根节点的子节点位于第 2 层，依此类推。
 *
 * 请返回层内元素之和 最大 的那几层（可能只有一层）的层号，并返回其中 最小 的那个。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：root = [1,7,0,7,-8,null,null]
 * 输出：2
 * 解释：
 * 第 1 层各元素之和为 1，
 * 第 2 层各元素之和为 7 + 0 = 7，
 * 第 3 层各元素之和为 7 + -8 = -1，
 * 所以我们返回第 2 层的层号，它的层内元素之和最大。
 *
 *
 * 示例 2：
 *
 *
 * 输入：root = [989,null,10250,98693,-89388,null,null,null,-32127]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 树中的节点数在 [1, 10^4]范围内
 * -10^5 <= Node.val <= 10^5
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
// bfs
/**
 * 使用 BFS 逐层统计和，返回层内和最大的最小层号。
 *
 * @param root - 二叉树根节点
 * @returns 层内元素和最大的最小层号
 */
var maxLevelSum = function (root: TreeNode | null): number {
  // 用队列按层遍历，root 一定非空
  const queue: TreeNode[] = [root!];
  let maxSum = -Infinity;
  let level = 1;
  let res = 1;

  while (queue.length) {
    const size = queue.length;
    let sum = 0;
    for (let i = 0; i < size; i++) {
      const node = queue.shift()!;
      // 累加当前层的节点值
      sum += node.val;
      // 将下一层节点入队，保持层序遍历
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }

    // 只在严格更大时更新，保证最小层号
    if (sum > maxSum) {
      maxSum = sum;
      res = level;
    }
    level++;
  }

  return res;
};

// dfs
/**
 * 使用 DFS 统计每层的节点和，再找最大层号。
 *
 * @param root - 二叉树根节点
 * @returns 层内元素和最大的最小层号
 */
var maxLevelSum = function (root: TreeNode | null): number {
  const sumArr: number[] = [];
  // 先遍历收集每层的和
  dfs(root!, 0);

  let level = 0;
  for (let i = 0; i < sumArr.length; i++) {
    // 只在严格更大时更新，保证最小层号
    if (sumArr[level] < sumArr[i]) {
      level = i;
    }
  }
  return level + 1;

  function dfs(node: TreeNode, level: number) {
    // 首次到达该层，创建层和；否则累加
    if (sumArr.length === level) {
      sumArr.push(node.val);
    } else {
      sumArr[level] += node.val;
    }

    // 继续向下一层递归
    if (node.left) dfs(node.left, level + 1);
    if (node.right) dfs(node.right, level + 1);
  }
};
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：计算每一层节点值的和，找出最大和的最小层号。
   - 关键特点：层号从 1 开始，若最大和有多层并列，取最小层号。
   - 目标：返回最大层内元素和对应的最小层号。

2. 解题思路
   核心思想
   - 方法一（BFS）：按层遍历，实时计算每层的和并更新最大值。
   - 方法二（DFS）：递归累加每层的和，再遍历层和数组找最大。

   算法步骤（BFS）
   1) 使用队列进行层序遍历。
   2) 每轮固定队列长度为当前层的节点数，累加该层节点值。
   3) 若当前层和更大，则记录当前层号。
   4) 遍历完成后返回记录的层号。

   算法步骤（DFS）
   1) 递归遍历节点，使用数组 sumArr 累加每层的和。
   2) 遍历 sumArr，找到最大和对应的最小层号。
   3) 返回层号（索引 + 1）。

3. 代码实现
   实现步骤（BFS）
   - 使用 queue 逐层遍历。
   - 用 size 固定每一层的节点数量，累加得到层和。
   - 只在严格更大时更新结果，保证最小层号。

   实现步骤（DFS）
   - 用 sumArr 记录每层的累计和。
   - 递归时传入层号 level，按层累加。
   - 遍历 sumArr 找到最大层号。

   关键函数说明
   - maxLevelSum（BFS）：层序遍历求最大层和。
   - maxLevelSum（DFS）：递归累加层和并取最大。

4. 复杂度分析
   - 时间复杂度：O(n)，每个节点访问一次。
   - 空间复杂度：O(n)，BFS 队列或 DFS 递归栈与层和数组。
   - 关键观察：每层只需统计一次即可得到最大层和。

5. 示例分析
   示例一：root = [1,7,0,7,-8,null,null]
   - 第 1 层和为 1。
   - 第 2 层和为 7。
   - 第 3 层和为 -1。
   - 最大层和为第 2 层，返回 2。

   示例二：root = [989,null,10250,98693,-89388,null,null,null,-32127]
   - 按层统计后第 2 层和最大，返回 2。

   边界情况
   - 只有一个节点：答案为 1。
   - 多层和相等：返回最小层号。

6. 算法要点总结
   核心技巧
   - BFS 适合按层统计，逻辑直观。
   - DFS 使用层号索引累加，空间更紧凑。

   优化要点
   - 比较时只在严格更大时更新，满足最小层号要求。
   - 不需要额外排序或优先队列。

   类似问题
   - 二叉树的层序遍历统计类问题。
   - 按层聚合与最大值选择问题。

7. 常见错误
   - 忽略“最小层号”要求，导致相等时错误更新。
   - BFS 中未固定当前层大小，导致层和混乱。
   - DFS 中层号递增错误，导致层和错位。
*/
