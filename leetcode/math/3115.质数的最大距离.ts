/*
 * @lc app=leetcode.cn id=3115 lang=typescript
 *
 * [3115] 质数的最大距离
 *
 * https://leetcode.cn/problems/maximum-prime-difference/description/
 *
 * algorithms
 * Medium (57.75%)
 * Likes:    13
 * Dislikes: 0
 * Total Accepted:    11.9K
 * Total Submissions: 18.9K
 * Testcase Example:  '[4,2,9,5,3]'
 *
 * 给你一个整数数组 nums。
 *
 * 返回两个（不一定不同的）质数在 nums 中 下标 的 最大距离。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： nums = [4,2,9,5,3]
 *
 * 输出： 3
 *
 * 解释： nums[1]、nums[3] 和 nums[4] 是质数。因此答案是 |4 - 1| = 3。
 *
 *
 * 示例 2：
 *
 *
 * 输入： nums = [4,8,2,8]
 *
 * 输出： 0
 *
 * 解释： nums[2] 是质数。因为只有一个质数，所以答案是 |2 - 2| = 0。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 3 * 10^5
 * 1 <= nums[i] <= 100
 * 输入保证 nums 中至少有一个质数。
 *
 *
 */

// @lc code=start
function maximumPrimeDifference(nums: number[]): number {
  const n = nums.length;
  let first = -1;
  let last = -1;

  for (let i = 0; i < n; i++) {
    if (isPrime(nums[i])) {
      if (first === -1) {
        first = i;
      }
      last = i;
    }
  }

  return last - first;

  function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
}
// @lc code=end
