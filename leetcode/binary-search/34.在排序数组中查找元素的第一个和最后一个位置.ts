/*
 * @lc app=leetcode.cn id=34 lang=typescript
 *
 * [34] 在排序数组中查找元素的第一个和最后一个位置
 *
 * https://leetcode-cn.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/
 *
 * algorithms
 * Medium (34.73%)
 * Likes:    404
 * Dislikes: 0
 * Total Accepted:    85.3K
 * Total Submissions: 216.6K
 * Testcase Example:  '[5,7,7,8,8,10]\n8'
 *
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。
 *
 * 你的算法时间复杂度必须是 O(log n) 级别。
 *
 * 如果数组中不存在目标值，返回 [-1, -1]。
 *
 * 示例 1:
 *
 * 输入: nums = [5,7,7,8,8,10], target = 8
 * 输出: [3,4]
 *
 * 示例 2:
 *
 * 输入: nums = [5,7,7,8,8,10], target = 6
 * 输出: [-1,-1]
 *
 */

// @lc code=start
// binary search
var searchRange = function (nums: number[], target: number): number[] {
  let ret = [-1, -1];
  const leftIdx = binarySearch(nums, target, true);
  const rightIdx = binarySearch(nums, target, false) - 1;

  if (
    leftIdx <= rightIdx &&
    rightIdx < nums.length &&
    nums[leftIdx] === target &&
    nums[rightIdx] === target
  ) {
    ret = [leftIdx, rightIdx];
  }
  return ret;

  function binarySearch(nums: number[], target: number, isLow: boolean) {
    let left = 0;
    let right = nums.length - 1;
    let ret = nums.length;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (nums[mid] > target || (isLow && nums[mid] >= target)) {
        right = mid - 1;
        ret = mid;
      } else {
        left = mid + 1;
      }
    }

    return ret;
  }
};

var searchRange = function (nums: number[], target: number): number[] {
  const n = nums.length;
  let l = 0;
  let r = n - 1;
  while (l <= r) {
    let m = Math.floor((r - l) / 2) + l;
    if (nums[m] === target) {
      let first = m;
      let last = m;
      // 向左扩展
      while (nums[first - 1] === nums[first]) {
        first--;
      }
      // 向右扩展
      while (nums[last + 1] === nums[last]) {
        last++;
      }
      return [first, last];
    } else if (nums[m] < target) {
      l = m + 1;
    } else {
      r = m - 1;
    }
  }
  return [-1, -1];
};
// @lc code=end
