/*
 * @lc app=leetcode.cn id=81 lang=typescript
 *
 * [81] 搜索旋转排序数组 II
 *
 * https://leetcode-cn.com/problems/search-in-rotated-sorted-array-ii/description/
 *
 * algorithms
 * Medium (32.06%)
 * Likes:    177
 * Dislikes: 0
 * Total Accepted:    30.9K
 * Total Submissions: 86.5K
 * Testcase Example:  '[2,5,6,0,0,1,2]\n0'
 *
 * 假设按照升序排序的数组在预先未知的某个点上进行了旋转。
 *
 * ( 例如，数组 [0,0,1,2,2,5,6] 可能变为 [2,5,6,0,0,1,2] )。
 *
 * 编写一个函数来判断给定的目标值是否存在于数组中。若存在返回 true，否则返回 false。
 *
 * 示例 1:
 *
 * 输入: nums = [2,5,6,0,0,1,2], target = 0
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: nums = [2,5,6,0,0,1,2], target = 3
 * 输出: false
 *
 * 进阶:
 *
 *
 * 这是 搜索旋转排序数组 的延伸题目，本题中的 nums  可能包含重复元素。
 * 这会影响到程序的时间复杂度吗？会有怎样的影响，为什么？
 *
 *
 */

// @lc code=start
// binary search
var search = function (nums: number[], target: number): boolean {
  const n = nums.length;
  if (n === 0) return false;

  let start = 0;
  let end = nums.length - 1;
  let mid: number;

  while (start <= end) {
    mid = start + Math.floor((end - start) / 2);
    if (nums[mid] === target) return true;

    // 分不清前面和后面，left++
    if (nums[start] === nums[mid]) {
      start++;
      continue;
    }

    // 前半部分有序
    if (nums[start] < nums[mid]) {
      // target 在前半部分
      if (nums[mid] > target && nums[start] <= target) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    // 后半部分有序
    else {
      // target 在后半部分
      if (nums[mid] < target && nums[end] >= target) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
  }

  return false;
};
// @lc code=end
