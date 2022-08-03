/*
 * @lc app=leetcode.cn id=1380 lang=typescript
 *
 * [1380] 矩阵中的幸运数
 *
 * https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/description/
 *
 * algorithms
 * Easy (72.74%)
 * Likes:    71
 * Dislikes: 0
 * Total Accepted:    24.3K
 * Total Submissions: 32.1K
 * Testcase Example:  '[[3,7,8],[9,11,13],[15,16,17]]'
 *
 * 给你一个 m * n 的矩阵，矩阵中的数字 各不相同 。请你按 任意 顺序返回矩阵中的所有幸运数。
 *
 * 幸运数是指矩阵中满足同时下列两个条件的元素：
 *
 *
 * 在同一行的所有元素中最小
 * 在同一列的所有元素中最大
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：matrix = [[3,7,8],[9,11,13],[15,16,17]]
 * 输出：[15]
 * 解释：15 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。
 *
 *
 * 示例 2：
 *
 * 输入：matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
 * 输出：[12]
 * 解释：12 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。
 *
 *
 * 示例 3：
 *
 * 输入：matrix = [[7,8],[1,2]]
 * 输出：[7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= n, m <= 50
 * 1 <= matrix[i][j] <= 10^5
 * 矩阵中的所有元素都是不同的
 *
 *
 */

// @lc code=start
// simulation 1 by me
var luckyNumbers = function (matrix: number[][]): number[] {
  const res: number[] = [];
  let minRow = Infinity;
  let minRowColIndex = -1;
  const m = matrix.length;
  const n = matrix[0].length;
  const existLuckyCols = new Set<number>();

  for (const row of matrix) {
    for (let i = 0; i < n; i++) {
      const num = row[i];
      if (num < minRow) {
        minRow = num;
        minRowColIndex = i;
      }
    }

    if (existLuckyCols.has(minRowColIndex)) {
      continue;
    }

    let isLucky = true;
    for (let i = 0; i < m; i++) {
      const num = matrix[i][minRowColIndex];
      if (num > minRow) {
        isLucky = false;
        break;
      }
    }

    if (isLucky) {
      res.push(minRow);
      existLuckyCols.add(minRowColIndex);
    }

    minRow = Infinity;
    minRowColIndex = -1;
  }

  return res;
};

// simulation 2
var luckyNumbers = function (matrix: number[][]): number[] {
  const res: number[] = [];
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let isMin = true;
      let isMax = true;

      for (let k = 0; k < n; k++) {
        if (matrix[i][k] < matrix[i][j]) {
          isMin = false;
          break;
        }
      }

      if (!isMin) {
        continue;
      }

      for (let k = 0; k < m; k++) {
        if (matrix[k][j] > matrix[i][j]) {
          isMax = false;
          break;
        }
      }

      if (isMax) {
        res.push(matrix[i][j]);
      }
    }
  }

  return res;
};

// pretreatment
var luckyNumbers = function (matrix: number[][]): number[] {
  const res: number[] = [];
  const m = matrix.length;
  const n = matrix[0].length;

  const minRow = new Array(m).fill(Infinity);
  const maxCol = new Array(n).fill(-Infinity);

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      minRow[i] = Math.min(minRow[i], matrix[i][j]);
      maxCol[j] = Math.max(maxCol[j], matrix[i][j]);
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (minRow[i] === matrix[i][j] && maxCol[j] === matrix[i][j]) {
        res.push(matrix[i][j]);
      }
    }
  }

  return res;
};
// @lc code=end
