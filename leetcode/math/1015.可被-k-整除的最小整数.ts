/*
 * @lc app=leetcode.cn id=1015 lang=typescript
 *
 * [1015] 可被 K 整除的最小整数
 *
 * https://leetcode.cn/problems/smallest-integer-divisible-by-k/description/
 *
 * algorithms
 * Medium (37.29%)
 * Likes:    98
 * Dislikes: 0
 * Total Accepted:    12.2K
 * Total Submissions: 28.4K
 * Testcase Example:  '1'
 *
 * 给定正整数 k ，你需要找出可以被 k 整除的、仅包含数字 1 的最 小 正整数 n 的长度。
 *
 * 返回 n 的长度。如果不存在这样的 n ，就返回-1。
 *
 * 注意： n 不符合 64 位带符号整数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：k = 1
 * 输出：1
 * 解释：最小的答案是 n = 1，其长度为 1。
 *
 * 示例 2：
 *
 *
 * 输入：k = 2
 * 输出：-1
 * 解释：不存在可被 2 整除的正整数 n 。
 *
 * 示例 3：
 *
 *
 * 输入：k = 3
 * 输出：3
 * 解释：最小的答案是 n = 111，其长度为 3。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= k <= 10^5
 *
 *
 */

// @lc code=start
function smallestRepunitDivByK(k: number): number {
  if (k % 2 === 0 || k % 5 === 0) {
    return -1;
  }
  let res = 1;
  let num = 1 % k;
  while (num !== 0) {
    num = (num * 10 + 1) % k;
    res++;
  }
  return res;
}
// @lc code=end
