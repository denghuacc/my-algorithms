/*
 * @lc app=leetcode.cn id=137 lang=typescript
 *
 * [137] 只出现一次的数字 II
 *
 * https://leetcode-cn.com/problems/single-number-ii/description/
 *
 * algorithms
 * Medium (62.16%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    27.1K
 * Total Submissions: 40.8K
 * Testcase Example:  '[2,2,3,2]'
 *
 * 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。
 *
 * 说明：
 *
 * 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？
 *
 * 示例 1:
 *
 * 输入: [2,2,3,2]
 * 输出: 3
 *
 *
 * 示例 2:
 *
 * 输入: [0,1,0,1,0,1,99]
 * 输出: 99
 *
 */

// @lc code=start
// hash table map
var singleNumber = function (nums: number[]): number {
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    map.set(num, (map.get(num) || 0) + 1);
  }

  for (const num of nums) {
    if (map.get(num) === 1) {
      return num;
    }
  }
  return 0;
};

// math (3 ∗ (a+b) − (a+a+a+b)) / 2 = b
var singleNumber = function (nums: number[]): number {
  let sumOfSet = 0;
  let sumOfNums = 0;
  const set: Set<number> = new Set();
  for (const num of nums) {
    if (!set.has(num)) {
      set.add(num);
      sumOfSet += num;
    }
    sumOfNums += num;
  }
  return (3 * sumOfSet - sumOfNums) / 2;
};

// bit manipulation
var singleNumber = function (nums: number[]): number {
  let seenOnce = 0;
  let seenTwice = 0;
  for (const num of nums) {
    seenOnce = ~seenTwice & (seenOnce ^ num);
    seenTwice = ~seenOnce & (seenTwice ^ num);
  }
  return seenOnce;
};
// @lc code=end
