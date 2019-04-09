/**
 * @name knapsack 背包 【使用贪心算法】
 * @description 背包问题
 * 给定一个固定大小、能够携重 W 的背包，
 * 以及一组有价值和重量的物品，找出一个最佳解决方案，
 * 使得装入背包的物品总重量不超过 W，且总价值最大。
 * @param { Array<Number> } capacity
 * @param { Array<Number> } weights
 * @param { Number } values
 * @param { Number } n
 * @returns { Number }
 */
function knapsack(capacity, weights, values) {
  const num = values.length
  let load = 0,
    val = 0

  for (let i = 0; i < num && load < capacity; i++) {
    if (weights[i] <= capacity - load) {
      val += values[i]
      load += weights[i]
    } else {
      const r = (capacity - load) / weights[i]
      val += r * values[i]
      load += weights[i]
    }
  }

  return val
}

// test
const values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5
console.log(knapsack(capacity, weights, values)) // 7
