/*
 * @lc app=leetcode.cn id=647 lang=typescript
 *
 * [647] 回文子串
 *
 * https://leetcode-cn.com/problems/palindromic-substrings/description/
 *
 * algorithms
 * Medium (62.36%)
 * Likes:    311
 * Dislikes: 0
 * Total Accepted:    38.7K
 * Total Submissions: 61.4K
 * Testcase Example:  '"abc"'
 *
 * 给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。
 *
 * 具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。
 *
 *
 *
 * 示例 1：
 *
 * 输入："abc"
 * 输出：3
 * 解释：三个回文子串: "a", "b", "c"
 *
 *
 * 示例 2：
 *
 * 输入："aaa"
 * 输出：6
 * 解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
 *
 *
 *
 * 提示：
 *
 *
 * 输入的字符串长度不会超过 1000 。
 *
 *
 */

// @lc code=start
// 中心扩展法
var countSubstrings = function (s: string): number {
  const n = s.length;
  let count = 0;

  for (let i = 0; i < 2 * n - 1; i++) {
    let left = Math.floor(i / 2);
    let right = Math.floor(i / 2) + (i % 2);
    while (left >= 0 && right < n && s[left] === s[right]) {
      left--;
      right++;
      count++;
    }
  }

  return count;
};

// dp
var countSubstrings = function (s: string): number {
  const n = s.length;
  let count = 0;

  // dp[i][j] -> s[i:j] 是否是回文串
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      // 单个字符
      if (i === j) {
        dp[i][j] = true;
        count++;
      }
      // 两个字符
      else if (j - i === 1 && s[i] === s[j]) {
        dp[i][j] = true;
        count++;
      }
      // 多个字符
      else if (j - i > 1 && s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = true;
        count++;
      }
    }
  }

  return count;
};

// dp simplify
var countSubstrings = function (s: string): number {
  const n = s.length;
  let count = 0;

  // dp[i][j] -> s[i:j] 是否是回文串
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  for (let j = 0; j < n; j++) {
    for (let i = 0; i <= j; i++) {
      if (i === j) {
        dp[i][j] = true;
      } else if (s[i] === s[j]) {
        dp[i][j] = j - i === 1 || dp[i + 1][j - 1];
      }
      if (dp[i][j]) count++;
    }
  }

  return count;
};
// @lc code=end
