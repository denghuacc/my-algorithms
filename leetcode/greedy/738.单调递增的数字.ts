/*
 * @lc app=leetcode.cn id=738 lang=typescript
 *
 * [738] 单调递增的数字
 *
 * https://leetcode-cn.com/problems/monotone-increasing-digits/description/
 *
 * algorithms
 * Medium (44.45%)
 * Likes:    94
 * Dislikes: 0
 * Total Accepted:    9.5K
 * Total Submissions: 20.5K
 * Testcase Example:  '10'
 *
 * 给定一个非负整数 N，找出小于或等于 N 的最大的整数，同时这个整数需要满足其各个位数上的数字是单调递增。
 *
 * （当且仅当每个相邻位数上的数字 x 和 y 满足 x <= y 时，我们称这个整数是单调递增的。）
 *
 * 示例 1:
 *
 * 输入: N = 10
 * 输出: 9
 *
 *
 * 示例 2:
 *
 * 输入: N = 1234
 * 输出: 1234
 *
 *
 * 示例 3:
 *
 * 输入: N = 332
 * 输出: 299
 *
 *
 * 说明: N 是在 [0, 10^9] 范围内的一个整数。
 *
 */

// @lc code=start
// greedy
function monotoneIncreasingDigits(N: number): number {
  const ArrN: number[] = N.toString()
    .split("")
    .map((v) => +v);

  let i = 1;
  while (i < ArrN.length && ArrN[i - 1] <= ArrN[i]) {
    i++;
  }
  if (i < ArrN.length) {
    // compare and adjust
    while (i > 0 && ArrN[i - 1] > ArrN[i]) {
      ArrN[i - 1] -= 1;
      i -= 1;
    }
    // fill with 9
    for (i += 1; i < ArrN.length; i++) {
      ArrN[i] = 9;
    }
  }
  return parseInt(ArrN.join(""));
}
// @lc code=end
