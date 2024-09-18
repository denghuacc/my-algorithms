/*
 * @lc app=leetcode.cn id=912 lang=typescript
 *
 * [912] 排序数组
 *
 * https://leetcode.cn/problems/sort-an-array/description/
 *
 * algorithms
 * Medium (48.77%)
 * Likes:    1026
 * Dislikes: 0
 * Total Accepted:    686.1K
 * Total Submissions: 1.4M
 * Testcase Example:  '[5,2,3,1]'
 *
 * 给你一个整数数组 nums，请你将该数组升序排列。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,2,3,1]
 * 输出：[1,2,3,5]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [5,1,1,2,0,0]
 * 输出：[0,0,1,1,2,5]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 5 * 10^4
 * -5 * 10^4 <= nums[i] <= 5 * 10^4
 *
 *
 */

// @lc code=start
// merge sorting
function sortArray(nums: number[]): number[] {
  if (nums.length <= 1) {
    return nums;
  }
  const mid = Math.floor(nums.length / 2);
  const arr1 = sortArray(nums.slice(0, mid));
  const arr2 = sortArray(nums.slice(mid));
  return merge(arr1, arr2);

  function merge(arr1: number[], arr2: number[]): number[] {
    let i = 0;
    let j = 0;
    const m = arr1.length;
    const n = arr2.length;
    const res = [];
    while (i < m && j < n) {
      if (arr1[i] < arr2[j]) {
        res.push(arr1[i]);
        i++;
      } else {
        res.push(arr2[j]);
        j++;
      }
    }
    if (i < m) {
      res.push(...arr1.slice(i));
    }
    if (j < n) {
      res.push(...arr2.slice(j));
    }
    return res;
  }
}
// @lc code=end
