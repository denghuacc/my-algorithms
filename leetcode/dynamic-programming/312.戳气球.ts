/*
 * @lc app=leetcode.cn id=312 lang=typescript
 *
 * [312] 戳气球
 *
 * https://leetcode-cn.com/problems/burst-balloons/description/
 *
 * algorithms
 * Hard (49.10%)
 * Likes:    340
 * Dislikes: 0
 * Total Accepted:    14.4K
 * Total Submissions: 23.6K
 * Testcase Example:  '[3,1,5,8]'
 *
 * 有 n 个气球，编号为0 到 n-1，每个气球上都标有一个数字，这些数字存在数组 nums 中。
 *
 * 现在要求你戳破所有的气球。每当你戳破一个气球 i 时，你可以获得 nums[left] * nums[i] * nums[right] 个硬币。 这里的
 * left 和 right 代表和 i 相邻的两个气球的序号。注意当你戳破了气球 i 后，气球 left 和气球 right 就变成了相邻的气球。
 *
 * 求所能获得硬币的最大数量。
 *
 * 说明:
 *
 *
 * 你可以假设 nums[-1] = nums[n] = 1，但注意它们不是真实存在的所以并不能被戳破。
 * 0 ≤ n ≤ 500, 0 ≤ nums[i] ≤ 100
 *
 *
 * 示例:
 *
 * 输入: [3,1,5,8]
 * 输出: 167
 * 解释: nums = [3,1,5,8] --> [3,5,8] -->   [3,8]   -->  [8]  --> []
 * coins =  3*1*5      +  3*5*8    +  1*3*8      + 1*8*1   = 167
 *
 *
 */

// @lc code=start
// dp1 自底向上
var maxCoins = function (nums: number[]): number {
  const n = nums.length;

  const newNums = new Array(n + 2).fill(0);
  newNums[0] = newNums[n + 1] = 1; // 两侧虚拟气球数字
  for (let i = 1; i <= n; i++) {
    newNums[i] = nums[i - 1];
  }

  // dp[i][j] -> nums[i:j] 区间获得硬币的最大数量
  const dp: number[][] = Array.from(new Array(n + 2), () =>
    new Array(n + 2).fill(0)
  );

  // 从下到上
  for (let i = n; i >= 0; i--) {
    // 从左到右
    for (let j = i + 1; j < n + 2; j++) {
      // 最后戳破的气球是哪个？ k
      for (let k = i + 1; k < j; k++) {
        // 择优做选择
        dp[i][j] = Math.max(
          dp[i][j],
          dp[i][k] + dp[k][j] + newNums[i] * newNums[k] * newNums[j]
        );
      }
    }
  }
  return dp[0][n + 1];
};

// dp2 自顶向下
var maxCoins = function (nums: number[]): number {
  const n = nums.length;

  const newNums = new Array<number>(n + 2).fill(0);
  newNums[0] = newNums[n + 1] = 1; // 两侧虚拟气球数字
  for (let i = 1; i <= n; i++) {
    newNums[i] = nums[i - 1];
  }

  const memo: number[][] = Array.from(new Array(n + 2), () =>
    new Array(n + 2).fill(0)
  );

  return dpf(memo, newNums, 0, n + 1);

  function dpf(memo: number[][], nums: number[], left: number, right: number) {
    if (left + 1 === right) return 0;
    if (memo[left][right] > 0) return memo[left][right];
    let ret = 0;
    for (let i = left + 1; i < right; i++) {
      ret = Math.max(
        ret,
        nums[left] * nums[i] * nums[right] +
          dpf(memo, nums, left, i) +
          dpf(memo, nums, i, right)
      );
    }
    memo[left][right] = ret;
    return ret;
  }
};
// @lc code=end
