/*
 * @lc app=leetcode.cn id=757 lang=typescript
 *
 * [757] 设置交集大小至少为2
 *
 * https://leetcode.cn/problems/set-intersection-size-at-least-two/description/
 *
 * algorithms
 * Hard (43.77%)
 * Likes:    97
 * Dislikes: 0
 * Total Accepted:    5.9K
 * Total Submissions: 11.5K
 * Testcase Example:  '[[1,3],[1,4],[2,5],[3,5]]'
 *
 * 一个整数区间 [a, b]  ( a < b ) 代表着从 a 到 b 的所有连续整数，包括 a 和 b。
 *
 * 给你一组整数区间intervals，请找到一个最小的集合 S，使得 S 里的元素与区间intervals中的每一个整数区间都至少有2个元素相交。
 *
 * 输出这个最小集合S的大小。
 *
 * 示例 1:
 *
 * 输入: intervals = [[1, 3], [1, 4], [2, 5], [3, 5]]
 * 输出: 3
 * 解释:
 * 考虑集合 S = {2, 3, 4}. S与intervals中的四个区间都有至少2个相交的元素。
 * 且这是S最小的情况，故我们输出3。
 *
 *
 * 示例 2:
 *
 * 输入: intervals = [[1, 2], [2, 3], [2, 4], [4, 5]]
 * 输出: 5
 * 解释:
 * 最小的集合S = {1, 2, 3, 4, 5}.
 *
 *
 * 注意:
 *
 *
 * intervals 的长度范围为[1, 3000]。
 * intervals[i] 长度为 2，分别代表左、右边界。
 * intervals[i][j] 的值是 [0, 10^8]范围内的整数。
 *
 *
 */

// @lc code=start
// greedy
function intersectionSizeTwo(intervals: number[][]): number {
  const n = intervals.length;
  let res = 0;
  const m = 2;
  intervals.sort((a, b) => {
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return a[0] - b[0];
  });

  const values = Array.from(new Array(n), () => []);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = intervals[i][0], k = values[i].length; k < m; k++) {
      res++;
      for (let p = i - 1; p >= 0 && intervals[p][1] >= j; p--) {
        values[p].push(j);
      }
      j++;
    }
  }

  return res;
}
// @lc code=end
