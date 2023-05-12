/*
 * @lc app=leetcode.cn id=1330 lang=typescript
 *
 * [1330] 翻转子数组得到最大的数组值
 *
 * https://leetcode.cn/problems/reverse-subarray-to-maximize-array-value/description/
 *
 * algorithms
 * Hard (42.36%)
 * Likes:    106
 * Dislikes: 0
 * Total Accepted:    4.7K
 * Total Submissions: 8.9K
 * Testcase Example:  '[2,3,1,5,4]'
 *
 * 给你一个整数数组 nums 。「数组值」定义为所有满足 0 <= i < nums.length-1 的 |nums[i]-nums[i+1]|
 * 的和。
 *
 * 你可以选择给定数组的任意子数组，并将该子数组翻转。但你只能执行这个操作 一次 。
 *
 * 请你找到可行的最大 数组值 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [2,3,1,5,4]
 * 输出：10
 * 解释：通过翻转子数组 [3,1,5] ，数组变成 [2,5,1,3,4] ，数组值为 10 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [2,4,9,24,2,1,10]
 * 输出：68
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 3*10^4
 * -10^5 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
// cv
function maxValueAfterReverse(nums: number[]): number {
  let value = 0;
  const n = nums.length;
  for (let i = 0; i < n - 1; i++) {
    value += Math.abs(nums[i] - nums[i + 1]);
  }
  let mx1 = 0;
  for (let i = 1; i < n - 1; i++) {
    mx1 = Math.max(
      mx1,
      Math.abs(nums[0] - nums[i + 1]) - Math.abs(nums[i] - nums[i + 1])
    );
    mx1 = Math.max(
      mx1,
      Math.abs(nums[n - 1] - nums[i - 1]) - Math.abs(nums[i] - nums[i - 1])
    );
  }
  let mx2 = -Infinity;
  let mn2 = Infinity;
  for (let i = 0; i < n - 1; i++) {
    const x = nums[i];
    const y = nums[i + 1];
    mx2 = Math.max(mx2, Math.min(x, y));
    mn2 = Math.min(mn2, Math.max(x, y));
  }
  return value + Math.max(mx1, 2 * (mx2 - mn2));
}
// @lc code=end
