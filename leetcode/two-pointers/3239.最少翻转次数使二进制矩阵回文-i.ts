/*
 * @lc app=leetcode.cn id=3239 lang=typescript
 *
 * [3239] 最少翻转次数使二进制矩阵回文 I
 *
 * https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-i/description/
 *
 * algorithms
 * Medium (85.08%)
 * Likes:    24
 * Dislikes: 0
 * Total Accepted:    11.1K
 * Total Submissions: 12.5K
 * Testcase Example:  '[[1,0,0],[0,0,0],[0,0,1]]'
 *
 * 给你一个 m x n 的二进制矩阵 grid 。
 *
 * 如果矩阵中一行或者一列从前往后与从后往前读是一样的，那么我们称这一行或者这一列是 回文 的。
 *
 * 你可以将 grid 中任意格子的值 翻转 ，也就是将格子里的值从 0 变成 1 ，或者从 1 变成 0 。
 *
 * 请你返回 最少 翻转次数，使得矩阵 要么 所有行是 回文的 ，要么所有列是 回文的 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,0,0],[0,0,0],[0,0,1]]
 *
 * 输出：2
 *
 * 解释：
 *
 *
 *
 * 将高亮的格子翻转，得到所有行都是回文的。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,1],[0,1],[0,0]]
 *
 * 输出：1
 *
 * 解释：
 *
 *
 *
 * 将高亮的格子翻转，得到所有列都是回文的。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1],[0]]
 *
 * 输出：0
 *
 * 解释：
 *
 * 所有行已经是回文的。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m * n <= 2 * 10^5
 * 0 <= grid[i][j] <= 1
 *
 *
 */

// @lc code=start
function minFlips(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let rowCnt = 0;
  let colCnt = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      if (grid[i][j] !== grid[i][n - 1 - j]) {
        rowCnt++;
      }
    }
  }
  for (let j = 0; j < n; j++) {
    for (let i = 0; i < Math.floor(m / 2); i++) {
      if (grid[i][j] !== grid[m - 1 - i][j]) {
        colCnt++;
      }
    }
  }
  return Math.min(rowCnt, colCnt);
}
// @lc code=end
