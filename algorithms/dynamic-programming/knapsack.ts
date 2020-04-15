/**
 * @name knapsack 背包 【使用动态规划】
 * @description 背包问题
 * 给定一个固定大小、能够携重 W 的背包，
 * 以及一组有价值和重量的物品，找出一个最佳解决方案，
 * 使得装入背包的物品总重量不超过 W，且总价值最大。
 */
function knapsack(
  capacity: number,
  weights: Array<number>,
  values: Array<number>
) {
  const ks: Array<Array<number>> = []
  const num = values.length

  for (let i = 0; i <= num; i++) {
    ks[i] = []
  }

  for (let i = 0; i <= num; i++) {
    for (let j = 0; j <= capacity; j++) {
      if (i === 0 || j === 0) {
        ks[i][j] = 0
      } else if (weights[i - 1] <= j) {
        const a = values[i - 1] + ks[i - 1][j - weights[i - 1]]
        const b = ks[i - 1][j]
        ks[i][j] = a > b ? a : b
      } else {
        ks[i][j] = ks[i - 1][j]
      }
    }
  }

  findValues(num, capacity, ks, weights, values) // 打印具体的物品
  return ks[num][capacity]
}

/**
 * @name findValues 打印具体的物品
 * @description knapsack只输出值，不会显示物品的信息
 * 这个函数会显示物品的信息
 */
function findValues(
  num: number,
  capacity: number,
  ks: Array<Array<number>>,
  weights: Array<number>,
  values: Array<number>
) {
  console.log('解决方案包含以下物品：')
  let i = num,
    j = capacity

  while (i > 0 && j > 0) {
    if (ks[i][j] !== ks[i - 1][j]) {
      console.log(`物品${i}，重量：${weights[i - 1]}，价值：${values[i - 1]}`)
      i--
      j = j - ks[i][j]
    } else {
      i--
    }
  }
}

// test
const values = [3, 4, 5],
  weights = [2, 3, 4],
  capacity = 5
console.log(knapsack(capacity, weights, values))
// 解决方案包含以下物品：
// 物品2，重量：3，价值：4
// 物品1，重量：2，价值：3
// 7
