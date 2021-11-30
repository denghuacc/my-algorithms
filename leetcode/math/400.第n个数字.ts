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
  let digit = 1;
  let count = 9;

  while (n > digit * count) {
    n -= digit * count;
    digit += 1;
    count *= 10;
  }

  const index = n - 1;
  const start = Math.floor(Math.pow(10, digit - 1));
  const num = start + Math.floor(index / digit);
  const digitIndex = index % digit;
  const ret =
    Math.floor(num / Math.floor(Math.pow(10, digit - digitIndex - 1))) % 10;
  return ret;
};
// @lc code=end
