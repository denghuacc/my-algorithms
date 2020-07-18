/*
 * @lc app=leetcode.cn id=97 lang=typescript
 *
 * [97] 交错字符串
 *
 * https://leetcode-cn.com/problems/interleaving-string/description/
 *
 * algorithms
 * Hard (34.89%)
 * Likes:    220
 * Dislikes: 0
 * Total Accepted:    17.4K
 * Total Submissions: 42K
 * Testcase Example:  '"aabcc"\n"dbbca"\n"aadbbcbcac"'
 *
 * 给定三个字符串 s1, s2, s3, 验证 s3 是否是由 s1 和 s2 交错组成的。
 *
 * 示例 1:
 *
 * 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
 * 输出: false
 *
 */

// @lc code=start
// dp two dimension
var isInterleave = function (s1: string, s2: string, s3: string): boolean {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;
  if (l1 + l2 !== l3) return false;

  // dp[i][j] s1 的前 i 个元素和 s2 的前 j 个元素能否交错形成 s3 的前 i + j 个元素
  const dp: boolean[][] = Array.from(new Array(l1 + 1), () =>
    new Array(l2 + 1).fill(false)
  );
  dp[0][0] = true;

  for (let i = 0; i <= l1; i++) {
    for (let j = 0; j <= l2; j++) {
      const p = i + j - 1;
      if (i > 0) {
        dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[p]);
      }
      if (j > 0) {
        dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[p]);
      }
    }
  }

  return dp[l1][l2];
};

// dp one dimension
var isInterleave = function (s1: string, s2: string, s3: string): boolean {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;
  if (l1 + l2 !== l3) return false;

  const dp: boolean[] = new Array(l2 + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i <= l1; i++) {
    for (let j = 0; j <= l2; j++) {
      const p = i + j - 1;
      if (i > 0) {
        dp[j] = dp[j] && s1[i - 1] === s3[p];
      }
      if (j > 0) {
        dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[p]);
      }
    }
  }

  return dp[l2];
};
// @lc code=end
