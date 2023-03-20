/*
 * @lc app=leetcode.cn id=1012 lang=typescript
 *
 * [1012] 至少有 1 位重复的数字
 *
 * https://leetcode.cn/problems/numbers-with-repeated-digits/description/
 *
 * algorithms
 * Hard (43.52%)
 * Likes:    160
 * Dislikes: 0
 * Total Accepted:    8.8K
 * Total Submissions: 18.3K
 * Testcase Example:  '20'
 *
 * 给定正整数 n，返回在 [1, n] 范围内具有 至少 1 位 重复数字的正整数的个数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 20
 * 输出：1
 * 解释：具有至少 1 位重复数字的正数（<= 20）只有 11 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 100
 * 输出：10
 * 解释：具有至少 1 位重复数字的正数（<= 100）有 11，22，33，44，55，66，77，88，99 和 100 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 1000
 * 输出：262
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 *
 *
 */

// @lc code=start
// math cv
function numDupDigitsAtMostN(n: number): number {
  const sn = "" + n;
  return n + 1 - f(0, sn, 0, true);

  function f(mask: number, sn: string, i: number, same: boolean): number {
    if (i === sn.length) {
      return 1;
    }
    let res = 0;
    const t = same ? sn[i].charCodeAt(0) - "0".charCodeAt(0) : 9;
    const c = bitCount(mask) + 1;
    for (let k = 0; k <= t; k++) {
      if ((mask & (1 << k)) !== 0) {
        continue;
      }
      if (same && k === t) {
        res += f(mask | (1 << t), sn, i + 1, true);
      } else if (mask === 0 && k === 0) {
        res += f(0, sn, i + 1, false);
      } else {
        res += A(sn.length - 1 - i, 10 - c);
      }
    }
    return res;
  }

  function A(x: number, y: number): number {
    let res = 1;
    for (let i = 0; i < x; i++) {
      res *= y--;
    }
    return res;
  }

  function bitCount(num: number): number {
    return num.toString(2).split("0").join("").length;
  }
}
// @lc code=end
