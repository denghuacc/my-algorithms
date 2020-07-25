/*
 * @lc app=leetcode.cn id=204 lang=typescript
 *
 * [204] 计数质数
 *
 * https://leetcode-cn.com/problems/count-primes/description/
 *
 * algorithms
 * Easy (25.74%)
 * Likes:    384
 * Dislikes: 0
 * Total Accepted:    65.2K
 * Total Submissions: 190.1K
 * Testcase Example:  '10'
 *
 * 统计所有小于非负整数 n 的质数的数量。
 *
 * 示例:
 *
 * 输入: 10
 * 输出: 4
 * 解释: 小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。
 *
 *
 */

// @lc code=start
// brute force
var countPrimes = function (n: number): number {
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (isPrime(i)) count++;
  }
  return count;

  function isPrime(n: number): boolean {
    for (let i = 2; i * i <= n; i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
};

// Sieve of Eratosthenes
var countPrimes = function (n: number): number {
  const primes = new Array(n).fill(true);

  for (let i = 2; i * i < n; i++) {
    if (primes[i]) {
      for (let j = 2 * i; j < n; j += i) {
        primes[j] = false;
      }
    }
  }

  let count = 0;
  for (let i = 2; i < n; i++) {
    if (primes[i]) count++;
  }
  return count;
};
// @lc code=end
