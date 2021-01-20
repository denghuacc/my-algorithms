/*
 * @lc app=leetcode.cn id=628 lang=typescript
 *
 * [628] 三个数的最大乘积
 *
 * https://leetcode-cn.com/problems/maximum-product-of-three-numbers/description/
 *
 * algorithms
 * Easy (49.97%)
 * Likes:    221
 * Dislikes: 0
 * Total Accepted:    40.8K
 * Total Submissions: 80.5K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个整型数组，在数组中找出由三个数组成的最大乘积，并输出这个乘积。
 *
 * 示例 1:
 *
 *
 * 输入: [1,2,3]
 * 输出: 6
 *
 *
 * 示例 2:
 *
 *
 * 输入: [1,2,3,4]
 * 输出: 24
 *
 *
 * 注意:
 *
 *
 * 给定的整型数组长度范围是[3,10^4]，数组中所有的元素范围是[-1000, 1000]。
 * 输入的数组中任意三个数的乘积不会超出32位有符号整数的范围。
 *
 *
 */

// @lc code=start
// sort
var maximumProduct = function (nums: number[]): number {
  const n = nums.length;
  nums.sort((a, b) => a - b); // sort
  return Math.max(
    nums[n - 1] * nums[n - 2] * nums[n - 3],
    nums[0] * nums[1] * nums[n - 1]
  );
};

// one traverse
var maximumProduct = function (nums: number[]): number {
  // 最小的和第二小的
  let min1 = Infinity;
  let min2 = Infinity;

  // 最大的、第二大的和第三大的
  let max1 = -Infinity;
  let max2 = -Infinity;
  let max3 = -Infinity;

  for (const x of nums) {
    if (x < min1) {
      min2 = min1;
      min1 = x;
    } else if (x < min2) {
      min2 = x;
    }

    if (x > max1) {
      max3 = max2;
      max2 = max1;
      max1 = x;
    } else if (x > max2) {
      max3 = max2;
      max2 = x;
    } else if (x > max3) {
      max3 = x;
    }
  }

  return Math.max(min1 * min2 * max1, max1 * max2 * max3);
};
// @lc code=end
