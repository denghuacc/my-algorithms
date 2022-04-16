/*
 * @lc app=leetcode.cn id=479 lang=typescript
 *
 * [479] 最大回文数乘积
 *
 * https://leetcode-cn.com/problems/largest-palindrome-product/description/
 *
 * algorithms
 * Hard (44.18%)
 * Likes:    66
 * Dislikes: 0
 * Total Accepted:    8K
 * Total Submissions: 14.3K
 * Testcase Example:  '2'
 *
 * 给定一个整数 n ，返回 可表示为两个 n 位整数乘积的 最大回文整数 。因为答案可能非常大，所以返回它对 1337 取余 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入：n = 2
 * 输出：987
 * 解释：99 x 91 = 9009, 9009 % 1337 = 987
 *
 *
 * 示例 2:
 *
 *
 * 输入： n = 1
 * 输出： 9
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= n <= 8
 *
 *
 */

// @lc code=start
// math
function largestPalindrome(n: number): number {
  if (n === 1) {
    return 9;
  }
  const upper = 10 ** n - 1;
  for (let left = upper; left > upper / 10; left--) {
    let right = String(left).split("").reverse().join("");
    let p = BigInt(String(left) + right);
    let x = BigInt(upper);
    while (x * x >= p) {
      if (p % x === BigInt(0)) {
        return Number(p % BigInt(1337));
      }
      x--;
    }
  }
  return upper % 1337;
}
// @lc code=end
