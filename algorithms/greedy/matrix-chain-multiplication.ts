// 矩阵链相乘 (贪心算法版本)
// 矩阵链相乘是另一个可以用动态规划解决的著名问题。
// 这个问题是要找出一组矩阵相乘的最佳方式（顺序）

export function matrixChainMultiplication(
  p: number[],
  i = 1,
  j = p.length - 1
): number {
  if (i === j) {
    return 0;
  }

  let min = Number.MAX_SAFE_INTEGER;

  for (let k = i; k < j; k++) {
    const count =
      matrixChainMultiplication(p, i, k) +
      matrixChainMultiplication(p, k + 1, j) +
      p[i - 1] * p[k] * p[j];

    if (count < min) {
      min = count;
    }
  }

  return min;
}
