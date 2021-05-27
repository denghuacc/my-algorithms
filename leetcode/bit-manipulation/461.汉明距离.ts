/*
 * @lc app=leetcode.cn id=461 lang=typescript
 *
 * [461] 汉明距离
 *
 * https://leetcode-cn.com/problems/hamming-distance/description/
 *
 * algorithms
 * Easy (79.38%)
 * Likes:    430
 * Dislikes: 0
 * Total Accepted:    122.5K
 * Total Submissions: 153.1K
 * Testcase Example:  '1\n4'
 *
 * 两个整数之间的汉明距离指的是这两个数字对应二进制位不同的位置的数目。
 *
 * 给出两个整数 x 和 y，计算它们之间的汉明距离。
 *
 * 注意：
 * 0 ≤ x, y < 2^31.
 *
 * 示例:
 *
 *
 * 输入: x = 1, y = 4
 *
 * 输出: 2
 *
 * 解释:
 * 1   (0 0 0 1)
 * 4   (0 1 0 0)
 * ⁠      ↑   ↑
 *
 * 上面的箭头指出了对应二进制位不同的位置。
 *
 *
 */

// @lc code=start
// bit manipulation
function hammingDistance(x: number, y: number): number {
  let z = x ^ y;
  let ret = 0;

  while (z) {
    ret += z & 1;
    z >>= 1;
  }

  return ret;
}
// @lc code=end
