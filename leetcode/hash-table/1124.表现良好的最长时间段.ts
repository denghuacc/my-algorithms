/*
 * @lc app=leetcode.cn id=1124 lang=typescript
 *
 * [1124] 表现良好的最长时间段
 *
 * https://leetcode.cn/problems/longest-well-performing-interval/description/
 *
 * algorithms
 * Medium (34.84%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    25K
 * Total Submissions: 69.3K
 * Testcase Example:  '[9,9,6,0,6,6,9]'
 *
 * 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。
 *
 * 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
 *
 * 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。
 *
 * 请你返回「表现良好时间段」的最大长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：hours = [9,9,6,0,6,6,9]
 * 输出：3
 * 解释：最长的表现良好时间段是 [9,9,6]。
 *
 * 示例 2：
 *
 *
 * 输入：hours = [6,6,6]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= hours.length <= 10^4
 * 0 <= hours[i] <= 16
 *
 *
 */

// @lc code=start
// hash table
var longestWPI = function (hours: number[]): number {
  const n = hours.length;
  let res = 0;
  let sum = 0;
  const map = new Map();
  for (let i = 0; i < n; i++) {
    sum += hours[i] > 8 ? 1 : -1;
    if (sum > 0) {
      res = Math.max(res, i + 1);
    } else {
      if (map.has(sum - 1)) {
        res = Math.max(res, i - map.get(sum - 1)!);
      }
    }
    if (!map.has(sum)) {
      map.set(sum, i);
    }
  }
  return res;
};

// stack
var longestWPI = function (hours: number[]): number {
  const n = hours.length;
  const sum: number[] = new Array(n + 1).fill(0);
  const stack: number[] = [0];
  for (let i = 1; i <= n; i++) {
    sum[i] = sum[i - 1] + (hours[i - 1] > 8 ? 1 : -1);
    if (sum[stack.at(-1)!] > sum[i]) {
      stack.push(i);
    }
  }
  let res = 0;
  for (let i = n; i >= 1; i--) {
    while (stack.length && sum[stack.at(-1)!] < sum[i]) {
      res = Math.max(res, i - stack.pop()!);
    }
  }
  return res;
};
// @lc code=end
