/*
 * @lc app=leetcode.cn id=64 lang=typescript
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

// ----- 从左上到右下 -----

// dp two dimension
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  // 初始值
  dp[0][0] = grid[0][0];

  // 第一列
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 第一行
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[n - 1][m - 1];
};

// dp one dimension 滚动数组 减少空间复杂度
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  const dp: number[] = new Array(m).fill(0);

  // 初始值
  dp[0] = grid[0][0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (j > 0 && i === 0) {
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (i > 0 && j === 0) {
        dp[j] += grid[i][j];
      } else if (j > 0) {
        dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
      }
    }
  }

  return dp[m - 1];
};

// 空间复杂度 O(1)
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // 第一列
  for (let i = 1; i < n; i++) {
    grid[i][0] = grid[i - 1][0] + grid[i][0];
  }

  // 第一行
  for (let j = 1; j < m; j++) {
    grid[0][j] = grid[0][j - 1] + grid[0][j];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
    }
  }

  return grid[n - 1][m - 1];
};

// ----- 从右下到左上 -----

// dp two dimension
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      // 同一行向左
      if (i === n - 1 && j !== m - 1) {
        dp[i][j] = grid[i][j] + dp[i][j + 1];
      }
      // 同一列向上
      else if (j === m - 1 && i !== n - 1) {
        dp[i][j] = grid[i][j] + dp[i + 1][j];
      }
      // 取向左或者向上的最小值
      else if (j !== m - 1 && i !== n - 1) {
        dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
      }
      // 右下角（初始值）
      else {
        dp[i][j] = grid[i][j];
      }
    }
  }

  return dp[0][0];
};

// dp one dimension
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  const dp: number[] = new Array(m).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) {
        dp[j] = grid[i][j] + dp[j + 1];
      } else if (j === m - 1 && i !== n - 1) {
        dp[j] = grid[i][j] + dp[j];
      } else if (j !== m - 1 && i !== n - 1) {
        dp[j] = grid[i][j] + Math.min(dp[j], dp[j + 1]);
      } else {
        dp[j] = grid[i][j];
      }
    }
  }

  return dp[0];
};

// 空间复杂度 O(1)
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) {
        grid[i][j] = grid[i][j] + grid[i][j + 1];
      } else if (j === m - 1 && i !== n - 1) {
        grid[i][j] = grid[i][j] + grid[i + 1][j];
      } else if (j !== m - 1 && i !== n - 1) {
        grid[i][j] = grid[i][j] + Math.min(grid[i + 1][j], grid[i][j + 1]);
      }
    }
  }

  return grid[0][0];
};
// @lc code=end
