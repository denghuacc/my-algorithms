/*
 * @lc app=leetcode.cn id=576 lang=typescript
 *
 * [576] 出界的路径数
 *
 * https://leetcode-cn.com/problems/out-of-boundary-paths/description/
 *
 * algorithms
 * Medium (39.63%)
 * Likes:    191
 * Dislikes: 0
 * Total Accepted:    21.4K
 * Total Submissions: 46.4K
 * Testcase Example:  '2\n2\n2\n0\n0'
 *
 * 给你一个大小为 m x n 的网格和一个球。球的起始坐标为 [startRow, startColumn]
 * 。你可以将球移到在四个方向上相邻的单元格内（可以穿过网格边界到达网格之外）。你 最多 可以移动 maxMove 次球。
 *
 * 给你五个整数 m、n、maxMove、startRow 以及 startColumn ，找出并返回可以将球移出边界的路径数量。因为答案可能非常大，返回对
 * 10^9 + 7 取余 后的结果。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：m = 2, n = 2, maxMove = 2, startRow = 0, startColumn = 0
 * 输出：6
 *
 *
 * 示例 2：
 *
 *
 * 输入：m = 1, n = 3, maxMove = 3, startRow = 0, startColumn = 1
 * 输出：12
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m, n <= 50
 * 0 <= maxMove <= 50
 * 0 <= startRow < m
 * 0 <= startColumn < n
 *
 *
 */

// @lc code=start
// dp
function findPaths(
  m: number,
  n: number,
  maxMove: number,
  startRow: number,
  startColumn: number
): number {
  const MOD = 1000000007;
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let outCounts = 0;
  let dp: number[][] = Array.from(new Array(m), () => new Array(n).fill(0));
  dp[startRow][startColumn] = 1;
  for (let i = 0; i < maxMove; i++) {
    const dpNew: number[][] = Array.from(new Array(m), () =>
      new Array(n).fill(0)
    );
    for (let j = 0; j < m; j++) {
      for (let k = 0; k < n; k++) {
        const count = dp[j][k];
        if (count > 0) {
          for (const direction of directions) {
            const j1 = j + direction[0],
              k1 = k + direction[1];
            if (j1 >= 0 && j1 < m && k1 >= 0 && k1 < n) {
              dpNew[j1][k1] = (dpNew[j1][k1] + count) % MOD;
            } else {
              outCounts = (outCounts + count) % MOD;
            }
          }
        }
      }
    }
    dp = dpNew;
  }
  return outCounts;
}
// @lc code=end
