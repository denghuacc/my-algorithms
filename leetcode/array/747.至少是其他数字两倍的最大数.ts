/*
 * @lc app=leetcode.cn id=747 lang=typescript
 *
 * [747] 至少是其他数字两倍的最大数
 *
 * https://leetcode-cn.com/problems/largest-number-at-least-twice-of-others/description/
 *
 * algorithms
 * Easy (42.05%)
 * Likes:    114
 * Dislikes: 0
 * Total Accepted:    55.2K
 * Total Submissions: 126.8K
 * Testcase Example:  '[3,6,1,0]'
 *
 * 给你一个整数数组 nums ，其中总是存在 唯一的 一个最大整数 。
 *
 * 请你找出数组中的最大元素并检查它是否 至少是数组中每个其他数字的两倍 。如果是，则返回 最大元素的下标 ，否则返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [3,6,1,0]
 * 输出：1
 * 解释：6 是最大的整数，对于数组中的其他整数，6 大于数组中其他元素的两倍。6 的下标是 1 ，所以返回 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,3,4]
 * 输出：-1
 * 解释：4 没有超过 3 的两倍大，所以返回 -1 。
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1]
 * 输出：0
 * 解释：因为不存在其他数字，所以认为现有数字 1 至少是其他数字的两倍。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * nums 中的最大元素是唯一的
 *
 *
 */

// @lc code=start
function dominantIndex(nums: number[]): number {
  const n = nums.length;
  if (n === 1) {
    return 0;
  }
  let max = -1;
  let maxIndex = -1;
  let secondMax = -1;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (num > max) {
      secondMax = max;
      max = num;
      maxIndex = i;
    } else if (num > secondMax) {
      secondMax = num;
    }
  }
  return max >= 2 * secondMax ? maxIndex : -1;
}
// @lc code=end
