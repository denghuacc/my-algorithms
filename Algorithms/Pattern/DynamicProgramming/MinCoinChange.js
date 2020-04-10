/**
 * @name MinCoinChange 最少硬币找零 【使用动态规划】
 * @description 最少硬币找零问题是给出要找零的钱数，
 * 以及可用的硬币面额 d1…dn 及其数量，找到所需的最少的硬币个数。
 * @param { Array<Number> } coins
 * @method makeChange
 */
class MinCoinChange {
  constructor(coins) {
    this.coins = coins
    this.caches = {}
  }

  makeChange(amount) {
    if (!amount) {
      return []
    }

    if (this.caches[amount]) {
      return this.caches[amount]
    }

    let min = [],
      newMin,
      newAmount

    for (let i = 0; i < this.coins.length; i++) {
      const coin = this.coins[i]
      newAmount = amount - coin

      if (newAmount >= 0) {
        newMin = this.makeChange(newAmount)
      }

      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || !min.length) &&
        (newMin.length || !newAmount)
      ) {
        min = [coin].concat(newMin)
        console.log(`new Min ${min} for ${amount}`)
      }
    }

    return (this.caches[amount] = min)
  }
}

// test
const minCoinChange = new MinCoinChange([1, 5, 10, 25])
console.log(minCoinChange.makeChange(36)) // [ 1. 10, 25 ]
console.log(new MinCoinChange([1, 3, 4]).makeChange(6)) // [ 3, 3 ]
