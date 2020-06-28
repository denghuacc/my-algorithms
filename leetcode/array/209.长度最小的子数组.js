/*
 * @lc app=leetcode.cn id=209 lang=javascript
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
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 * 暴力法
 */
var minSubArrayLen = function (s, nums) {
  let n = nums.length;
  if (n === 0) return 0;
  let ret = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      if (sum >= s) {
        ret = Math.min(ret, j - i + 1);
        break;
      }
    }
  }

  return ret === Number.MAX_SAFE_INTEGER ? 0 : ret;
};

// double pointer
var minSubArrayLen = function (s, nums) {
  let n = nums.length;
  if (n === 0) return 0;
  let ret = Number.MAX_SAFE_INTEGER;

  let start = 0;
  let end = 0;
  let sum = 0;

  while (end < n) {
    sum += nums[end];
    while (sum >= s) {
      ret = Math.min(ret, end - start + 1);
      sum -= nums[start];
      start++;
    }
    end++;
  }

  return ret === Number.MAX_SAFE_INTEGER ? 0 : ret;
};
// @lc code=end
