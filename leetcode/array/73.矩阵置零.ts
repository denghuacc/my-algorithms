/*
 * @lc app=leetcode.cn id=73 lang=typescript
 *
 * [73] 矩阵置零
 *
 * https://leetcode-cn.com/problems/set-matrix-zeroes/description/
 *
 * algorithms
 * Medium (50.88%)
 * Likes:    242
 * Dislikes: 0
 * Total Accepted:    43.7K
 * Total Submissions: 78.6K
 * Testcase Example:  '[[1,1,1],[1,0,1],[1,1,1]]'
 *
 * 给定一个 m x n 的矩阵，如果一个元素为 0，则将其所在行和列的所有元素都设为 0。请使用原地算法。
 *
 * 示例 1:
 *
 * 输入:
 * [
 * [1,1,1],
 * [1,0,1],
 * [1,1,1]
 * ]
 * 输出:
 * [
 * [1,0,1],
 * [0,0,0],
 * [1,0,1]
 * ]
 *
 *
 * 示例 2:
 *
 * 输入:
 * [
 * [0,1,2,0],
 * [3,4,5,2],
 * [1,3,1,5]
 * ]
 * 输出:
 * [
 * [0,0,0,0],
 * [0,4,5,0],
 * [0,3,1,0]
 * ]
 *
 * 进阶:
 *
 *
 * 一个直接的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
 * 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
 * 你能想出一个常数空间的解决方案吗？
 *
 *
 */

// @lc code=start
/**
 *  Do not return anything, modify matrix in-place instead.
 */
// array
var setZeroes = function (matrix: number[][]) {
  const R = matrix.length;
  const C = matrix[0].length;
  const rows: Set<number> = new Set();
  const cols: Set<number> = new Set();

  // 记录格子为 0 时的行号和列号
  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (matrix[i][j] === 0) {
        rows.add(i);
        cols.add(j);
      }
    }
  }

  for (let i = 0; i < R; i++) {
    for (let j = 0; j < C; j++) {
      if (rows.has(i) || cols.has(j)) {
        matrix[i][j] = 0;
      }
    }
  }
};

// array 空间复杂度 O(1)
var setZeroes = function (matrix: number[][]) {
  const MODIFIED = Number.MIN_SAFE_INTEGER;
  const R = matrix.length;
  const C = matrix[0].length;

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (matrix[r][c] === 0) {
        for (let k = 0; k < C; k++) {
          if (matrix[r][k] !== 0) {
            matrix[r][k] = MODIFIED;
          }
        }
        for (let k = 0; k < R; k++) {
          if (matrix[k][c] !== 0) {
            matrix[k][c] = MODIFIED;
          }
        }
      }
    }
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (matrix[r][c] === MODIFIED) {
        matrix[r][c] = 0;
      }
    }
  }
};
// @lc code=end
