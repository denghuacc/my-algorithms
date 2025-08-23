/*
 * @lc app=leetcode.cn id=1143 lang=typescript
 *
 * [1143] 最长公共子序列
 *
 * https://leetcode-cn.com/problems/longest-common-subsequence/description/
 *
 * algorithms
 * Medium (61.74%)
 * Likes:    431
 * Dislikes: 0
 * Total Accepted:    87.2K
 * Total Submissions: 141.3K
 * Testcase Example:  '"abcde"\n"ace"'
 *
 * 给定两个字符串 text1 和 text2，返回这两个字符串的最长 公共子序列 的长度。如果不存在 公共子序列 ，返回 0 。
 *
 * 一个字符串的 子序列
 * 是指这样一个新的字符串：它是由原字符串在不改变字符的相对顺序的情况下删除某些字符（也可以不删除任何字符）后组成的新字符串。
 *
 *
 * 例如，"ace" 是 "abcde" 的子序列，但 "aec" 不是 "abcde" 的子序列。
 *
 *
 * 两个字符串的 公共子序列 是这两个字符串所共同拥有的子序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：text1 = "abcde", text2 = "ace"
 * 输出：3
 * 解释：最长公共子序列是 "ace" ，它的长度为 3 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：text1 = "abc", text2 = "abc"
 * 输出：3
 * 解释：最长公共子序列是 "abc" ，它的长度为 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：text1 = "abc", text2 = "def"
 * 输出：0
 * 解释：两个字符串没有公共子序列，返回 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * text1 和 text2 仅由小写英文字符组成。
 *
 *
 */

// @lc code=start
/**
 * 动态规划解法
 * 核心思想：dp[i][j]表示text1前i个字符和text2前j个字符的最长公共子序列长度
 */
function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length;
  const n = text2.length;

  // dp[i][j] 表示 text1[0:i] 和 text2[0:j] 的最长公共子序列的长度
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  // 填充dp数组
  for (let i = 1; i <= m; i++) {
    const c1 = text1[i - 1];
    for (let j = 1; j <= n; j++) {
      const c2 = text2[j - 1];
      if (c1 === c2) {
        // 如果当前字符相同，则最长公共子序列长度加1
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        // 如果当前字符不同，则取两种情况的最大值：
        // 1. 不使用text1[i-1]：dp[i-1][j]
        // 2. 不使用text2[j-1]：dp[i][j-1]
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 求两个字符串的最长公共子序列长度
   - 子序列：保持相对顺序，可以删除某些字符
   - 公共子序列：两个字符串都包含的子序列

2. 算法分析：
   - 时间复杂度：O(m*n)，其中m和n是两个字符串的长度
   - 空间复杂度：O(m*n)
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示text1前i个字符和text2前j个字符的最长公共子序列长度
   - 状态转移：
     * 如果text1[i-1] == text2[j-1]：dp[i][j] = dp[i-1][j-1] + 1
     * 否则：dp[i][j] = max(dp[i-1][j], dp[i][j-1])
   - 边界条件：dp[0][j] = dp[i][0] = 0

4. 优化思路：
   - 空间优化：可以使用一维数组代替二维数组
   - 滚动数组：只保存必要的状态
   - 提前返回：如果某个字符串为空，直接返回0

5. 边界情况：
   - 空字符串：返回0
   - 单个字符：检查是否相等
   - 没有公共子序列：返回0

6. 类似问题：
   - 最长公共子串（连续）
   - 编辑距离
   - 字符串匹配问题

7. 关键洞察：
   - 每个位置的状态依赖于左上方的状态
   - 如果字符相同，可以扩展公共子序列
   - 如果字符不同，选择不使用其中一个字符

8. 示例分析：
   text1 = "abcde", text2 = "ace"
   - dp[1][1] = 1 (a == a)
   - dp[2][2] = 1 (ab vs ac, 取max(dp[1][2], dp[2][1]) = 1)
   - dp[3][2] = 2 (abc vs ac, c == c, dp[2][1] + 1 = 2)
   - dp[4][3] = 3 (abcd vs ace, d != e, 取max(dp[3][3], dp[4][2]) = 3)
   - 结果：3

9. 状态转移理解：
    - 对于位置(i,j)，有两种情况：
      1. text1[i-1] == text2[j-1]：可以匹配，长度加1
      2. text1[i-1] != text2[j-1]：不能匹配，选择不使用其中一个字符
    - 选择最优的子问题解

10. 与最长公共子串的区别：
    - 最长公共子序列：可以不连续，保持相对顺序
    - 最长公共子串：必须连续
    - 状态转移方程不同
*/
