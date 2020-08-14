/*
 * @lc app=leetcode.cn id=22 lang=typescript
 *
 * [22] 括号生成
 *
 * https://leetcode-cn.com/problems/generate-parentheses/description/
 *
 * algorithms
 * Medium (67.96%)
 * Likes:    1012
 * Dislikes: 0
 * Total Accepted:    125.4K
 * Total Submissions: 166.4K
 * Testcase Example:  '3'
 *
 * 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。
 *
 *
 *
 * 示例：
 *
 * 输入：n = 3
 * 输出：[
 * ⁠      "((()))",
 * ⁠      "(()())",
 * ⁠      "(())()",
 * ⁠      "()(())",
 * ⁠      "()()()"
 * ⁠    ]
 *
 *
 */

// @lc code=start
// backtracking
var generateParenthesis = function (n: number): string[] {
  const ret: string[] = [];
  backtrack(ret, "", 0, 0, n);
  return ret;

  function backtrack(
    ret: string[],
    cur: string,
    open: number,
    close: number,
    max: number
  ) {
    if (cur.length === max * 2) {
      ret.push(cur);
      return;
    }

    if (open < max) {
      cur += "(";
      backtrack(ret, cur, open + 1, close, max);
      cur = cur.substring(0, cur.length - 1); // pop last string
    }

    if (open > close) {
      cur += ")";
      backtrack(ret, cur, open, close + 1, max);
      cur = cur.substring(0, cur.length - 1);
    }
  }
};

// recursive
var generateParenthesis = function (n: number): string[] {
  const cache: string[][] = [];
  return generate(n);

  function generate(n: number): string[] {
    if (cache[n] != null) return cache[n];
    const ret = [];

    if (n === 0) {
      ret.push("");
    } else {
      for (let i = 0; i < n; i++) {
        for (const left of generate(i)) {
          for (const right of generate(n - 1 - i)) {
            ret.push("(" + left + ")" + right);
          }
        }
      }
    }

    cache[n] = ret;
    return ret;
  }
};
// @lc code=end
