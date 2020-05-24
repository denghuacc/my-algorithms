/*
 * @lc app=leetcode.cn id=856 lang=javascript
 *
 * [856] 连续整数求和
 *
 * https://leetcode-cn.com/problems/score-of-parentheses/description/
 *
 * algorithms
 * Medium (47.22%)
 * Likes:    88
 * Dislikes: 0
 * Total Accepted:    6.1K
 * Total Submissions: 10.4K
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
/**
 * @param {string} S
 * @return {number}
 */
var scoreOfParentheses = function (S) {
  return score(S, 0, S.length);

  function score(S, left, right) {
    let ret = 0;
    let bal = 0;

    for (let i = left; i < right; ++i) {
      bal += S[i] === "(" ? 1 : -1;
      if (bal === 0) {
        if (i - left === 1) ret++;
        else ret += 2 * score(S, left + 1, i);
        left = i + 1;
      }
    }

    return ret;
  }
};

var scoreOfParentheses = function (S) {
  const stack = [];
  stack.push(0);

  for (const s of S) {
    if (s === "(") {
      stack.push(0);
    } else {
      let v = stack.pop();
      let w = stack.pop();
      stack.push(w + Math.max(2 * v, 1));
    }
  }

  return stack.pop();
};

var scoreOfParentheses = function (S) {
  let ret = 0;
  let bal = 0;

  for (let i = 0; i < S.length; ++i) {
    if (S[i] === "(") {
      bal++;
    } else {
      bal--;
      if (S[i - 1] === "(") {
        ret += 1 << bal;
      }
    }
  }

  return ret;
};
// @lc code=end
