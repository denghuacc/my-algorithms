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
// dp 自顶向下 timeout
var rob = function (nums: number[]): number {
  const n = nums.length;
  const memo: number[] = new Array(n).fill(-1);
  return dp(nums, 0);

  function dp(nums: number[], start: number): number {
    const n = nums.length;
    if (start >= n) return 0;
    if (memo[start] !== -1) return memo[start];

    let ret = Math.max(dp(nums, start + 1), nums[start] + dp(nums, start + 2));

    memo[start] = ret;
    return ret;
  }
};

// dp 自底向上
var rob = function (nums: number[]): number {
  const n = nums.length;
  const dp: number[] = new Array(n + 2).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2]);
  }

  return dp[0];
};

// dp 自底向上 空间复杂度 O(1)
var rob = function (nums: number[]): number {
  const n = nums.length;
  let dpI1 = 0; // dp[i+1]
  let dpI2 = 0; // dp[i+2]
  let dpI = 0; // dp[i]

  for (let i = n - 1; i >= 0; i--) {
    dpI = Math.max(dpI1, nums[i] + dpI2);
    dpI2 = dpI1;
    dpI1 = dpI;
  }

  return dpI;
};
// @lc code=end
