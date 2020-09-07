// 背包问题（动态规划版本）
// 给定一个固定大小、能够携重 W 的背包
// 以及一组有价值和重量的物品，找出一个最佳解决方案
// 使得装入背包的物品总重量不超过 W，且总价值最大

export function knapsack(
  capacity: number,
  weights: number[],
  values: number[]
) {
  const n = values.length;

  // dp[i][j] -> 容量为 j 时获取 values 中的 i 的最大值
  const dp: number[][] = Array.from(new Array(n + 1), () =>
    new Array(capacity + 1).fill(0)
  );

  for (let i = 0; i <= n; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        dp[i][j] = 0;
      } else if (weights[i - 1] <= j) {
        dp[i][j] = Math.max(
          values[i - 1] + dp[i - 1][j - weights[i - 1]],
          dp[i - 1][j]
        );
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  findValues(n, capacity, dp); // 打印具体的物品
  return dp[n][capacity];
}

function findValues(n: number, capacity: number, dp: number[][]) {
  console.log("解决方案包含以下物品：");
  let i = n;
  let j = capacity;

  while (i > 0 && j > 0) {
    if (dp[i][j] !== dp[i - 1][j]) {
      // console.log(`物品${i}，重量：${weights[i - 1]}，价值：${values[i - 1]}`)
      i--;
      j = j - dp[i][j];
    } else {
      i--;
    }
  }
}
