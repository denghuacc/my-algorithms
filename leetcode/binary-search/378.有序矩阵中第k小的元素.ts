/*
 * @lc app=leetcode.cn id=378 lang=typescript
 *
 * [378] 有序矩阵中第K小的元素
 *
 * https://leetcode-cn.com/problems/kth-smallest-element-in-a-sorted-matrix/description/
 *
 * algorithms
 * Medium (52.85%)
 * Likes:    285
 * Dislikes: 0
 * Total Accepted:    28.3K
 * Total Submissions: 46.2K
 * Testcase Example:  '[[1,5,9],[10,11,13],[12,13,15]]\n8'
 *
 * 给定一个 n x n 矩阵，其中每行和每列元素均按升序排序，找到矩阵中第 k 小的元素。
 * 请注意，它是排序后的第 k 小元素，而不是第 k 个不同的元素。
 *
 *
 *
 * 示例：
 *
 * matrix = [
 * ⁠  [ 1,  5,  9],
 * ⁠  [10, 11, 13],
 * ⁠  [12, 13, 15]
 * ],
 * k = 8,
 *
 * 返回 13。
 *
 *
 *
 *
 * 提示：
 * 你可以假设 k 的值永远是有效的，1 ≤ k ≤ n^2 。
 *
 */

// @lc code=start
// API
var kthSmallest = function (matrix: number[][], k: number): number {
  return (matrix.flat(Infinity) as number[]).sort((a, b) => a - b)[k - 1];
};

// binary search
var kthSmallest = function (matrix: number[][], k: number): number {
  const n = matrix.length;
  let left = matrix[0][0];
  let right = matrix[n - 1][n - 1];
  while (left < right) {
    const mid = left + Math.floor((right - left) / 2);
    // midVal >= k
    if (check(matrix, mid, k, n)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;

  // 比较中间值和 k 的大小
  // 从左下方开始
  function check(matrix: number[][], mid: number, k: number, n: number) {
    let i = n - 1;
    let j = 0;
    let num = 0;
    while (i >= 0 && j < n) {
      if (matrix[i][j] <= mid) {
        num += i + 1;
        j++; // 向右
      } else {
        i--; // 向上
      }
    }

    return num >= k;
  }
};
// @lc code=end
