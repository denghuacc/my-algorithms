/*
 * @lc app=leetcode.cn id=1049 lang=typescript
 *
 * [1049] 最后一块石头的重量 II
 *
 * https://leetcode-cn.com/problems/last-stone-weight-ii/description/
 *
 * algorithms
 * Medium (54.24%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    15.5K
 * Total Submissions: 27.3K
 * Testcase Example:  '[2,7,4,1,8,1]'
 *
 * 有一堆石头，用整数数组 stones 表示。其中 stones[i] 表示第 i 块石头的重量。
 *
 * 每一回合，从中选出任意两块石头，然后将它们一起粉碎。假设石头的重量分别为 x 和 y，且 x 。那么粉碎的可能结果如下：
 *
 *
 * 如果 x == y，那么两块石头都会被完全粉碎；
 * 如果 x != y，那么重量为 x 的石头将会完全粉碎，而重量为 y 的石头新重量为 y-x。
 *
 *
 * 最后，最多只会剩下一块 石头。返回此石头 最小的可能重量 。如果没有石头剩下，就返回 0。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：stones = [2,7,4,1,8,1]
 * 输出：1
 * 解释：
 * 组合 2 和 4，得到 2，所以数组转化为 [2,7,1,8,1]，
 * 组合 7 和 8，得到 1，所以数组转化为 [2,1,1,1]，
 * 组合 2 和 1，得到 1，所以数组转化为 [1,1,1]，
 * 组合 1 和 1，得到 0，所以数组转化为 [1]，这就是最优值。
 *
 *
 * 示例 2：
 *
 *
 * 输入：stones = [31,26,33,21,40]
 * 输出：5
 *
 *
 * 示例 3：
 *
 *
 * 输入：stones = [1,2]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 */

// @lc code=start
// dp
var lastStoneWeightII = function (stones: number[]): number {
  const sum = stones.reduce((acc, i) => acc + i, 0);
  const n = stones.length;
  const m = Math.floor(sum / 2);
  // dp[i+1][j] -> 前 i 个石头能否凑出重量 j
  const dp: boolean[][] = Array.from(new Array(n + 1), () =>
    new Array(m + 1).fill(false)
  );
  dp[0][0] = true;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j <= m; j++) {
      if (j < stones[i]) {
        dp[i + 1][j] = dp[i][j];
      } else {
        dp[i + 1][j] = dp[i][j] || dp[i][j - stones[i]];
      }
    }
  }
  for (let j = m; ; j--) {
    if (dp[n][j]) {
      return sum - 2 * j;
    }
  }
};

// dp2
var lastStoneWeightII = function (stones: number[]): number {
  const sum = stones.reduce((acc, i) => acc + i, 0);
  const n = stones.length;
  const m = Math.floor(sum / 2);
  const dp: boolean[] = new Array(m + 1).fill(false);
  dp[0] = true;
  for (const weight of stones) {
    for (let j = m; j >= weight; j--) {
      dp[j] = dp[j] || dp[j - weight];
    }
  }
  for (let j = m; ; j--) {
    if (dp[j]) {
      return sum - 2 * j;
    }
  }
};
// @lc code=end
