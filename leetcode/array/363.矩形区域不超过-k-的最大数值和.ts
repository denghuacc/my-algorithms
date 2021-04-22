/*
 * @lc app=leetcode.cn id=363 lang=typescript
 *
 * [363] 矩形区域不超过 K 的最大数值和
 *
 * https://leetcode-cn.com/problems/max-sum-of-rectangle-no-larger-than-k/description/
 *
 * algorithms
 * Hard (39.87%)
 * Likes:    204
 * Dislikes: 0
 * Total Accepted:    11.4K
 * Total Submissions: 26.3K
 * Testcase Example:  '[[1,0,1],[0,-2,3]]\n2'
 *
 * 给你一个 m x n 的矩阵 matrix 和一个整数 k ，找出并返回矩阵内部矩形区域的不超过 k 的最大数值和。
 *
 * 题目数据保证总会存在一个数值和不超过 k 的矩形区域。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：matrix = [[1,0,1],[0,-2,3]], k = 2
 * 输出：2
 * 解释：蓝色边框圈出来的矩形区域 [[0, 1], [-2, 3]] 的数值和是 2，且 2 是不超过 k 的最大数字（k = 2）。
 *
 *
 * 示例 2：
 *
 *
 * 输入：matrix = [[2,2,-1]], k = 3
 * 输出：3
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
 * -100
 * -10^5
 *
 *
 *
 *
 * 进阶：如果行数远大于列数，该如何设计解决方案？
 *
 */

// @lc code=start
// array
function maxSumSubmatrix(matrix: number[][], k: number): number {
  let ret = -Infinity;
  const m = matrix.length;
  const n = matrix[0].length;

  for (let i = 0; i < m; i++) {
    const sum: number[] = new Array(n).fill(0);
    for (let j = i; j < m; j++) {
      for (let c = 0; c < n; c++) {
        sum[c] += matrix[j][c]; // convert to array
      }
      const set: Set<number> = new Set();
      set.add(0);
      let s = 0;
      for (const v of sum) {
        s += v;
        const ceil = getCeil([...set], s - k);
        if (ceil !== undefined) {
          ret = Math.max(ret, s - ceil);
        }
        set.add(s);
      }
    }
  }

  return ret;

  function getCeil(arr: number[], val: number): number | undefined {
    return arr.sort((a, b) => a - b).find((item) => item >= val);
  }
}
// @lc code=end
