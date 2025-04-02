/*
 * @lc app=leetcode.cn id=2873 lang=typescript
 *
 * [2873] 有序三元组中的最大值 I
 *
 * https://leetcode.cn/problems/maximum-value-of-an-ordered-triplet-i/description/
 *
 * algorithms
 * Easy (54.65%)
 * Likes:    45
 * Dislikes: 0
 * Total Accepted:    19.8K
 * Total Submissions: 33K
 * Testcase Example:  '[12,6,1,2,7]'
 *
 * 给你一个下标从 0 开始的整数数组 nums 。
 *
 * 请你从所有满足 i < j < k 的下标三元组 (i, j, k) 中，找出并返回下标三元组的最大值。如果所有满足条件的三元组的值都是负数，则返回 0
 * 。
 *
 * 下标三元组 (i, j, k) 的值等于 (nums[i] - nums[j]) * nums[k] 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [12,6,1,2,7]
 * 输出：77
 * 解释：下标三元组 (0, 2, 4) 的值是 (nums[0] - nums[2]) * nums[4] = 77 。
 * 可以证明不存在值大于 77 的有序下标三元组。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,10,3,4,19]
 * 输出：133
 * 解释：下标三元组 (1, 2, 4) 的值是 (nums[1] - nums[2]) * nums[4] = 133 。
 * 可以证明不存在值大于 133 的有序下标三元组。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：0
 * 解释：唯一的下标三元组 (0, 1, 2) 的值是一个负数，(nums[0] - nums[1]) * nums[2] = -3 。因此，答案是 0
 * 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= nums.length <= 100
 * 1 <= nums[i] <= 10^6
 *
 *
 */

// @lc code=start
// O(n^2)
var maximumTripletValue = function (nums: number[]): number {
  const n = nums.length;
  let res = 0;
  for (let k = 2; k < n; k++) {
    let maxVal = 0;
    for (let j = 1; j < k; j++) {
      res = Math.max(res, (maxVal - nums[j]) * nums[k]);
      maxVal = Math.max(maxVal, nums[j]);
    }
  }
  return res;
};

// O(n)
var maximumTripletValue = function (nums: number[]): number {
  const n = nums.length;
  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    leftMax[i] = Math.max(leftMax[i - 1], nums[i - 1]);
    rightMax[n - i - 1] = Math.max(rightMax[n - i], nums[n - i]);
  }
  let res = 0;
  for (let i = 1; i < n - 1; i++) {
    res = Math.max(res, (leftMax[i] - nums[i]) * rightMax[i]);
  }
  return res;
};

// O(n)
var maximumTripletValue = function (nums: number[]): number {
  const n = nums.length;
  let res = 0;
  let maxIVal = 0;
  let maxDiff = 0;
  for (let k = 0; k < n; k++) {
    res = Math.max(res, maxDiff * nums[k]);
    maxDiff = Math.max(maxDiff, maxIVal - nums[k]);
    maxIVal = Math.max(maxIVal, nums[k]);
  }
  return res;
};
// @lc code=end
