/*
 * @lc app=leetcode.cn id=217 lang=typescript
 *
 * [217] 存在重复元素
 *
 * https://leetcode-cn.com/problems/contains-duplicate/description/
 *
 * algorithms
 * Easy (45.77%)
 * Likes:    236
 * Dislikes: 0
 * Total Accepted:    127.1K
 * Total Submissions: 244.3K
 * Testcase Example:  '[1,2,3,1]'
 *
 * 给定一个整数数组，判断是否存在重复元素。
 *
 * 如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。
 *
 *
 *
 * 示例 1:
 *
 * 输入: [1,2,3,1]
 * 输出: true
 *
 * 示例 2:
 *
 * 输入: [1,2,3,4]
 * 输出: false
 *
 * 示例 3:
 *
 * 输入: [1,1,1,3,3,4,3,2,4,2]
 * 输出: true
 *
 */

// @lc code=start
// API
var containsDuplicate = function (nums: number[]): boolean {
  return nums.length !== new Set(nums).size;
};

// array sort
var containsDuplicate = function (nums: number[]): boolean {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === nums[i + 1]) return true;
  }
  return false;
};

// hash table
var containsDuplicate = function (nums: number[]): boolean {
  const set: Set<number> = new Set();
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    if (set.has(num)) return true;
    set.add(num);
  }
  return false;
};
// @lc code=end
