/*
 * @lc app=leetcode.cn id=1004 lang=typescript
 *
 * [1004] 最大连续1的个数 III
 *
 * https://leetcode-cn.com/problems/max-consecutive-ones-iii/description/
 *
 * algorithms
 * Medium (56.41%)
 * Likes:    165
 * Dislikes: 0
 * Total Accepted:    24.4K
 * Total Submissions: 42K
 * Testcase Example:  '[1,1,1,0,0,0,1,1,1,1,0]\n2'
 *
 * 给定一个由若干 0 和 1 组成的数组 A，我们最多可以将 K 个值从 0 变成 1 。
 *
 * 返回仅包含 1 的最长（连续）子数组的长度。
 *
 *
 *
 * 示例 1：
 *
 * 输入：A = [1,1,1,0,0,0,1,1,1,1,0], K = 2
 * 输出：6
 * 解释：
 * [1,1,1,0,0,1,1,1,1,1,1]
 * 粗体数字从 0 翻转到 1，最长的子数组长度为 6。
 *
 * 示例 2：
 *
 * 输入：A = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], K = 3
 * 输出：10
 * 解释：
 * [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
 * 粗体数字从 0 翻转到 1，最长的子数组长度为 10。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= A.length <= 20000
 * 0 <= K <= A.length
 * A[i] 为 0 或 1
 *
 *
 */

// @lc code=start
// two pointers
var longestOnes = function (A: number[], K: number): number {
  let l = 0;
  let r = 0;
  let cnt = 0;

  while (r < A.length) {
    if (A[r] === 0) cnt++;
    if (cnt > K) {
      if (A[l] === 0) cnt--;
      l++;
    }
    r++;
  }

  return r - l;
};

// binary search
var longestOnes = function (A: number[], K: number): number {
  const n = A.length;
  const prefixSum: number[] = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    prefixSum[i] = prefixSum[i - 1] + (1 - A[i - 1]);
  }

  let ret = 0;
  for (let right = 0; right < n; right++) {
    const left = binarySearch(prefixSum, prefixSum[right + 1] - K);
    ret = Math.max(ret, right - left + 1);
  }
  return ret;

  function binarySearch(arr: number[], target: number) {
    let low = 0;
    let high = arr.length - 1;
    while (low < high) {
      const mid = Math.floor((high - low) / 2) + low;
      if (arr[mid] < target) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    return low;
  }
};
// @lc code=end
