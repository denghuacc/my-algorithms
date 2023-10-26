/*
 * @lc app=leetcode.cn id=2520 lang=typescript
 *
 * [2520] 统计能整除数字的位数
 *
 * https://leetcode.cn/problems/count-the-digits-that-divide-a-number/description/
 *
 * algorithms
 * Easy (81.69%)
 * Likes:    18
 * Dislikes: 0
 * Total Accepted:    18.2K
 * Total Submissions: 21.3K
 * Testcase Example:  '7'
 *
 * 给你一个整数 num ，返回 num 中能整除 num 的数位的数目。
 *
 * 如果满足 nums % val == 0 ，则认为整数 val 可以整除 nums 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：num = 7
 * 输出：1
 * 解释：7 被自己整除，因此答案是 1 。
 *
 *
 * 示例 2：
 *
 * 输入：num = 121
 * 输出：2
 * 解释：121 可以被 1 整除，但无法被 2 整除。由于 1 出现两次，所以返回 2 。
 *
 *
 * 示例 3：
 *
 * 输入：num = 1248
 * 输出：4
 * 解释：1248 可以被它每一位上的数字整除，因此答案是 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num <= 10^9
 * num 的数位中不含 0
 *
 *
 */

// @lc code=start
var countDigits = function (num: number): number {
  let res = 0;
  const arr = num.toString().split("").map(Number);
  for (const val of arr) {
    if (num % val === 0) {
      res++;
    }
  }
  return res;
};

var countDigits = function (num: number): number {
  const t = num;
  let res = 0;
  while (num !== 0) {
    const digit = num % 10;
    if (t % digit === 0) {
      res++;
    }
    num = Math.floor(num / 10);
  }
  return res;
};
// @lc code=end
