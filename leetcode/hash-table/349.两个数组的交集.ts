/*
 * @lc app=leetcode.cn id=349 lang=typescript
 *
 * [349] 两个数组的交集
 *
 * https://leetcode-cn.com/problems/intersection-of-two-arrays/description/
 *
 * algorithms
 * Easy (59.04%)
 * Likes:    201
 * Dislikes: 0
 * Total Accepted:    77.7K
 * Total Submissions: 111.4K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组，编写一个函数来计算它们的交集。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出：[2]
 *
 *
 * 示例 2：
 *
 * 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出：[9,4]
 *
 *
 *
 * 说明：
 *
 *
 * 输出结果中的每个元素一定是唯一的。
 * 我们可以不考虑输出结果的顺序。
 *
 *
 */

// @lc code=start
var intersection = function (nums1: number[], nums2: number[]): number[] {
  nums1 = [...new Set(nums1)];
  nums2 = [...new Set(nums2)];

  if (nums1.length > nums2.length) {
    return intersection(nums2, nums1);
  }

  const ret: number[] = [];
  for (const num of nums1) {
    const has = nums2.includes(num);
    if (has) {
      ret.push(num);
    }
  }
  return ret;
};

// hash table
var intersection = function (nums1: number[], nums2: number[]): number[] {
  nums1 = [...new Set(nums1)];
  nums2 = [...new Set(nums2)];

  if (nums1.length > nums2.length) {
    return intersection(nums2, nums1);
  }

  const map: Map<number, number> = new Map();
  for (const num of nums1) {
    const count = (map.get(num) ?? 0) + 1;
    map.set(num, count);
  }

  const ret: number[] = new Array(nums1.length);
  let index = 0;
  for (const num of nums2) {
    let count = map.get(num) ?? 0;
    if (count > 0) {
      ret[index++] = num;
      count--;
      map.delete(num);
    }
  }

  return ret.slice(0, index);
};

// sort and two pointers
var intersection = function (nums1: number[], nums2: number[]): number[] {
  nums1 = nums1
    .sort((a, b) => a - b)
    .filter((val, index) => nums1.indexOf(val) === index);
  nums2 = nums2
    .sort((a, b) => a - b)
    .filter((val, index) => nums2.indexOf(val) === index);
  const n1 = nums1.length;
  const n2 = nums2.length;
  const ret: number[] = new Array(Math.min(n1, n2));
  let index1 = 0;
  let index2 = 0;
  let index = 0;

  while (index1 < n1 && index2 < n2) {
    if (nums1[index1] < nums2[index2]) {
      index1++;
    } else if (nums1[index1] > nums2[index2]) {
      index2++;
    } else {
      ret[index] = nums1[index1];
      index1++;
      index2++;
      index++;
    }
  }

  return ret.slice(0, index);
};
// @lc code=end
