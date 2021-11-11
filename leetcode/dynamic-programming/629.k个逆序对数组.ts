/*
 * @lc app=leetcode.cn id=629 lang=typescript
 *
 * [629] K个逆序对数组
 *
 * https://leetcode-cn.com/problems/k-inverse-pairs-array/description/
 *
 * algorithms
 * Hard (39.14%)
 * Likes:    43
 * Dislikes: 0
 * Total Accepted:    1.2K
 * Total Submissions: 3.3K
 * Testcase Example:  '3\n0'
 *
 * 给出两个整数 n 和 k，找出所有包含从 1 到 n 的数字，且恰好拥有 k 个逆序对的不同的数组的个数。
 *
 * 逆序对的定义如下：对于数组的第i个和第 j个元素，如果满i < j且 a[i] > a[j]，则其为一个逆序对；否则不是。
 *
 * 由于答案可能很大，只需要返回 答案 mod 10^9 + 7 的值。
 *
 * 示例 1:
 *
 *
 * 输入: n = 3, k = 0
 * 输出: 1
 * 解释:
 * 只有数组 [1,2,3] 包含了从1到3的整数并且正好拥有 0 个逆序对。
 *
 *
 * 示例 2:
 *
 *
 * 输入: n = 3, k = 1
 * 输出: 2
 * 解释:
 * 数组 [1,3,2] 和 [2,1,3] 都有 1 个逆序对。
 *
 *
 * 说明:
 *
 *
 * n 的范围是 [1, 1000] 并且 k 的范围是 [0, 1000]。
 *
 *
 */

// @lc code=start
// dp
var kInversePairs = function (n: number, k: number): number {
  const MOD = 1e9 + 7;
  const dp = Array.from(new Array(2), () => new Array(k + 1).fill(0));
  dp[0][0] = 1;

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      const cur = i & 1;
      const prev = cur ^ 1;
      dp[cur][j] = 0;
      if (j > 0) {
        dp[cur][j] = dp[cur][j - 1];
      }
      if (j >= i) {
        dp[cur][j] -= dp[prev][j - i];
      }
      dp[cur][j] += dp[prev][j];
      if (dp[cur][j] < 0) {
        dp[cur][j] += MOD;
      } else if (dp[cur][j] >= MOD) {
        dp[cur][j] -= MOD;
      }
    }
  }

  return dp[n & 1][k];
};
// @lc code=end
