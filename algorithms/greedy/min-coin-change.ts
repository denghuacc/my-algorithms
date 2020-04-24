// 最少硬币找零（贪心算法版本）
// @description 最少硬币找零问题是给出要找零的钱数，
// 以及可用的硬币面额 d1…dn 及其数量，找到所需的最少的硬币个数。
// 比起动态规划算法而言，贪心算法更简单、更快。然而，如我们所见，它并不总是得到最优答案。
// 但是综合来看，它相对执行时间来说，输出了一个可以接受的解。

export function minCoinChange(coins: number[], amount: number) {
  const change: number[] = []
  let total = 0
  for (let i = coins.length; i >= 0; i--) {
    const coin = coins[i]
    while (total + coin <= amount) {
      change.push(coin)
      total += coin
    }
  }
  return change
}
