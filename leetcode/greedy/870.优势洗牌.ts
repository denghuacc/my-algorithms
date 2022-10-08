/*
 * @lc app=leetcode.cn id=870 lang=typescript
 *
 * [870] 优势洗牌
 *
 * https://leetcode.cn/problems/advantage-shuffle/description/
 *
 * algorithms
 * Medium (47.67%)
 * Likes:    257
 * Dislikes: 0
 * Total Accepted:    38K
 * Total Submissions: 78.2K
 * Testcase Example:  '[2,7,11,15]\n[1,10,4,11]'
 *
 * 给定两个大小相等的数组 nums1 和 nums2，nums1 相对于 nums 的优势可以用满足 nums1[i] > nums2[i] 的索引 i
 * 的数目来描述。
 *
 * 返回 nums1 的任意排列，使其相对于 nums2 的优势最大化。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [2,7,11,15], nums2 = [1,10,4,11]
 * 输出：[2,11,7,15]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [12,24,8,32], nums2 = [13,25,32,11]
 * 输出：[24,32,8,12]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length <= 10^5
 * nums2.length == nums1.length
 * 0 <= nums1[i], nums2[i] <= 10^9
 *
 *
 */

// @lc code=start
// greedy
function advantageCount(nums1: number[], nums2: number[]): number[] {
  const n = nums1.length;
  const indexes = new Array(n).fill(0).map((_, idx) => idx);
  nums1.sort((a, b) => a - b);
  indexes.sort((i, j) => nums2[i] - nums2[j]);
  let left = 0;
  let right = n - 1;
  for (const num of nums1) {
    if (num > nums2[indexes[left]]) {
      nums2[indexes[left]] = num;
      left++;
    } else {
      nums2[indexes[right]] = num;
      right--;
    }
  }
  return nums2;
}
// @lc code=end
