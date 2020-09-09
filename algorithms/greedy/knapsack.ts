// 背包问题（贪心算法版本）
// 给定一个固定大小、能够携重 W 的背包
// 以及一组有价值和重量的物品，找出一个最佳解决方案
// 使得装入背包的物品总重量不超过 W，且总价值最大

export function knapsack(
  capacity: number,
  weights: number[],
  values: number[]
): number {
  const n = values.length;
  let load = 0;
  let val = 0;

  for (let i = 0; i < n && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i];
      load += weights[i];
    } else {
      const r = Math.floor((capacity - load) / weights[i]);
      val += r * values[i];
      load += weights[i];
    }
  }
  return val;
}
