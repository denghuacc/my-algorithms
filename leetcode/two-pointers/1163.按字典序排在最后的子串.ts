/*
 * @lc app=leetcode.cn id=1163 lang=typescript
 *
 * [1163] 按字典序排在最后的子串
 *
 * https://leetcode.cn/problems/last-substring-in-lexicographical-order/description/
 *
 * algorithms
 * Hard (27.89%)
 * Likes:    113
 * Dislikes: 0
 * Total Accepted:    11.4K
 * Total Submissions: 36.9K
 * Testcase Example:  '"abab"'
 *
 * 给你一个字符串 s ，找出它的所有子串并按字典序排列，返回排在最后的那个子串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abab"
 * 输出："bab"
 * 解释：我们可以找出 7 个子串 ["a", "ab", "aba", "abab", "b", "ba", "bab"]。按字典序排在最后的子串是
 * "bab"。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "leetcode"
 * 输出："tcode"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 4 * 10^5
 * s 仅含有小写英文字符。
 *
 *
 */

// @lc code=start
// two pointers cv
function lastSubstring(s: string): string {
  const n = s.length;
  let i = 0;
  let j = 1;
  while (j < n) {
    let k = 0;
    while (j + k < n && s[i + k] === s[j + k]) {
      k++;
    }
    if (j + k < n && s[i + k] < s[j + k]) {
      const t = i;
      i = j;
      j = Math.max(j + 1, t + k + 1);
    } else {
      j = j + k + 1;
    }
  }
  return s.slice(i, n);
}
// @lc code=end
