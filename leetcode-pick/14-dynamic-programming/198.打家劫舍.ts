/*
 * @lc app=leetcode.cn id=198 lang=typescript
 *
 * [198] 打家劫舍
 *
 * https://leetcode-cn.com/problems/house-robber/description/
 *
 * algorithms
 * Easy (38.94%)
 * Likes:    920
 * Dislikes: 0
 * Total Accepted:    147.6K
 * Total Submissions: 322.1K
 * Testcase Example:  '[1,2,3,1]'
 *
 *
 * 你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。
 *
 * 给定一个代表每个房屋存放金额的非负整数数组，计算你 不触动警报装置的情况下 ，一夜之内能够偷窃到的最高金额。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[1,2,3,1]
 * 输出：4
 * 解释：偷窃 1 号房屋 (金额 = 1) ，然后偷窃 3 号房屋 (金额 = 3)。
 * 偷窃到的最高金额 = 1 + 3 = 4 。
 *
 * 示例 2：
 *
 * 输入：[2,7,9,3,1]
 * 输出：12
 * 解释：偷窃 1 号房屋 (金额 = 2), 偷窃 3 号房屋 (金额 = 9)，接着偷窃 5 号房屋 (金额 = 1)。
 * 偷窃到的最高金额 = 2 + 9 + 1 = 12 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= nums.length <= 100
 * 0 <= nums[i] <= 400
 *
 *
 */

export {};

// @lc code=start
/**
 * 记忆化递归解法（自顶向下）
 * 核心思想：对每个位置选择偷或不偷，使用记忆化避免重复计算
 */
var rob = function (nums: number[]): number {
  const n = nums.length;
  // memo数组用于记忆化，避免重复计算
  const memo: number[] = new Array(n).fill(-1);
  return dp(nums, 0);

  function dp(nums: number[], start: number): number {
    const n = nums.length;
    // 基础情况：超出数组范围
    if (start >= n) return 0;
    // 如果已经计算过，直接返回
    if (memo[start] !== -1) return memo[start];

    // 状态转移：选择偷当前房屋或不偷当前房屋
    const ret = Math.max(
      dp(nums, start + 1),
      nums[start] + dp(nums, start + 2)
    );

    // 保存计算结果
    memo[start] = ret;
    return ret;
  }
};

/**
 * 动态规划解法（自底向上）
 * 核心思想：从后往前计算每个位置的最大收益
 */
var rob = function (nums: number[]): number {
  const n = nums.length;
  // dp[i] 表示从位置i开始能偷到的最大金额
  const dp: number[] = new Array(n + 2).fill(0);

  // 从后往前计算
  for (let i = n - 1; i >= 0; i--) {
    // 状态转移：dp[i] = max(dp[i+1], nums[i] + dp[i+2])
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }

  return dp[0];
};

/**
 * 空间优化解法（自底向上，空间复杂度O(1)）
 * 核心思想：只保存必要的状态，使用滚动数组
 */
var rob = function (nums: number[]): number {
  const n = nums.length;
  // 只保存三个状态：dp[i], dp[i+1], dp[i+2]
  let dpI1 = 0; // dp[i+1]
  let dpI2 = 0; // dp[i+2]
  let dpI = 0; // dp[i]

  // 从后往前计算
  for (let i = n - 1; i >= 0; i--) {
    // 计算当前位置的最大收益
    dpI = Math.max(dpI1, nums[i] + dpI2);
    // 更新状态
    dpI2 = dpI1;
    dpI1 = dpI;
  }

  return dpI;
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在数组中选数，相邻数字不能同时选择
   - 求选出的数字和的最大值
   - 经典的动态规划问题

2. 算法分析：
   - 时间复杂度：O(n)，其中n是数组长度
   - 空间复杂度：O(n)（记忆化/数组）或O(1)（优化版本）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i]表示从位置i开始能偷到的最大金额
   - 状态转移：dp[i] = max(dp[i+1], nums[i] + dp[i+2])
   - 边界条件：dp[n] = dp[n+1] = 0
   - 遍历顺序：从后往前

4. 优化思路：
   - 记忆化递归：避免重复计算子问题
   - 自底向上：避免递归调用栈开销
   - 空间优化：只保存必要的状态

5. 边界情况：
   - 空数组：返回0
   - 单个元素：返回该元素
   - 两个元素：返回较大值

6. 类似问题：
   - 打家劫舍II（环形房屋）
   - 打家劫舍III（树形房屋）
   - 其他选择问题

7. 关键洞察：
   - 每个位置的选择只依赖于后面的两个位置
   - 可以使用滚动数组优化空间复杂度
   - 从后往前遍历更自然

8. 示例分析：
   nums = [1,2,3,1]
   - dp[4] = 0, dp[3] = 1
   - dp[2] = max(dp[3], nums[2] + dp[4]) = max(1, 3) = 3
   - dp[1] = max(dp[2], nums[1] + dp[3]) = max(3, 2+1) = 3
   - dp[0] = max(dp[1], nums[0] + dp[2]) = max(3, 1+3) = 4
   - 结果：4

9. 复杂度对比：
   - 记忆化递归：思路直观，空间复杂度O(n)
   - 自底向上：避免递归，空间复杂度O(n)
   - 空间优化：空间复杂度O(1)，最优

10. 状态转移理解：
    - 对于位置i，有两种选择：
      1. 不偷当前房屋：dp[i] = dp[i+1]
      2. 偷当前房屋：dp[i] = nums[i] + dp[i+2]
    - 选择收益较大的方案
    - 由于不能偷相邻房屋，所以跳过dp[i+1]
*/
