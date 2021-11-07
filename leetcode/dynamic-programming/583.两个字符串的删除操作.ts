/*
 * @lc app=leetcode.cn id=583 lang=typescript
 *
 * [583] 两个字符串的删除操作
 *
 * https://leetcode-cn.com/problems/delete-operation-for-two-strings/description/
 *
 * algorithms
 * Medium (62.19%)
 * Likes:    335
 * Dislikes: 0
 * Total Accepted:    52.6K
 * Total Submissions: 84.6K
 * Testcase Example:  '"sea"\n"eat"'
 *
 * 给定两个单词 word1 和 word2，找到使得 word1 和 word2 相同所需的最小步数，每步可以删除任意一个字符串中的一个字符。
 *
 *
 *
 * 示例：
 *
 * 输入: "sea", "eat"
 * 输出: 2
 * 解释: 第一步将"sea"变为"ea"，第二步将"eat"变为"ea"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 给定单词的长度不超过500。
 * 给定单词中的字符只含有小写字母。
 *
 *
 */

export {};

// @lc code=start
// dp 同 1143 最长公共子序列
var minDistance = function (word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] -> word1[0:i] 和 word2[0:j] 的最长公共子序列的长度
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    const c1 = word1[i - 1];
    for (let j = 1; j <= n; j++) {
      const c2 = word2[j - 1];
      if (c1 === c2) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  const lcs = dp[m][n];
  return m - lcs + n - lcs;
};

// dp2
var minDistance = function (word1: string, word2: string): number {
  const m = word1.length;
  const n = word2.length;

  // dp[i][j] -> word1[0:i] 和 word2[0:j] 相同的最少删除操作次数
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    dp[i][0] = i;
  }
  for (let j = 1; j <= n; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i <= m; i++) {
    const c1 = word1[i - 1];
    for (let j = 1; j <= n; j++) {
      const c2 = word2[j - 1];
      if (c1 === c2) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }

  return dp[m][n];
};
// @lc code=end
