/*
 * @lc app=leetcode.cn id=494 lang=typescript
 *
 * [494] 目标和
 *
 * https://leetcode-cn.com/problems/target-sum/description/
 *
 * algorithms
 * Medium (47.07%)
 * Likes:    718
 * Dislikes: 0
 * Total Accepted:    94.1K
 * Total Submissions: 200K
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给你一个整数数组 nums 和一个整数 target 。
 *
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 *
 *
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 *
 *
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], target = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 0
 * -1000
 *
 *
 */

// @lc code=start
/**
 * 回溯解法
 * 核心思想：对每个数字尝试+和-两种选择，递归搜索所有可能
 */
var findTargetSumWays = function (nums: number[], target: number): number {
  let count = 0;
  backtrack(nums, target, 0, 0);
  return count;

  function backtrack(
    nums: number[],
    target: number,
    index: number,
    sum: number
  ) {
    if (index === nums.length) {
      // 到达数组末尾，检查是否达到目标
      if (sum === target) {
        count++;
      }
    } else {
      // 对当前数字尝试+和-两种选择
      backtrack(nums, target, index + 1, sum + nums[index]);
      backtrack(nums, target, index + 1, sum - nums[index]);
    }
  }
};

/**
 * 二维动态规划解法
 * 核心思想：将问题转化为0-1背包问题，寻找和为特定值的子集数量
 */
var findTargetSumWays = function (nums: number[], target: number): number {
  const sum = nums.reduce((acc, i) => acc + i, 0);
  const diff = sum - target;

  // 如果差值小于0或为奇数，无解
  if (diff < 0 || diff % 2) {
    return 0;
  }

  const n = nums.length;
  const neg = diff / 2; // 需要选择为负数的元素之和

  // dp[i][j] 表示在数组 nums 的前 i 个数中选取元素，使得这些元素之和等于 j 的方案数
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(neg + 1).fill(0)
  );

  // 空子集的和为0，方案数为1
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      // 不选择当前数字
      dp[i][j] = dp[i - 1][j];
      // 选择当前数字（如果j >= num）
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  return dp[n][neg];
};

/**
 * 一维动态规划解法（空间优化）
 * 核心思想：使用滚动数组优化空间复杂度
 */
var findTargetSumWays = function (nums: number[], target: number): number {
  const sum = nums.reduce((acc, i) => acc + i, 0);
  const diff = sum - target;

  if (diff < 0 || diff % 2) {
    return 0;
  }

  const n = nums.length;
  const neg = diff / 2;

  // 只保存一维数组，dp[j]表示和为j的方案数
  const dp: number[] = new Array(neg + 1).fill(0);

  // 空子集的和为0
  dp[0] = 1;

  // 对每个数字进行0-1背包
  for (const num of nums) {
    // 从后往前遍历，避免重复计算
    for (let j = neg; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[neg];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在数组中的每个数字前添加+或-号，使表达式结果等于target
   - 求所有可能的表达式数量
   - 本质上是寻找和为特定值的子集数量

2. 算法分析：
   - 回溯：时间复杂度O(2^n)，空间复杂度O(n)
   - 动态规划：时间复杂度O(n*sum)，空间复杂度O(n*sum)或O(sum)
   - 算法类型：回溯、动态规划（0-1背包）

3. 实现要点：
   - 问题转化：设正数和为pos，负数和为neg，则pos - neg = target，pos + neg = sum
   - 解得：neg = (sum - target) / 2，pos = (sum + target) / 2
   - 转化为0-1背包：选择一些数字使其和为neg
   - 状态定义：dp[i][j]表示前i个数字中和为j的方案数

4. 优化思路：
   - 空间优化：使用一维数组代替二维数组
   - 提前返回：当diff < 0或diff为奇数时直接返回0
   - 滚动数组：从后往前遍历避免重复计算

5. 边界情况：
   - 空数组的处理
   - target超出可能范围的情况
   - sum - target为奇数的情况

6. 类似问题：
   - 0-1背包问题
   - 子集和问题
   - 分割等和子集

7. 关键洞察：
   - 问题可以转化为寻找和为特定值的子集数量
   - 使用0-1背包的动态规划解法
   - 可以通过数学推导简化问题

8. 示例分析：
   nums=[1,1,1,1,1], target=3
   - sum=5, diff=2, neg=1
   - 需要选择一些数字使其和为1
   - 有5种选择方式：选择任意一个1

9. 复杂度对比：
   - 回溯：适合小规模数据，思路直观
   - 动态规划：适合大规模数据，效率更高
   - 空间优化：在动态规划基础上进一步优化空间
*/
