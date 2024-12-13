/*
 * @lc app=leetcode.cn id=3264 lang=typescript
 *
 * [3264] K 次乘运算后的最终数组 I
 *
 * https://leetcode.cn/problems/final-array-state-after-k-multiplication-operations-i/description/
 *
 * algorithms
 * Easy (77.98%)
 * Likes:    11
 * Dislikes: 0
 * Total Accepted:    9.9K
 * Total Submissions: 12K
 * Testcase Example:  '[2,1,3,5,6]\n5\n2'
 *
 * 给你一个整数数组 nums ，一个整数 k  和一个整数 multiplier 。
 *
 * 你需要对 nums 执行 k 次操作，每次操作中：
 *
 *
 * 找到 nums 中的 最小 值 x ，如果存在多个最小值，选择最 前面 的一个。
 * 将 x 替换为 x * multiplier 。
 *
 *
 * 请你返回执行完 k 次乘运算之后，最终的 nums 数组。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,1,3,5,6], k = 5, multiplier = 2
 *
 * 输出：[8,4,6,5,6]
 *
 * 解释：
 *
 *
 *
 *
 * 操作
 * 结果
 *
 *
 * 1 次操作后
 * [2, 2, 3, 5, 6]
 *
 *
 * 2 次操作后
 * [4, 2, 3, 5, 6]
 *
 *
 * 3 次操作后
 * [4, 4, 3, 5, 6]
 *
 *
 * 4 次操作后
 * [4, 4, 6, 5, 6]
 *
 *
 * 5 次操作后
 * [8, 4, 6, 5, 6]
 *
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2], k = 3, multiplier = 4
 *
 * 输出：[16,8]
 *
 * 解释：
 *
 *
 *
 *
 * 操作
 * 结果
 *
 *
 * 1 次操作后
 * [4, 2]
 *
 *
 * 2 次操作后
 * [4, 8]
 *
 *
 * 3 次操作后
 * [16, 8]
 *
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 100
 * 1 <= nums[i] <= 100
 * 1 <= k <= 10
 * 1 <= multiplier <= 5
 *
 *
 */

// @lc code=start
var getFinalState = function (
  nums: number[],
  k: number,
  multiplier: number
): number[] {
  while (k > 0) {
    let minIdx = -1;
    let minVal = Infinity;
    for (let i = 0; i < nums.length; i++) {
      if (nums[i] < minVal) {
        minVal = nums[i];
        minIdx = i;
      }
    }
    nums[minIdx] *= multiplier;
    k--;
  }
  return nums;
};

var getFinalState = function (
  nums: number[],
  k: number,
  multiplier: number
): number[] {
  for (let i = 0; i < k; i++) {
    let minIdx = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] < nums[minIdx]) {
        minIdx = j;
      }
    }
    nums[minIdx] *= multiplier;
  }
  return nums;
};
// @lc code=end
