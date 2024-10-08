/*
 * @lc app=leetcode.cn id=2414 lang=typescript
 *
 * [2414] 最长的字母序连续子字符串的长度
 *
 * https://leetcode.cn/problems/length-of-the-longest-alphabetical-continuous-substring/description/
 *
 * algorithms
 * Medium (61.28%)
 * Likes:    30
 * Dislikes: 0
 * Total Accepted:    21K
 * Total Submissions: 32K
 * Testcase Example:  '"abacaba"'
 *
 * 字母序连续字符串 是由字母表中连续字母组成的字符串。换句话说，字符串 "abcdefghijklmnopqrstuvwxyz" 的任意子字符串都是
 * 字母序连续字符串 。
 *
 *
 * 例如，"abc" 是一个字母序连续字符串，而 "acb" 和 "za" 不是。
 *
 *
 * 给你一个仅由小写英文字母组成的字符串 s ，返回其 最长 的 字母序连续子字符串 的长度。
 *
 *
 *
 * 示例 1：
 *
 * 输入：s = "abacaba"
 * 输出：2
 * 解释：共有 4 个不同的字母序连续子字符串 "a"、"b"、"c" 和 "ab" 。
 * "ab" 是最长的字母序连续子字符串。
 *
 *
 * 示例 2：
 *
 * 输入：s = "abcde"
 * 输出：5
 * 解释："abcde" 是最长的字母序连续子字符串。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 由小写英文字母组成
 *
 *
 */

// @lc code=start
function longestContinuousSubstring(s: string): number {
  let res = 1;
  let cnt = 1;
  const n = s.length;
  for (let i = 1; i < n; i++) {
    if (s.charCodeAt(i) - s.charCodeAt(i - 1) === 1) {
      cnt++;
    } else {
      cnt = 1;
    }
    res = Math.max(res, cnt);
  }
  return res;
}
// @lc code=end
