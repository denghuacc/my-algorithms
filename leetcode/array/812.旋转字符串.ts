/*
 * @lc app=leetcode.cn id=812 lang=typescript
 *
 * [812] 旋转字符串
 *
 * https://leetcode-cn.com/problems/largest-triangle-area/description/
 *
 * algorithms
 * Easy (54.02%)
 * Likes:    52
 * Dislikes: 0
 * Total Accepted:    5.8K
 * Total Submissions: 9.7K
 * Testcase Example:  '[[0,0],[0,1],[1,0],[0,2],[2,0]]'
 *
 * 给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。
 *
 *
 * 示例:
 * 输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
 * 输出: 2
 * 解释:
 * 这五个点如下图所示。组成的橙色三角形是最大的，面积为2。
 *
 *
 *
 *
 * 注意:
 *
 *
 * 3 <= points.length <= 50.
 * 不存在重复的点。
 * -50 <= points[i][j] <= 50.
 * 结果误差值在 10^-6 以内都认为是正确答案。
 *
 *
 */

// @lc code=start
/**
 * @param {number[][]} points
 * @return {number}
 */
var largestTriangleArea = function (points: number[][]): number {
  let n = points.length;
  let ret = 0;
  for (let i = 0; i < n; ++i) {
    for (let j = i + 1; j < n; ++j) {
      for (let k = j + 1; k < n; ++k) {
        ret = Math.max(ret, area(points[i], points[j], points[k]));
      }
    }
  }
  return ret;

  function area(a: number[], b: number[], c: number[]) {
    return (
      0.5 *
      Math.abs(
        a[0] * b[1] +
          b[0] * c[1] +
          c[0] * a[1] -
          a[1] * b[0] -
          b[1] * c[0] -
          c[1] * a[0]
      )
    );
  }
};
// @lc code=end
