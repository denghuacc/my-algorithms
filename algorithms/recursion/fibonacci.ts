// 斐波那契数列：这个数列从第3项开始，每一项都等于前两项之和。
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...]

export function fibonacci(n: number): number {
  if (n < 1) return 0
  if (n <= 2) return 1
  return fibonacci(n - 1) + fibonacci(n - 2)
}

export function fibonacciIterative(n: number): number {
  if (n < 1) return 0
  let fibNMinus2 = 0
  let fibNMinus1 = 1
  let fibN = n
  for (let i = 2; i <= n; i++) {
    // n >= 2
    fibN = fibNMinus1 + fibNMinus2 // f(n-1) + f(n-2)
    fibNMinus2 = fibNMinus1
    fibNMinus1 = fibN
  }
  return fibN
}

export function fibonacciMemoization(n: number): number {
  if (n < 1) return 0
  const memo = [0, 1]
  return fibonacciMemo(n)

  function fibonacciMemo(num: number): number {
    if (memo[num] != null) return memo[num]
    return (memo[num] = fibonacciMemo(num - 1) + fibonacciMemo(num - 2))
  }
}
