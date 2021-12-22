/*
 * @lc app=leetcode.cn id=686 lang=typescript
 *
 * [686] 重复叠加字符串匹配
 *
 * https://leetcode-cn.com/problems/repeated-string-match/description/
 *
 * algorithms
 * Easy (33.97%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    12.1K
 * Total Submissions: 35.5K
 * Testcase Example:  '"abcd"\n"cdabcdab"'
 *
 * 给定两个字符串 A 和 B, 寻找重复叠加字符串A的最小次数，使得字符串B成为叠加后的字符串A的子串，如果不存在则返回 -1。
 *
 * 举个例子，A = "abcd"，B = "cdabcdab"。
 *
 * 答案为 3， 因为 A 重复叠加三遍后为 “abcdabcdabcd”，此时 B 是其子串；A 重复叠加两遍后为"abcdabcd"，B
 * 并不是其子串。
 *
 * 注意:
 *
 * A 与 B 字符串的长度在1和10000区间范围内。
 *
 */

// @lc code=start
// string
function repeatedStringMatch(a: string, b: string): number {
  let str = "";
  let res = 0;
  const max = 2 * a.length + b.length;
  while (str.length < max) {
    str += a;
    res++;
    if (str.includes(b)) {
      return res;
    }
  }
  return -1;
}
// @lc code=end
