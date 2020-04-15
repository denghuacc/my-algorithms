/**
 * @name factorial 阶乘
 * @param { Number } n
 */
function factorial(n: number): number {
  if (n <= 1) return 1
  return factorial(n - 1) * n
}

// test
console.log(factorial(1)) // 1
console.log(factorial(2)) // 2 (1 * 2 = 2)
console.log(factorial(5)) // 120 (1 * 2 * 3 * 4 * 5 = 120)
