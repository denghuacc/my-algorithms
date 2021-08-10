/*
 * @lc app=leetcode.cn id=413 lang=typescript
 *
 * [413] 等差数列划分
 *
 * https://leetcode-cn.com/problems/arithmetic-slices/description/
 *
 * algorithms
 * Medium (66.53%)
 * Likes:    286
 * Dislikes: 0
 * Total Accepted:    44.2K
 * Total Submissions: 65.4K
 * Testcase Example:  '[1,2,3,4]'
 *
 * 如果一个数列 至少有三个元素 ，并且任意两个相邻元素之差相同，则称该数列为等差数列。
 *
 *
 * 例如，[1,3,5,7,9]、[7,7,7,7] 和 [3,-1,-5,-9] 都是等差数列。
 *
 *
 *
 *
 * 给你一个整数数组 nums ，返回数组 nums 中所有为等差数组的 子数组 个数。
 *
 * 子数组 是数组中的一个连续序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,4]
 * 输出：3
 * 解释：nums 中有三个子等差数组：[1, 2, 3]、[2, 3, 4] 和 [1,2,3,4] 自身。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * -1000
 *
 *
 *
 *
 */

// @lc code=start
// array
function numberOfArithmeticSlices(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return 0;
  }
  let d = nums[0] - nums[1];
  let t = 0;
  let ret = 0;

  for (let i = 2; i < n; i++) {
    if (nums[i - 1] - nums[i] === d) {
      t++;
    } else {
      d = nums[i - 1] - nums[i];
      t = 0;
    }
    ret += t;
  }
  return ret;
}
// @lc code=end
