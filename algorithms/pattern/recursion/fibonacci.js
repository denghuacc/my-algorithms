// 斐波那契数列：这个数列从第3项开始，每一项都等于前两项之和。
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...]

/**
 * @name fibonacci
 * @param { Number } n
 */
function fibonacci(n) {
  if (n === 0) return 0
  if (n === 1) return 1

  return fibonacci(n - 1) + fibonacci(n - 2)
}

// test
console.log(fibonacci(1)) // 1
console.log(fibonacci(2)) // 1
console.log(fibonacci(10)) // 55
