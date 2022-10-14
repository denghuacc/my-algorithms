/*
 * @lc app=leetcode.cn id=67 lang=typescript
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (46.00%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    74K
 * Total Submissions: 141.4K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
// API
var addBinary = function (a: string, b: string): string {
  return (BigInt("0b" + a) + BigInt("0b" + b)).toString(2);
};

// math
var addBinary = function (a: string, b: string): string {
  let res = "";
  let carry = 0;
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = carry;
    sum += i >= 0 ? parseInt(a[i]) : 0;
    sum += j >= 0 ? parseInt(b[j]) : 0;
    res += sum % 2;
    carry = Math.floor(sum / 2);
  }
  res += carry === 1 ? carry : "";
  return res.split("").reverse().join("");
};
// @lc code=ends
