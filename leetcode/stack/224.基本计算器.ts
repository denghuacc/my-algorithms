/*
 * @lc app=leetcode.cn id=224 lang=typescript
 *
 * [224] 基本计算器
 *
 * https://leetcode-cn.com/problems/basic-calculator/description/
 *
 * algorithms
 * Hard (31.33%)
 * Likes:    223
 * Dislikes: 0
 * Total Accepted:    16.1K
 * Total Submissions: 42.3K
 * Testcase Example:  '"1 + 1"'
 *
 * 实现一个基本的计算器来计算一个简单的字符串表达式的值。
 *
 * 字符串表达式可以包含左括号 ( ，右括号 )，加号 + ，减号 -，非负整数和空格  。
 *
 * 示例 1:
 *
 * 输入: "1 + 1"
 * 输出: 2
 *
 *
 * 示例 2:
 *
 * 输入: " 2-1 + 2 "
 * 输出: 3
 *
 * 示例 3:
 *
 * 输入: "(1+(4+5+2)-3)+(6+8)"
 * 输出: 23
 *
 * 说明：
 *
 *
 * 你可以假设所给定的表达式都是有效的。
 * 请不要使用内置的库函数 eval。
 *
 *
 */

// @lc code=start
// stack
var calculate = function (s: string): number {
  const stack: number[] = [];
  let num = 0;
  let ret = 0;
  let sign = 1; // 1 means positive, -1 means negative

  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (!Number.isNaN(parseInt(c))) {
      num = 10 * num + parseInt(c);
    } else if (c === "+") {
      ret += sign * num;
      sign = 1;
      num = 0;
    } else if (c === "-") {
      ret += sign * num;
      sign = -1;
      num = 0;
    } else if (c === "(") {
      stack.push(ret);
      stack.push(sign);
      sign = 1;
      ret = 0;
    } else if (c === ")") {
      ret += sign * num;
      ret *= stack.pop()!;
      ret += stack.pop()!;
      num = 0;
    }
  }

  return ret + sign * num;
};
// @lc code=end
