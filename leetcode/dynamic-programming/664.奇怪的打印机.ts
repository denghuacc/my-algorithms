/*
 * @lc app=leetcode.cn id=664 lang=typescript
 *
 * [664] 奇怪的打印机
 *
 * https://leetcode-cn.com/problems/strange-printer/description/
 *
 * algorithms
 * Hard (49.13%)
 * Likes:    151
 * Dislikes: 0
 * Total Accepted:    10.3K
 * Total Submissions: 17.1K
 * Testcase Example:  '"aaabbb"'
 *
 * 有台奇怪的打印机有以下两个特殊要求：
 *
 *
 * 打印机每次只能打印由 同一个字符 组成的序列。
 * 每次可以在任意起始和结束位置打印新字符，并且会覆盖掉原来已有的字符。
 *
 *
 * 给你一个字符串 s ，你的任务是计算这个打印机打印它需要的最少打印次数。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aaabbb"
 * 输出：2
 * 解释：首先打印 "aaa" 然后打印 "bbb"。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "aba"
 * 输出：2
 * 解释：首先打印 "aaa" 然后在第二个位置打印 "b" 覆盖掉原来的字符 'a'。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由小写英文字母组成
 *
 *
 */

// @lc code=start
function strangePrinter(s: string): number {
  const n = s.length;
  // dp[i][j] -> 打印完成区间 [i,j] 的最少操作数
  const dp: number[][] = Array.from(new Array(n), () => new Array(n).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    dp[i][i] = 1;
    for (let j = i + 1; j < n; j++) {
      if (s[i] == s[j]) {
        dp[i][j] = dp[i][j - 1];
      } else {
        let min = Number.MAX_SAFE_INTEGER;
        for (let k = i; k < j; k++) {
          min = Math.min(min, dp[i][k] + dp[k + 1][j]);
        }
        dp[i][j] = min;
      }
    }
  }
  return dp[0][n - 1];
}
// @lc code=end
