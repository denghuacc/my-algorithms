/*
 * @lc app=leetcode.cn id=1220 lang=typescript
 *
 * [1220] 统计元音字母序列的数目
 *
 * https://leetcode-cn.com/problems/count-vowels-permutation/description/
 *
 * algorithms
 * Hard (59.31%)
 * Likes:    73
 * Dislikes: 0
 * Total Accepted:    8.3K
 * Total Submissions: 14.1K
 * Testcase Example:  '1'
 *
 * 给你一个整数 n，请你帮忙统计一下我们可以按下述规则形成多少个长度为 n 的字符串：
 *
 *
 * 字符串中的每个字符都应当是小写元音字母（'a', 'e', 'i', 'o', 'u'）
 * 每个元音 'a' 后面都只能跟着 'e'
 * 每个元音 'e' 后面只能跟着 'a' 或者是 'i'
 * 每个元音 'i' 后面 不能 再跟着另一个 'i'
 * 每个元音 'o' 后面只能跟着 'i' 或者是 'u'
 * 每个元音 'u' 后面只能跟着 'a'
 *
 *
 * 由于答案可能会很大，所以请你返回 模 10^9 + 7 之后的结果。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 1
 * 输出：5
 * 解释：所有可能的字符串分别是："a", "e", "i" , "o" 和 "u"。
 *
 *
 * 示例 2：
 *
 * 输入：n = 2
 * 输出：10
 * 解释：所有可能的字符串分别是："ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" 和
 * "ua"。
 *
 *
 * 示例 3：
 *
 * 输入：n = 5
 * 输出：68
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2 * 10^4
 *
 *
 */

// 元音字母 ‘a’ 前面只能跟着 ‘e’,‘i’,‘u’；
// 元音字母 ‘e’ 前面只能跟着 ‘a’,‘i’；
// 每个元音 ‘i’ 前面只能跟着 ‘e’,‘o’；
// 每个元音 ‘o’ 前面只能跟着 ‘i’；
// 每个元音 ‘u’ 后面只能跟着 ‘o’,‘i’；

// ->
// dp[i][0]=dp[i−1][1]+dp[i−1][2]+dp[i−1][4]
// dp[i][1]=dp[i−1][0]+dp[i−1][2]
// dp[i][2]=dp[i−1][1]+dp[i−1][3]
// dp[i][3]=dp[i−1][2]
// dp[i][4]=dp[i−1][2]+dp[i−1][3]

// @lc code=start
function countVowelPermutation(n: number): number {
  const MOD = 1e9 + 7;
  // dp[i][j] 代表当前长度为 i 且以字符 j 为结尾的字符串的数目
  const dp = new Array(5).fill(1);
  const ndp = new Array(5).fill(0);
  for (let i = 2; i <= n; i++) {
    ndp[0] = (dp[1] + dp[2] + dp[4]) % MOD;
    ndp[1] = (dp[0] + dp[2]) % MOD;
    ndp[2] = (dp[1] + dp[3]) % MOD;
    ndp[3] = dp[2];
    ndp[4] = (dp[2] + dp[3]) % MOD;
    dp.splice(0, 5, ...ndp);
  }
  let res = 0;
  for (let i = 0; i < 5; i++) {
    res = (res + dp[i]) % MOD;
  }
  return res;
}
// @lc code=end
