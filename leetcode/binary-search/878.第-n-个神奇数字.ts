/*
 * @lc app=leetcode.cn id=878 lang=typescript
 *
 * [878] 第 N 个神奇数字
 *
 * https://leetcode.cn/problems/nth-magical-number/description/
 *
 * algorithms
 * Hard (30.37%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    9.5K
 * Total Submissions: 27.3K
 * Testcase Example:  '1\n2\n3'
 *
 * 一个正整数如果能被 a 或 b 整除，那么它是神奇的。
 *
 * 给定三个整数 n , a , b ，返回第 n 个神奇的数字。因为答案可能很大，所以返回答案 对 10^9 + 7 取模 后的值。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 1, a = 2, b = 3
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 4, a = 2, b = 3
 * 输出：6
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 * 2 <= a, b <= 4 * 10^4
 *
 *
 *
 *
 */

// @lc code=start
// binary search cv
function nthMagicalNumber(n: number, a: number, b: number): number {
  const MOD = 1e9 + 7;
  let l = Math.min(a, b);
  let r = n * l;
  const c = lcm(a, b);
  while (l <= r) {
    const mid = l + Math.floor((r - l) / 2);
    const cnt = Math.floor(mid / a) + Math.floor(mid / b) - Math.floor(mid / c);
    if (cnt >= n) {
      r = mid - 1;
    } else {
      l = mid + 1;
    }
  }
  return (r + 1) % MOD;

  function lcm(a: number, b: number): number {
    return Math.floor((a * b) / gcd(a, b));
  }

  function gcd(a: number, b: number): number {
    return b !== 0 ? gcd(b, a % b) : a;
  }
}
// @lc code=end
