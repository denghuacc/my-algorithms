/*
 * @lc app=leetcode.cn id=516 lang=typescript
 *
 * [516] 最长回文子序列
 *
 * https://leetcode-cn.com/problems/longest-palindromic-subsequence/description/
 *
 * algorithms
 * Medium (40.03%)
 * Likes:    240
 * Dislikes: 0
 * Total Accepted:    22.1K
 * Total Submissions: 39.8K
 * Testcase Example:  '"bbbab"'
 *
 * 给定一个字符串 s ，找到其中最长的回文子序列，并返回该序列的长度。可以假设 s 的最大长度为 1000 。
 *
 *
 *
 * 示例 1:
 * 输入:
 *
 * "bbbab"
 *
 *
 * 输出:
 *
 * 4
 *
 *
 * 一个可能的最长回文子序列为 "bbbb"。
 *
 * 示例 2:
 * 输入:
 *
 * "cbbd"
 *
 *
 * 输出:
 *
 * 2
 *
 *
 * 一个可能的最长回文子序列为 "bb"。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 只包含小写英文字母
 *
 *
 */

// @lc code=start
var longestPalindromeSubseq = function (s: string): number {
  const n = s.length;
  const dp = Array.from(new Array(n), () => new Array<number>(n).fill(0));

  // base case 左下斜线为 1
  for (let i = 0; i < n; i++) {
    dp[i][i] = 1;
  }

  // 遍历斜线右边的
  // 从下到上
  for (let i = n - 1; i >= 0; i--) {
    // 从左到右
    for (let j = i + 1; j < n; j++) {
      // 状态转移
      if (s[i] === s[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2;
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[0][n - 1];
};
// @lc code=end
