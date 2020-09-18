/*
 * @lc app=leetcode.cn id=128 lang=typescript
 *
 * [128] 最长连续序列
 *
 * https://leetcode-cn.com/problems/longest-consecutive-sequence/description/
 *
 * algorithms
 * Hard (40.90%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    36.5K
 * Total Submissions: 75.1K
 * Testcase Example:  '[100,4,200,1,3,2]'
 *
 * 给定一个未排序的整数数组，找出最长连续序列的长度。
 *
 * 要求算法的时间复杂度为 O(n)。
 *
 * 示例:
 *
 * 输入: [100, 4, 200, 1, 3, 2]
 * 输出: 4
 * 解释: 最长连续序列是 [1, 2, 3, 4]。它的长度为 4。
 *
 */

// @lc code=start
// array sort
var longestConsecutive = function (nums: number[]): number {
  if (nums.length === 0) return 0;

  nums = nums.sort((a, b) => a - b);

  let longest = 1;
  let curLongest = 1;

  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) {
      if (nums[i] === nums[i - 1] + 1) {
        curLongest += 1;
      } else {
        longest = Math.max(longest, curLongest);
        curLongest = 1;
      }
    }
  }

  return Math.max(longest, curLongest);
};

// hash table
var longestConsecutive = function (nums: number[]): number {
  const set: Set<number> = new Set();

  for (const num of nums) set.add(num);
  let longest = 0;

  for (const num of set.values()) {
    if (!set.has(num - 1)) {
      let curNum = num;
      let curLongest = 1;

      while (set.has(curNum + 1)) {
        curNum += 1;
        curLongest += 1;
      }

      longest = Math.max(longest, curLongest);
    }
  }

  return longest;
};
