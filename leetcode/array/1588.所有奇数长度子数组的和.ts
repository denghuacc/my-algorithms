/*
 * @lc app=leetcode.cn id=1588 lang=typescript
 *
 * [1588] 所有奇数长度子数组的和
 *
 * https://leetcode-cn.com/problems/sum-of-all-odd-length-subarrays/description/
 *
 * algorithms
 * Easy (84.08%)
 * Likes:    123
 * Dislikes: 0
 * Total Accepted:    41.2K
 * Total Submissions: 49K
 * Testcase Example:  '[1,4,2,5,3]'
 *
 * 给你一个正整数数组 arr ，请你计算所有可能的奇数长度子数组的和。
 *
 * 子数组 定义为原数组中的一个连续子序列。
 *
 * 请你返回 arr 中 所有奇数长度子数组的和 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [1,4,2,5,3]
 * 输出：58
 * 解释：所有奇数长度子数组和它们的和为：
 * [1] = 1
 * [4] = 4
 * [2] = 2
 * [5] = 5
 * [3] = 3
 * [1,4,2] = 7
 * [4,2,5] = 11
 * [2,5,3] = 10
 * [1,4,2,5,3] = 15
 * 我们将所有值求和得到 1 + 4 + 2 + 5 + 3 + 7 + 11 + 10 + 15 = 58
 *
 * 示例 2：
 *
 * 输入：arr = [1,2]
 * 输出：3
 * 解释：总共只有 2 个长度为奇数的子数组，[1] 和 [2]。它们的和为 3 。
 *
 * 示例 3：
 *
 * 输入：arr = [10,11,12]
 * 输出：66
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 100
 * 1 <= arr[i] <= 1000
 *
 *
 */

// @lc code=start
// force
var sumOddLengthSubarrays = function (arr: number[]): number {
  let sum = 0;
  const n = arr.length;
  for (let start = 0; start < n; start++) {
    for (let length = 1; start + length <= n; length += 2) {
      const end = start + length - 1;
      for (let i = start; i <= end; i++) {
        sum += arr[i];
      }
    }
  }
  return sum;
};

// prefix sum
var sumOddLengthSubarrays = function (arr: number[]): number {
  const n = arr.length;
  const preSum: number[] = [0];
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + arr[i];
  }
  let sum = 0;
  for (let start = 0; start < n; start++) {
    for (let length = 1; start + length <= n; length += 2) {
      const end = start + length - 1;
      sum += preSum[end + 1] - preSum[start];
    }
  }
  return sum;
};

// math
var sumOddLengthSubarrays = function (arr: number[]): number {
  let sum = 0;
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    const leftCount = i;
    const rightCount = n - i - 1;
    const leftOdd = Math.floor((leftCount + 1) / 2);
    const rightOdd = Math.floor((rightCount + 1) / 2);
    const leftEven = Math.floor(leftCount / 2) + 1;
    const rightEven = Math.floor(rightCount / 2) + 1;
    sum += arr[i] * (leftOdd * rightOdd + leftEven * rightEven);
  }
  return sum;
};
// @lc code=end
