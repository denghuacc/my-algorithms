/*
 * @lc app=leetcode.cn id=31 lang=typescript
 *
 * [31] 下一个排列
 *
 * https://leetcode-cn.com/problems/next-permutation/description/
 *
 * algorithms
 * Medium (29.13%)
 * Likes:    491
 * Dislikes: 0
 * Total Accepted:    61.5K
 * Total Submissions: 183.4K
 * Testcase Example:  '[1,2,3]'
 *
 * 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
 *
 * 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
 *
 * 必须原地修改，只允许使用额外常数空间。
 *
 * 以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
 * 1,2,3 → 1,3,2
 * 3,2,1 → 1,2,3
 * 1,1,5 → 1,5,1
 *
 */

// @lc code=start
/**
 * Do not return anything, modify nums in-place instead.
 */
var nextPermutation = function (nums: number[]) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i + 1] <= nums[i]) i--;

  if (i >= 0) {
    let j = nums.length - 1;
    while (j >= 0 && nums[j] <= nums[i]) j--;
    swap(nums, i, j);
  }

  reverse(nums, i + 1);

  function swap(nums: number[], i: number, j: number) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }

  function reverse(nums: number[], start: number) {
    let i = start;
    let j = nums.length - 1;
    while (i < j) {
      swap(nums, i, j);
      i++;
      j--;
    }
  }
};
// @lc code=end
