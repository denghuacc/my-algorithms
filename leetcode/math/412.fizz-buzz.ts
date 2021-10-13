/*
 * @lc app=leetcode.cn id=412 lang=typescript
 *
 * [412] Fizz Buzz
 *
 * https://leetcode-cn.com/problems/fizz-buzz/description/
 *
 * algorithms
 * Easy (68.70%)
 * Likes:    118
 * Dislikes: 0
 * Total Accepted:    81.7K
 * Total Submissions: 119K
 * Testcase Example:  '3'
 *
 * 写一个程序，输出从 1 到 n 数字的字符串表示。
 *
 * 1. 如果 n 是3的倍数，输出“Fizz”；
 *
 * 2. 如果 n 是5的倍数，输出“Buzz”；
 *
 * 3.如果 n 同时是3和5的倍数，输出 “FizzBuzz”。
 *
 * 示例：
 *
 * n = 15,
 *
 * 返回:
 * [
 * ⁠   "1",
 * ⁠   "2",
 * ⁠   "Fizz",
 * ⁠   "4",
 * ⁠   "Buzz",
 * ⁠   "Fizz",
 * ⁠   "7",
 * ⁠   "8",
 * ⁠   "Fizz",
 * ⁠   "Buzz",
 * ⁠   "11",
 * ⁠   "Fizz",
 * ⁠   "13",
 * ⁠   "14",
 * ⁠   "FizzBuzz"
 * ]
 *
 *
 */

// @lc code=start
// math
function fizzBuzz(n: number): string[] {
  const ret: string[] = [];
  for (var i = 1; i <= n; i++) {
    if (i % 3 === 0 && i % 5 === 0) {
      ret.push("FizzBuzz");
      continue;
    }
    if (i % 3 === 0) {
      ret.push("Fizz");
      continue;
    }
    if (i % 5 === 0) {
      ret.push("Buzz");
      continue;
    }
    ret.push(String(i));
  }
  return ret;
}
// @lc code=end
