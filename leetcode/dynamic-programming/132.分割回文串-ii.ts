/*
 * @lc app=leetcode.cn id=132 lang=typescript
 *
 * [132] 分割回文串 II
 *
 * https://leetcode-cn.com/problems/palindrome-partitioning-ii/description/
 *
 * algorithms
 * Hard (47.81%)
 * Likes:    353
 * Dislikes: 0
 * Total Accepted:    35K
 * Total Submissions: 73.1K
 * Testcase Example:  '"aab"'
 *
 * 给你一个字符串 s，请你将 s 分割成一些子串，使每个子串都是回文。
 *
 * 返回符合要求的 最少分割次数 。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aab"
 * 输出：1
 * 解释：只需一次分割就可将 s 分割成 ["aa","b"] 这样两个回文子串。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "a"
 * 输出：0
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "ab"
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 仅由小写英文字母组成
 *
 *
 *
 *
 */

// @lc code=start
// dp
function minCut(s: string): number {
  const n = s.length;
  const g: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(true)
  );

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      g[i][j] = s[i] === s[j] && g[i + 1][j - 1];
    }
  }

  const f: number[] = new Array(n).fill(Infinity);

  for (let i = 0; i < n; i++) {
    if (g[0][i]) {
      f[i] = 0;
    } else {
      for (let j = 0; j < i; j++) {
        if (g[j + 1][i]) {
          f[i] = Math.min(f[i], f[j] + 1);
        }
      }
    }
  }

  return f[n - 1];
}
// @lc code=end
