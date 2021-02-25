/*
 * @lc app=leetcode.cn id=867 lang=typescript
 *
 * [867] 转置矩阵
 *
 * https://leetcode-cn.com/problems/transpose-matrix/description/
 *
 * algorithms
 * Easy (66.90%)
 * Likes:    155
 * Dislikes: 0
 * Total Accepted:    48.5K
 * Total Submissions: 71.8K
 * Testcase Example:  '[[1,2,3],[4,5,6],[7,8,9]]'
 *
 * 给你一个二维整数数组 matrix， 返回 matrix 的 转置矩阵 。
 *
 * 矩阵的 转置 是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[[1,4,7],[2,5,8],[3,6,9]]
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[1,2,3],[4,5,6]]
 * 输出：[[1,4],[2,5],[3,6]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1
 * 1
 * -10^9
 *
 *
 */

// @lc code=start
// array
function transpose(matrix: number[][]): number[][] {
  const n = matrix.length;
  const m = matrix[0].length;

  const ret: number[][] = Array.from(new Array(m), () => new Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      ret[j][i] = matrix[i][j];
    }
  }

  return ret;
}
// @lc code=end
