/*
 * @lc app=leetcode.cn id=29 lang=typescript
 *
 * [29] 两数相除
 *
 * https://leetcode-cn.com/problems/divide-two-integers/description/
 *
 * algorithms
 * Medium (17.27%)
 * Likes:    336
 * Dislikes: 0
 * Total Accepted:    46.6K
 * Total Submissions: 237.2K
 * Testcase Example:  '10\n3'
 *
 * 给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
 *
 * 返回被除数 dividend 除以除数 divisor 得到的商。
 *
 * 整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) =
 * -2
 *
 *
 *
 * 示例 1:
 *
 * 输入: dividend = 10, divisor = 3
 * 输出: 3
 * 解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
 *
 * 示例 2:
 *
 * 输入: dividend = 7, divisor = -3
 * 输出: -2
 * 解释: 7/-3 = truncate(-2.33333..) = -2
 *
 *
 *
 * 提示：
 *
 *
 * 被除数和除数均为 32 位有符号整数。
 * 除数不为 0。
 * 假设我们的环境只能存储 32 位有符号整数，其数值范围是 [−2^31,  2^31 − 1]。本题中，如果除法结果溢出，则返回 2^31 − 1。
 *
 *
 */

// @lc code=start
// math
var divide = function (dividend: number, divisor: number): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);

  if (dividend === 0) return 0;
  if (divisor === 1) return dividend;
  if (divisor === -1) {
    if (dividend > MIN) {
      return -dividend;
    }
    return MAX;
  }

  let a = dividend;
  let b = divisor;
  let sign = 1;

  if ((a > 0 && b < 0) || (a < 0 && b > 0)) {
    sign = -1;
  }

  a = a > 0 ? a : -a;
  b = b > 0 ? b : -b;

  const ret = div(a, b);

  if (sign > 0) return ret > MAX ? MAX : ret;

  return -ret;

  function div(a: number, b: number): number {
    if (a < b) return 0;
    let count = 1;
    let tb = b;
    while (tb * 2 <= a) {
      count = count * 2;
      tb = tb * 2;
    }
    return count + div(a - tb, b);
  }
};

// binary search
var divide = function (dividend: number, divisor: number): number {
  const MAX = 2 ** 31 - 1;
  const MIN = -(2 ** 31);

  if (dividend === MIN) {
    if (divisor === 1) {
      return MIN;
    }
    if (divisor === -1) {
      return MAX;
    }
  }

  if (divisor === MIN) {
    return dividend === MIN ? 1 : 0;
  }

  if (divisor === 0) {
    return 0;
  }

  let rev = false;
  if (dividend > 0) {
    dividend = -dividend;
    rev = !rev;
  }
  if (divisor > 0) {
    divisor = -divisor;
    rev = !rev;
  }

  const candidates: number[] = [];
  candidates.push(divisor);
  let index = 0;
  while (candidates[index] >= dividend - candidates[index]) {
    candidates.push(candidates[index] + candidates[index]);
    ++index;
  }
  let ret = 0;
  for (let i = candidates.length - 1; i >= 0; i--) {
    if (candidates[i] >= dividend) {
      ret += 1 << i;
      dividend -= candidates[i];
    }
  }
  return rev ? -ret : ret;
};
// @lc code=end
