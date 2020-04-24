// 阶乘

export function factorial(n: number): number | undefined {
  if (n < 0) return undefined
  if (n === 1 || n === 0) return 1
  return factorial(n - 1)! * n
}

export function factorialIterative(n: number): number | undefined {
  if (n < 0) return undefined
  let total = 1
  for (let num = n; num > 1; num--) {
    total *= num
  }
  return total
}
