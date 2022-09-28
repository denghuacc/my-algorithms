/**
 * 
有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21。

示例 1:

输入: k = 5

输出: 9

来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/get-kth-magic-number-lcci
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 */

// dp
function getKthMagicNumber(k: number): number {
  const dp = new Array(k + 1).fill(0);
  dp[1] = 1;
  let p3 = 1;
  let p5 = 1;
  let p7 = 1;

  for (let i = 2; i <= k; i++) {
    const num3 = dp[p3] * 3;
    const num5 = dp[p5] * 5;
    const num7 = dp[p7] * 7;
    dp[i] = Math.min(num3, num5, num7);
    if (dp[i] === num3) {
      p3++;
    }
    if (dp[i] === num5) {
      p5++;
    }
    if (dp[i] === num7) {
      p7++;
    }
  }

  return dp[k];
}
