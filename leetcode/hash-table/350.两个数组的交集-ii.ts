/*
 * @lc app=leetcode.cn id=350 lang=typescript
 *
 * [350] 两个数组的交集 II
 *
 * https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/description/
 *
 * algorithms
 * Easy (38.43%)
 * Likes:    304
 * Dislikes: 0
 * Total Accepted:    98.7K
 * Total Submissions: 199.3K
 * Testcase Example:  '[1,2,2,1]\n[2,2]'
 *
 * 给定两个数组，编写一个函数来计算它们的交集。
 *
 * 示例 1:
 *
 * 输入: nums1 = [1,2,2,1], nums2 = [2,2]
 * 输出: [2,2]
 *
 *
 * 示例 2:
 *
 * 输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
 * 输出: [4,9]
 *
 * 说明：
 *
 *
 * 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
 * 我们可以不考虑输出结果的顺序。
 *
 *
 * 进阶:
 *
 *
 * 如果给定的数组已经排好序呢？你将如何优化你的算法？
 * 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
 * 如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？
 *
 *
 */

// @lc code=start
// array
var intersect = function (nums1: number[], nums2: number[]): number[] {
  const n1 = nums1.length;
  const n2 = nums2.length;
  const shorterNums = n1 >= n2 ? nums2 : nums1;
  const longerNums = n1 >= n2 ? nums1 : nums2;

  const ret: number[] = [];
  for (const num1 of shorterNums) {
    const index = longerNums.indexOf(num1);
    if (index > -1) {
      ret.push(num1);
      longerNums.splice(index, 1);
    }
  }
  return ret;
};

// hash table
var intersect = function (nums1: number[], nums2: number[]): number[] {
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1);
  }

  const map: Map<number, number> = new Map();
  for (const num of nums1) {
    const count = (map.get(num) ?? 0) + 1;
    map.set(num, count);
  }

  const intersection: number[] = new Array(nums1.length);
  let index = 0;
  for (const num of nums2) {
    let count = map.get(num) ?? 0;
    if (count > 0) {
      intersection[index++] = num;
      count--;
      if (count > 0) {
        map.set(num, count);
      } else {
        map.delete(num);
      }
    }
  }

  return intersection.slice(0, index);
};

// sort and two pointers
var intersect = function (nums1: number[], nums2: number[]): number[] {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  const n1 = nums1.length;
  const n2 = nums2.length;
  const intersection: number[] = new Array(Math.min(n1, n2));
  let index1 = 0;
  let index2 = 0;
  let index = 0;

  while (index1 < n1 && index2 < n2) {
    if (nums1[index1] < nums2[index2]) {
      index1++;
    } else if (nums1[index1] > nums2[index2]) {
      index2++;
    } else {
      intersection[index] = nums1[index1];
      index1++;
      index2++;
      index++;
    }
  }

  return intersection.slice(0, index);
};
// @lc code=end
