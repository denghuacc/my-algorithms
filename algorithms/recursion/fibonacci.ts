// 斐波那契数列：这个数列从第3项开始，每一项都等于前两项之和。
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...]

// recursive
export function fibonacci(n: number): number {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// iterative
export function fibonacciIterative(n: number): number {
  if (n < 1) return 0;
  if (n === 2 || n === 1) return 1;

  let pre = 1;
  let cur = 1;

  for (let i = 3; i <= n; i++) {
    let sum = pre + cur;
    pre = cur;
    cur = sum;
  }

  return cur;
}

// memorization
export function fibonacciMemoization(n: number): number {
  if (n < 1) return 0;
  const memo = [0, 1];
  return fibonacciMemo(n);

  function fibonacciMemo(num: number): number {
    if (memo[num] != null) return memo[num];
    return (memo[num] = fibonacciMemo(num - 1) + fibonacciMemo(num - 2));
  }
}

// dp
// 1, n = 1,2;
// f(n -1) + f(n-2), n > 2;
export function fibonacciDP(n: number): number {
  if (n < 1) return 0;
  const dp = Array(n + 1).fill(0);
  dp[1] = dp[2] = 1;
  for (let i = 3; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
