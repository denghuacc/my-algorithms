/*
 * @lc app=leetcode.cn id=791 lang=typescript
 *
 * [791] 自定义字符串排序
 *
 * https://leetcode.cn/problems/custom-sort-string/description/
 *
 * algorithms
 * Medium (70.21%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    19.6K
 * Total Submissions: 27.2K
 * Testcase Example:  '"cba"\n"abcd"'
 *
 * 给定两个字符串 order 和 s 。order 的所有单词都是 唯一 的，并且以前按照一些自定义的顺序排序。
 *
 * 对 s 的字符进行置换，使其与排序的 order 相匹配。更具体地说，如果在 order 中的字符 x 出现字符 y 之前，那么在排列后的字符串中， x
 * 也应该出现在 y 之前。
 *
 * 返回 满足这个性质的 s 的任意排列 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: order = "cba", s = "abcd"
 * 输出: "cbad"
 * 解释:
 * “a”、“b”、“c”是按顺序出现的，所以“a”、“b”、“c”的顺序应该是“c”、“b”、“a”。
 * 因为“d”不是按顺序出现的，所以它可以在返回的字符串中的任何位置。“dcba”、“cdba”、“cbda”也是有效的输出。
 *
 * 示例 2:
 *
 *
 * 输入: order = "cbafg", s = "abcd"
 * 输出: "cbad"
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= order.length <= 26
 * 1 <= s.length <= 200
 * order 和 s 由小写英文字母组成
 * order 中的所有字符都 不同
 *
 *
 */

// @lc code=start
// custom sorting
var customSortString = function (order: string, s: string): string {
  const strToIdx: Map<string, number> = new Map();
  for (let i = 0; i < order.length; i++) {
    strToIdx.set(order[i], i);
  }
  return Array.from(s)
    .sort(
      (a, b) => (strToIdx.get(a) ?? Infinity) - (strToIdx.get(b) ?? Infinity)
    )
    .join("");
};

// counting sorting
var customSortString = function (order: string, s: string): string {
  const freq: number[] = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    freq[ch.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  let res = "";
  for (let i = 0; i < order.length; i++) {
    const ch = order[i];
    while (freq[ch.charCodeAt(0) - "a".charCodeAt(0)] > 0) {
      res += ch;
      freq[ch.charCodeAt(0) - "a".charCodeAt(0)]--;
    }
  }
  for (let i = 0; i < 26; i++) {
    while (freq[i] > 0) {
      res += String.fromCharCode(i + "a".charCodeAt(0));
      freq[i]--;
    }
  }
  return res;
};
// @lc code=end
