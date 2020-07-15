/*
 * @lc app=leetcode.cn id=57 lang=typescript
 *
 * [57] 插入区间
 *
 * https://leetcode-cn.com/problems/insert-interval/description/
 *
 * algorithms
 * Hard (32.90%)
 * Likes:    155
 * Dislikes: 0
 * Total Accepted:    24.3K
 * Total Submissions: 65.1K
 * Testcase Example:  '[[1,3],[6,9]]\n[2,5]'
 *
 * 给出一个无重叠的 ，按照区间起始端点排序的区间列表。
 *
 * 在列表中插入一个新的区间，你需要确保列表中的区间仍然有序且不重叠（如果有必要的话，可以合并区间）。
 *
 * 示例 1:
 *
 * 输入: intervals = [[1,3],[6,9]], newInterval = [2,5]
 * 输出: [[1,5],[6,9]]
 *
 *
 * 示例 2:
 *
 * 输入: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
 * 输出: [[1,2],[3,10],[12,16]]
 * 解释: 这是因为新的区间 [4,8] 与 [3,5],[6,7],[8,10] 重叠。
 *
 *
 */

// @lc code=start
// array
var insert = function (
  intervals: number[][],
  newInterval: number[]
): number[][] {
  intervals.push(newInterval);
  const len = intervals.length;
  if (len === 0) return [];
  const ret: number[][] = [];
  intervals.sort((a, b) => a[0] - b[0]);
  ret.push(intervals[0]);

  for (let i = 1; i < len; i++) {
    if (intervals[i][0] > ret[ret.length - 1][1]) {
      ret.push(intervals[i]);
    } else {
      if (intervals[i][1] > ret[ret.length - 1][1]) {
        ret[ret.length - 1][1] = intervals[i][1];
      }
    }
  }
  return ret;
};

// array
var insert = function (
  intervals: number[][],
  newInterval: number[]
): number[][] {
  intervals.push(newInterval);
  intervals.sort((a, b) => a[0] - b[0]);
  const ret: number[][] = [];
  let idx = -1;

  for (const interval of intervals) {
    if (idx === -1 || interval[0] > ret[idx][1]) {
      ret.push(interval);
      idx++;
    } else {
      ret[idx][1] = Math.max(ret[idx][1], interval[1]);
    }
  }

  return ret;
};
// @lc code=end
