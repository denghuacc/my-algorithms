/*
 * @lc app=leetcode.cn id=525 lang=typescript
 *
 * [525] 连续数组
 *
 * https://leetcode-cn.com/problems/contiguous-array/description/
 *
 * algorithms
 * Medium (45.88%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    16.7K
 * Total Submissions: 33.8K
 * Testcase Example:  '[0,1]'
 *
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [0,1]
 * 输出: 2
 * 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
 *
 * 示例 2:
 *
 *
 * 输入: nums = [0,1,0]
 * 输出: 2
 * 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 *
 *
 */

export {};

// @lc code=start
// hash table
function findMaxLength(nums: number[]): number {
  let maxLength = 0;
  const map: Map<number, number> = new Map();
  let counter = 0;
  map.set(counter, -1);
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (num === 1) {
      counter++;
    } else {
      counter--;
    }
    if (map.has(counter)) {
      const preIndex = map.get(counter)!;
      maxLength = Math.max(maxLength, i - preIndex);
    } else {
      map.set(counter, i);
    }
  }

  return maxLength;
}
// @lc code=end
