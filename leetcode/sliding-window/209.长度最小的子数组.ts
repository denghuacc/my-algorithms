/*
 * @lc app=leetcode.cn id=209 lang=typescript
 *
 * [209] 长度最小的子数组
 *
 * https://leetcode-cn.com/problems/minimum-size-subarray-sum/description/
 *
 * algorithms
 * Medium (36.60%)
 * Likes:    330
 * Dislikes: 0
 * Total Accepted:    54.7K
 * Total Submissions: 126K
 * Testcase Example:  '7\n[2,3,1,2,4,3]'
 *
 * 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s
 * 的长度最小的连续子数组，并返回其长度。如果不存在符合条件的连续子数组，返回 0。
 *
 * 示例:
 *
 * 输入: s = 7, nums = [2,3,1,2,4,3]
 * 输出: 2
 * 解释: 子数组 [4,3] 是该条件下的长度最小的连续子数组。
 *
 *
 * 进阶:
 *
 * 如果你已经完成了O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
 *
 */

// @lc code=start
// brute force
var minSubArrayLen = function (s: number, nums: number[]): number {
  const n = nums.length;
  let res = Infinity;

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      if (sum >= s) {
        res = Math.min(res, j - i + 1);
        break;
      }
    }
  }

  return res === Infinity ? 0 : res;
};

// sliding window
var minSubArrayLen = function (s: number, nums: number[]): number {
  const n = nums.length;
  let res = Infinity;
  let left = 0;
  let right = 0;
  let sum = 0;

  while (right < n) {
    sum += nums[right];
    while (sum >= s) {
      res = Math.min(res, right - left + 1);
      sum -= nums[left];
      left++;
    }
    right++;
  }

  return res === Infinity ? 0 : res;
};
// @lc code=end
