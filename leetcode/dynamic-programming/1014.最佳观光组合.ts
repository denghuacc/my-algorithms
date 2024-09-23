/*
 * @lc app=leetcode.cn id=1014 lang=typescript
 *
 * [1014] 最佳观光组合
 *
 * https://leetcode.cn/problems/best-sightseeing-pair/description/
 *
 * algorithms
 * Medium (57.40%)
 * Likes:    425
 * Dislikes: 0
 * Total Accepted:    72.2K
 * Total Submissions: 124.5K
 * Testcase Example:  '[8,1,5,2,6]'
 *
 * 给你一个正整数数组 values，其中 values[i] 表示第 i 个观光景点的评分，并且两个景点 i 和 j 之间的 距离 为 j - i。
 *
 * 一对景点（i < j）组成的观光组合的得分为 values[i] + values[j] + i - j ，也就是景点的评分之和 减去
 * 它们两者之间的距离。
 *
 * 返回一对观光景点能取得的最高分。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：values = [8,1,5,2,6]
 * 输出：11
 * 解释：i = 0, j = 2, values[i] + values[j] + i - j = 8 + 5 + 0 - 2 = 11
 *
 *
 * 示例 2：
 *
 *
 * 输入：values = [1,2]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * 1
 *
 *
 */

// @lc code=start
var maxScoreSightseeingPair = function (values: number[]): number {
  const n = values.length;
  let res = 0;
  let maxI = values[0] + 0;
  for (let j = 1; j < n; j++) {
    res = Math.max(res, maxI + values[j] - j);
    maxI = Math.max(maxI, values[j] + j); // 维护[0, j]之间的maxI的最大值
  }
  return res;
};

// dp 写法
var maxScoreSightseeingPair = function (values: number[]): number {
  const n = values.length;
  // dp[i] 表示前i个景点最大分的单个景点
  const dp = new Array(n).fill(0);
  dp[0] = values[0] + 0;
  let res = 0;
  for (let i = 1; i < n; i++) {
    res = Math.max(res, dp[i - 1] + values[i] - i);
    dp[i] = Math.max(dp[i - 1], values[i] + i);
  }
  return res;
};
// @lc code=end
