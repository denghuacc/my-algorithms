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
/**
 * 二维前缀和解法
 * 预处理每一行的前缀和，查询时按行累加区间和
 */
class NumMatrix {
  private rowPrefixSums: number[][] = [];

  constructor(matrix: number[][]) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    // 为每一行构建前缀和数组
    this.rowPrefixSums = Array.from({ length: rows }, () =>
      new Array(cols).fill(0)
    );

    // 计算每一行的前缀和
    for (let r = 0; r < rows; r++) {
      let currentSum = 0;
      for (let c = 0; c < cols; c++) {
        currentSum += matrix[r][c];
        this.rowPrefixSums[r][c] = currentSum;
      }
    }
  }

  /**
   * 计算指定矩形区域的元素和
   * @param row1 左上角行索引
   * @param col1 左上角列索引
   * @param row2 右下角行索引
   * @param col2 右下角列索引
   * @returns 矩形区域内所有元素的和
   */
  sumRegion(row1: number, col1: number, row2: number, col2: number): number {
    let totalSum = 0;

    // 逐行计算区间和，然后累加
    for (let r = row1; r <= row2; r++) {
      const rowPrefixSum = this.rowPrefixSums[r];

      // 计算当前行在[col1, col2]范围内的和
      // prefixSum[col2] - prefixSum[col1-1]
      const leftSum = col1 === 0 ? 0 : rowPrefixSum[col1 - 1];
      const regionSum = rowPrefixSum[col2] - leftSum;

      totalSum += regionSum;
    }

    return totalSum;
  }
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定二维矩阵，需要多次查询子矩形区域的元素和
   - 矩阵不可变，但查询操作频繁，需要优化查询时间
   - 典型的"用空间换时间"的预处理问题

2. 算法分析：
   当前解法（一维前缀和）：
   - 预处理时间：O(m×n) - 计算每行的前缀和
   - 查询时间：O(m) - 需要遍历所有相关行
   - 空间复杂度：O(m×n) - 存储每行的前缀和
   
   更优解法（二维前缀和）：
   - 预处理时间：O(m×n)
   - 查询时间：O(1) - 常数时间查询
   - 空间复杂度：O(m×n)

3. 实现要点：
   - 一维前缀和：每行单独计算前缀和，查询时按行累加
   - 前缀和公式：区间[i,j]的和 = prefixSum[j] - prefixSum[i-1]
   - 边界处理：当col1为0时，左边界和为0
   - 构造函数中预处理所有行的前缀和

4. 优化思路：
   - 二维前缀和优化：prefixSum[i][j] = 从(0,0)到(i,j)的矩形和
   - 查询公式：sum = S[row2][col2] - S[row1-1][col2] - S[row2][col1-1] + S[row1-1][col1-1]
   - 空间优化：如果查询不频繁，可以考虑不预处理，直接计算
   - 适用场景：预处理一次，多次查询的场景
*/
