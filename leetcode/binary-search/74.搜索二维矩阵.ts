/*
 * @lc app=leetcode.cn id=74 lang=typescript
 *
 * [74] 搜索二维矩阵
 *
 * https://leetcode-cn.com/problems/search-a-2d-matrix/description/
 *
 * algorithms
 * Medium (32.79%)
 * Likes:    197
 * Dislikes: 0
 * Total Accepted:    48.6K
 * Total Submissions: 127.2K
 * Testcase Example:  '[[1,3,5,7],[10,11,16,20],[23,30,34,50]]\n3'
 *
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 *
 *
 * 每行中的整数从左到右按升序排列。
 * 每行的第一个整数大于前一行的最后一个整数。
 *
 *
 * 示例 1:
 *
 * 输入:
 * matrix = [
 * ⁠ [1,   3,  5,  7],
 * ⁠ [10, 11, 16, 20],
 * ⁠ [23, 30, 34, 50]
 * ]
 * target = 3
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入:
 * matrix = [
 * ⁠ [1,   3,  5,  7],
 * ⁠ [10, 11, 16, 20],
 * ⁠ [23, 30, 34, 50]
 * ]
 * target = 13
 * 输出: false
 *
 */

// @lc code=start
// binary search -> m x n 矩阵可以视为长度为 m x n的有序数组
var searchMatrix = function (matrix: number[][], target: number): boolean {
  const R = matrix.length;
  if (R === 0) return false;
  const C = matrix[0].length;

  let left = 0;
  let right = R * C - 1;

  while (left <= right) {
    const pivotIdx = Math.floor((left + right) / 2); // 先取中间索引

    // 对应矩阵的值
    const pivotElement = matrix[Math.floor(pivotIdx / C)][pivotIdx % C];

    // 二分查找
    if (target === pivotElement) return true;
    else {
      if (target < pivotElement) right = pivotIdx - 1;
      else left = pivotIdx + 1;
    }
  }

  return false;
};

// binary search 2
var searchMatrix = function (matrix: number[][], target: number): boolean {
  if (matrix.length === 0) return false;
  let i = 0;
  let j = matrix[0].length - 1;
  // 左上角位置点为查找基点

  while (i < matrix.length && j >= 0) {
    if (matrix[i][j] < target) {
      i++;
    } else if (matrix[i][j] > target) {
      j--;
    } else {
      return true;
    }
  }

  return false;
};
// @lc code=end
