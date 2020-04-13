/*
 * @lc app=leetcode.cn id=53 lang=javascript
 *
 * [53] 最大子序和
 *
 * https://leetcode-cn.com/problems/maximum-subarray/description/
 *
 * algorithms
 * Easy (41.90%)
 * Likes:    1795
 * Dislikes: 0
 * Total Accepted:    197.2K
 * Total Submissions: 393.9K
 * Testcase Example:  '[-2,1,-3,4,-1,2,1,-5,4]'
 *
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
 *
 * 示例:
 *
 * 输入: [-2,1,-3,4,-1,2,1,-5,4],
 * 输出: 6
 * 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
 *
 *
 * 进阶:
 *
 * 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。
 *
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let ret = nums[0]
  let sum = 0
  for (const num of nums) {
    if (sum > 0) {
      sum += num // 增益
    } else {
      sum = num // 重新开始
    }
    ret = Math.max(ret, sum) // 每次取最大值
  }
  return ret
}

var maxSubArray = function (nums) {
  const dp = []
  let ret = (dp[0] = nums[0])
  for (let i = 1; i < nums.length; ++i) {
    dp[i] = nums[i]
    if (dp[i - 1] > 0) {
      dp[i] += dp[i - 1]
    }
    ret = Math.max(ret, dp[i])
  }
  return ret
}

// 原地动态规划
var maxSubArray = function (nums) {
  let ret = nums[0]
  for (let i = 1; i < nums.length; ++i) {
    if (nums[i - 1] > 0) {
      nums[i] += nums[i - 1]
    }
    ret = Math.max(ret, nums[i])
  }
  return ret
}

// 贪心法
var maxSubArray = function (nums) {
  let maxSum = (sum = nums[0])
  for (let i = 1; i < nums.length; ++i) {
    sum = Math.max(nums[i], sum + nums[i])
    maxSum = Math.max(maxSum, sum)
  }
  return maxSum
}
// @lc code=end
