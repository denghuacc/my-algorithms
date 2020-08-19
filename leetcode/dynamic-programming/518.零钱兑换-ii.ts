/*
 * @lc app=leetcode.cn id=518 lang=typescript
 *
 * [518] 零钱兑换 II
 *
 * https://leetcode-cn.com/problems/coin-change-2/description/
 *
 * algorithms
 * Medium (39.34%)
 * Likes:    181
 * Dislikes: 0
 * Total Accepted:    16.9K
 * Total Submissions: 31.7K
 * Testcase Example:  '5\n[1,2,5]'
 *
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。
 *
 *
 *
 *
 *
 *
 * 示例 1:
 *
 * 输入: amount = 5, coins = [1, 2, 5]
 * 输出: 4
 * 解释: 有四种方式可以凑成总金额:
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 *
 * 示例 2:
 *
 * 输入: amount = 3, coins = [2]
 * 输出: 0
 * 解释: 只用面额2的硬币不能凑成总金额3。
 *
 *
 * 示例 3:
 *
 * 输入: amount = 10, coins = [10]
 * 输出: 1
 *
 *
 *
 *
 * 注意:
 *
 * 你可以假设：
 *
 *
 * 0 <= amount (总金额) <= 5000
 * 1 <= coin (硬币面额) <= 5000
 * 硬币种类不超过 500 种
 * 结果符合 32 位符号整数
 *
 *
 */

// @lc code=start
// dp
var change = function (amount: number, coins: number[]): number {
  const n = coins.length;

  // dp[i][j] ->
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(amount + 1).fill(0)
  );

  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i - 1] >= 0) {
        dp[i][j] = dp[i - 1][j] + dp[i][j - coins[i - 1]];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n][amount];
};

// dp2
var change = function (amount: number, coins: number[]): number {
  const n = coins.length;

  // dp[i] -> amount 为 i 时的组合数
  const dp: number[] = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= amount; j++) {
      if (j - coins[i] >= 0) {
        dp[j] = dp[j] + dp[j - coins[i]];
      }
    }
  }
  return dp[amount];
};

// dp3
var change = function (amount: number, coins: number[]): number {
  // dp[i] -> amount 为 i 时的组合数
  const dp: number[] = new Array(amount + 1).fill(0);
  dp[0] = 1;

  for (const coin of coins) {
    for (let i = coin; i < amount + 1; i++) {
      dp[i] += dp[i - coin];
    }
  }

  return dp[amount];
};
// @lc code=end
