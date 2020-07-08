/*
 * @lc app=leetcode.cn id=188 lang=typescript
 *
 * [188] 买卖股票的最佳时机 IV
 *
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/description/
 *
 * algorithms
 * Hard (25.72%)
 * Likes:    243
 * Dislikes: 0
 * Total Accepted:    22.9K
 * Total Submissions: 76.7K
 * Testcase Example:  '2\n[2,4,1]'
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 *
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
 *
 * 注意: 你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 *
 * 示例 1:
 *
 * 输入: [2,4,1], k = 2
 * 输出: 2
 * 解释: 在第 1 天 (股票价格 = 2) 的时候买入，在第 2 天 (股票价格 = 4) 的时候卖出，这笔交易所能获得利润 = 4-2 = 2 。
 *
 *
 * 示例 2:
 *
 * 输入: [3,2,6,5,0,3], k = 2
 * 输出: 7
 * 解释: 在第 2 天 (股票价格 = 2) 的时候买入，在第 3 天 (股票价格 = 6) 的时候卖出, 这笔交易所能获得利润 = 6-2 = 4
 * 。
 * 随后，在第 5 天 (股票价格 = 0) 的时候买入，在第 6 天 (股票价格 = 3) 的时候卖出, 这笔交易所能获得利润 = 3-0 = 3 。
 *
 *
 */

export {};

// @lc code=start
// dp
var maxProfit = function (k: number, prices: number[]): number {
  const n = prices.length;
  if (n === 0) return 0;
  if (k > Math.floor(n / 2)) return maxProfitInfinity(prices);

  const dp = Array.from(new Array(k + 1), () => new Array(2).fill(0));

  for (let i = 0; i < n; i++) {
    for (let j = k; j > 0; j--) {
      if (i === 0) {
        dp[j][1] = -prices[0];
        continue;
      }
      dp[j][0] = Math.max(dp[j][0], dp[j][1] + prices[i]);
      dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - prices[i]);
    }
  }

  return dp[k][0];

  function maxProfitInfinity(prices: number[]): number {
    const n = prices.length;
    let dpI0 = 0;
    let dpI1 = -Infinity;

    for (let i = 0; i < n; i++) {
      let tmp = dpI0;
      dpI0 = Math.max(dpI0, dpI1 + prices[i]);
      dpI1 = Math.max(dpI1, tmp - prices[i]);
    }

    return dpI0;
  }
};
// @lc code=end
