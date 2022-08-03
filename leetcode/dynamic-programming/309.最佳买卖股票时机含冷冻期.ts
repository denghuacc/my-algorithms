/*
 * @lc app=leetcode.cn id=309 lang=typescript
 *
 * [309] 最佳买卖股票时机含冷冻期
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/description/
 *
 * algorithms
 * Medium (42.73%)
 * Likes:    357
 * Dislikes: 0
 * Total Accepted:    30.1K
 * Total Submissions: 55.6K
 * Testcase Example:  '[1,2,3,0,2]'
 *
 * 给定一个整数数组，其中第 i 个元素代表了第 i 天的股票价格 。​
 *
 * 设计一个算法计算出最大利润。在满足以下约束条件下，你可以尽可能地完成更多的交易（多次买卖一支股票）:
 *
 *
 * 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 * 卖出股票后，你无法在第二天买入股票 (即冷冻期为 1 天)。
 *
 *
 * 示例:
 *
 * 输入: [1,2,3,0,2]
 * 输出: 3
 * 解释: 对应的交易状态为: [买入, 卖出, 冷冻期, 买入, 卖出]
 *
 */

export {};

// @lc code=start
// dp
function maxProfit(prices: number[]): number {
  const n = prices.length;
  let dpI0 = 0;
  let dpI1 = -Infinity;
  let dpPre0 = 0; // equals  dp[i-2][0]

  for (let i = 0; i < n; i++) {
    const tmp = dpI0;
    dpI0 = Math.max(dpI0, dpI1 + prices[i]);
    dpI1 = Math.max(dpI1, dpPre0 - prices[i]);
    dpPre0 = tmp;
  }

  return dpI0;
}
// @lc code=end
