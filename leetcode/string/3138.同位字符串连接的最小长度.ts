/*
 * @lc app=leetcode.cn id=3138 lang=typescript
 *
 * [3138] 同位字符串连接的最小长度
 *
 * https://leetcode.cn/problems/minimum-length-of-anagram-concatenation/description/
 *
 * algorithms
 * Medium (35.97%)
 * Likes:    34
 * Dislikes: 0
 * Total Accepted:    12.3K
 * Total Submissions: 26.4K
 * Testcase Example:  '"abba"'
 *
 * 给你一个字符串 s ，它由某个字符串 t 和若干 t  的 同位字符串 连接而成。
 *
 * 请你返回字符串 t 的 最小 可能长度。
 *
 * 同位字符串 指的是重新排列一个单词得到的另外一个字符串，原来字符串中的每个字符在新字符串中都恰好只使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abba"
 *
 * 输出：2
 *
 * 解释：
 *
 * 一个可能的字符串 t 为 "ba" 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cdef"
 *
 * 输出：4
 *
 * 解释：
 *
 * 一个可能的字符串 t 为 "cdef" ，注意 t 可能等于 s 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s 只包含小写英文字母。
 *
 *
 */

// @lc code=start
function minAnagramLength(s: string): number {
  const n = s.length;
  for (let i = 1; i < n; i++) {
    if (n % i === 0) {
      if (check(s, i)) {
        return i;
      }
    }
  }
  return n;

  function check(s: string, m: number): boolean {
    let cnt0: number[] = new Array(26).fill(0);
    for (let i = 0; i < n; i += m) {
      const cnt1: number[] = new Array(26).fill(0);
      for (let j = i; j < i + m; j++) {
        cnt1[s.charCodeAt(j) - 97]++;
      }
      if (i > 0 && !cnt0.every((val, idx) => val === cnt1[idx])) {
        return false;
      }
      cnt0 = cnt1.slice();
    }
    return true;
  }
}
// @lc code=end
