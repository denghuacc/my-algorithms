/*
 * @lc app=leetcode.cn id=32 lang=typescript
 *
 * [32] 最长有效括号
 *
 * https://leetcode-cn.com/problems/longest-valid-parentheses/description/
 *
 * algorithms
 * Hard (25.16%)
 * Likes:    648
 * Dislikes: 0
 * Total Accepted:    57.9K
 * Total Submissions: 190K
 * Testcase Example:  '"(()"'
 *
 * 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。
 *
 * 示例 1:
 *
 * 输入: "(()"
 * 输出: 2
 * 解释: 最长有效括号子串为 "()"
 *
 *
 * 示例 2:
 *
 * 输入: ")()())"
 * 输出: 4
 * 解释: 最长有效括号子串为 "()()"
 *
 *
 */

// @lc code=start
// brute force timeout
var longestValidParentheses = function (s: string): number {
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    for (let j = i + 2; j <= s.length; j += 2) {
      if (isValid(s.substring(i, j))) {
        maxLen = Math.max(maxLen, j - i);
      }
    }
  }

  return maxLen;

  function isValid(s: string): boolean {
    const stack = [];

    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") {
        stack.push("(");
      } else if (stack.length && stack[stack.length - 1] === "(") {
        stack.pop();
      } else {
        return false;
      }
    }

    return stack.length === 0;
  }
};

// dp
var longestValidParentheses = function (s: string): number {
  let maxLen = 0;

  // dp[i] -> 字符串中以下标为 i 字符结尾的最长有效括号的长度
  const dp: number[] = new Array(s.length).fill(0);

  for (let i = 1; i < s.length; i++) {
    if (s[i] === ")") {
      if (s[i - 1] === "(") {
        dp[i] = (i >= 2 ? dp[i - 2] : 0) + 2;
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] === "(") {
        dp[i] =
          dp[i - 1] + ((i - dp[i - 1] >= 2 ? dp[i - dp[i - 1] - 2] : 0) + 2);
      }
      maxLen = Math.max(maxLen, dp[i]);
    }
  }

  return maxLen;
};

// stack
var longestValidParentheses = function (s: string): number {
  let maxLen = 0;
  const stack: number[] = [];
  stack.push(-1);
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      stack.push(i);
    } else {
      stack.pop();
      if (!stack.length) {
        stack.push(i);
      } else {
        maxLen = Math.max(maxLen, i - stack[stack.length - 1]);
      }
    }
  }
  return maxLen;
};

// two pointers
var longestValidParentheses = function (s: string): number {
  let left = 0;
  let right = 0;
  let maxLen = 0;

  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      maxLen = Math.max(maxLen, right * 2);
    } else if (right >= left) {
      left = right = 0;
    }
  }

  left = right = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    if (s[i] === "(") {
      left++;
    } else {
      right++;
    }

    if (left === right) {
      maxLen = Math.max(maxLen, left * 2);
    } else if (left >= right) {
      left = right = 0;
    }
  }
  return maxLen;
};
// @lc code=end
