// 最少硬币找零（动态规划版本）
// 最少硬币找零问题是给出要找零的钱数
// 以及可用的硬币面额 d1…dn 及其数量，找到所需的最少的硬币个数。

// recursive
export function minCoinChange(coins: number[], amount: number) {
  const cache: number[][] = [];
  return makeChange(amount);

  function makeChange(amount: number) {
    if (!amount) return [];
    if (cache[amount]) return cache[amount];

    let min: number[] = [];
    let newMin: number[] = [];
    let newAmount: number;

    for (let i = 0; i < coins.length; i++) {
      const coin = coins[i];
      newAmount = amount - coin;
      if (newAmount >= 0) newMin = makeChange(newAmount);
      if (
        newAmount >= 0 &&
        (newMin.length < min.length - 1 || min.length === 0) &&
        (newMin.length > 0 || newAmount === 0)
      ) {
        min = [coin].concat(newMin);
        // console.log(`new Min ${min} for ${amount}`)
      }
    }

    return (cache[amount] = min);
  }
}
