/*
 * @lc app=leetcode.cn id=300 lang=typescript
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
// dp
var lengthOfLIS = function (nums: number[]): number {
  if (nums.length === 0) return 0;

  // dp[i] -> 数组前 i 个元素组成的数组的最长上升子序列的长度
  const dp: number[] = new Array(nums.length);
  dp[0] = 1;
  let len = 1;

  for (let i = 1; i < dp.length; i++) {
    let maxVal = 0;
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        maxVal = Math.max(maxVal, dp[j]);
      }
    }
    dp[i] = maxVal + 1;
    len = Math.max(len, dp[i]);
  }

  return len;
};

// dp2
var lengthOfLIS = function (nums: number[]): number {

  // dp[i] -> 数组前 i 个元素组成的数组的最长上升子序列的长度
  const dp: number[] = Array(nums.length).fill(1); // base case

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }

  let ret = 0;
  for (let i = 0; i < dp.length; i++) {
    ret = Math.max(ret, dp[i]);
  }
  return ret;
};

// Greedy
var lengthOfLIS = function (nums: number[]): number {
  let len = 1;
  let n = nums.length;
  if (n === 0) return 0;

  const arr = new Array<number>(n + 1);
  arr[len] = nums[0];

  for (let i = 1; i < n; ++i) {
    if (nums[i] > arr[len]) {
      arr[++len] = nums[i];
    } else {
      let l = 1;
      let r = len;
      let pos = 0;

      while (l <= r) {
        let mid = Math.floor((l + r) / 2);
        if (arr[mid] < nums[i]) {
          pos = mid;
          l = mid + 1;
        } else {
          r = mid - 1;
        }
      }

      arr[pos + 1] = nums[i];
    }
  }

  return len;
};

// binary search
var lengthOfLIS = function (nums: number[]): number {
  const top = new Array<number>(nums.length);
  let piles = 0;
  for (let i = 0; i < nums.length; i++) {
    let poker = nums[i];

    let left = 0;
    let right = piles;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (top[mid] > poker) right = mid;
      else if (top[mid] < poker) left = mid + 1;
      else right = mid;
    }
    if (left === piles) piles++;
    top[left] = poker;
  }
  return piles;
};
// @lc code=end
