/*
 * @lc app=leetcode.cn id=372 lang=typescript
 *
 * [372] 超级次方
 *
 * https://leetcode-cn.com/problems/super-pow/description/
 *
 * algorithms
 * Medium (30.45%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    5.5K
 * Total Submissions: 13.1K
 * Testcase Example:  '2\n[3]'
 *
 * 你的任务是计算 a^b 对 1337 取模，a 是一个正整数，b 是一个非常大的正整数且会以数组形式给出。
 *
 * 示例 1:
 *
 * 输入: a = 2, b = [3]
 * 输出: 8
 *
 *
 * 示例 2:
 *
 * 输入: a = 2, b = [1,0]
 * 输出: 1024
 *
 */

// @lc code=start
// math
var superPow = function (a: number, b: number[]): number {
  const MOD = BigInt(1337);
  let res = BigInt(1);
  for (let i = b.length - 1; i >= 0; i--) {
    res = (res * pow(BigInt(a), b[i])) % MOD;
    a = Number(pow(BigInt(a), 10));
  }
  return Number(res);

  function pow(x: bigint, n: number): bigint {
    let res = BigInt(1);
    while (n !== 0) {
      if (n % 2 !== 0) {
        res = (res * x) % MOD;
      }
      x = (x * x) % MOD;
      n = Math.floor(n / 2);
    }
    return res;
  }
};
// @lc code=end
