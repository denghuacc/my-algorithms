/*
 * @lc app=leetcode.cn id=805 lang=typescript
 *
 * [805] 数组的均值分割
 *
 * https://leetcode.cn/problems/split-array-with-same-average/description/
 *
 * algorithms
 * Hard (30.22%)
 * Likes:    146
 * Dislikes: 0
 * Total Accepted:    7.3K
 * Total Submissions: 20.1K
 * Testcase Example:  '[1,2,3,4,5,6,7,8]'
 *
 * 给定你一个整数数组 nums
 *
 * 我们要将 nums 数组中的每个元素移动到 A 数组 或者 B 数组中，使得 A 数组和 B 数组不为空，并且 average(A) ==
 * average(B) 。
 *
 * 如果可以完成则返回true ， 否则返回 false  。
 *
 * 注意：对于数组 arr ,  average(arr) 是 arr 的所有元素除以 arr 长度的和。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [1,2,3,4,5,6,7,8]
 * 输出: true
 * 解释: 我们可以将数组分割为 [1,4,5,8] 和 [2,3,6,7], 他们的平均值都是4.5。
 *
 *
 * 示例 2:
 *
 *
 * 输入: nums = [3,1]
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= nums.length <= 30
 * 0 <= nums[i] <= 10^4
 *
 *
 */

// @lc code=start
// cv
function splitArraySameAverage(nums: number[]): boolean {
  if (nums.length === 1) {
    return false;
  }
  const n = nums.length;
  const m = Math.floor(n / 2);
  let sum = 0;
  for (const num of nums) {
    sum += num;
  }
  for (let i = 0; i < n; i++) {
    nums[i] = nums[i] * n - sum;
  }
  const left: Set<number> = new Set();
  for (let i = 1; i < 1 << m; i++) {
    let total = 0;
    for (let j = 0; j < m; j++) {
      if ((i & (1 << j)) !== 0) {
        total += nums[j];
      }
    }
    if (total === 0) {
      return true;
    }
    left.add(total);
  }
  let rightSum = 0;
  for (let i = m; i < n; i++) {
    rightSum += nums[i];
  }
  for (let i = 1; i < 1 << (n - m); i++) {
    let total = 0;
    for (let j = m; j < n; j++) {
      if ((i & (1 << (j - m))) != 0) {
        total += nums[j];
      }
    }
    if (total === 0 || (rightSum !== total && left.has(-total))) {
      return true;
    }
  }
  return false;
}
// @lc code=end
