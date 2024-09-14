/*
 * @lc app=leetcode.cn id=33 lang=typescript
 *
 * [33] 搜索旋转排序数组
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array/description/
 *
 * algorithms
 * Medium (35.32%)
 * Likes:    733
 * Dislikes: 0
 * Total Accepted:    123.3K
 * Total Submissions: 325.2K
 * Testcase Example:  '[4,5,6,7,0,1,2]\n0'
 *
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 *
 * ( 例如，数组 [0,1,2,4,5,6,7] 可能变为 [4,5,6,7,0,1,2] )。
 *
 * 搜索一个给定的目标值，如果数组中存在这个目标值，则返回它的索引，否则返回 -1 。
 *
 * 你可以假设数组中不存在重复的元素。
 *
 * 你的算法时间复杂度必须是 O(log n) 级别。
 *
 * 示例 1:
 *
 * 输入: nums = [4,5,6,7,0,1,2], target = 0
 * 输出: 4
 *
 *
 * 示例 2:
 *
 * 输入: nums = [4,5,6,7,0,1,2], target = 3
 * 输出: -1
 *
 */

export {};

// @lc code=start
// binary search
var search = function (nums: number[], target: number): number {
  const n = nums.length;
  if (!n) return -1;
  if (n === 1) return nums[0] === target ? 0 : -1;
  let left = 0;
  let right = n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // 有序数组
    if (nums[0] <= nums[mid]) {
      // 在范围内
      if (nums[0] <= target && target < nums[mid]) {
        // 移动 mid 缩小范围
        right = mid - 1;
      } else {
        // 在无序的另一半
        left = mid + 1;
      }
    } else {
      // 在范围内
      if (nums[mid] < target && target <= nums[n - 1]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }

  return -1;
};
// @lc code=end
