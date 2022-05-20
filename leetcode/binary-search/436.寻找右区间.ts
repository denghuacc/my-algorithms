/*
 * @lc app=leetcode.cn id=436 lang=typescript
 *
 * [436] 寻找右区间
 *
 * https://leetcode.cn/problems/find-right-interval/description/
 *
 * algorithms
 * Medium (49.60%)
 * Likes:    133
 * Dislikes: 0
 * Total Accepted:    17.4K
 * Total Submissions: 32.7K
 * Testcase Example:  '[[1,2]]'
 *
 * 给你一个区间数组 intervals ，其中 intervals[i] = [starti, endi] ，且每个 starti 都 不同 。
 *
 * 区间 i 的 右侧区间 可以记作区间 j ，并满足 startj >= endi ，且 startj 最小化 。
 *
 * 返回一个由每个区间 i 的 右侧区间 的最小起始位置组成的数组。如果某个区间 i 不存在对应的 右侧区间 ，则下标 i 处的值设为 -1 。
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,2]]
 * 输出：[-1]
 * 解释：集合中只有一个区间，所以输出-1。
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[3,4],[2,3],[1,2]]
 * 输出：[-1,0,1]
 * 解释：对于 [3,4] ，没有满足条件的“右侧”区间。
 * 对于 [2,3] ，区间[3,4]具有最小的“右”起点;
 * 对于 [1,2] ，区间[2,3]具有最小的“右”起点。
 *
 *
 * 示例 3：
 *
 *
 * 输入：intervals = [[1,4],[2,3],[3,4]]
 * 输出：[-1,2,-1]
 * 解释：对于区间 [1,4] 和 [3,4] ，没有满足条件的“右侧”区间。
 * 对于 [2,3] ，区间 [3,4] 有最小的“右”起点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= intervals.length <= 2 * 10^4
 * intervals[i].length == 2
 * -10^6 <= starti <= endi <= 10^6
 * 每个间隔的起点都 不相同
 *
 *
 */

// @lc code=start
// brute force
var findRightInterval = function (intervals: number[][]): number[] {
  const res: number[] = [];
  const n = intervals.length;
  for (let i = 0; i < n; i++) {
    const [start, end] = intervals[i];
    if (start === end) {
      res.push(i);
      continue;
    }
    let min = Infinity;
    let idx = -1;
    for (let j = 0; j < n; j++) {
      const s = intervals[j][0];
      if (s >= end) {
        const diff = s - end;
        if (diff === 0) {
          idx = j;
          break;
        } else {
          if (diff < min) {
            min = diff;
            idx = j;
          }
        }
      }
    }
    res.push(idx);
  }
  return res;
};

// binary search
var findRightInterval = function (intervals: number[][]): number[] {
  const n = intervals.length;
  const startIntervals: number[][] = Array.from(new Array(n), () => []);
  for (let i = 0; i < n; i++) {
    startIntervals[i] = [intervals[i][0], i];
  }
  startIntervals.sort((a, b) => a[0] - b[0]);
  const res: number[] = new Array(n);
  for (let i = 0; i < n; i++) {
    let left = 0;
    let right = n - 1;
    let target = -1;
    while (left <= right) {
      const mid = left + ((right - left) >> 1);
      if (startIntervals[mid][0] >= intervals[i][1]) {
        right = mid - 1;
        target = startIntervals[mid][1];
      } else {
        left = mid + 1;
      }
    }
    res[i] = target;
  }
  return res;
};

// @lc code=end
