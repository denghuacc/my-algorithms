/*
 * @lc app=leetcode.cn id=64 lang=javascript
 *
 * [64] 最小路径和
 *
 * https://leetcode-cn.com/problems/minimum-path-sum/description/
 *
 * algorithms
 * Medium (57.90%)
 * Likes:    495
 * Dislikes: 0
 * Total Accepted:    94.4K
 * Total Submissions: 143.4K
 * Testcase Example:  '[[1,3,1],[1,5,1],[4,2,1]]'
 *
 * 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
 *
 * 说明：每次只能向下或者向右移动一步。
 *
 * 示例:
 *
 * 输入:
 * [
 * [1,3,1],
 * ⁠ [1,5,1],
 * ⁠ [4,2,1]
 * ]
 * 输出: 7
 * 解释: 因为路径 1→3→1→1→1 的总和最小。
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} grid
 * @return {number}
 * 二维 dp
 */
var minPathSum = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const dp = Array(n)
    .fill(0)
    .map(() => Array(m).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) dp[i][j] = grid[i][j] + dp[i][j + 1];
      else if (j === m - 1 && i !== n - 1) dp[i][j] = grid[i][j] + dp[i + 1][j];
      else if (j !== m - 1 && i !== n - 1)
        dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
      else dp[i][j] = grid[i][j];
    }
  }

  return dp[0][0];
};

// 一维 dp
var minPathSum = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  const dp = Array(m).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) dp[j] = grid[i][j] + dp[j + 1];
      else if (j === m - 1 && i !== n - 1) dp[j] = grid[i][j] + dp[j];
      else if (j !== m - 1 && i !== n - 1)
        dp[j] = grid[i][j] + Math.min(dp[j], dp[j + 1]);
      else dp[j] = grid[i][j];
    }
  }

  return dp[0];
};

// 空间复杂度 O(1)
var minPathSum = function (grid) {
  const n = grid.length;
  const m = grid[0].length;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) grid[i][j] = grid[i][j] + grid[i][j + 1];
      else if (j === m - 1 && i !== n - 1)
        grid[i][j] = grid[i][j] + grid[i + 1][j];
      else if (j !== m - 1 && i !== n - 1)
        grid[i][j] = grid[i][j] + Math.min(grid[i + 1][j], grid[i][j + 1]);
    }
  }

  return grid[0][0];
};
// @lc code=end
