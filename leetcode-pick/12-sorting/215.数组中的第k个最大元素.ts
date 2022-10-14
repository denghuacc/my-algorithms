/*
 * @lc app=leetcode.cn id=215 lang=typescript
 *
 * [215] 数组中的第K个最大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-an-array/description/
 *
 * algorithms
 * Medium (55.92%)
 * Likes:    454
 * Dislikes: 0
 * Total Accepted:    110.3K
 * Total Submissions: 177.6K
 * Testcase Example:  '[3,2,1,5,6,4]\n2'
 *
 * 在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。
 *
 * 示例 1:
 *
 * 输入: [3,2,1,5,6,4] 和 k = 2
 * 输出: 5
 *
 *
 * 示例 2:
 *
 * 输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
 * 输出: 4
 *
 * 说明:
 *
 * 你可以假设 k 总是有效的，且 1 ≤ k ≤ 数组的长度。
 *
 */

// @lc code=start
// quick select
var findKthLargest = function (nums: number[], k: number): number {
  const n = nums.length;
  return quickSelect(0, n - 1, n - k);

  function quickSelect(
    left: number,
    right: number,
    targetIndex: number
  ): number {
    const randomIndex = Math.floor(Math.random() * (right - left + 1) + left);
    const pivotIndex = partition(left, right, randomIndex);

    if (targetIndex === pivotIndex) {
      return nums[targetIndex];
    } else if (targetIndex < pivotIndex) {
      return quickSelect(left, pivotIndex - 1, targetIndex);
    } else {
      return quickSelect(pivotIndex + 1, right, targetIndex);
    }
  }

  function partition(left: number, right: number, pivotIndex: number) {
    const pivot = nums[pivotIndex];
    swap(nums, pivotIndex, right);
    let storeIndex = left;
    for (let i = left; i <= right; i++) {
      if (nums[i] < pivot) {
        swap(nums, storeIndex, i);
        storeIndex++;
      }
    }
    swap(nums, storeIndex, right);
    return storeIndex;
  }

  function swap(arr: number[], a: number, b: number) {
    [arr[a], arr[b]] = [arr[b], arr[a]];
  }
};
// @lc code=end
