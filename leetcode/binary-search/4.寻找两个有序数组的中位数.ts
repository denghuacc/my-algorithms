/*
 * @lc app=leetcode.cn id=4 lang=typescript
 *
 * [4] 寻找两个有序数组的中位数
 *
 * https://leetcode-cn.com/problems/median-of-two-sorted-arrays/description/
 *
 * algorithms
 * Hard (33.27%)
 * Likes:    2388
 * Dislikes: 0
 * Total Accepted:    167.9K
 * Total Submissions: 451.3K
 * Testcase Example:  '[1,3]\n[2]'
 *
 * 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2。
 *
 * 请你找出这两个有序数组的中位数，并且要求算法的时间复杂度为 O(log(m + n))。
 *
 * 你可以假设 nums1 和 nums2 不会同时为空。
 *
 * 示例 1:
 *
 * nums1 = [1, 3]
 * nums2 = [2]
 *
 * 则中位数是 2.0
 *
 *
 * 示例 2:
 *
 * nums1 = [1, 2]
 * nums2 = [3, 4]
 *
 * 则中位数是 (2 + 3)/2 = 2.5
 *
 *
 */

// @lc code=start
// binary search
var findMedianSortedArrays = function (
  nums1: number[],
  nums2: number[]
): number {
  const len1 = nums1.length;
  const len2 = nums2.length;
  const mid = (len1 + len2) >> 1;
  let i = 0;
  let j = 0;
  let cur: number;
  let n1: number = 0;
  let n2: number = 0;
  while (i < len1 || j < len2) {
    if (j === len2 || nums1[i] < nums2[j]) {
      cur = nums1[i];
      i++;
    } else {
      cur = nums2[j];
      j++;
    }
    if (i + j === mid) {
      n1 = cur;
    }
    if (i + j === mid + 1) {
      n2 = cur;
      break;
    }
  }
  return (len1 + len2) % 2 === 0 ? Math.floor((n1 + n2) / 2) : n2;
};
// @lc code=end
