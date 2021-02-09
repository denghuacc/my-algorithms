/*
 * @lc app=leetcode.cn id=992 lang=typescript
 *
 * [992] K 个不同整数的子数组
 *
 * https://leetcode-cn.com/problems/subarrays-with-k-different-integers/description/
 *
 * algorithms
 * Hard (33.10%)
 * Likes:    169
 * Dislikes: 0
 * Total Accepted:    7.7K
 * Total Submissions: 21.8K
 * Testcase Example:  '[1,2,1,2,3]\n2'
 *
 * 给定一个正整数数组 A，如果 A 的某个子数组中不同整数的个数恰好为 K，则称 A 的这个连续、不一定独立的子数组为好子数组。
 *
 * （例如，[1,2,3,1,2] 中有 3 个不同的整数：1，2，以及 3。）
 *
 * 返回 A 中好子数组的数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：A = [1,2,1,2,3], K = 2
 * 输出：7
 * 解释：恰好由 2 个不同整数组成的子数组：[1,2], [2,1], [1,2], [2,3], [1,2,1], [2,1,2],
 * [1,2,1,2].
 *
 *
 * 示例 2：
 *
 * 输入：A = [1,2,1,3,4], K = 3
 * 输出：3
 * 解释：恰好由 3 个不同整数组成的子数组：[1,2,1,3], [2,1,3], [1,3,4].
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= A.length <= 20000
 * 1 <= A[i] <= A.length
 * 1 <= K <= A.length
 *
 *
 */

// @lc code=start
// sliding window
function subarraysWithKDistinct(A: number[], K: number): number {
  const n = A.length;
  const num1 = new Array(n + 1).fill(0);
  const num2 = new Array(n + 1).fill(0);

  let total1 = 0;
  let total2 = 0;
  let left1 = 0;
  let left2 = 0;
  let right = 0;
  let ret = 0;

  while (right < n) {
    if (num1[A[right]] === 0) {
      total1++;
    }
    num1[A[right]]++;

    if (num2[A[right]] === 0) {
      total2++;
    }
    num2[A[right]]++;

    while (total1 > K) {
      num1[A[left1]]--;
      if (num1[A[left1]] === 0) {
        total1--;
      }
      left1++;
    }

    while (total2 > K - 1) {
      num2[A[left2]]--;
      if (num2[A[left2]] === 0) {
        total2--;
      }
      left2++;
    }

    ret += left2 - left1;
    right++;
  }

  return ret;
}
// @lc code=end
