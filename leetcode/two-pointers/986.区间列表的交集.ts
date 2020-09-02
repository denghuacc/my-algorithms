/*
 * @lc app=leetcode.cn id=986 lang=typescript
 *
 * [986] 区间列表的交集
 *
 * https://leetcode-cn.com/problems/interval-list-intersections/description/
 *
 * algorithms
 * Medium (53.88%)
 * Likes:    63
 * Dislikes: 0
 * Total Accepted:    7.1K
 * Total Submissions: 11.1K
 * Testcase Example:  '[[0,2],[5,10],[13,23],[24,25]]\n[[1,5],[8,12],[15,24],[25,26]]'
 *
 * 给定两个由一些 闭区间 组成的列表，每个区间列表都是成对不相交的，并且已经排序。
 *
 * 返回这两个区间列表的交集。
 *
 * （形式上，闭区间 [a, b]（其中 a <= b）表示实数 x 的集合，而 a <= x <=
 * b。两个闭区间的交集是一组实数，要么为空集，要么为闭区间。例如，[1, 3] 和 [2, 4] 的交集为 [2, 3]。）
 *
 *
 *
 * 示例：
 *
 *
 *
 * 输入：A = [[0,2],[5,10],[13,23],[24,25]], B = [[1,5],[8,12],[15,24],[25,26]]
 * 输出：[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= A.length < 1000
 * 0 <= B.length < 1000
 * 0 <= A[i].start, A[i].end, B[i].start, B[i].end < 10^9
 *
 *
 */

// @lc code=start
// two pointers
var intervalIntersection = function (A: number[][], B: number[][]): number[][] {
  let i = 0;
  let j = 0;
  const ret: number[][] = [];

  while (i < A.length && j < B.length) {
    const a1 = A[i][0];
    const a2 = A[i][1];
    const b1 = B[j][0];
    const b2 = B[j][1];

    if (b2 >= a1 && a2 >= b1) {
      // [取最大值，取最小值]
      ret.push([Math.max(a1, b1), Math.min(a2, b2)]);
    }
    if (b2 < a2) j += 1;
    else i += 1;
  }

  return ret;
}
// @lc code=end
