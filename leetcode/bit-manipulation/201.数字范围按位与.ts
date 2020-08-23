/*
 * @lc app=leetcode.cn id=201 lang=typescript
 *
 * [201] 数字范围按位与
 *
 * https://leetcode-cn.com/problems/bitwise-and-of-numbers-range/description/
 *
 * algorithms
 * Medium (46.87%)
 * Likes:    155
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 37.2K
 * Testcase Example:  '5\n7'
 *
 * 给定范围 [m, n]，其中 0 <= m <= n <= 2147483647，返回此范围内所有数字的按位与（包含 m, n 两端点）。
 *
 * 示例 1:
 *
 * 输入: [5,7]
 * 输出: 4
 *
 * 示例 2:
 *
 * 输入: [0,1]
 * 输出: 0
 *
 */

// @lc code=start
// bit manipulation
var rangeBitwiseAnd = function (m: number, n: number): number {
  let shift = 0;
  while (m < n) {
    m >>= 1;
    n >>= 1;
    shift++;
  }
  return m << shift;
};

// Brain Kernighan
var rangeBitwiseAnd = function (m: number, n: number): number {
  while (m < n) {
    n &= n - 1;
  }
  return n;
};
// @lc code=end
