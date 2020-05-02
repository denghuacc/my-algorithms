/*
 * @lc app=leetcode.cn id=34 lang=javascript
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
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * API
 */
var searchRange = function (nums, target) {
  const ret = [-1, -1]
  const firstIndex = nums.indexOf(target)
  if (firstIndex > -1) {
    ret[0] = firstIndex
  } else {
    return ret
  }

  const lastIndex = nums.lastIndexOf(target)
  if (lastIndex > -1) {
    ret[1] = lastIndex
  } else {
    return ret
  }

  return ret
}

var searchRange = function (nums, target) {
  const ret = [-1, -1]

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === target) {
      ret[0] = i
      break
    }
  }

  if (ret[0] === -1) return ret

  for (let j = nums.length - 1; j >= 0; j--) {
    if (nums[j] === target) {
      ret[1] = j
      break
    }
  }

  return ret
}

// binary search
var searchRange = function (nums, target) {
  const ret = [-1, -1]
  let leftIdx = extremeInsertionIndex(nums, target, true)
  if (leftIdx === nums.length || nums[leftIdx] !== target) {
    return ret
  }
  ret[0] = leftIdx
  ret[1] = extremeInsertionIndex(nums, target, false) - 1

  return ret

  function extremeInsertionIndex(nums, target, left) {
    let idx = 0
    let len = nums.length

    while (idx < len) {
      const mid = Math.floor((idx + len) / 2)
      if (nums[mid] > target || (left && target === nums[mid])) {
        len = mid
      } else {
        idx = mid + 1
      }
    }

    return idx
  }
}
// @lc code=end
