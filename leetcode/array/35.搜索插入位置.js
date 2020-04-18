/*
 * @lc app=leetcode.cn id=35 lang=javascript
 *
 * [35] 搜索插入位置
 *
 * https://leetcode-cn.com/problems/search-insert-position/description/
 *
 * algorithms
 * Easy (42.42%)
 * Likes:    475
 * Dislikes: 0
 * Total Accepted:    138.7K
 * Total Submissions: 305.7K
 * Testcase Example:  '[1,3,5,6]\n5'
 *
 * 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。
 *
 * 你可以假设数组中无重复元素。
 *
 * 示例 1:
 *
 * 输入: [1,3,5,6], 5
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: [1,3,5,6], 2
 * 输出: 1
 *
 *
 * 示例 3:
 *
 * 输入: [1,3,5,6], 7
 * 输出: 4
 *
 *
 * 示例 4:
 *
 * 输入: [1,3,5,6], 0
 * 输出: 0
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  const index = nums.indexOf(target)
  if (index > -1) {
    return index
  } else {
    nums.push(target)
    nums.sort((a, b) => a - b)
    return nums.indexOf(target)
  }
}

var searchInsert = function (nums, target) {
  if (nums[0] > target) return 0 // first
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] >= target) {
      return i
    }
  }
  return nums.length // last
}

// binary search
var searchInsert = function (nums, target) {
  let l = 0, r = nums.length - 1
  while(l <= r) {
    let m = Math.round((l+r)/ 2)
    if (target === nums[m]) {
      return m
    } else if (target < nums[m]) {
      r = m - 1
    } else {
      l = m + 1
    }
  }

  return l
}
// @lc code=end
