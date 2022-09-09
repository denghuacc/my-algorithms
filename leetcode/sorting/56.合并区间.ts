/*
 * @lc app=leetcode.cn id=56 lang=typescript
 *
 * [56] 合并区间
 *
 * https://leetcode-cn.com/problems/merge-intervals/description/
 *
 * algorithms
 * Medium (34.27%)
 * Likes:    469
 * Dislikes: 0
 * Total Accepted:    108.5K
 * Total Submissions: 254.4K
 * Testcase Example:  '[[1,3],[2,6],[8,10],[15,18]]'
 *
 * 给出一个区间的集合，请合并所有重叠的区间。
 *
 * 示例 1:
 *
 * 输入: [[1,3],[2,6],[8,10],[15,18]]
 * 输出: [[1,6],[8,10],[15,18]]
 * 解释: 区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
 *
 *
 * 示例 2:
 *
 * 输入: [[1,4],[4,5]]
 * 输出: [[1,5]]
 * 解释: 区间 [1,4] 和 [4,5] 可被视为重叠区间。
 *
 */

// @lc code=start
// array sort
var merge = function (intervals: number[][]): number[][] {
  const n = intervals.length;
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  res.push(intervals[0]);

  for (let i = 1; i < n; i++) {
    if (intervals[i][0] > res[res.length - 1][1]) {
      res.push(intervals[i]);
    } else {
      if (intervals[i][1] > res[res.length - 1][1]) {
        res[res.length - 1][1] = intervals[i][1];
      }
    }
  }
  return res;
};

// array sort
var merge = function (intervals: number[][]): number[][] {
  intervals.sort((a, b) => a[0] - b[0]);
  const res: number[][] = [];
  let idx = -1;

  for (const interval of intervals) {
    if (idx === -1 || interval[0] > res[idx][1]) {
      res.push(interval);
      idx++;
    } else {
      res[idx][1] = Math.max(res[idx][1], interval[1]);
    }
  }

  return res;
};
// @lc code=end
