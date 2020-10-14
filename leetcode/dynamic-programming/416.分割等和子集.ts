/*
 * @lc app=leetcode.cn id=416 lang=typescript
 *
 * [416] 分割等和子集
 *
 * https://leetcode-cn.com/problems/partition-equal-subset-sum/description/
 *
 * algorithms
 * Medium (49.32%)
 * Likes:    463
 * Dislikes: 0
 * Total Accepted:    62.1K
 * Total Submissions: 126.1K
 * Testcase Example:  '[1,5,11,5]'
 *
 * 给定一个只包含正整数的非空数组。是否可以将这个数组分割成两个子集，使得两个子集的元素和相等。
 *
 * 注意:
 *
 *
 * 每个数组中的元素不会超过 100
 * 数组的大小不会超过 200
 *
 *
 * 示例 1:
 *
 * 输入: [1, 5, 11, 5]
 *
 * 输出: true
 *
 * 解释: 数组可以分割成 [1, 5, 5] 和 [11].
 *
 *
 *
 *
 * 示例 2:
 *
 * 输入: [1, 2, 3, 5]
 *
 * 输出: false
 *
 * 解释: 数组不能分割成两个元素和相等的子集.
 *
 *
 *
 *
 */

// @lc code=start
// dp
var canPartition = function (nums: number[]): boolean {
  const n = nums.length;
  if (n < 2) return false;
  let sum = 0;
  let maxNum = 0;

  for (const num of nums) {
    sum += num;
    maxNum = Math.max(maxNum, num);
  }

  if (sum & 1) return false;
  const target = Math.floor(sum / 2); // half of sum
  if (maxNum > target) return false;

  // dp[i][j] -> sums[0:i] 是否存在和等于 j
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(target + 1).fill(false)
  );

  for (let i = 0; i < n; i++) {
    dp[i][0] = true;
  }
  dp[0][nums[0]] = true;

  for (let i = 1; i < n; i++) {
    const num = nums[i];
    for (let j = 1; j <= target; j++) {
      if (j >= num) {
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - num];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[n - 1][target];
};
// @lc code=end
