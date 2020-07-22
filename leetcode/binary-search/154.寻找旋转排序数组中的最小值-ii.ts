/*
 * @lc app=leetcode.cn id=154 lang=typescript
 *
 * [154] 寻找旋转排序数组中的最小值 II
 *
 * https://leetcode-cn.com/problems/find-minimum-in-rotated-sorted-array-ii/description/
 *
 * algorithms
 * Hard (45.04%)
 * Likes:    100
 * Dislikes: 0
 * Total Accepted:    20.1K
 * Total Submissions: 41.7K
 * Testcase Example:  '[1,3,5]'
 *
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 *
 * ( 例如，数组 [0,1,2,4,5,6,7]  可能变为 [4,5,6,7,0,1,2] )。
 *
 * 请找出其中最小的元素。
 *
 * 注意数组中可能存在重复的元素。
 *
 * 示例 1：
 *
 * 输入: [1,3,5]
 * 输出: 1
 *
 * 示例 2：
 *
 * 输入: [2,2,2,0,1]
 * 输出: 0
 *
 * 说明：
 *
 *
 * 这道题是 寻找旋转排序数组中的最小值 的延伸题目。
 * 允许重复会影响算法的时间复杂度吗？会如何影响，为什么？
 *
 *
 */

// @lc code=start
// array
var findMin = function (nums: number[]): number {
  let min = nums[0];
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] < nums[i - 1]) {
      min = Math.min(min, nums[i]);
    }
  }

  return min;
};

// binary search
var findMin = function (nums: number[]): number {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let mid = left + Math.floor((right - left) / 2);

    // 最小值在左边
    if (nums[mid] < nums[right]) {
      right = mid;
    }
    // 最小值在右边
    else if (nums[mid] > nums[right]) {
      left = mid + 1;
    }
    // 可能存在重复元素
    else if (nums[mid] === nums[right]) {
      right--;
    }
  }

  return nums[left];
};
// @lc code=end
