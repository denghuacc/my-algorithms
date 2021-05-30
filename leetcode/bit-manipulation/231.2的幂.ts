/*
 * @lc app=leetcode.cn id=231 lang=typescript
 *
 * [231] 2的幂
 *
 * https://leetcode-cn.com/problems/power-of-two/description/
 *
 * algorithms
 * Easy (43.77%)
 * Likes:    218
 * Dislikes: 0
 * Total Accepted:    67.5K
 * Total Submissions: 139.7K
 * Testcase Example:  '1'
 *
 * 给定一个整数，编写一个函数来判断它是否是 2 的幂次方。
 *
 * 示例 1:
 *
 * 输入: 1
 * 输出: true
 * 解释: 2^0 = 1
 *
 * 示例 2:
 *
 * 输入: 16
 * 输出: true
 * 解释: 2^4 = 16
 *
 * 示例 3:
 *
 * 输入: 218
 * 输出: false
 *
 */

// @lc code=start
// math
var isPowerOfTwo = function (n: number): boolean {
  if (n <= 0) return false;
  while (n % 2 === 0) {
    n /= 2;
  }
  return n === 1;
};

// bit manipulation
var isPowerOfTwo = function (n: number): boolean {
  return n > 0 && (n & (n - 1)) == 0;
};
// @lc code=end
