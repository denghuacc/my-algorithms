/*
 * @lc app=leetcode.cn id=62 lang=typescript
 *
 * [62] 不同路径
 *
 * https://leetcode-cn.com/problems/unique-paths/description/
 *
 * algorithms
 * Medium (51.92%)
 * Likes:    576
 * Dislikes: 0
 * Total Accepted:    113.2K
 * Total Submissions: 186.5K
 * Testcase Example:  '3\n2'
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 *
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 *
 * 问总共有多少条不同的路径？
 *
 *
 *
 * 例如，上图是一个7 x 3 的网格。有多少可能的路径？
 *
 *
 *
 * 示例 1:
 *
 * 输入: m = 3, n = 2
 * 输出: 3
 * 解释:
 * 从左上角开始，总共有 3 条路径可以到达右下角。
 * 1. 向右 -> 向右 -> 向下
 * 2. 向右 -> 向下 -> 向右
 * 3. 向下 -> 向右 -> 向右
 *
 *
 * 示例 2:
 *
 * 输入: m = 7, n = 3
 * 输出: 28
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m, n <= 100
 * 题目数据保证答案小于等于 2 * 10 ^ 9
 *
 *
 */

// @lc code=start
// dp
var uniquePaths = function (m: number, n: number): number {
  // dp[i][j] -> 到达 i,j 位置的最多路径
  const dp: number[][] = new Array(m).fill(0).map(() => new Array(n).fill(0));
  for (let i = 0; i < n; i++) dp[0][i] = 1;
  for (let i = 0; i < m; i++) dp[i][0] = 1;
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
};

// optimize1
var uniquePaths = function (m: number, n: number): number {
  let pre: number[] = new Array(n).fill(1);
  const cur: number[] = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      cur[j] = cur[j - 1] + pre[j];
    }
    pre = cur.slice();
  }
  return pre[n - 1];
};

// optimize2
var uniquePaths = function (m: number, n: number): number {
  const cur: number[] = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      cur[j] += cur[j - 1];
    }
  }
  return cur[n - 1];
};
// @lc code=end
