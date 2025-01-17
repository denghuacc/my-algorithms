/*
 * @lc app=leetcode.cn id=3097 lang=typescript
 *
 * [3097] 或值至少为 K 的最短子数组 II
 *
 * https://leetcode.cn/problems/shortest-subarray-with-or-at-least-k-ii/description/
 *
 * algorithms
 * Medium (37.85%)
 * Likes:    37
 * Dislikes: 0
 * Total Accepted:    12.5K
 * Total Submissions: 24.9K
 * Testcase Example:  '[1,2,3]\n2'
 *
 * 给你一个 非负 整数数组 nums 和一个整数 k 。
 *
 * 如果一个数组中所有元素的按位或运算 OR 的值 至少 为 k ，那么我们称这个数组是 特别的 。
 *
 * 请你返回 nums 中 最短特别非空 子数组的长度，如果特别子数组不存在，那么返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3], k = 2
 *
 * 输出：1
 *
 * 解释：
 *
 * 子数组 [3] 的按位 OR 值为 3 ，所以我们返回 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2,1,8], k = 10
 *
 * 输出：3
 *
 * 解释：
 *
 * 子数组 [2,1,8] 的按位 OR 值为 11 ，所以我们返回 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2], k = 0
 *
 * 输出：1
 *
 * 解释：
 *
 * 子数组 [1] 的按位 OR 值为 1 ，所以我们返回 1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^5
 * 0 <= nums[i] <= 10^9
 * 0 <= k <= 10^9
 *
 *
 */

export {};

// @lc code=start
function minimumSubarrayLength(nums: number[], k: number): number {
  const n = nums.length;
  const bits = new Array(30).fill(0);
  let res = Infinity;
  let left = 0;
  for (let right = 0; right < n; right++) {
    for (let i = 0; i < 30; i++) {
      bits[i] += (nums[right] >> i) & 1;
    }
    while (left <= right && calc(bits) >= k) {
      res = Math.min(res, right - left + 1);
      for (let i = 0; i < 30; i++) {
        bits[i] -= (nums[left] >> i) & 1;
      }
      left++;
    }
  }
  return res === Infinity ? -1 : res;

  function calc(bits: number[]): number {
    let ans = 0;
    for (let i = 0; i < bits.length; i++) {
      if (bits[i] > 0) {
        ans |= 1 << i;
      }
    }
    return ans;
  }
}
// @lc code=end
