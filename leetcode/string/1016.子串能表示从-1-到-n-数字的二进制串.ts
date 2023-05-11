/*
 * @lc app=leetcode.cn id=1016 lang=typescript
 *
 * [1016] 子串能表示从 1 到 N 数字的二进制串
 *
 * https://leetcode.cn/problems/binary-string-with-substrings-representing-1-to-n/description/
 *
 * algorithms
 * Medium (58.48%)
 * Likes:    76
 * Dislikes: 0
 * Total Accepted:    12.3K
 * Total Submissions: 19.9K
 * Testcase Example:  '"0110"\n3'
 *
 * 给定一个二进制字符串 s 和一个正整数 n，如果对于 [1, n] 范围内的每个整数，其二进制表示都是 s 的 子字符串 ，就返回 true，否则返回
 * false 。
 *
 * 子字符串 是字符串中连续的字符序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "0110", n = 3
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "0110", n = 4
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s[i] 不是 '0' 就是 '1'
 * 1 <= n <= 10^9
 *
 *
 */

// @lc code=start
function queryString(s: string, n: number): boolean {
  for (let i = 1; i <= n; i++) {
    if (!s.includes(i.toString(2))) {
      return false;
    }
  }
  return true;
}
// @lc code=end
