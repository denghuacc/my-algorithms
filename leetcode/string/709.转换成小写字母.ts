/*
 * @lc app=leetcode.cn id=709 lang=typescript
 *
 * [709] 转换成小写字母
 *
 * https://leetcode-cn.com/problems/to-lower-case/description/
 *
 * algorithms
 * Easy (76.94%)
 * Likes:    189
 * Dislikes: 0
 * Total Accepted:    89.5K
 * Total Submissions: 116.4K
 * Testcase Example:  '"Hello"'
 *
 * 给你一个字符串 s ，将该字符串中的大写字母转换成相同的小写字母，返回新的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "Hello"
 * 输出："hello"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "here"
 * 输出："here"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "LOVELY"
 * 输出："lovely"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由 ASCII 字符集中的可打印字符组成
 *
 *
 */

// @lc code=start
function toLowerCase(s: string): string {
  let res = "";
  for (const ch of s) {
    const lower = toLower(ch);
    res += lower;
  }
  return res;

  function toLower(ch: string): string {
    const code = ch.charCodeAt(0);
    if (code >= 65 && code <= 90) {
      return String.fromCharCode(code + 32);
    }
    return ch;
  }
}
// @lc code=end
