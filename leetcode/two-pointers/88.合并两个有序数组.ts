/*
 * @lc app=leetcode.cn id=88 lang=typescript
 *
 * [88] 合并两个有序数组
 *
 * https://leetcode-cn.com/problems/merge-sorted-array/description/
 *
 * algorithms
 * Easy (42.26%)
 * Likes:    463
 * Dislikes: 0
 * Total Accepted:    131.3K
 * Total Submissions: 278.2K
 * Testcase Example:  '[1,2,3,0,0,0]\n3\n[2,5,6]\n3'
 *
 * 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。
 *
 *
 *
 * 说明:
 *
 *
 * 初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
 * 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 *
 *
 *
 *
 * 示例:
 *
 * 输入:
 * nums1 = [1,2,3,0,0,0], m = 3
 * nums2 = [2,5,6],       n = 3
 *
 * 输出: [1,2,2,3,5,6]
 *
 */

export {};

// @lc code=start
/**
 Do not return anything, modify nums1 in-place instead.
 */
// API
var merge = function (nums1: number[], m: number, nums2: number[], n: number) {
  nums1.splice(m, n, ...nums2);
  nums1.sort((a, b) => a - b);
};

// two pointers
var merge = function (nums1: number[], m: number, nums2: number[], n: number) {
  let p1 = 0;
  let p2 = 0;
  const sorted: number[] = [];

  while (p1 < m || p2 < n) {
    if (p1 === m) {
      sorted.push(nums2[p2++]);
    } else if (p2 === n) {
      sorted.push(nums1[p1++]);
    } else if (nums1[p1] < nums2[p2]) {
      sorted.push(nums1[p1++]);
    } else {
      sorted.push(nums2[p2++]);
    }
  }

  for (let p1 = 0; p1 < m + n; p1++) {
    nums1[p1] = sorted[p1];
  }
};
// @lc code=end
