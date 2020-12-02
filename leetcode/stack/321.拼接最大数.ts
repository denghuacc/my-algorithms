/*
 * @lc app=leetcode.cn id=321 lang=typescript
 *
 * [321] 拼接最大数
 *
 * https://leetcode-cn.com/problems/create-maximum-number/description/
 *
 * algorithms
 * Hard (32.62%)
 * Likes:    193
 * Dislikes: 0
 * Total Accepted:    7.2K
 * Total Submissions: 20.7K
 * Testcase Example:  '[3,4,6,5]\n[9,1,2,5,8,3]\n5'
 *
 * 给定长度分别为 m 和 n 的两个数组，其元素由 0-9 构成，表示两个自然数各位上的数字。现在从这两个数组中选出 k (k <= m + n)
 * 个数字拼接成一个新的数，要求从同一个数组中取出的数字保持其在原数组中的相对顺序。
 *
 * 求满足该条件的最大数。结果返回一个表示该最大数的长度为 k 的数组。
 *
 * 说明: 请尽可能地优化你算法的时间和空间复杂度。
 *
 * 示例 1:
 *
 * 输入:
 * nums1 = [3, 4, 6, 5]
 * nums2 = [9, 1, 2, 5, 8, 3]
 * k = 5
 * 输出:
 * [9, 8, 6, 5, 3]
 *
 * 示例 2:
 *
 * 输入:
 * nums1 = [6, 7]
 * nums2 = [6, 0, 4]
 * k = 5
 * 输出:
 * [6, 7, 6, 0, 4]
 *
 * 示例 3:
 *
 * 输入:
 * nums1 = [3, 9]
 * nums2 = [8, 9]
 * k = 3
 * 输出:
 * [9, 8, 9]
 *
 */

// @lc code=start
// stack
function maxNumber(nums1: number[], nums2: number[], k: number): number[] {
  const m = nums1.length;
  const n = nums2.length;
  const maxSubsequence: number[] = new Array(k).fill(0);
  const start = Math.max(0, k - n);
  const end = Math.min(k, m);
  for (let i = start; i <= end; i++) {
    const subsequence1 = getMaxSubsequence(nums1, i);
    const subsequence2 = getMaxSubsequence(nums2, k - i);
    const curMaxSubsequence = merge(subsequence1, subsequence2);
    if (compare(curMaxSubsequence, 0, maxSubsequence, 0) > 0) {
      maxSubsequence.splice(0, k, ...curMaxSubsequence);
    }
  }
  return maxSubsequence;

  function getMaxSubsequence(nums: number[], k: number): number[] {
    const length = nums.length;
    const stack = new Array(k).fill(0);
    let top = -1;
    let remain = length - k;
    for (let i = 0; i < length; i++) {
      const num = nums[i];
      while (top >= 0 && stack[top] < num && remain > 0) {
        top--;
        remain--;
      }
      if (top < k - 1) {
        stack[++top] = num;
      } else {
        remain--;
      }
    }
    return stack;
  }

  function merge(subsequence1: number[], subsequence2: number[]): number[] {
    const n1 = subsequence1.length;
    const n2 = subsequence2.length;
    if (n1 === 0) return subsequence2;
    if (n2 === 0) return subsequence1;

    const mergeLength = n1 + n2;
    const merged: number[] = new Array(mergeLength).fill(0);
    let index1 = 0;
    let index2 = 0;
    for (let i = 0; i < mergeLength; i++) {
      if (compare(subsequence1, index1, subsequence2, index2) > 0) {
        merged[i] = subsequence1[index1++];
      } else {
        merged[i] = subsequence2[index2++];
      }
    }
    return merged;
  }

  function compare(
    subsequence1: number[],
    index1: number,
    subsequence2: number[],
    index2: number
  ): number {
    const n1 = subsequence1.length;
    const n2 = subsequence2.length;
    while (index1 < n1 && index2 < n2) {
      const difference = subsequence1[index1] - subsequence2[index2];
      if (difference !== 0) {
        return difference;
      }
      index1++;
      index2++;
    }
    return n1 - index1 - (n2 - index2);
  }
}
// @lc code=end
