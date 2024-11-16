/*
 * @lc app=leetcode.cn id=3240 lang=typescript
 *
 * [3240] 最少翻转次数使二进制矩阵回文 II
 *
 * https://leetcode.cn/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii/description/
 *
 * algorithms
 * Medium (30.91%)
 * Likes:    27
 * Dislikes: 0
 * Total Accepted:    5.1K
 * Total Submissions: 10.8K
 * Testcase Example:  '[[1,0,0],[0,1,0],[0,0,1]]'
 *
 * 给你一个 m x n 的二进制矩阵 grid 。
 *
 * 如果矩阵中一行或者一列从前往后与从后往前读是一样的，那么我们称这一行或者这一列是 回文 的。
 *
 * 你可以将 grid 中任意格子的值 翻转 ，也就是将格子里的值从 0 变成 1 ，或者从 1 变成 0 。
 *
 * 请你返回 最少 翻转次数，使得矩阵中 所有 行和列都是 回文的 ，且矩阵中 1 的数目可以被 4 整除 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,0,0],[0,1,0],[0,0,1]]
 *
 * 输出：3
 *
 * 解释：
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,1],[0,1],[0,0]]
 *
 * 输出：2
 *
 * 解释：
 *
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1],[1]]
 *
 * 输出：2
 *
 * 解释：
 *
 *
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

export {};

// @lc code=start
function minFlips(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  let f: number[] = new Array(4).fill(Infinity);
  f[0] = 0;
  for (let i = 0; i < Math.floor((m + 1) / 2); i++) {
    for (let j = 0; j < Math.floor((n + 1) / 2); j++) {
      let ones = grid[i][j];
      let cnt = 1;
      if (j !== n - 1 - j) {
        ones += grid[i][n - 1 - j];
        cnt++;
      }
      if (i !== m - 1 - i) {
        ones += grid[m - 1 - i][j];
        cnt++;
      }
      if (i !== m - 1 - i && j !== n - 1 - j) {
        ones += grid[m - 1 - i][n - 1 - j];
        cnt++;
      }
      // 计算将这一组全部变为 1 的代价
      const cnt1 = cnt - ones;
      // 计算将这一组全部变为 0 的代价
      const cnt0 = ones;
      const tmp: number[] = new Array(4).fill(0);
      for (let k = 0; k < 4; k++) {
        tmp[k] = f[k] + cnt0;
      }
      for (let k = 0; k < 4; k++) {
        tmp[(k + cnt) % 4] = Math.min(tmp[(k + cnt) % 4], f[k] + cnt1);
      }
      f = tmp;
    }
  }
  return f[0];
}
// @lc code=end
