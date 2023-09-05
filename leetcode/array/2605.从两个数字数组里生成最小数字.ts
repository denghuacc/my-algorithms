/*
 * @lc app=leetcode.cn id=2605 lang=typescript
 *
 * [2605] 从两个数字数组里生成最小数字
 *
 * https://leetcode.cn/problems/form-smallest-number-from-two-digit-arrays/description/
 *
 * algorithms
 * Easy (62.50%)
 * Likes:    39
 * Dislikes: 0
 * Total Accepted:    14.2K
 * Total Submissions: 20.7K
 * Testcase Example:  '[4,1,3]\n[5,7]'
 *
 * 给你两个只包含 1 到 9 之间数字的数组 nums1 和 nums2 ，每个数组中的元素 互不相同 ，请你返回 最小 的数字，两个数组都 至少
 * 包含这个数字的某个数位。
 *
 *
 * 示例 1：
 *
 * 输入：nums1 = [4,1,3], nums2 = [5,7]
 * 输出：15
 * 解释：数字 15 的数位 1 在 nums1 中出现，数位 5 在 nums2 中出现。15 是我们能得到的最小数字。
 *
 *
 * 示例 2：
 *
 * 输入：nums1 = [3,5,2,6], nums2 = [3,1,7]
 * 输出：3
 * 解释：数字 3 的数位 3 在两个数组中都出现了。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length <= 9
 * 1 <= nums1[i], nums2[i] <= 9
 * 每个数组中，元素 互不相同 。
 *
 *
 */

// @lc code=start
function minNumber(nums1: number[], nums2: number[]): number {
  let min1 = 10;
  let min2 = 10;
  let min = 10;
  const set1 = new Set();
  for (const num of nums1) {
    min1 = Math.min(min1, num);
    set1.add(num);
  }
  for (const num of nums2) {
    min2 = Math.min(min2, num);
    if (set1.has(num)) {
      min = Math.min(min, num);
    }
  }
  if (min !== 10) {
    return min;
  } else {
    return Math.min(min1 * 10 + min2, min2 * 10 + min1);
  }
}
// @lc code=end
