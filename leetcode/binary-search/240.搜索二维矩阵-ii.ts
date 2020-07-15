/*
 * @lc app=leetcode.cn id=240 lang=typescript
 *
 * [240] 搜索二维矩阵 II
 *
 * https://leetcode-cn.com/problems/search-a-2d-matrix-ii/description/
 *
 * algorithms
 * Medium (39.41%)
 * Likes:    287
 * Dislikes: 0
 * Total Accepted:    53.7K
 * Total Submissions: 133.9K
 * Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
  '5'
 *
 * 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target。该矩阵具有以下特性：
 * 
 * 
 * 每行的元素从左到右升序排列。
 * 每列的元素从上到下升序排列。
 * 
 * 
 * 示例:
 * 
 * 现有矩阵 matrix 如下：
 * 
 * [
 * ⁠ [1,   4,  7, 11, 15],
 * ⁠ [2,   5,  8, 12, 19],
 * ⁠ [3,   6,  9, 16, 22],
 * ⁠ [10, 13, 14, 17, 24],
 * ⁠ [18, 21, 23, 26, 30]
 * ]
 * 
 * 
 * 给定 target = 5，返回 true。
 * 
 * 给定 target = 20，返回 false。
 * 
 */

// @lc code=start
// brute force
var searchMatrix = function (matrix: number[][], target: number): boolean {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }

  return false;
};

// binary search
var searchMatrix = function (matrix: number[][], target: number): boolean {
  if (matrix.length === 0) return false;

  const shortedDim = Math.min(matrix.length, matrix[0].length);

  for (let i = 0; i < shortedDim; i++) {
    let verticalFound = binarySearch(matrix, target, i, true);
    let horizontalFound = binarySearch(matrix, target, i, false);
    if (verticalFound || horizontalFound) return true;
  }

  return false;

  function binarySearch(
    matrix: number[][],
    target: number,
    s: number,
    isVertical: boolean
  ) {
    let start = s;
    let end = isVertical ? matrix[0].length - 1 : matrix.length - 1;

    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (isVertical) {
        if (matrix[s][mid] < target) {
          start = mid + 1;
        } else if (matrix[s][mid] > target) {
          end = mid - 1;
        } else {
          return true;
        }
      } else {
        if (matrix[mid][s] < target) {
          start = mid + 1;
        } else if (matrix[mid][s] > target) {
          end = mid - 1;
        } else {
          return true;
        }
      }
    }

    return false;
  }
};

// binary search 2
var searchMatrix = function (matrix: number[][], target: number): boolean {
  if (matrix == null || matrix.length === 0) return false;

  return searchRec(0, 0, matrix[0].length - 1, matrix.length - 1);

  function searchRec(
    left: number,
    up: number,
    right: number,
    down: number
  ): boolean {
    if (left > right || up > down) {
      return false;
    } else if (target < matrix[up][left] || target > matrix[down][right]) {
      return false;
    }

    let mid = left + Math.floor((right - left) / 2);

    let row = up;
    while (row <= down && matrix[row][mid] <= target) {
      if (matrix[row][mid] === target) {
        return true;
      }
      row++;
    }

    return (
      searchRec(left, row, mid - 1, down) ||
      searchRec(mid + 1, up, right, row - 1)
    );
  }
};

// binary search 3
var searchMatrix = function (matrix: number[][], target: number): boolean {
  let row = matrix.length - 1;
  let col = 0;

  while (row >= 0 && col < matrix[0].length) {
    if (matrix[row][col] > target) {
      row--;
    } else if (matrix[row][col] < target) {
      col++;
    } else {
      return true;
    }
  }

  return false;
};
// @lc code=end
