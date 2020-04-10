/**
 * @name MinCoinChange 最少硬币找零 【使用贪心算法】
 * @description 最少硬币找零问题是给出要找零的钱数，
 * 以及可用的硬币面额 d1…dn 及其数量，找到所需的最少的硬币个数。
 * 比起动态规划算法而言，贪心算法更简单、更快。然而，如我们所见，它并不总是得到最优答案。
 * 但是综合来看，它相对执行时间来说，输出了一个可以接受的解。
 * @param { Array<Number> } coins
 * @method makeChange
 */
class MinCoinChange {
  constructor(coins) {
    this.coins = coins
  }

  makeChange(amount) {
    let change = [],
      total = 0

    for (let i = this.coins.length; i >= 0; i--) {
      const coin = this.coins[i]
      while (total + coin <= amount) {
        change.push(coin)
        total += coin
      }
    }

    return change
  }
}

// test
const minCoinChange = new MinCoinChange([1, 5, 10, 25])
console.log(minCoinChange.makeChange(36)) // [ 25, 10, 1 ] 【动态规划】是 [ 1, 10, 25 ] 结果一样
console.log(new MinCoinChange([1, 3, 4]).makeChange(6)) // [ 4, 1, 1 ]；【动态规划】是 [ 3 , 3 ] 最优解
