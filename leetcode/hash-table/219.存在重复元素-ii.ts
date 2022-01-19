/*
 * @lc app=leetcode.cn id=219 lang=typescript
 *
 * [219] 存在重复元素 II
 *
 * https://leetcode-cn.com/problems/contains-duplicate-ii/description/
 *
 * algorithms
 * Easy (40.76%)
 * Likes:    220
 * Dislikes: 0
 * Total Accepted:    71.4K
 * Total Submissions: 175K
 * Testcase Example:  '[1,2,3,1]\n3'
 *
 * 给定一个整数数组和一个整数 k，判断数组中是否存在两个不同的索引 i 和 j，使得 nums [i] = nums [j]，并且 i 和 j 的差的
 * 绝对值 至多为 k。
 *
 *
 *
 * 示例 1:
 *
 * 输入: nums = [1,2,3,1], k = 3
 * 输出: true
 *
 * 示例 2:
 *
 * 输入: nums = [1,0,1,1], k = 1
 * 输出: true
 *
 * 示例 3:
 *
 * 输入: nums = [1,2,3,1,2,3], k = 2
 * 输出: false
 *
 */

// 题目翻译有误，应该是有相同元素并且不超过 k 就可以返回 true。
// @lc code=start
// linear search
var containsNearbyDuplicate = function (nums: number[], k: number): boolean {
  const n = nums.length;

  for (let i = 0; i < n; i++) {
    for (let j = Math.max(i - k, 0); j < i; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }

  return false;
};

// hash table
var containsNearbyDuplicate = function (nums: number[], k: number): boolean {
  const n = nums.length;
  const set: Set<number> = new Set();
  for (let i = 0; i < n; i++) {
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }
  return false;
};

// hash table 2
var containsNearbyDuplicate = function (nums: number[], k: number): boolean {
  const n = nums.length;
  const map: Map<number, number> = new Map();
  for (let i = 0; i < n; i++) {
    const num = nums[i];
    if (map.has(num)) {
      const prev = map.get(num)!;
      if (i - prev <= k) {
        return true;
      }
    }
    map.set(num, i);
  }
  return false;
};
// @lc code=end
