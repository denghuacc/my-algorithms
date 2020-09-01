/*
 * @lc app=leetcode.cn id=131 lang=typescript
 *
 * [131] 分割回文串
 *
 * https://leetcode-cn.com/problems/palindrome-partitioning/description/
 *
 * algorithms
 * Medium (68.41%)
 * Likes:    339
 * Dislikes: 0
 * Total Accepted:    40.5K
 * Total Submissions: 59.2K
 * Testcase Example:  '"aab"'
 *
 * 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。
 *
 * 返回 s 所有可能的分割方案。
 *
 * 示例:
 *
 * 输入: "aab"
 * 输出:
 * [
 * ⁠ ["aa","b"],
 * ⁠ ["a","a","b"]
 * ]
 *
 */

// @lc code=start
// backtracking
var partition = function (s: string): string[][] {
  const n = s.length;
  const ret: string[][] = [];
  if (n === 0) return ret;
  const stack: string[] = [];
  backtrack(s, 0, n, stack, ret);
  return ret;

  function backtrack(
    s: string,
    start: number,
    end: number,
    path: string[],
    ret: string[][]
  ) {
    if (start === end) {
      ret.push(path.slice());
      return;
    }

    for (let i = start; i < n; i++) {
      if (!checkPalindrome(s, start, i)) continue;
      path.push(s.substring(start, i + 1));
      backtrack(s, i + 1, end, path, ret);
      path.pop();
    }
  }

  function checkPalindrome(s: string, left: number, right: number): boolean {
    while (left < right) {
      if (s[left] !== s[right]) return false;
      left++;
      right--;
    }
    return true;
  }
};

// backtracking + dp
var partition = function (s: string): string[][] {
  const n = s.length;
  const ret: string[][] = [];
  if (n === 0) return ret;
  const stack: string[] = [];

  // dp[i][j] -> s[i]~[j] 是否是回文
  const dp: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(false)
  );

  for (let right = 0; right < n; right++) {
    for (let left = 0; left <= right; left++) {
      if (
        s[left] === s[right] &&
        (right - left <= 2 || dp[left + 1][right - 1])
      ) {
        dp[left][right] = true;
      }
    }
  }

  backtrack(s, 0, n, dp, stack, ret);
  return ret;

  function backtrack(
    s: string,
    start: number,
    end: number,
    dp: boolean[][],
    path: string[],
    ret: string[][]
  ) {
    if (start === end) {
      ret.push(path.slice());
      return;
    }

    for (let i = start; i < n; i++) {
      if (!dp[start][i]) continue;
      path.push(s.substring(start, i + 1));
      backtrack(s, i + 1, end, dp, path, ret);
      path.pop();
    }
  }
};
// @lc code=end
