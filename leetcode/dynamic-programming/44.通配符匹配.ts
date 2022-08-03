/*
 * @lc app=leetcode.cn id=44 lang=typescript
 *
 * [44] 通配符匹配
 *
 * https://leetcode-cn.com/problems/wildcard-matching/description/
 *
 * algorithms
 * Hard (20.19%)
 * Likes:    373
 * Dislikes: 0
 * Total Accepted:    32.2K
 * Total Submissions: 115.1K
 * Testcase Example:  '"aa"\n"a"'
 *
 * 给定一个字符串 (s) 和一个字符模式 (p) ，实现一个支持 '?' 和 '*' 的通配符匹配。
 *
 * '?' 可以匹配任何单个字符。
 * '*' 可以匹配任意字符串（包括空字符串）。
 *
 *
 * 两个字符串完全匹配才算匹配成功。
 *
 * 说明:
 *
 *
 * s 可能为空，且只包含从 a-z 的小写字母。
 * p 可能为空，且只包含从 a-z 的小写字母，以及字符 ? 和 *。
 *
 *
 * 示例 1:
 *
 * 输入:
 * s = "aa"
 * p = "a"
 * 输出: false
 * 解释: "a" 无法匹配 "aa" 整个字符串。
 *
 * 示例 2:
 *
 * 输入:
 * s = "aa"
 * p = "*"
 * 输出: true
 * 解释: '*' 可以匹配任意字符串。
 *
 *
 * 示例 3:
 *
 * 输入:
 * s = "cb"
 * p = "?a"
 * 输出: false
 * 解释: '?' 可以匹配 'c', 但第二个 'a' 无法匹配 'b'。
 *
 *
 * 示例 4:
 *
 * 输入:
 * s = "adceb"
 * p = "*a*b"
 * 输出: true
 * 解释: 第一个 '*' 可以匹配空字符串, 第二个 '*' 可以匹配字符串 "dce".
 *
 *
 * 示例 5:
 *
 * 输入:
 * s = "acdcb"
 * p = "a*c?b"
 * 输出: false
 *
 */

// @lc code=start

// dp
var isMatch = function (s: string, p: string): boolean {
  const sLen = s.length;
  const pLen = p.length;

  // dp[i][j] -> 字符串 s 的前 i 个字符和模式 p 的前 j 个字符是否能匹配
  const dp: boolean[][] = Array.from(new Array(sLen + 1), () =>
    new Array(pLen + 1).fill(false)
  );

  dp[0][0] = true;
  for (let i = 1; i <= pLen; i++) {
    if (p[i - 1] === "*") dp[0][i] = true;
    else break;
  }

  for (let i = 1; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] === "*") {
        dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
      } else if (p[j - 1] === "?" || s[i - 1] === p[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      }
    }
  }

  return dp[sLen][pLen];
};

// backtrack
var isMatch = function (s: string, p: string): boolean {
  const sLen = s.length;
  const pLen = p.length;
  let sIdx = 0;
  let pIdx = 0;
  let sStarIdx = -1;
  let pStarIdx = -1;

  while (sIdx < sLen) {
    if (pIdx < pLen && (p[pIdx] === "?" || p[pIdx] === s[sIdx])) {
      sIdx++;
      pIdx++;
    }
    // 记录如果之后序列匹配不成功时， sIdx 和 pIdx 需要回溯到的位置
    else if (pIdx < pLen && p[pIdx] === "*") {
      sStarIdx = sIdx;
      pStarIdx = pIdx++; // 将 pIdx++，sIdx不变，表示先让 * 匹配 0 个字符，不行再回溯
    }
    // 发现当前字符不匹配且没有星号 但是 pStarIdx > -1
    // 说明可能是 * 之前匹配的字符数量少了 这时回溯，让 * 匹配的字符增加一个
    else if (pStarIdx > -1) {
      sIdx = ++sStarIdx;
      pIdx = pStarIdx + 1;
    } else {
      return false;
    }
  }

  while (pIdx < pLen) {
    // 如果 p 中还有多余的字符的话，那必须都是 * 否则 匹配就不成功
    if (p[pIdx++] !== "*") return false;
  }

  return true;
};
// @lc code=end
