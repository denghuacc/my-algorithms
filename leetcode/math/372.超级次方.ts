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
  const base = 1337;
  if (b.length === 0) return 1;
  const last = b.pop()!;
  const p1 = myPow(a, last);
  const p2 = myPow(superPow(a, b), 10);
  return (p1 * p2) % base;

  function myPow(a: number, k: number): number {
    a %= base;
    let ret = 1;
    for (let i = 0; i < k; i++) {
      ret *= a;
      ret %= base;
    }
    return ret;
  }
};

// math2
var superPow = function (a: number, b: number[]): number {
  const base = 1337;
  if (b.length === 0) return 1;
  const last = b.pop()!;
  const p1 = myPow(a, last);
  const p2 = myPow(superPow(a, b), 10);
  return (p1 * p2) % base;

  // optimize
  function myPow(a: number, k: number): number {
    if (k === 0) return 1;
    a %= base;

    // k 是奇数
    if (k % 2 === 1) {
      return (a * myPow(a, k - 1)) % base;
    }
    // k 是偶数
    else {
      const sub = myPow(a, k / 2);
      return (sub * sub) % base;
    }
  }
};
// @lc code=end
