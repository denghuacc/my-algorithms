/*
 * @lc app=leetcode.cn id=435 lang=typescript
 *
 * [435] 无重叠区间
 *
 * https://leetcode-cn.com/problems/non-overlapping-intervals/description/
 *
 * algorithms
 * Medium (38.74%)
 * Likes:    164
 * Dislikes: 0
 * Total Accepted:    18K
 * Total Submissions: 39.4K
 * Testcase Example:  '[[1,2]]'
 *
 * 给定一个区间的集合，找到需要移除区间的最小数量，使剩余区间互不重叠。
 *
 * 注意:
 *
 *
 * 可以认为区间的终点总是大于它的起点。
 * 区间 [1,2] 和 [2,3] 的边界相互“接触”，但没有相互重叠。
 *
 *
 * 示例 1:
 *
 *
 * 输入: [ [1,2], [2,3], [3,4], [1,3] ]
 *
 * 输出: 1
 *
 * 解释: 移除 [1,3] 后，剩下的区间没有重叠。
 *
 *
 * 示例 2:
 *
 *
 * 输入: [ [1,2], [1,2], [1,2] ]
 *
 * 输出: 2
 *
 * 解释: 你需要移除两个 [1,2] 来使剩下的区间没有重叠。
 *
 *
 * 示例 3:
 *
 *
 * 输入: [ [1,2], [2,3] ]
 *
 * 输出: 0
 *
 * 解释: 你不需要移除任何区间，因为它们已经是无重叠的了。
 *
 *
 */

// @lc code=start
// dp
var eraseOverlapIntervals = function (intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]); // 排序 -> 比较起始点
  // dp[i] -> dp[0:i] 范围内最大的区间数
  const dp: number[] = new Array(n).fill(0);
  dp[0] = 1;
  let count = 1;

  for (let i = 1; i < n; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (intervals[j][1] <= intervals[i][0]) {
        max = Math.max(max, dp[j]);
      }
    }
    dp[i] = max + 1;
    count = Math.max(count, dp[i]);
  }

  return n - count;
};

// dp2
var eraseOverlapIntervals = function (intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]); // 排序 -> 比较终点
  // dp[i] -> dp[0:i] 范围内最大的区间数
  const dp: number[] = new Array(n).fill(0);
  dp[0] = 1;
  let count = 1;

  for (let i = 1; i < n; i++) {
    let max = 0;
    for (let j = i - 1; j >= 0; j--) {
      if (intervals[j][1] <= intervals[i][0]) {
        max = Math.max(max, dp[j]);
        break;
      }
    }
    dp[i] = Math.max(max + 1, dp[i - 1]);
    count = Math.max(count, dp[i]);
  }

  return n - count;
};

// greedy 从起点
var eraseOverlapIntervals = function (intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;
  intervals.sort((a, b) => a[0] - b[0]);
  let count = 0;
  let prev = 0;

  for (let i = 1; i < n; i++) {
    if (intervals[prev][1] > intervals[i][0]) {
      if (intervals[prev][1] > intervals[i][1]) {
        prev = i;
      }
      count++;
    } else {
      prev = i;
    }
  }

  return count;
};

// greedy2 从终点
var eraseOverlapIntervals = function (intervals: number[][]): number {
  const n = intervals.length;
  if (n === 0) return 0;
  intervals.sort((a, b) => a[1] - b[1]);
  let end = intervals[0][1];
  let count = 1;

  for (let i = 1; i < n; i++) {
    let start = intervals[i][0];
    if (start >= end) {
      end = intervals[i][1];
      count++;
    }
  }

  return n - count;
};
// @lc code=end
