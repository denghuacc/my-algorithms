/*
 * @lc app=leetcode.cn id=300 lang=javascript
 *
 * [300] 最长上升子序列
 *
 * https://leetcode-cn.com/problems/longest-increasing-subsequence/description/
 *
 * algorithms
 * Medium (38.70%)
 * Likes:    664
 * Dislikes: 0
 * Total Accepted:    90.7K
 * Total Submissions: 205.3K
 * Testcase Example:  '[10,9,2,5,3,7,101,18]'
 *
 * 给定一个无序的整数数组，找到其中最长上升子序列的长度。
 *
 * 示例:
 *
 * 输入: [10,9,2,5,3,7,101,18]
 * 输出: 4
 * 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。
 *
 * 说明:
 *
 *
 * 可能会有多种最长上升子序列的组合，你只需要输出对应的长度即可。
 * 你算法的时间复杂度应该为 O(n^2) 。
 *
 *
 * 进阶: 你能将算法的时间复杂度降低到 O(n log n) 吗?
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 * dp
 */
var lengthOfLIS = function (nums) {
  if (nums.length === 0) return 0

  const dp = new Array(nums.length)
  dp[0] = 1
  let len = 1

  for (let i = 1; i < dp.length; i++) {
    let maxVal = 0
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        maxVal = Math.max(maxVal, dp[j])
      }
    }
    dp[i] = maxVal + 1
    len = Math.max(len, dp[i])
  }

  return len
}

// Greedy
var lengthOfLIS = function (nums) {
  let len = 1
  let n = nums.length
  if (n === 0) return 0

  const arr = new Array(n + 1)
  arr[len] = nums[0]

  for (let i = 1; i < n; ++i) {
    if (nums[i] > arr[len]) {
      arr[++len] = nums[i]
    } else {
      let l = 1
      let r = len
      let pos = 0

      while (l <= r) {
        let mid = Math.floor((l + r) / 2)
        if (arr[mid] < nums[i]) {
          pos = mid
          l = mid + 1
        } else {
          r = mid - 1
        }
      }

      arr[pos + 1] = nums[i]
    }
  }

  return len
}
// @lc code=end
