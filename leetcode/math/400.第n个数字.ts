/*
 * @lc app=leetcode.cn id=400 lang=typescript
 *
 * [400] 第N个数字
 *
 * https://leetcode-cn.com/problems/nth-digit/description/
 *
 * algorithms
 * Easy (30.19%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    8.1K
 * Total Submissions: 22.3K
 * Testcase Example:  '3'
 *
 * 在无限的整数序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...中找到第 n 个数字。
 *
 * 注意:
 * n 是正数且在32位整数范围内 ( n < 2^31)。
 *
 * 示例 1:
 *
 * 输入:
 * 3
 *
 * 输出:
 * 3
 *
 *
 * 示例 2:
 *
 * 输入:
 * 11
 *
 * 输出:
 * 0
 *
 * 说明:
 * 第11个数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是0，它是10的一部分。
 *
 *
 */

// @lc code=start
// math
var findNthDigit = function (n: number): number {
  let base = 9;
  let digits = 1;

  while (n - base * digits > 0) {
    n -= base * digits;
    base *= 10;
    digits += 1;
  }

  let idx = n % digits;
  if (idx === 0) idx = digits;
  let number = 1;
  for (let i = 1; i < digits; i++) number *= 10;
  if (idx === digits) number += Math.floor(n / digits) - 1;
  else number += Math.floor(n / digits);
  for (let i = idx; i < digits; i++) number = Math.floor(number / 10);
  return number % 10;
};
// @lc code=end
