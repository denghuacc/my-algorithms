// 背包问题（动态规划版本）
// 给定一个固定大小、能够携重 W 的背包
// 以及一组有价值和重量的物品，找出一个最佳解决方案
// 使得装入背包的物品总重量不超过 W，且总价值最大

export function knapsack(
  capacity: number,
  weights: number[],
  values: number[],
  n: number
) {
  const ks: number[][] = [];

  for (let i = 0; i <= n; i++) {
    ks[i] = [];
  }

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        ks[i][j] = 0;
      } else if (weights[i - 1] <= j) {
        const a = values[i - 1] + ks[i - 1][j - weights[i - 1]];
        const b = ks[i - 1][j];
        ks[i][j] = a > b ? a : b;
      } else {
        ks[i][j] = ks[i - 1][j];
      }
    }
  }

  findValues(n, capacity, ks); // 打印具体的物品
  return ks[n][capacity];
}

function findValues(n: number, capacity: number, ks: number[][]) {
  console.log("解决方案包含以下物品：");
  let i = n;
  let j = capacity;

  while (i > 0 && j > 0) {
    if (ks[i][j] !== ks[i - 1][j]) {
      // console.log(`物品${i}，重量：${weights[i - 1]}，价值：${values[i - 1]}`)
      i--;
      j = j - ks[i][j];
    } else {
      i--;
    }
  }
}
