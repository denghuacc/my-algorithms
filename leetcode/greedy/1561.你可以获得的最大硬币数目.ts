/*
 * @lc app=leetcode.cn id=1561 lang=typescript
 *
 * [1561] 你可以获得的最大硬币数目
 *
 * https://leetcode.cn/problems/maximum-number-of-coins-you-can-get/description/
 *
 * algorithms
 * Medium (78.69%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    28.6K
 * Total Submissions: 34.7K
 * Testcase Example:  '[2,4,1,2,7,8]'
 *
 * 有 3n 堆数目不一的硬币，你和你的朋友们打算按以下方式分硬币：
 *
 *
 * 每一轮中，你将会选出 任意 3 堆硬币（不一定连续）。
 * Alice 将会取走硬币数量最多的那一堆。
 * 你将会取走硬币数量第二多的那一堆。
 * Bob 将会取走最后一堆。
 * 重复这个过程，直到没有更多硬币。
 *
 *
 * 给你一个整数数组 piles ，其中 piles[i] 是第 i 堆中硬币的数目。
 *
 * 返回你可以获得的最大硬币数目。
 *
 *
 *
 * 示例 1：
 *
 * 输入：piles = [2,4,1,2,7,8]
 * 输出：9
 * 解释：选出 (2, 7, 8) ，Alice 取走 8 枚硬币的那堆，你取走 7 枚硬币的那堆，Bob 取走最后一堆。
 * 选出 (1, 2, 4) , Alice 取走 4 枚硬币的那堆，你取走 2 枚硬币的那堆，Bob 取走最后一堆。
 * 你可以获得的最大硬币数目：7 + 2 = 9.
 * 考虑另外一种情况，如果选出的是 (1, 2, 8) 和 (2, 4, 7) ，你就只能得到 2 + 4 = 6 枚硬币，这不是最优解。
 *
 *
 * 示例 2：
 *
 * 输入：piles = [2,4,5]
 * 输出：4
 *
 *
 * 示例 3：
 *
 * 输入：piles = [9,8,7,6,5,1,2,3,4]
 * 输出：18
 *
 *
 *
 *
 * 提示：
 *
 *
 * 3 <= piles.length <= 10^5
 * piles.length % 3 == 0
 * 1 <= piles[i] <= 10^4
 *
 *
 */

// @lc code=start
function maxCoins(piles: number[]): number {
  const n = piles.length;
  piles.sort((a, b) => b - a);
  let res = 0;
  let i = 0;
  let j = n - 1;
  while (i < j) {
    if (i % 2 === 1) {
      res += piles[i];
      j--;
    }
    i++;
  }
  return res;
}
// @lc code=end
