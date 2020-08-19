/*
 * @lc app=leetcode.cn id=63 lang=typescript
 *
 * [63] 不同路径 II
 *
 * https://leetcode-cn.com/problems/unique-paths-ii/description/
 *
 * algorithms
 * Medium (31.18%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    64.2K
 * Total Submissions: 191.4K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为“Start” ）。
 *
 * 机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为“Finish”）。
 *
 * 现在考虑网格中有障碍物。那么从左上角到右下角将会有多少条不同的路径？
 *
 *
 *
 * 网格中的障碍物和空位置分别用 1 和 0 来表示。
 *
 * 说明：m 和 n 的值均不超过 100。
 *
 * 示例 1:
 *
 * 输入:
 * [
 * [0,0,0],
 * [0,1,0],
 * [0,0,0]
 * ]
 * 输出: 2
 * 解释:
 * 3x3 网格的正中间有一个障碍物。
 * 从左上角到右下角一共有 2 条不同的路径：
 * 1. 向右 -> 向右 -> 向下 -> 向下
 * 2. 向下 -> 向下 -> 向右 -> 向右
 *
 *
 */

// @lc code=start
// dp
var uniquePathsWithObstacles = function (obstacleGrid: number[][]): number {
  const n = obstacleGrid.length;
  const m = obstacleGrid[0].length;

  // dp[i][j] -> 从坐标 (0, 0) 到坐标 (i, j) 的路径总数
  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));
  dp[0][0] = obstacleGrid[0][0] === 0 ? 1 : 0;
  if (dp[0][0] === 0) return 0;

  // the first row
  for (let i = 1; i < m; i++) {
    if (obstacleGrid[0][i] !== 1) {
      dp[0][i] = dp[0][i - 1];
    }
  }

  // the first column
  for (let i = 1; i < n; i++) {
    if (obstacleGrid[i][0] !== 1) {
      dp[i][0] = dp[i - 1][0];
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      if (obstacleGrid[i][j] !== 1) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
    }
  }

  return dp[n - 1][m - 1];
};

// dp2
var uniquePathsWithObstacles = function (obstacleGrid: number[][]): number {
  const n = obstacleGrid.length;
  const m = obstacleGrid[0].length;
  const dp: number[] = new Array(m).fill(0);

  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (obstacleGrid[i][j] === 1) {
        dp[j] = 0;
      } else if (j > 0) {
        dp[j] += dp[j - 1];
      }
    }
  }

  return dp[m - 1];
};
// @lc code=end
