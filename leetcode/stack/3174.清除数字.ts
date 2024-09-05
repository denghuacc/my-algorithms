/*
 * @lc app=leetcode.cn id=3174 lang=typescript
 *
 * [3174] 清除数字
 *
 * https://leetcode.cn/problems/clear-digits/description/
 *
 * algorithms
 * Easy (76.16%)
 * Likes:    15
 * Dislikes: 0
 * Total Accepted:    11.5K
 * Total Submissions: 14.2K
 * Testcase Example:  '"abc"'
 *
 * 给你一个字符串 s 。
 *
 * 你的任务是重复以下操作删除 所有 数字字符：
 *
 *
 * 删除 第一个数字字符 以及它左边 最近 的 非数字 字符。
 *
 *
 * 请你返回删除所有数字字符以后剩下的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abc"
 *
 * 输出："abc"
 *
 * 解释：
 *
 * 字符串中没有数字。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "cb34"
 *
 * 输出：""
 *
 * 解释：
 *
 * 一开始，我们对 s[2] 执行操作，s 变为 "c4" 。
 *
 * 然后对 s[1] 执行操作，s 变为 "" 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 100
 * s 只包含小写英文字母和数字字符。
 * 输入保证所有数字都可以按以上操作被删除。
 *
 *
 */

// @lc code=start
var clearDigits = function (s: string): string {
  const n = s.length;
  const stack = [];
  for (let i = 0; i < n; i++) {
    const c = s[i];
    if (isDigit(c)) {
      if (!isDigit(stack[stack.length - 1])) {
        stack.pop();
      } else {
        stack.push(c);
      }
    } else {
      stack.push(c);
    }
  }
  return stack.join("");

  function isDigit(c: string): boolean {
    if (c >= "0" && c <= "9") {
      return true;
    }
    return false;
  }
};

// improve 不需要关心字符具体位置，一个数字抵消前一个字母即可
var clearDigits = function (s: string): string {
  const stack = [];
  for (const c of s) {
    if (c >= "0" && c <= "9") {
      stack.pop();
    } else {
      stack.push(c);
    }
  }
  return stack.join("");
};
// @lc code=end
