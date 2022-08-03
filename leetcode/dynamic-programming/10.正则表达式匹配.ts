/*
 * @lc app=leetcode.cn id=10 lang=typescript
 *
 * [10] 正则表达式匹配
 *
 * https://leetcode-cn.com/problems/regular-expression-matching/description/
 *
 * algorithms
 * Hard (20.85%)
 * Likes:    1137
 * Dislikes: 0
 * Total Accepted:    70.8K
 * Total Submissions: 257.7K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给你一个字符串 s 和一个字符规律 p，请你来实现一个支持 '.' 和 '*' 的正则表达式匹配。
 *
 * '.' 匹配任意单个字符
 * '*' 匹配零个或多个前面的那一个元素
 *
 *
 * 所谓匹配，是要涵盖 整个 字符串 s的，而不是部分字符串。
 *
 * 说明:
 *
 *
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 . 和 *。
 *
 *
 * 示例 1:
 *
 * 输入:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 *
 *
 * 示例 2:
 *
 * 输入:
 * s = "aa"
 * p = "a*"
 * 输出: true
 * 解释: 因为 '*' 代表可以匹配零个或多个前面的那一个元素, 在这里前面的元素就是 'a'。因此，字符串 "aa" 可被视为 'a' 重复了一次。
 *
 *
 * 示例 3:
 *
 * 输入:
 * s = "ab"
 * p = ".*"
 * 输出: true
 * 解释: ".*" 表示可匹配零个或多个（'*'）任意字符（'.'）。
 *
 *
 * 示例 4:
 *
 * 输入:
 * s = "aab"
 * p = "c*a*b"
 * 输出: true
 * 解释: 因为 '*' 表示零个或多个，这里 'c' 为 0 个, 'a' 被重复一次。因此可以匹配字符串 "aab"。
 *
 *
 * 示例 5:
 *
 * 输入:
 * s = "mississippi"
 * p = "mis*is*p*."
 * 输出: false
 *
 */

// @lc code=start
// js API
var isMatch = function (s: string, p: string): boolean {
  return new RegExp("^" + p + "$").test(s);
};

// backtrack
var isMatch = function (s: string, p: string): boolean {
  if (p.length === 0) return s.length === 0;

  const firstMatch = (s.length && (p[0] === s[0] || p[0] === ".")) || false;

  if (p.length >= 2 && p[1] === "*") {
    return (
      isMatch(s, p.substring(2)) || (firstMatch && isMatch(s.substring(1), p))
    );
  } else {
    return firstMatch && isMatch(s.substring(1), p.substring(1));
  }
};

// dp
var isMatch = function (s: string, p: string): boolean {
  const n = s.length;
  const m = p.length;

  // dp[i][j] -> s 的前 i 个字符和 p 的前 j 个字符是否匹配
  const dp: boolean[][] = Array.from(new Array(n + 1), () =>
    new Array(m + 1).fill(false)
  );

  dp[0][0] = true;
  for (let i = 0; i <= m; i++) {
    if (p[i] == "*" && dp[0][i - 1]) {
      dp[0][i + 1] = true;
    }
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (p[j - 1] == s[i - 1] || p[j - 1] == ".") {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] == "*") {
        if (p[j - 2] != s[i - 1]) {
          dp[i][j] = dp[i][j - 2];
        }
        if (p[j - 2] == s[i - 1] || p[j - 2] == ".") {
          dp[i][j] = dp[i - 1][j] || dp[i][j - 1] || dp[i][j - 2];
        }
      }
    }
  }
  return dp[n][m];
};
// @lc code=end
