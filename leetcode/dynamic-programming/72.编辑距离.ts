/*
 * @lc app=leetcode.cn id=72 lang=typescript
 *
 * [72] 编辑距离
 *
 * https://leetcode-cn.com/problems/edit-distance/description/
 *
 * algorithms
 * Hard (47.04%)
 * Likes:    936
 * Dislikes: 0
 * Total Accepted:    64.9K
 * Total Submissions: 109.3K
 * Testcase Example:  '"horse"\n"ros"'
 *
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数 。
 *
 * 你可以对一个单词进行如下三种操作：
 *
 *
 * 插入一个字符
 * 删除一个字符
 * 替换一个字符
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：word1 = "horse", word2 = "ros"
 * 输出：3
 * 解释：
 * horse -> rorse (将 'h' 替换为 'r')
 * rorse -> rose (删除 'r')
 * rose -> ros (删除 'e')
 *
 *
 * 示例 2：
 *
 * 输入：word1 = "intention", word2 = "execution"
 * 输出：5
 * 解释：
 * intention -> inention (删除 't')
 * inention -> enention (将 'i' 替换为 'e')
 * enention -> exention (将 'n' 替换为 'x')
 * exention -> exection (将 'n' 替换为 'c')
 * exection -> execution (插入 'u')
 *
 *
 */

// @lc code=start
// dp
var minDistance = function (word1: string, word2: string): number {
  const n = word1.length;
  const m = word2.length;

  if (n * m === 0) return n + m;

  const dp: number[][] = Array.from(new Array(n + 1), () => Array<number>(m + 1).fill(0))

  for (let i = 0; i < n + 1; i++) {
    dp[i][0] = i;
  }

  for (let j = 0; j < m + 1; j++) {
    dp[0][j] = j;
  }

  for (let i = 1; i < n + 1; i++) {
    for (let j = 1; j < m + 1; j++) {
      const left = dp[i - 1][j] + 1;
      const down = dp[i][j - 1] + 1;
      let leftDown = dp[i - 1][j - 1];
      if (word1[i - 1] !== word2[j - 1]) {
        leftDown += 1;
      }
      dp[i][j] = Math.min(left, Math.min(down, leftDown));
    }
  }

  return dp[n][m];
};
// @lc code=end
