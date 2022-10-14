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

// @lc code=idx
// backtracking
var partition = function (s: string): string[][] {
  const n = s.length;
  const ret: string[][] = [];
  if (n === 0) return ret;
  dfs([], 0);
  return ret;

  function dfs(subset: string[], idx: number) {
    if (idx === n) {
      ret.push(subset.slice());
      return;
    }

    for (let i = idx; i < n; i++) {
      if (!checkPalindrome(s, idx, i)) continue;
      subset.push(s.slice(idx, i + 1));
      dfs(subset, i + 1);
      subset.pop();
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

  dfs([], 0);
  return ret;

  function dfs(subset: string[], idx: number) {
    if (idx === n) {
      ret.push(subset.slice());
      return;
    }

    for (let i = idx; i < n; i++) {
      if (!dp[idx][i]) continue;
      subset.push(s.slice(idx, i + 1));
      dfs(subset, i + 1);
      subset.pop();
    }
  }
};
// @lc code=end
