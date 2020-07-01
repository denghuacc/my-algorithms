/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 *
 * https://leetcode-cn.com/problems/coin-change/description/
 *
 * algorithms
 * Medium (27.78%)
 * Likes:    674
 * Dislikes: 0
 * Total Accepted:    98.1K
 * Total Submissions: 244.4K
 * Testcase Example:  '[1,2,5]\n11'
 *
 * 给定不同面额的硬币 coins 和一个总金额
 * amount。编写一个函数来计算可以凑成总金额所需的最少的硬币个数。如果没有任何一种硬币组合能组成总金额，返回 -1。
 *
 *
 *
 * 示例 1:
 *
 * 输入: coins = [1, 2, 5], amount = 11
 * 输出: 3
 * 解释: 11 = 5 + 5 + 1
 *
 * 示例 2:
 *
 * 输入: coins = [2], amount = 3
 * 输出: -1
 *
 *
 *
 * 说明:
 * 你可以认为每种硬币的数量是无限的。
 *
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 * 没有 memo 超时
 */
var coinChange = function (coins, amount) {
  return dp(amount);

  function dp(n) {
    if (n < 0) return -1;
    if (n === 0) return 0;
    let ret = Infinity;

    for (const coin of coins) {
      let sub = dp(n - coin);
      if (sub === -1) continue;
      ret = Math.min(ret, 1 + sub);
    }

    return ret !== Infinity ? ret : -1;
  }
};

// memo
var coinChange = function (coins, amount) {
  const memo = [];
  return dp(amount);

  function dp(n) {
    if (memo[n]) return memo[n];

    if (n < 0) return -1;
    if (n === 0) return 0;
    let ret = Infinity;

    for (const coin of coins) {
      let sub = dp(n - coin);
      if (sub === -1) continue;
      ret = Math.min(ret, 1 + sub);
    }

    return (memo[n] = ret !== Infinity ? ret : -1);
  }
};

var coinChange = function (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1);
  dp[0] = 0;

  for (let i = 0; i < dp.length; i++) {
    for (const coin of coins) {
      if (i - coin < 0) continue;
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }

  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// @lc code=end
