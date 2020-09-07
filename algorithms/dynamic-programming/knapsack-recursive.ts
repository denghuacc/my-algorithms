// 背包问题（动态规划递归版本）
// 给定一个固定大小、能够携重 W 的背包
// 以及一组有价值和重量的物品，找出一个最佳解决方案
// 使得装入背包的物品总重量不超过 W，且总价值最大

export function knapsackRecursive(
  capacity: number,
  weights: number[],
  values: number[],
  n: number
): number {
  if (n === 0 || capacity === 0) {
    return 0;
  }

  if (weights[n - 1] > capacity) {
    return knapsackRecursive(capacity, weights, values, n - 1);
  } else {
    const a: number =
      values[n - 1] +
      knapsackRecursive(capacity - weights[n - 1], weights, values, n - 1);
    const b: number = knapsackRecursive(capacity, weights, values, n - 1);
    return Math.max(a, b);
  }
}
