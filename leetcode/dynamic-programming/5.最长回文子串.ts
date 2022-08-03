/*
 * @lc app=leetcode.cn id=5 lang=typescript
 *
 * [5] 最长回文子串
 *
 * https://leetcode-cn.com/problems/longest-palindromic-substring/description/
 *
 * algorithms
 * Medium (24.13%)
 * Likes:    1954
 * Dislikes: 0
 * Total Accepted:    224.2K
 * Total Submissions: 767.5K
 * Testcase Example:  '"babad"'
 *
 * 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。
 *
 * 示例 1：
 *
 * 输入: "babad"
 * 输出: "bab"
 * 注意: "aba" 也是一个有效答案。
 *
 *
 * 示例 2：
 *
 * 输入: "cbbd"
 * 输出: "bb"
 *
 *
 */

// @lc code=start
// dp
var longestPalindrome = function (s: string): string {
  const n = s.length;

  // dp[i][j] -> s[i:j] 是否是回文串
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );
  let ret = "";

  for (let i = 0; i < n; i++) {
    for (let j = 0; i < n; j++) {
      const k = i + j;
      if (k >= n) break;

      // 子串长度为 1
      if (i === 0) {
        dp[j][k] = true;
      }
      // 子串长度为 2
      else if (i === 1) {
        dp[j][k] = s[j] === s[k];
      } else {
        dp[j][k] = dp[j + 1][k - 1] && s[j] === s[k];
      }

      if (dp[j][k] && i + 1 > ret.length) {
        ret = s.substring(j, k + 1);
      }
    }
  }

  return ret;
};

// 中心扩展法
var longestPalindrome = function (s: string): string {
  const n = s.length;
  if (n < 2) return s;
  let start = 0;
  let end = 0;
  for (let i = 0; i < n; i++) {
    const len1 = expandAroundCenter(s, i, i);
    const len2 = expandAroundCenter(s, i, i + 1);
    const maxLen = Math.max(len1, len2);
    if (maxLen > end - start) {
      start = i - Math.floor((maxLen - 1) / 2);
      end = i + Math.floor(maxLen / 2);
    }
  }
  return s.substring(start, end + 1);

  function expandAroundCenter(s: string, left: number, right: number) {
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
    }
    return right - left - 1;
  }
};
// @lc code=end
