/*
 * @lc app=leetcode.cn id=9 lang=typescript
 *
 * [9] 回文数
 *
 * https://leetcode-cn.com/problems/palindrome-number/description/
 *
 * algorithms
 * Easy (55.86%)
 * Total Accepted:    65.9K
 * Total Submissions: 118K
 * Testcase Example:  '121'
 *
 * 判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。
 *
 * 示例 1:
 *
 * 输入: 121
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: -121
 * 输出: false
 * 解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。
 *
 *
 * 示例 3:
 *
 * 输入: 10
 * 输出: false
 * 解释: 从右向左读, 为 01 。因此它不是一个回文数。
 *
 *
 * 进阶:
 *
 * 你能不将整数转为字符串来解决这个问题吗？
 *
 */

export {};

// @lc code=start
// math
var isPalindrome = function (x: number): boolean {
  if (x < 0) {
    return false;
  }
  let cur = 0;
  let num = x;
  while (num > 0) {
    cur = cur * 10 + (num % 10);
    num = Math.floor(num / 10);
  }
  return cur === x;
};
// @lc code=end
