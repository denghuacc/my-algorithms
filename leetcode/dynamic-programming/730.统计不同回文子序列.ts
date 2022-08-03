/*
 * @lc app=leetcode.cn id=730 lang=typescript
 *
 * [730] 统计不同回文子序列
 *
 * https://leetcode.cn/problems/count-different-palindromic-subsequences/description/
 *
 * algorithms
 * Hard (50.27%)
 * Likes:    213
 * Dislikes: 0
 * Total Accepted:    8.4K
 * Total Submissions: 14.2K
 * Testcase Example:  '"bccb"'
 *
 * 给定一个字符串 s，返回 s 中不同的非空「回文子序列」个数 。
 *
 * 通过从 s 中删除 0 个或多个字符来获得子序列。
 *
 * 如果一个字符序列与它反转后的字符序列一致，那么它是「回文字符序列」。
 *
 * 如果有某个 i , 满足 ai != bi ，则两个序列 a1, a2, ... 和 b1, b2, ... 不同。
 *
 * 注意：
 *
 *
 * 结果可能很大，你需要对 10^9 + 7 取模 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = 'bccb'
 * 输出：6
 * 解释：6 个不同的非空回文子字符序列分别为：'b', 'c', 'bb', 'cc', 'bcb', 'bccb'。
 * 注意：'bcb' 虽然出现两次但仅计数一次。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = 'abcdabcdabcdabcdabcdabcdabcdabcddcbadcbadcbadcbadcbadcbadcbadcba'
 * 输出：104860361
 * 解释：共有 3104860382 个不同的非空回文子序列，104860361 对 10^9 + 7 取模后的值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s[i] 仅包含 'a', 'b', 'c' 或 'd'
 *
 *
 */

// @lc code=start
// dp
function countPalindromicSubsequences(s: string): number {
  const MOD = 1e9 + 7;
  const n = s.length;
  const dp = Array.from(new Array(4), () =>
    Array.from(new Array(n), () => new Array(n).fill(0))
  );
  for (let i = 0; i < n; i++) {
    dp[s[i].charCodeAt(0) - "a".charCodeAt(0)][i][i] = 1;
  }

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i + len <= n; i++) {
      const j = i + len - 1;
      for (const c of ["a", "b", "c", "d"]) {
        const k = c.charCodeAt(0) - "a".charCodeAt(0);
        if (s[i] === c && s[j] === c) {
          dp[k][i][j] =
            (2 +
              ((dp[0][i + 1][j - 1] + dp[1][i + 1][j - 1]) % MOD) +
              ((dp[2][i + 1][j - 1] + dp[3][i + 1][j - 1]) % MOD)) %
            MOD;
        } else if (s[i] === c) {
          dp[k][i][j] = dp[k][i][j - 1];
        } else if (s[j] === c) {
          dp[k][i][j] = dp[k][i + 1][j];
        } else {
          dp[k][i][j] = dp[k][i + 1][j - 1];
        }
      }
    }
  }

  let res = 0;
  for (let i = 0; i < 4; i++) {
    res = (res + dp[i][0][n - 1]) % MOD;
  }
  return res;
}

// @lc code=end
