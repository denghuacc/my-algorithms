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
// backtracking
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
      if (sum === target) {
        count++;
      }
    } else {
      backtrack(nums, target, index + 1, sum + nums[index]);
      backtrack(nums, target, index + 1, sum - nums[index]);
    }
  }
};

// dp
var findTargetSumWays = function (nums: number[], target: number): number {
  const sum = nums.reduce((acc, i) => acc + i, 0);
  const diff = sum - target;
  if (diff < 0 || diff % 2) {
    return 0;
  }
  const n = nums.length;
  const neg = diff / 2;

  // dp[i][j] -> 表示在数组 nums 的前 i 个数中选取元素，使得这些元素之和等于 j 的方案数。
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(neg + 1).fill(0)
  );
  dp[0][0] = 1;
  for (let i = 1; i <= n; i++) {
    const num = nums[i - 1];
    for (let j = 0; j <= neg; j++) {
      dp[i][j] = dp[i - 1][j];
      if (j >= num) {
        dp[i][j] += dp[i - 1][j - num];
      }
    }
  }
  return dp[n][neg];
};

// dp2
var findTargetSumWays = function (nums: number[], target: number): number {
  const sum = nums.reduce((acc, i) => acc + i, 0);
  const diff = sum - target;
  if (diff < 0 || diff % 2) {
    return 0;
  }
  const n = nums.length;
  const neg = diff / 2;

  const dp: number[] = new Array(neg + 1).fill(0);

  dp[0] = 1;
  for (const num of nums) {
    for (let j = neg; j >= num; j--) {
      dp[j] += dp[j - num];
    }
  }

  return dp[neg];
};
// @lc code=end
