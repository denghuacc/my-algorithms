/*
 * @lc app=leetcode.cn id=2427 lang=typescript
 *
 * [2427] 公因子的数目
 *
 * https://leetcode.cn/problems/number-of-common-factors/description/
 *
 * algorithms
 * Easy (81.03%)
 * Likes:    40
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 28.4K
 * Testcase Example:  '12\n6'
 *
 * 给你两个正整数 a 和 b ，返回 a 和 b 的 公 因子的数目。
 *
 * 如果 x 可以同时整除 a 和 b ，则认为 x 是 a 和 b 的一个 公因子 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：a = 12, b = 6
 * 输出：4
 * 解释：12 和 6 的公因子是 1、2、3、6 。
 *
 *
 * 示例 2：
 *
 * 输入：a = 25, b = 30
 * 输出：2
 * 解释：25 和 30 的公因子是 1、5 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= a, b <= 1000
 *
 *
 */

// @lc code=start
var commonFactors = function (a: number, b: number): number {
  let res = 0;
  const n = Math.min(a, b);
  for (let i = 1; i <= n; i++) {
    if (a % i === 0 && b % i === 0) {
      res++;
    }
  }
  return res;
};

var commonFactors = function (a: number, b: number): number {
  let res = 0;
  const c = gcd(a, b);
  for (let i = 1; i * i <= c; i++) {
    if (c % i === 0) {
      res++;
      if (i * i !== c) {
        res++;
      }
    }
  }
  return res;

  function gcd(a: number, b: number): number {
    return b !== 0 ? gcd(b, a % b) : a;
  }
};
// @lc code=end
