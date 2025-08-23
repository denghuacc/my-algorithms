/*
 * @lc app=leetcode.cn id=322 lang=typescript
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
 * 递归解法（无记忆化，会超时）
 * 核心思想：对每个金额尝试所有硬币，选择硬币数最少的方案
 */
var coinChange = function (coins: number[], amount: number): number {
  return dpf(amount);

  function dpf(n: number): number {
    // 基础情况：金额为负数时无解
    if (n < 0) return -1;
    // 基础情况：金额为0时不需要硬币
    if (n === 0) return 0;

    let ret = Infinity;

    // 尝试每种硬币
    for (const coin of coins) {
      const sub = dpf(n - coin);
      // 如果子问题无解，跳过
      if (sub === -1) continue;
      // 更新最小硬币数
      ret = Math.min(ret, 1 + sub);
    }

    // 如果找到解则返回，否则返回-1
    return ret !== Infinity ? ret : -1;
  }
};

/**
 * 记忆化递归解法（自顶向下）
 * 核心思想：使用memo数组避免重复计算
 */
var coinChange = function (coins: number[], amount: number): number {
  // memo数组用于记忆化，避免重复计算
  const memo: number[] = [];
  return dpf(amount);

  function dpf(n: number): number {
    // 如果已经计算过，直接返回
    if (memo[n]) return memo[n];

    if (n < 0) return -1;
    if (n === 0) return 0;
    let ret = Infinity;

    for (const coin of coins) {
      const sub = dpf(n - coin);
      if (sub === -1) continue;
      ret = Math.min(ret, 1 + sub);
    }

    // 保存计算结果到memo数组
    return (memo[n] = ret !== Infinity ? ret : -1);
  }
};

/**
 * 动态规划解法（自底向上）
 * 核心思想：从小到大计算每个金额的最小硬币数
 */
var coinChange = function (coins: number[], amount: number): number {
  // dp[i]表示金额i所需的最小硬币数，初始化为amount+1（表示无解）
  const dp: number[] = new Array(amount + 1).fill(amount + 1);
  // 金额为0时不需要硬币
  dp[0] = 0;

  // 从小到大计算每个金额的最小硬币数
  for (let i = 0; i < dp.length; i++) {
    // 尝试每种硬币
    for (const coin of coins) {
      // 如果当前金额小于硬币面额，跳过
      if (i - coin < 0) continue;
      // 更新最小硬币数：dp[i] = min(dp[i], 1 + dp[i-coin])
      dp[i] = Math.min(dp[i], 1 + dp[i - coin]);
    }
  }

  // 如果dp[amount]仍为amount+1，说明无解
  return dp[amount] === amount + 1 ? -1 : dp[amount];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 给定不同面额的硬币和总金额，求最少硬币数
   - 每种硬币数量无限
   - 如果无法凑成总金额，返回-1

2. 算法分析：
   - 时间复杂度：O(amount * len(coins))
   - 空间复杂度：O(amount)
   - 算法类型：动态规划（完全背包问题）

3. 实现要点：
   - 状态定义：dp[i]表示金额i所需的最小硬币数
   - 状态转移：dp[i] = min(dp[i], 1 + dp[i-coin]) for all coins
   - 边界条件：dp[0] = 0
   - 初始值：dp[i] = amount + 1（表示无解）

4. 优化思路：
   - 记忆化递归：避免重复计算子问题
   - 自底向上：避免递归调用栈开销
   - 剪枝：当金额小于硬币面额时跳过

5. 边界情况：
   - amount = 0：返回0
   - amount < 0：返回-1
   - 无法凑成总金额：返回-1
   - 硬币面额大于总金额：需要特殊处理

6. 类似问题：
   - 完全背包问题
   - 组合总和
   - 其他硬币问题

7. 关键洞察：
   - 这是一个完全背包问题
   - 可以使用动态规划求解
   - 记忆化可以避免重复计算

8. 示例分析：
   coins = [1, 2, 5], amount = 11
   - dp[0] = 0
   - dp[1] = 1 (使用1个1元硬币)
   - dp[2] = 1 (使用1个2元硬币)
   - dp[3] = 2 (使用1个1元 + 1个2元)
   - ...
   - dp[11] = 3 (使用2个5元 + 1个1元)

9. 复杂度对比：
   - 递归无记忆化：指数级复杂度，会超时
   - 记忆化递归：时间复杂度O(amount * len(coins))，空间复杂度O(amount)
   - 自底向上：时间复杂度O(amount * len(coins))，空间复杂度O(amount)

10. 状态转移理解：
    - 对于金额i，尝试使用每种硬币coin
    - 如果使用coin，则剩余金额为i-coin
    - 总硬币数 = 1 + dp[i-coin]
    - 选择所有可能中的最小值
*/
