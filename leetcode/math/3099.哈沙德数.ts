/*
 * @lc app=leetcode.cn id=3099 lang=typescript
 *
 * [3099] 哈沙德数
 *
 * https://leetcode.cn/problems/harshad-number/description/
 *
 * algorithms
 * Easy (84.00%)
 * Likes:    14
 * Dislikes: 0
 * Total Accepted:    15.4K
 * Total Submissions: 17.8K
 * Testcase Example:  '18'
 *
 * 如果一个整数能够被其各个数位上的数字之和整除，则称之为 哈沙德数（Harshad number）。给你一个整数 x 。如果 x 是 哈沙德数 ，则返回
 * x 各个数位上的数字之和，否则，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： x = 18
 *
 * 输出： 9
 *
 * 解释：
 *
 * x 各个数位上的数字之和为 9 。18 能被 9 整除。因此 18 是哈沙德数，答案是 9 。
 *
 *
 * 示例 2：
 *
 *
 * 输入： x = 23
 *
 * 输出： -1
 *
 * 解释：
 *
 * x 各个数位上的数字之和为 5 。23 不能被 5 整除。因此 23 不是哈沙德数，答案是 -1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= x <= 100
 *
 *
 */

// @lc code=start
function sumOfTheDigitsOfHarshadNumber(x: number): number {
  let sum = 0;
  let cur = x;
  while (cur > 0) {
    sum += cur % 10;
    cur = Math.floor(cur / 10);
  }
  return x % sum === 0 ? sum : -1;
}
// @lc code=end
