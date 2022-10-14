/*
 * @lc app=leetcode.cn id=304 lang=typescript
 *
 * [304] 二维区域和检索 - 矩阵不可变
 *
 * https://leetcode-cn.com/problems/range-sum-query-2d-immutable/description/
 *
 * algorithms
 * Medium (47.32%)
 * Likes:    164
 * Dislikes: 0
 * Total Accepted:    21.4K
 * Total Submissions: 43K
 * Testcase Example:  '["NumMatrix","sumRegion","sumRegion","sumRegion"]\n' +
  '[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[1,2,2,4]]'
 *
 * 给定一个二维矩阵，计算其子矩形范围内元素的总和，该子矩阵的左上角为 (row1, col1) ，右下角为 (row2, col2) 。
 * 
 * 
 * 上图子矩阵左上角 (row1, col1) = (2, 1) ，右下角(row2, col2) = (4, 3)，该子矩形内元素的总和为 8。
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 给定 matrix = [
 * ⁠ [3, 0, 1, 4, 2],
 * ⁠ [5, 6, 3, 2, 1],
 * ⁠ [1, 2, 0, 1, 5],
 * ⁠ [4, 1, 0, 1, 7],
 * ⁠ [1, 0, 3, 0, 5]
 * ]
 * 
 * sumRegion(2, 1, 4, 3) -> 8
 * sumRegion(1, 1, 2, 2) -> 11
 * sumRegion(1, 2, 2, 4) -> 12
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 你可以假设矩阵不可变。
 * 会多次调用 sumRegion 方法。
 * 你可以假设 row1 ≤ row2 且 col1 ≤ col2 。
 * 
 * 
 */

export {};

// @lc code=start
// prefix sum
class NumMatrix {
  prefixSums: number[][] = [];

  constructor(matrix: number[][]) {
    const row = matrix.length;
    const col = matrix[0].length;
    const prefixSums = Array.from(new Array(row), () => new Array(col).fill(0));
    for (let r = 0; r < row; r++) {
      let sum = 0;
      for (let c = 0; c < col; c++) {
        prefixSums[r][c] = sum += matrix[r][c];
      }
    }
    this.prefixSums = prefixSums;
  }

  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    let sum = 0;
    for (let r = row1; r <= row2; r++) {
      const row = this.prefixSums[r];
      const p = col1 === 0 ? 0 : row[col1 - 1];
      sum += row[col2] - p;
    }
    return sum;
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end
