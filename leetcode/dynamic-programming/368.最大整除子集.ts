/*
 * @lc app=leetcode.cn id=368 lang=typescript
 *
 * [368] 最大整除子集
 *
 * https://leetcode-cn.com/problems/largest-divisible-subset/description/
 *
 * algorithms
 * Medium (40.28%)
 * Likes:    239
 * Dislikes: 0
 * Total Accepted:    16.4K
 * Total Submissions: 39.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个由 无重复 正整数组成的集合 nums ，请你找出并返回其中最大的整除子集 answer ，子集中每一元素对 (answer[i],
 * answer[j]) 都应当满足：
 *
 * answer[i] % answer[j] == 0 ，或
 * answer[j] % answer[i] == 0
 *
 *
 * 如果存在多个有效解子集，返回其中任何一个均可。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：[1,2]
 * 解释：[1,3] 也会被视为正确答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,4,8]
 * 输出：[1,2,4,8]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * nums 中的所有整数 互不相同
 *
 *
 */

// @lc code=start
// dp
function largestDivisibleSubset(nums: number[]): number[] {
  const n = nums.length;
  nums.sort((a, b) => a - b);

  const dp = new Array(n).fill(1);
  let maxSize = 1;
  let maxVal = dp[0];

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    if (dp[i] > maxSize) {
      maxSize = dp[i];
      maxVal = nums[i];
    }
  }

  const ret = [];
  if (maxSize === 1) {
    ret.push(nums[0]);
    return ret;
  }

  for (let i = n - 1; i >= 0 && maxSize > 0; i--) {
    if (dp[i] === maxSize && maxVal % nums[i] === 0) {
      ret.push(nums[i]);
      maxVal = nums[i];
      maxSize--;
    }
  }

  return ret;
}
// @lc code=end
