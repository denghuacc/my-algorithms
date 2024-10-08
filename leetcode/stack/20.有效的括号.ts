/*
 * @lc app=leetcode.cn id=20 lang=typescript
 *
 * [20] 有效的括号
 *
 * https://leetcode-cn.com/problems/valid-parentheses/description/
 *
 * algorithms
 * Easy (36.21%)
 * Total Accepted:    61.4K
 * Total Submissions: 164.8K
 * Testcase Example:  '"()"'
 *
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
 *
 * 有效字符串需满足：
 *
 *
 * 左括号必须用相同类型的右括号闭合。
 * 左括号必须以正确的顺序闭合。
 *
 *
 * 注意空字符串可被认为是有效字符串。
 *
 * 示例 1:
 *
 * 输入: "()"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: "()[]{}"
 * 输出: true
 *
 *
 * 示例 3:
 *
 * 输入: "(]"
 * 输出: false
 *
 *
 * 示例 4:
 *
 * 输入: "([)]"
 * 输出: false
 *
 *
 * 示例 5:
 *
 * 输入: "{[]}"
 * 输出: true
 *
 */

// @lc code=start
// stack
var isValid = function (s: string): boolean {
  const stack: string[] = [];
  for (const c of s) {
    if (c === "(" || c === "{" || c === "[") {
      stack.push(c);
    } else if (c === ")" && stack[stack.length - 1] === "(") {
      stack.pop();
    } else if (c === "}" && stack[stack.length - 1] === "{") {
      stack.pop();
    } else if (c === "]" && stack[stack.length - 1] === "[") {
      stack.pop();
    } else {
      return false;
    }
  }
  return stack.length === 0;
};
// @lc code=end
