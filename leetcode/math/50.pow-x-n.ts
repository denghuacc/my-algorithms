/*
 * @lc app=leetcode.cn id=50 lang=typescript
 *
 * [50] Pow(x, n)
 *
 * https://leetcode-cn.com/problems/powx-n/description/
 *
 * algorithms
 * Medium (31.08%)
 * Likes:    314
 * Dislikes: 0
 * Total Accepted:    69.3K
 * Total Submissions: 201K
 * Testcase Example:  '2.00000\n10'
 *
 * 实现 pow(x, n) ，即计算 x 的 n 次幂函数。
 *
 * 示例 1:
 *
 * 输入: 2.00000, 10
 * 输出: 1024.00000
 *
 *
 * 示例 2:
 *
 * 输入: 2.10000, 3
 * 输出: 9.26100
 *
 *
 * 示例 3:
 *
 * 输入: 2.00000, -2
 * 输出: 0.25000
 * 解释: 2^-2 = 1/2^2 = 1/4 = 0.25
 *
 * 说明:
 *
 *
 * -100.0 < x < 100.0
 * n 是 32 位有符号整数，其数值范围是 [−2^31, 2^31 − 1] 。
 *
 *
 */

// @lc code=start
var myPow = function (x: number, n: number): number {
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  return fastPow(x, n);

  function fastPow(x: number, n: number): number {
    if (n === 0) return 1.0;
    const half = fastPow(x, Math.floor(n / 2));

    if (n % 2 === 0) {
      return half * half;
    } else {
      return half * half * x;
    }
  }
};
// @lc code=end
