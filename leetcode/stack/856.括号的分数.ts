/*
 * @lc app=leetcode.cn id=856 lang=typescript
 *
 * [856] 括号的分数
 *
 * https://leetcode.cn/problems/score-of-parentheses/description/
 *
 * algorithms
 * Medium (63.33%)
 * Likes:    362
 * Dislikes: 0
 * Total Accepted:    26.5K
 * Total Submissions: 40.5K
 * Testcase Example:  '"()"'
 *
 * 给定一个平衡括号字符串 S，按下述规则计算该字符串的分数：
 *
 *
 * () 得 1 分。
 * AB 得 A + B 分，其中 A 和 B 是平衡括号字符串。
 * (A) 得 2 * A 分，其中 A 是平衡括号字符串。
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入： "()"
 * 输出： 1
 *
 *
 * 示例 2：
 *
 * 输入： "(())"
 * 输出： 2
 *
 *
 * 示例 3：
 *
 * 输入： "()()"
 * 输出： 2
 *
 *
 * 示例 4：
 *
 * 输入： "(()(()))"
 * 输出： 6
 *
 *
 *
 *
 * 提示：
 *
 *
 * S 是平衡括号字符串，且只含有 ( 和 ) 。
 * 2 <= S.length <= 50
 *
 *
 */

// @lc code=start
// stack
var scoreOfParentheses = function (s: string): number {
  const stack: number[] = [0];
  for (const ch of s) {
    if (ch === "(") {
      stack.push(0);
    } else {
      const v = stack.pop()!;
      const w = stack.pop()!;
      const top = w + Math.max(2 * v, 1);
      stack.push(top);
    }
  }
  return stack[0];
};
// @lc code=end

// math
var scoreOfParentheses = function (s: string): number {
  let res = 0;
  let left = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      left++;
    } else {
      left--;
      if (s[i - 1] === "(") {
        res += 1 << left;
      }
    }
  }
  return res;
};
