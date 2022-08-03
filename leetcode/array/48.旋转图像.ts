/*
 * @lc app=leetcode.cn id=48 lang=typescript
 *
 * [48] 旋转图像
 *
 * https://leetcode-cn.com/problems/rotate-image/description/
 *
 * algorithms
 * Medium (59.84%)
 * Likes:    473
 * Dislikes: 0
 * Total Accepted:    79.1K
 * Total Submissions: 115.4K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给定一个 n × n 的二维矩阵表示一个图像。
 *
 * 将图像顺时针旋转 90 度。
 *
 * 说明：
 *
 * 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。
 *
 * 示例 1:
 *
 * 给定 matrix =
 * [
 * ⁠ [1,2,3],
 * ⁠ [4,5,6],
 * ⁠ [7,8,9]
 * ],
 *
 * 原地旋转输入矩阵，使其变为:
 * [
 * ⁠ [7,4,1],
 * ⁠ [8,5,2],
 * ⁠ [9,6,3]
 * ]
 *
 *
 * 示例 2:
 *
 * 给定 matrix =
 * [
 * ⁠ [ 5, 1, 9,11],
 * ⁠ [ 2, 4, 8,10],
 * ⁠ [13, 3, 6, 7],
 * ⁠ [15,14,12,16]
 * ],
 *
 * 原地旋转输入矩阵，使其变为:
 * [
 * ⁠ [15,13, 2, 5],
 * ⁠ [14, 3, 4, 1],
 * ⁠ [12, 6, 8, 9],
 * ⁠ [16, 7,10,11]
 * ]
 *
 *
 */

// @lc code=start
/**
 * Do not return anything, modify matrix in-place instead.
 */
// array 先转置矩阵，然后翻转每一行
var rotate = function (matrix: number[][]): void {
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      [matrix[i][j], matrix[i][n - j - 1]] = [
        matrix[i][n - j - 1],
        matrix[i][j],
      ];
    }
  }
};

// array 旋转四个矩形
var rotate = function (matrix: number[][]): void {
  const n = matrix.length;

  for (let i = 0; i < Math.floor(n / 2) + (n % 2); i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      const tmp: number[] = new Array(4);
      let row = i;
      let col = j;

      for (let k = 0; k < 4; k++) {
        tmp[k] = matrix[row][col];
        const x = row;
        row = col;
        col = n - 1 - x;
      }

      for (let k = 0; k < 4; k++) {
        matrix[row][col] = tmp[(k + 3) % 4];
        const x = row;
        row = col;
        col = n - 1 - x;
      }
    }
  }
};

// array 在单次循环中旋转 4 个矩形
var rotate = function (matrix: number[][]): void {
  const n = matrix.length;

  for (let i = 0; i < Math.floor((n + 1) / 2); i++) {
    for (let j = 0; j < Math.floor(n / 2); j++) {
      const temp = matrix[n - 1 - j][i];
      matrix[n - 1 - j][i] = matrix[n - 1 - i][n - j - 1];
      matrix[n - 1 - i][n - j - 1] = matrix[j][n - 1 - i];
      matrix[j][n - 1 - i] = matrix[i][j];
      matrix[i][j] = temp;
    }
  }
};
// @lc code=end
