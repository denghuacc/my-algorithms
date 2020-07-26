/*
 * @lc app=leetcode.cn id=329 lang=typescript
 *
 * [329] 矩阵中的最长递增路径
 *
 * https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/description/
 *
 * algorithms
 * Hard (36.42%)
 * Likes:    225
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 42.1K
 * Testcase Example:  '[[9,9,4],[6,6,8],[2,1,1]]'
 *
 * 给定一个整数矩阵，找出最长递增路径的长度。
 *
 * 对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在对角线方向上移动或移动到边界外（即不允许环绕）。
 *
 * 示例 1:
 *
 * 输入: nums =
 * [
 * ⁠ [9,9,4],
 * ⁠ [6,6,8],
 * ⁠ [2,1,1]
 * ]
 * 输出: 4
 * 解释: 最长递增路径为 [1, 2, 6, 9]。
 *
 * 示例 2:
 *
 * 输入: nums =
 * [
 * ⁠ [3,4,5],
 * ⁠ [3,2,6],
 * ⁠ [2,2,1]
 * ]
 * 输出: 4
 * 解释: 最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。
 *
 *
 */

// @lc code=start
// dfs + memo
var longestIncreasingPath = function (matrix: number[][]): number {
  const dirs: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rows = matrix.length;
  const columns = rows && matrix[0].length;
  const memo: number[][] = Array.from(new Array(rows), () =>
    new Array(columns).fill(0)
  );
  let ret = 0;
  if (rows === 0 || columns === 0) return 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      ret = Math.max(ret, dfs(matrix, i, j, memo));
    }
  }

  return ret;

  function dfs(
    matrix: number[][],
    row: number,
    column: number,
    memo: number[][]
  ): number {
    if (memo[row][column] !== 0) {
      return memo[row][column];
    }

    memo[row][column] += 1;

    for (const dir of dirs) {
      const newRow = row + dir[0];
      const newColumn = column + dir[1];
      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        matrix[newRow][newColumn] > matrix[row][column]
      ) {
        memo[row][column] = Math.max(
          memo[row][column],
          dfs(matrix, newRow, newColumn, memo) + 1
        );
      }
    }

    return memo[row][column];
  }
};

// 拓扑排序
var longestIncreasingPath = function (matrix: number[][]): number {
  const dirs: number[][] = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const rows = matrix.length;
  const columns = rows && matrix[0].length;
  const outdegrees: number[][] = Array.from(new Array(rows), () =>
    new Array(columns).fill(0)
  );
  if (rows === 0 || columns === 0) return 0;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      for (const dir of dirs) {
        const newRow = i + dir[0];
        const newColumn = j + dir[1];
        if (
          newRow >= 0 &&
          newRow < rows &&
          newColumn >= 0 &&
          newColumn < columns &&
          matrix[newRow][newColumn] > matrix[i][j]
        ) {
          outdegrees[i][j] += 1;
        }
      }
    }
  }

  const queue: number[][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (outdegrees[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  let ret = 0;
  while (queue.length) {
    ret += 1;
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const cell = queue.shift()!;
      const row = cell[0];
      const column = cell[1];
      for (const dir of dirs) {
        const newRow = row + dir[0];
        const newColumn = column + dir[1];
        if (
          newRow >= 0 &&
          newRow < rows &&
          newColumn >= 0 &&
          newColumn < columns &&
          matrix[newRow][newColumn] < matrix[row][column]
        ) {
          outdegrees[newRow][newColumn] -= 1;
          if (outdegrees[newRow][newColumn] === 0) {
            queue.push([newRow, newColumn]);
          }
        }
      }
    }
  }

  return ret;
};
// @lc code=end
