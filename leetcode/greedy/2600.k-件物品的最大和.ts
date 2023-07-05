/*
 * @lc app=leetcode.cn id=2600 lang=typescript
 *
 * [2600] K 件物品的最大和
 *
 * https://leetcode.cn/problems/k-items-with-the-maximum-sum/description/
 *
 * algorithms
 * Easy (65.86%)
 * Likes:    22
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 25.7K
 * Testcase Example:  '3\n2\n0\n2'
 *
 * 袋子中装有一些物品，每个物品上都标记着数字 1 、0 或 -1 。
 *
 * 给你四个非负整数 numOnes 、numZeros 、numNegOnes 和 k 。
 *
 * 袋子最初包含：
 *
 *
 * numOnes 件标记为 1 的物品。
 * numZeroes 件标记为 0 的物品。
 * numNegOnes 件标记为 -1 的物品。
 *
 *
 * 现计划从这些物品中恰好选出 k 件物品。返回所有可行方案中，物品上所标记数字之和的最大值。
 *
 *
 *
 * 示例 1：
 *
 * 输入：numOnes = 3, numZeros = 2, numNegOnes = 0, k = 2
 * 输出：2
 * 解释：袋子中的物品分别标记为 {1, 1, 1, 0, 0} 。取 2 件标记为 1 的物品，得到的数字之和为 2 。
 * 可以证明 2 是所有可行方案中的最大值。
 *
 * 示例 2：
 *
 * 输入：numOnes = 3, numZeros = 2, numNegOnes = 0, k = 4
 * 输出：3
 * 解释：袋子中的物品分别标记为 {1, 1, 1, 0, 0} 。取 3 件标记为 1 的物品，1 件标记为 0 的物品，得到的数字之和为 3 。
 * 可以证明 3 是所有可行方案中的最大值。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= numOnes, numZeros, numNegOnes <= 50
 * 0 <= k <= numOnes + numZeros + numNegOnes
 *
 *
 */

// @lc code=start
var kItemsWithMaximumSum = function (
  numOnes: number,
  numZeros: number,
  numNegOnes: number,
  k: number
): number {
  let res = 0;
  while (k > 0) {
    while (k > 0 && numOnes > 0) {
      res += 1;
      numOnes--;
      k--;
    }
    while (k > 0 && numZeros > 0) {
      numZeros--;
      k--;
    }
    while (k > 0 && numNegOnes > 0) {
      res--;
      numNegOnes--;
      k--;
    }
  }
  return res;
};

// greedy
var kItemsWithMaximumSum = function (
  numOnes: number,
  numZeros: number,
  numNegOnes: number,
  k: number
): number {
  if (k <= numOnes) {
    return k;
  } else if (k <= numOnes + numZeros) {
    return numOnes;
  } else {
    return numOnes - (k - numOnes - numZeros);
  }
};
// @lc code=end
