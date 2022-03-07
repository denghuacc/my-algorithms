/*
 * @lc app=leetcode.cn id=504 lang=typescript
 *
 * [504] 七进制数
 *
 * https://leetcode-cn.com/problems/base-7/description/
 *
 * algorithms
 * Easy (51.36%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 84.4K
 * Testcase Example:  '100'
 *
 * 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: num = 100
 * 输出: "202"
 *
 *
 * 示例 2:
 *
 *
 * 输入: num = -7
 * 输出: "-10"
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10^7 <= num <= 10^7
 *
 *
 */

// @lc code=start
// math
function convertToBase7(num: number): string {
  if (num === 0) return "0";
  let res = "";
  const negative = num < 0;
  num = Math.abs(num);
  while (num > 0) {
    res = (num % 7) + res;
    num = Math.floor(num / 7);
  }
  return negative ? "-" + res : res;
}
// @lc code=end
