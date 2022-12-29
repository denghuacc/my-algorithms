/*
 * @lc app=leetcode.cn id=2032 lang=typescript
 *
 * [2032] 至少在两个数组中出现的值
 *
 * https://leetcode.cn/pr0blems/two-out-of-three/description/
 *
 * algorithms
 * Easy (66.50%)
 * Likes:    33
 * Dislikes: 0
 * Total Accepted:    16K
 * Total Submissions: 22.7K
 * Testcase Example:  '[1,1,3,2]\n[2,3]\n[3]'
 *
 * 给你三个整数数组 nums1、nums2 和 nums3 ，请你构造并返回一个 元素各不相同的 数组，且由 至少 在 两个
 * 数组中出现的所有值组成。数组中的元素可以按 任意 顺序排列。
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums1 = [1,1,3,2], nums2 = [2,3], nums3 = [3]
 * 输出：[3,2]
 * 解释：至少在两个数组中出现的所有值为：
 * - 3 ，在全部三个数组中都出现过。
 * - 2 ，在数组 nums1 和 nums2 中出现过。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums1 = [3,1], nums2 = [2,3], nums3 = [1,2]
 * 输出：[2,3,1]
 * 解释：至少在两个数组中出现的所有值为：
 * - 2 ，在数组 nums2 和 nums3 中出现过。
 * - 3 ，在数组 nums1 和 nums2 中出现过。
 * - 1 ，在数组 nums1 和 nums3 中出现过。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums1 = [1,2,2], nums2 = [4,3,3], nums3 = [5]
 * 输出：[]
 * 解释：不存在至少在两个数组中出现的值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums1.length, nums2.length, nums3.length <= 100
 * 1 <= nums1[i], nums2[j], nums3[k] <= 100
 *
 *
 */

// @lc code=start
// hash table
var twoOutOfThree = function (
  nums1: number[],
  nums2: number[],
  nums3: number[]
): number[] {
  const res: Set<number> = new Set();
  const set1 = new Set(nums1);
  const set2 = new Set(nums2);
  const set3 = new Set(nums3);
  for (const num of set1) {
    if (set2.has(num) || set3.has(num)) {
      res.add(num);
    }
  }
  for (const num of set2) {
    if (set3.has(num)) {
      res.add(num);
    }
  }
  return Array.from(res);
};

// hash table
var twoOutOfThree = function (
  nums1: number[],
  nums2: number[],
  nums3: number[]
): number[] {
  const map: Map<number, number> = new Map();
  for (const num of nums1) {
    map.set(num, 1); // 0b01
  }
  for (const num of nums2) {
    map.set(num, (map.get(num) ?? 0) | 2); // 0b10 or 0b11
  }
  for (const num of nums3) {
    map.set(num, (map.get(num) ?? 0) | 4); // 0b100 or 0b101 or 0b110 or 0b111
  }
  const res: number[] = [];
  for (const [k, v] of map.entries()) {
    if ((v & (v - 1)) !== 0) {
      res.push(k); // 0b11 or 0b101 or 0b110 or 0b111
    }
  }
  return res;
};
// @lc code=end
