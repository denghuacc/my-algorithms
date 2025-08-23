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

/**
 * 二维动态规划解法（正向）
 * 核心思想：从左上角开始，每个位置的最小路径和等于上方和左方的最小值加上当前位置的值
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // dp[i][j] 表示从左上角到位置(i,j)的最小路径和
  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  // 初始化起点
  dp[0][0] = grid[0][0];

  // 初始化第一列：只能从上往下走
  for (let i = 1; i < n; i++) {
    dp[i][0] = dp[i - 1][0] + grid[i][0];
  }

  // 初始化第一行：只能从左往右走
  for (let j = 1; j < m; j++) {
    dp[0][j] = dp[0][j - 1] + grid[0][j];
  }

  // 填充dp数组：每个位置的最小路径和 = min(上方路径和, 左方路径和) + 当前位置的值
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + grid[i][j];
    }
  }

  return dp[n - 1][m - 1];
};

/**
 * 一维动态规划解法（正向，空间优化）
 * 核心思想：使用滚动数组，只保存一行的状态
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // 只使用一维数组保存当前行的状态
  const dp: number[] = new Array(m).fill(0);

  // 初始化起点
  dp[0] = grid[0][0];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (j > 0 && i === 0) {
        // 第一行：只能从左往右
        dp[j] = dp[j - 1] + grid[i][j];
      } else if (i > 0 && j === 0) {
        // 第一列：只能从上往下
        dp[j] += grid[i][j];
      } else if (j > 0) {
        // 其他位置：取上方和左方的最小值
        dp[j] = Math.min(dp[j - 1], dp[j]) + grid[i][j];
      }
    }
  }

  return dp[m - 1];
};

/**
 * 原地修改解法（正向，空间复杂度O(1)）
 * 核心思想：直接在原数组上修改，不额外使用空间
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // 初始化第一列：只能从上往下走
  for (let i = 1; i < n; i++) {
    grid[i][0] = grid[i - 1][0] + grid[i][0];
  }

  // 初始化第一行：只能从左往右走
  for (let j = 1; j < m; j++) {
    grid[0][j] = grid[0][j - 1] + grid[0][j];
  }

  // 填充其他位置
  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
    }
  }

  return grid[n - 1][m - 1];
};

// ----- 从右下到左上 -----

/**
 * 二维动态规划解法（反向）
 * 核心思想：从右下角开始，每个位置的最小路径和等于下方和右方的最小值加上当前位置的值
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // dp[i][j] 表示从位置(i,j)到右下角的最小路径和
  const dp: number[][] = Array.from(new Array(n), () => new Array(m).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      // 最后一行：只能向左走
      if (i === n - 1 && j !== m - 1) {
        dp[i][j] = grid[i][j] + dp[i][j + 1];
      }
      // 最后一列：只能向上走
      else if (j === m - 1 && i !== n - 1) {
        dp[i][j] = grid[i][j] + dp[i + 1][j];
      }
      // 其他位置：取下方和右方的最小值
      else if (j !== m - 1 && i !== n - 1) {
        dp[i][j] = grid[i][j] + Math.min(dp[i + 1][j], dp[i][j + 1]);
      }
      // 右下角（终点）
      else {
        dp[i][j] = grid[i][j];
      }
    }
  }

  return dp[0][0];
};

/**
 * 一维动态规划解法（反向，空间优化）
 * 核心思想：使用滚动数组，只保存一行的状态
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  // 只使用一维数组保存当前行的状态
  const dp: number[] = new Array(m).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) {
        // 最后一行：只能向左走
        dp[j] = grid[i][j] + dp[j + 1];
      } else if (j === m - 1 && i !== n - 1) {
        // 最后一列：只能向上走
        dp[j] = grid[i][j] + dp[j];
      } else if (j !== m - 1 && i !== n - 1) {
        // 其他位置：取下方和右方的最小值
        dp[j] = grid[i][j] + Math.min(dp[j], dp[j + 1]);
      } else {
        // 右下角（终点）
        dp[j] = grid[i][j];
      }
    }
  }

  return dp[0];
};

/**
 * 原地修改解法（反向，空间复杂度O(1)）
 * 核心思想：直接在原数组上修改，不额外使用空间
 */
var minPathSum = function (grid: number[][]): number {
  const n = grid.length;
  const m = grid[0].length;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (i === n - 1 && j !== m - 1) {
        // 最后一行：只能向左走
        grid[i][j] = grid[i][j] + grid[i][j + 1];
      } else if (j === m - 1 && i !== n - 1) {
        // 最后一列：只能向上走
        grid[i][j] = grid[i][j] + grid[i + 1][j];
      } else if (j !== m - 1 && i !== n - 1) {
        // 其他位置：取下方和右方的最小值
        grid[i][j] = grid[i][j] + Math.min(grid[i + 1][j], grid[i][j + 1]);
      }
    }
  }

  return grid[0][0];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在m×n网格中，从左上角到右下角的最小路径和
   - 每次只能向右或向下移动一步
   - 路径和等于路径上所有数字的总和

2. 算法分析：
   - 时间复杂度：O(m*n)
   - 空间复杂度：O(m*n)（二维）或O(n)（一维）或O(1)（原地修改）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示到达位置(i,j)的最小路径和
   - 状态转移：dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
   - 边界条件：第一行和第一列需要特殊处理
   - 方向选择：可以从左上到右下，也可以从右下到左上

4. 优化思路：
   - 空间优化1：使用一维数组代替二维数组
   - 空间优化2：直接在原数组上修改，空间复杂度O(1)
   - 方向优化：可以选择正向或反向遍历

5. 边界情况：
   - 1×1网格：直接返回grid[0][0]
   - 1×n或m×1网格：只能沿一个方向移动
   - 大网格的数值溢出问题

6. 类似问题：
   - 不同路径（求路径数量）
   - 不同路径II（有障碍物）
   - 其他网格路径问题

7. 关键洞察：
   - 每个位置的最小路径和只依赖于上方和左方的路径和
   - 可以使用滚动数组优化空间复杂度
   - 正向和反向遍历都能得到正确结果

8. 示例分析：
   grid = [[1,3,1],[1,5,1],[4,2,1]]
   dp数组：
   [1][4][5]
   [2][7][6]
   [6][8][7]
   - 最小路径和：1→3→1→1→1 = 7

9. 复杂度对比：
   - 二维dp：思路清晰，空间复杂度高
   - 一维dp：空间优化，代码稍复杂
   - 原地修改：空间最优，但会修改原数组
*/
