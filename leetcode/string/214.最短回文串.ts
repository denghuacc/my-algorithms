/*
 * @lc app=leetcode.cn id=214 lang=typescript
 *
 * [214] 最短回文串
 *
 * https://leetcode-cn.com/problems/shortest-palindrome/description/
 *
 * algorithms
 * Hard (32.56%)
 * Likes:    198
 * Dislikes: 0
 * Total Accepted:    12K
 * Total Submissions: 36.3K
 * Testcase Example:  '"aacecaaa"'
 *
 * 给定一个字符串 s，你可以通过在字符串前面添加字符将其转换为回文串。找到并返回可以用这种方式转换的最短回文串。
 *
 * 示例 1:
 *
 * 输入: "aacecaaa"
 * 输出: "aaacecaaa"
 *
 *
 * 示例 2:
 *
 * 输入: "abcd"
 * 输出: "dcbabcd"
 *
 */

// @lc code=start
// string
var shortestPalindrome = function (s: string): string {
  const n = s.length;
  const revS = s.split("").reverse().join("");

  for (let i = n; i >= 0; i--) {
    if (s.substring(0, i) === revS.substring(n - i)) {
      return revS.substring(0, n - i) + s;
    }
  }

  return "";
};
// @lc code=end
