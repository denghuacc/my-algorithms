/*
 * @lc app=leetcode.cn id=67 lang=javascript
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
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function (a, b) {
  return (BigInt('0b' + a) + BigInt('0b' + b)).toString(2)
}

// var addBinary = function (a, b) {
//   const n1 = parseInt(a, 2)
//   const n2 = parseInt(b, 2)
//   const sum = n1 + n2
//   return sum.toString(2)
// }
// 计算超出范围导致出错

var addBinary = function (a, b) {
  let ret = ''
  let ca = 0
  for (let i = a.length - 1, j = b.length - 1; i >= 0 || j >= 0; i--, j--) {
    let sum = ca
    sum += i >= 0 ? parseInt(a[i]) : 0
    sum += j >= 0 ? parseInt(b[j]) : 0
    ret += sum % 2
    ca = Math.floor(sum / 2)
  }
  ret += ca === 1 ? ca : ''
  return ret.split('').reverse().join('')
}
// @lc code=ends
