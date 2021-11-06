/*
 * @lc app=leetcode.cn id=268 lang=typescript
 *
 * [268] 缺失数字
 *
 * https://leetcode-cn.com/problems/missing-number/description/
 *
 * algorithms
 * Easy (47.39%)
 * Likes:    249
 * Dislikes: 0
 * Total Accepted:    61.4K
 * Total Submissions: 110.9K
 * Testcase Example:  '[3,0,1]'
 *
 * 给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。
 *
 * 示例 1:
 *
 * 输入: [3,0,1]
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: [9,6,4,2,3,5,7,0,1]
 * 输出: 8
 *
 *
 * 说明:
 * 你的算法应具有线性时间复杂度。你能否仅使用额外常数空间来实现?
 *
 */

// @lc code=start
// sort
var missingNumber = function (nums: number[]): number {
  nums.sort((a, b) => a - b);

  if (nums[nums.length - 1] !== nums.length) {
    return nums.length;
  } else if (nums[0] !== 0) {
    return 0;
  }

  for (let i = 1; i < nums.length; i++) {
    const expectedNum = nums[i - 1] + 1;
    if (nums[i] != expectedNum) {
      return expectedNum;
    }
  }

  return -1;
};

// hash table
var missingNumber = function (nums: number[]): number {
  const set: Set<number> = new Set();
  for (const num of nums) {
    set.add(num);
  }

  const expectedNum = nums.length + 1;
  for (let i = 0; i < expectedNum; i++) {
    if (!set.has(i)) {
      return i;
    }
  }

  return -1;
};

// ^= 异或
var missingNumber = function (nums: number[]): number {
  let missing = nums.length;
  for (let i = 0; i < nums.length; i++) {
    missing ^= i ^ nums[i];
  }
  return missing;
};

// math 高斯求和 -> 首尾相加除以 2
var missingNumber = function (nums: number[]): number {
  let expectedNum = Math.floor((nums.length * (nums.length + 1)) / 2);
  let actualSum = 0;
  for (const num of nums) {
    actualSum += num;
  }
  return expectedNum - actualSum;
};
// @lc code=end
