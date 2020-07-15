/*
 * @lc app=leetcode.cn id=169 lang=typescript
 *
 * [169] 求众数
 *
 * https://leetcode-cn.com/problems/majority-element/description/
 *
 * algorithms
 * Easy (56.32%)
 * Likes:    576
 * Dislikes: 0
 * Total Accepted:    160K
 * Total Submissions: 253.9K
 * Testcase Example:  '[3,2,3]'
 *
 * 给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
 *
 * 你可以假设数组是非空的，并且给定的数组总是存在多数元素。
 *
 *
 *
 * 示例 1:
 *
 * 输入: [3,2,3]
 * 输出: 3
 *
 * 示例 2:
 *
 * 输入: [2,2,1,1,1,2,2]
 * 输出: 2
 *
 *
 */

// @lc code=start
// brute force
var majorityElement = function (nums: number[]): number {
  const map: Map<number, number> = new Map();

  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (const pair of map.entries()) {
    if (pair[1] > Math.floor(nums.length / 2)) {
      return pair[0];
    }
  }
  return -1;
};

// array sort
var majorityElement = function (nums: number[]): number {
  nums = nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

// random
var majorityElement = function (nums: number[]): number {
  while (true) {
    const randomIdx = Math.floor(Math.random() * Math.floor(nums.length));
    const candidate = nums[randomIdx];
    let count = 0;
    for (const num of nums) {
      if (num === candidate) {
        ++count;
      }
    }
    if (count > Math.floor(nums.length / 2)) {
      return candidate;
    }
  }
};

// 分治法
var majorityElement = function (nums: number[]): number {
  return majorityElementRec(nums, 0, nums.length - 1);

  function majorityElementRec(nums: number[], l: number, r: number): number {
    if (l === r) return nums[l];

    let m = Math.floor((r - l) / 2) + l;
    let left = majorityElementRec(nums, l, m);
    let right = majorityElementRec(nums, m + 1, r);

    if (left === right) return left;

    let leftCount = countInRange(nums, left, l, r);
    let rightCount = countInRange(nums, right, l, r);

    return leftCount > rightCount ? left : right;
  }

  function countInRange(nums: number[], num: number, l: number, r: number) {
    let count = 0;
    for (let i = l; i <= r; i++) {
      if (nums[i] === num) {
        count++;
      }
    }
    return count;
  }
};

// Boyer-Moore 投票算法
var majorityElement = function (nums: number[]): number {
  let count = 0;
  let candidate = -1;

  for (const num of nums) {
    if (count === 0) {
      candidate = num;
    }
    count += num === candidate ? 1 : -1;
  }

  return candidate;
};
// @lc code=end
