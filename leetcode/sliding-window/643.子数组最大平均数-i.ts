/*
 * @lc app=leetcode.cn id=643 lang=typescript
 *
 * [643] 子数组最大平均数 I
 *
 * https://leetcode-cn.com/problems/maximum-average-subarray-i/description/
 *
 * algorithms
 * Easy (42.45%)
 * Likes:    140
 * Dislikes: 0
 * Total Accepted:    29K
 * Total Submissions: 68.6K
 * Testcase Example:  '[1,12,-5,-6,50,3]\n4'
 *
 * 给定 n 个整数，找出平均数最大且长度为 k 的连续子数组，并输出该最大平均数。
 *
 *
 *
 * 示例：
 *
 *
 * 输入：[1,12,-5,-6,50,3], k = 4
 * 输出：12.75
 * 解释：最大平均数 (12-5-6+50)/4 = 51/4 = 12.75
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 k n
 * 所给数据范围 [-10,000，10,000]。
 *
 *
 */

// @lc code=start
// brute fore
var findMaxAverage = function (nums: number[], k: number): number {
  const n = nums.length;
  if (n === 1) return nums[0];
  let ret = -Infinity;

  for (let i = 0; i < n - k + 1; i++) {
    const range = nums.slice(i, i + k);
    const average = getAverage(range);
    ret = Math.max(ret, average);
  }

  return ret;

  function getAverage(nums: number[]): number {
    return nums.reduce((acc, i) => acc + i, 0) / k;
  }
};

// sliding window
var findMaxAverage = function (nums: number[], k: number): number {
  const n = nums.length;
  let sum = 0;

  // 前 k 个元素的和
  for (let i = 0; i < k; i++) {
    sum += nums[i];
  }

  let maxSum = sum;

  for (let i = k; i < n; i++) {
    sum = sum - nums[i - k] + nums[i]; // 滑动窗口求和
    maxSum = Math.max(maxSum, sum);
  }

  return maxSum / k;
};
// @lc code=end
