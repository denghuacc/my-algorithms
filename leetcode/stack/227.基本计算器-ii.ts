/*
 * @lc app=leetcode.cn id=227 lang=typescript
 *
 * [227] 基本计算器 II
 *
 * https://leetcode-cn.com/problems/basic-calculator-ii/description/
 *
 * algorithms
 * Medium (31.43%)
 * Likes:    156
 * Dislikes: 0
 * Total Accepted:    19.6K
 * Total Submissions: 53.8K
 * Testcase Example:  '"3+2*2"'
 *
 * 实现一个基本的计算器来计算一个简单的字符串表达式的值。
 *
 * 字符串表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格  。 整数除法仅保留整数部分。
 *
 * 示例 1:
 *
 * 输入: "3+2*2"
 * 输出: 7
 *
 *
 * 示例 2:
 *
 * 输入: " 3/2 "
 * 输出: 1
 *
 * 示例 3:
 *
 * 输入: " 3+5 / 2 "
 * 输出: 5
 *
 *
 * 说明：
 *
 *
 * 你可以假设所给定的表达式都是有效的。
 * 请不要使用内置的库函数 eval。
 *
 *
 */

export {};

// @lc code=start
// stack
function calculate(s: string): number {
  const stack: number[] = [];
  let num = 0;
  let sign = "+";

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const isDigit = Number.isInteger(parseInt(c));
    if (isDigit) {
      num = num * 10 + parseInt(c);
    }
    if ((!isDigit && c !== " ") || i === s.length - 1) {
      let pre: number;
      if (sign === "+") {
        stack.push(num);
      } else if (sign === "-") {
        stack.push(-num);
      } else if (sign === "*") {
        pre = stack.pop()!;
        stack.push(pre * num);
      } else if (sign === "/") {
        pre = stack.pop()!;
        stack.push(pre > 0 ? Math.floor(pre / num) : Math.ceil(pre / num));
      }
      sign = c;
      num = 0;
    }
  }

  let ret = 0;
  while (stack.length) {
    ret += stack.pop()!;
  }
  return ret;
}
// @lc code=end
