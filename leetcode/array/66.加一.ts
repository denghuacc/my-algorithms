/*
 * @lc app=leetcode.cn id=66 lang=typescript
 *
 * [66] 加一
 *
 * https://leetcode-cn.com/problems/plus-one/description/
 *
 * algorithms
 * Easy (37.23%)
 * Likes:    453
 * Dislikes: 0
 * Total Accepted:    138.3K
 * Total Submissions: 316.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。
 *
 * 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。
 *
 * 你可以假设除了整数 0 之外，这个整数不会以零开头。
 *
 * 示例 1:
 *
 * 输入: [1,2,3]
 * 输出: [1,2,4]
 * 解释: 输入数组表示数字 123。
 *
 *
 * 示例 2:
 *
 * 输入: [4,3,2,1]
 * 输出: [4,3,2,2]
 * 解释: 输入数组表示数字 4321。
 *
 *
 */

// @lc code=start
// array
/**
 * 情况一举例 45 -> 46
 * 情况二举例 49 -> 50
 * 情况三举例 99 -> 100
 */
var plusOne = function (digits: number[]): number[] {
  const len = digits.length;
  for (let i = len - 1; i >= 0; i--) {
    digits[i]++;
    digits[i] %= 10;
    // 取余后 -> 如果变成 0，说明这个数原来是 9，
    // 继续循环并使前一位数加 1
    // 如果不是 0 直接返回值
    if (digits[i] !== 0) {
      return digits;
    }
  }
  digits = new Array(len + 1).fill(0); // 全部赋 0
  digits[0] = 1; // 最前面的 0 变为 1 才有效
  return digits;
};
// @lc code=end
