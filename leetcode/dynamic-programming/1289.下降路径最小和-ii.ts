/*
 * @lc app=leetcode.cn id=1289 lang=typescript
 *
 * [1289] 下降路径最小和  II
 *
 * https://leetcode.cn/problems/minimum-falling-path-sum-ii/description/
 *
 * algorithms
 * Hard (60.54%)
 * Likes:    128
 * Dislikes: 0
 * Total Accepted:    20.4K
 * Total Submissions: 33.7K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个 n x n 整数矩阵 grid ，请你返回 非零偏移下降路径 数字和的最小值。
 *
 * 非零偏移下降路径 定义为：从 grid 数组中的每一行选择一个数字，且按顺序选出来的数字中，相邻数字不在原数组的同一列。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：13
 * 解释：
 * 所有非零偏移下降路径包括：
 * [1,5,9], [1,5,7], [1,6,7], [1,6,8],
 * [2,4,8], [2,4,9], [2,6,7], [2,6,8],
 * [3,4,8], [3,4,9], [3,5,7], [3,5,9]
 * 下降路径中数字和最小的是 [1,5,7] ，所以答案是 13 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[7]]
 * 输出：7
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == grid.length == grid[i].length
 * 1 <= n <= 200
 * -99 <= grid[i][j] <= 99
 *
 *
 */

// @lc code=start
// dp cv
function minFallingPathSum(grid: number[][]): number {
  const n = grid.length;
  // dp[i][j] -> 从 grid 的前 i 行的每一行选一个数字
  // 并且第 i 行选择的数字为 grid[i][j] 时，可以得到的路径和最小值
  const dp = Array.from(new Array(n), () => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    dp[0][i] = grid[0][i];
  }
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (j === k) {
          continue;
        }
        dp[i][j] = Math.min(dp[i][j], dp[i - 1][k] + grid[i][j]);
      }
    }
  }
  return Math.min(...dp[n - 1]);
}
// @lc code=end
