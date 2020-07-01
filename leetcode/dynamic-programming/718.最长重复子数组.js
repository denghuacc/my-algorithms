/*
 * @lc app=leetcode.cn id=718 lang=javascript
 *
 * [718] 最长重复子数组
 *
 * https://leetcode-cn.com/problems/maximum-length-of-repeated-subarray/description/
 *
 * algorithms
 * Medium (41.03%)
 * Likes:    209
 * Dislikes: 0
 * Total Accepted:    17K
 * Total Submissions: 32.8K
 * Testcase Example:  '[1,2,3,2,1]\n[3,2,1,4,7]'
 *
 * 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。
 *
 * 示例 1:
 *
 *
 * 输入:
 * A: [1,2,3,2,1]
 * B: [3,2,1,4,7]
 * 输出: 3
 * 解释:
 * 长度最长的公共子数组是 [3, 2, 1]。
 *
 *
 * 说明:
 *
 *
 * 1 <= len(A), len(B) <= 1000
 * 0 <= A[i], B[i] < 100
 *
 *
 */

// @lc code=start
/**
 * @param {number[]} A
 * @param {number[]} B
 * @return {number}
 * dp
 */
var findLength = function (A, B) {
  const n = A.length;
  const m = B.length;
  const dp = Array(n + 1)
    .fill()
    .map(() => Array(m + 1).fill(0));
  let ret = 0;

  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = A[i] === B[j] ? dp[i + 1][j + 1] + 1 : 0;
      ret = Math.max(ret, dp[i][j]);
    }
  }

  return ret;
};

// 滑动窗口
var findLength = function (A, B) {
  const n = A.length;
  const m = B.length;
  let ret = 0;

  // B 不变，A 的首元素与 B 的某个元素对齐
  // 然后计算长度
  for (let i = 0; i < n; i++) {
    const len = Math.min(m, n - i);
    const maxLen = maxLength(A, B, i, 0, len);
    ret = Math.max(ret, maxLen);
  }

  // A 不变，B 的首元素与 A 的某个元素对齐
  for (let i = 0; i < m; i++) {
    const len = Math.min(n, m - i);
    const maxLen = maxLength(A, B, 0, i, len);
    ret = Math.max(ret, maxLen);
  }

  return ret;

  function maxLength(A, B, addA, addB, len) {
    let ret = 0;
    let k = 0;
    for (let i = 0; i < len; i++) {
      if (A[addA + i] === B[addB + i]) {
        k++;
      } else {
        k = 0;
      }
      ret = Math.max(ret, k);
    }
    return ret;
  }
};
// @lc code=end
