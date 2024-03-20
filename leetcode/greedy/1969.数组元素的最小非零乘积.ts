/*
 * @lc app=leetcode.cn id=1969 lang=typescript
 *
 * [1969] 数组元素的最小非零乘积
 *
 * https://leetcode.cn/problems/minimum-non-zero-product-of-the-array-elements/description/
 *
 * algorithms
 * Medium (30.73%)
 * Likes:    56
 * Dislikes: 0
 * Total Accepted:    9.1K
 * Total Submissions: 23.3K
 * Testcase Example:  '1'
 *
 * 给你一个正整数 p 。你有一个下标从 1 开始的数组 nums ，这个数组包含范围 [1, 2^p - 1] 内所有整数的二进制形式（两端都
 * 包含）。你可以进行以下操作 任意 次：
 *
 *
 * 从 nums 中选择两个元素 x 和 y  。
 * 选择 x 中的一位与 y 对应位置的位交换。对应位置指的是两个整数 相同位置 的二进制位。
 *
 *
 * 比方说，如果 x = 1101 且 y = 0011 ，交换右边数起第 2 位后，我们得到 x = 1111 和 y = 0001 。
 *
 * 请你算出进行以上操作 任意次 以后，nums 能得到的 最小非零 乘积。将乘积对 10^9 + 7 取余 后返回。
 *
 * 注意：答案应为取余 之前 的最小值。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：p = 1
 * 输出：1
 * 解释：nums = [1] 。
 * 只有一个元素，所以乘积为该元素。
 *
 *
 * 示例 2：
 *
 *
 * 输入：p = 2
 * 输出：6
 * 解释：nums = [01, 10, 11] 。
 * 所有交换要么使乘积变为 0 ，要么乘积与初始乘积相同。
 * 所以，数组乘积 1 * 2 * 3 = 6 已经是最小值。
 *
 *
 * 示例 3：
 *
 *
 * 输入：p = 3
 * 输出：1512
 * 解释：nums = [001, 010, 011, 100, 101, 110, 111]
 * - 第一次操作中，我们交换第二个和第五个元素最左边的数位。
 * ⁠   - 结果数组为 [001, 110, 011, 100, 001, 110, 111] 。
 * - 第二次操作中，我们交换第三个和第四个元素中间的数位。
 * ⁠   - 结果数组为 [001, 110, 001, 110, 001, 110, 111] 。
 * 数组乘积 1 * 6 * 1 * 6 * 1 * 6 * 7 = 1512 是最小乘积。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= p <= 60
 *
 *
 */

// @lc code=start
// cv
function minNonZeroProduct(p: number): number {
  if (p === 1) return 1;
  const mod = BigInt(1e9 + 7);
  const x = fastPow(2n, BigInt(p), mod) - 1n;
  const y = 1n << BigInt(p - 1);
  return Number((fastPow(x - 1n, y - 1n, mod) * x) % mod);

  function fastPow(x: bigint, n: bigint, mod: bigint): bigint {
    let res = BigInt(1);
    while (n > 0) {
      if (n & 1n) {
        res = (res * x) % mod;
      }
      x = (x * x) % mod;
      n >>= 1n;
    }
    return res;
  }
}
// @lc code=end
