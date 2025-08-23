/*
 * @lc app=leetcode.cn id=746 lang=typescript
 *
 * [746] 使用最小花费爬楼梯
 *
 * https://leetcode-cn.com/problems/min-cost-climbing-stairs/description/
 *
 * algorithms
 * Easy (50.14%)
 * Likes:    480
 * Dislikes: 0
 * Total Accepted:    76.5K
 * Total Submissions: 141.2K
 * Testcase Example:  '[0,0,0,0]'
 *
 * 数组的每个索引作为一个阶梯，第 i个阶梯对应着一个非负数的体力花费值 cost[i](索引从0开始)。
 *
 * 每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。
 *
 * 您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。
 *
 * 示例 1:
 *
 * 输入: cost = [10, 15, 20]
 * 输出: 15
 * 解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。
 *
 *
 * 示例 2:
 *
 * 输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
 * 输出: 6
 * 解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。
 *
 *
 * 注意：
 *
 *
 * cost 的长度将会在 [2, 1000]。
 * 每一个 cost[i] 将会是一个Integer类型，范围为 [0, 999]。
 *
 *
 */

// @lc code=start
/**
 * 动态规划解法（数组版本）
 * 核心思想：dp[i]表示到达第i个阶梯的最小花费
 */
var minCostClimbingStairs = function (cost: number[]): number {
  const n = cost.length;
  // dp[i] 表示到达第i个阶梯的最小花费
  const dp: number[] = new Array(n + 1).fill(0);

  // 从第2个阶梯开始计算，因为可以从第0或第1个阶梯开始
  for (let i = 2; i <= n; i++) {
    // 到达第i个阶梯的最小花费 = min(从第i-1个阶梯跳1步, 从第i-2个阶梯跳2步)
    dp[i] = Math.min(dp[i - 1] + cost[i - 1], dp[i - 2] + cost[i - 2]);
  }
  return dp[n];
};

/**
 * 动态规划解法（空间优化版本）
 * 核心思想：只保存前两个状态，节省空间
 */
var minCostClimbingStairs = function (cost: number[]): number {
  const n = cost.length;
  // 只保存前两个状态：prev表示到达第i-2个阶梯的花费，cur表示到达第i-1个阶梯的花费
  let prev = 0; // dp[0] = 0
  let cur = 0; // dp[1] = 0

  for (let i = 2; i <= n; i++) {
    // 计算到达第i个阶梯的最小花费
    const next = Math.min(cur + cost[i - 1], prev + cost[i - 2]);
    // 更新状态
    prev = cur;
    cur = next;
  }
  return cur;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 爬楼梯问题，每次可以爬1或2个阶梯
   - 每个阶梯有对应的花费值
   - 求到达楼顶的最小花费
   - 可以从第0或第1个阶梯开始

2. 算法分析：
   - 时间复杂度：O(n)，其中n是阶梯数量
   - 空间复杂度：O(n)（数组版本）或O(1)（优化版本）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i]表示到达第i个阶梯的最小花费
   - 状态转移：dp[i] = min(dp[i-1] + cost[i-1], dp[i-2] + cost[i-2])
   - 边界条件：dp[0] = 0, dp[1] = 0（可以从第0或第1个阶梯开始）
   - 目标：dp[n]（到达楼顶的最小花费）

4. 优化思路：
   - 空间优化：只保存前两个状态，使用滚动数组
   - 状态压缩：prev和cur两个变量代替dp数组
   - 贪心思想：每个位置选择花费最小的路径

5. 边界情况：
   - 数组长度为2的情况
   - 所有花费都为0的情况
   - 大数组的数值溢出问题

6. 类似问题：
   - 爬楼梯（求路径数量）
   - 斐波那契数列
   - 其他递推问题

7. 关键洞察：
   - 每个位置的最小花费只依赖于前两个位置
   - 可以使用滚动数组优化空间复杂度
   - 问题可以转化为递推公式

8. 示例分析：
   cost = [10, 15, 20]
   - dp[0] = 0, dp[1] = 0
   - dp[2] = min(dp[1] + cost[1], dp[0] + cost[0]) = min(0+15, 0+10) = 10
   - dp[3] = min(dp[2] + cost[2], dp[1] + cost[1]) = min(10+20, 0+15) = 15
   - 结果：15

9. 复杂度对比：
   - 数组版本：思路清晰，空间复杂度O(n)
   - 优化版本：空间复杂度O(1)，代码简洁
   - 两种方法时间复杂度相同

10. 状态转移理解：
    - 到达第i个阶梯有两种方式：
      1. 从第i-1个阶梯跳1步：dp[i-1] + cost[i-1]
      2. 从第i-2个阶梯跳2步：dp[i-2] + cost[i-2]
    - 选择花费较小的方式
*/
