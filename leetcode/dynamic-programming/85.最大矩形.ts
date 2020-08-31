/*
 * @lc app=leetcode.cn id=85 lang=typescript
 *
 * [85] 最大矩形
 *
 * https://leetcode-cn.com/problems/maximal-rectangle/description/
 *
 * algorithms
 * Hard (40.56%)
 * Likes:    480
 * Dislikes: 0
 * Total Accepted:    32.5K
 * Total Submissions: 69.6K
 * Testcase Example:  '[["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]'
 *
 * 给定一个仅包含 0 和 1 的二维二进制矩阵，找出只包含 1 的最大矩形，并返回其面积。
 *
 * 示例:
 *
 * 输入:
 * [
 * ⁠ ["1","0","1","0","0"],
 * ⁠ ["1","0","1","1","1"],
 * ⁠ ["1","1","1","1","1"],
 * ⁠ ["1","0","0","1","0"]
 * ]
 * 输出: 6
 *
 */

// @lc code=start
// dp
var maximalRectangle = function (matrix: string[][]): number {
  const n = matrix.length;
  if (n === 0) return 0;
  const m = matrix[0].length;
  let ret = 0;

  // dp[i][j] -> 类比柱状图的 i ~ j 的最大宽度 ？？
  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (matrix[i][j] === "1") {
        dp[i][j] = j === 0 ? 1 : dp[i][j - 1] + 1;

        let width = dp[i][j];
        for (let k = i; k >= 0; k--) {
          width = Math.min(width, dp[k][j]);
          ret = Math.max(ret, width * (i - k + 1));
        }
      }
    }
  }

  return ret;
};
// @lc code=end
