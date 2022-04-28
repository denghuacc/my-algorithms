/*
 * @lc app=leetcode.cn id=905 lang=typescript
 *
 * [905] 按奇偶排序数组
 *
 * https://leetcode-cn.com/problems/sort-array-by-parity/description/
 *
 * algorithms
 * Easy (69.98%)
 * Likes:    262
 * Dislikes: 0
 * Total Accepted:    76K
 * Total Submissions: 107.6K
 * Testcase Example:  '[3,1,2,4]'
 *
 * 给你一个整数数组 nums，将 nums 中的的所有偶数元素移动到数组的前面，后跟所有奇数元素。
 *
 * 返回满足此条件的 任一数组 作为答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [3,1,2,4]
 * 输出：[2,4,3,1]
 * 解释：[4,2,3,1]、[2,4,1,3] 和 [4,2,1,3] 也会被视作正确答案。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [0]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5000
 * 0 <= nums[i] <= 5000
 *
 *
 */

// @lc code=start
// two pointers
function sortArrayByParity(nums: number[]): number[] {
  let i = 0;
  let j = nums.length - 1;
  while (i < j) {
    if (nums[i] % 2 === 0) {
      i++;
    } else if (nums[j] % 2 === 1) {
      j--;
    } else {
      [nums[i], nums[j]] = [nums[j], nums[i]];
      i++;
      j--;
    }
  }
  return nums;
}
// @lc code=end
