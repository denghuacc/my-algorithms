/*
 * @lc app=leetcode.cn id=509 lang=typescript
 *
 * [509] Fibonacci Number
 *
 * https://leetcode-cn.com/problems/fibonacci-number/description/
 *
 * algorithms
 * Easy (64.27%)
 * Likes:    112
 * Dislikes: 0
 * Total Accepted:    49.5K
 * Total Submissions: 74.2K
 * Testcase Example:  '2'
 *
 * 斐波那契数，通常用 F(n) 表示，形成的序列称为斐波那契数列。该数列由 0 和 1 开始，后面的每一项数字都是前面两项数字的和。也就是：
 *
 * F(0) = 0,   F(1) = 1
 * F(N) = F(N - 1) + F(N - 2), 其中 N > 1.
 *
 *
 * 给定 N，计算 F(N)。
 *
 *
 *
 * 示例 1：
 *
 * 输入：2
 * 输出：1
 * 解释：F(2) = F(1) + F(0) = 1 + 0 = 1.
 *
 *
 * 示例 2：
 *
 * 输入：3
 * 输出：2
 * 解释：F(3) = F(2) + F(1) = 1 + 1 = 2.
 *
 *
 * 示例 3：
 *
 * 输入：4
 * 输出：3
 * 解释：F(4) = F(3) + F(2) = 2 + 1 = 3.
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 ≤ N ≤ 30
 *
 *
 */

// @lc code=start
/**
 * @param {number} N
 * @return {number}
 * recursive
 */
var fib = function (N: number): number {
  if (N <= 1) return N;
  return fib(N - 1) + fib(N - 2);
};

// memoize bottom -> top
var fib = function (N: number): number {
  if (N <= 1) return N;
  return memoize(N);

  function memoize(N: number) {
    const cache = [0, 1];

    for (let i = 2; i <= N; i++) {
      cache[i] = cache[i - 1] + cache[i - 2];
    }

    return cache[N];
  }
};

// memoize top -> bottom
var fib = function (N: number): number {
  if (N <= 1) return N;
  const cache = [0, 1];
  return memoize(N);

  function memoize(N: number): number {
    if (cache[N] != null) return cache[N];
    cache[N] = memoize(N - 1) + memoize(N - 2);
    return memoize(N);
  }
};

// iterative
var fib = function (N: number): number {
  if (N <= 1) return N;
  if (N === 2) return 1;

  let cur = 0;
  let prev1 = 1;
  let prev2 = 1;

  for (let i = 3; i <= N; i++) {
    cur = prev1 + prev2;
    prev1 = prev2;
    prev2 = cur;
  }

  return cur;
};

// Math
var fib = function (N: number): number {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  return Math.round(Math.pow(goldenRatio, N) / Math.sqrt(5));
};
// @lc code=end
