/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 *
 * https://leetcode-cn.com/problems/3sum/description/
 *
 * algorithms
 * Medium (20.03%)
 * Likes:    1972
 * Dislikes: 0
 * Total Accepted:    192.3K
 * Total Submissions: 730.1K
 * Testcase Example:  '[-1,0,1,2,-1,-4]'
 *
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0
 * ？请你找出所有满足条件且不重复的三元组。
 *
 * 注意：答案中不可以包含重复的三元组。
 *
 *
 *
 * 示例：
 *
 * 给定数组 nums = [-1, 0, 1, 2, -1, -4]，
 *
 * 满足要求的三元组集合为：
 * [
 * ⁠ [-1, 0, 1],
 * ⁠ [-1, -1, 2]
 * ]
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 * 双指针 O(N^2)/O(1)
 */
var threeSum = function (nums) {
  let ret = []
  const len = nums.length
  if (nums == null || len < 3) return ret

  nums.sort((a, b) => a - b) // 排序

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) break // 如果当前数字大于 0，则三数之和一定大于 0，所以结束循环
    if (i > 0 && nums[i] === nums[i - 1]) continue // 去重

    let L = i + 1
    let R = len - 1
    while (L < R) {
      const sum = nums[i] + nums[L] + nums[R]

      if (sum === 0) {
        ret.push([nums[i], nums[L], nums[R]])
        while (L < R && nums[L] === nums[L + 1]) L++ // 去重
        while (L < R && nums[R] === nums[R - 1]) R-- // 去重
        L++
        R--
      }
      //
      else if (sum < 0) L++
      else if (sum > 0) R--
    }
  }

  return ret
}
// @lc code=end
