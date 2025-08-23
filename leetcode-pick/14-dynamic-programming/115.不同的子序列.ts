/*
 * @lc app=leetcode.cn id=115 lang=typescript
 *
 * [115] 不同的子序列
 *
 * https://leetcode-cn.com/problems/distinct-subsequences/description/
 *
 * algorithms
 * Hard (50.14%)
 * Likes:    347
 * Dislikes: 0
 * Total Accepted:    27.1K
 * Total Submissions: 53.1K
 * Testcase Example:  '"rabbbit"\n"rabbit"'
 *
 * 给定一个字符串 s 和一个字符串 t ，计算在 s 的子序列中 t 出现的个数。
 *
 * 字符串的一个 子序列 是指，通过删除一些（也可以不删除）字符且不干扰剩余字符相对位置所组成的新字符串。（例如，"ACE" 是 "ABCDE"
 * 的一个子序列，而 "AEC" 不是）
 *
 * 题目数据保证答案符合 32 位带符号整数范围。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "rabbbit", t = "rabbit"
 * 输出：3
 * 解释：
 * 如下图所示, 有 3 种可以从 s 中得到 "rabbit" 的方案。
 * (上箭头符号 ^ 表示选取的字母)
 * rabbbit
 * ^^^^ ^^
 * rabbbit
 * ^^ ^^^^
 * rabbbit
 * ^^^ ^^^
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "babgbag", t = "bag"
 * 输出：5
 * 解释：
 * 如下图所示, 有 5 种可以从 s 中得到 "bag" 的方案。
 * (上箭头符号 ^ 表示选取的字母)
 * babgbag
 * ^^ ^
 * babgbag
 * ^^    ^
 * babgbag
 * ^    ^^
 * babgbag
 * ⁠ ^  ^^
 * babgbag
 * ⁠   ^^^
 *
 *
 *
 * 提示：
 *
 *
 * 0
 * s 和 t 由英文字母组成
 *
 *
 */

// @lc code=start
/**
 * 动态规划解法
 * 核心思想：dp[i][j]表示s前i个字符中t前j个字符出现的子序列个数
 */
function numDistinct(s: string, t: string): number {
  const m = s.length;
  const n = t.length;

  // dp[i][j] 表示 s[0...i] 和 t[0...j] 时的子序列个数
  // dp[i][0] 表示空字符串t，dp[0][j] 表示空字符串s
  const dp: number[][] = Array.from(new Array(m + 1), () =>
    new Array(n + 1).fill(0)
  );

  // 初始化：空字符串t在任意字符串s中出现的次数为1（删除所有字符）
  for (let i = 0; i <= m; i++) {
    dp[i][0] = 1;
  }

  // 填充dp数组
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      // 如果t的长度大于s的长度，不可能匹配
      if (j > i) {
        continue;
      }

      if (s[i - 1] === t[j - 1]) {
        // 如果当前字符相同，有两种选择：
        // 1. 使用当前字符匹配：dp[i-1][j-1]
        // 2. 不使用当前字符：dp[i-1][j]
        dp[i][j] = dp[i - 1][j - 1] + dp[i - 1][j];
      } else {
        // 如果当前字符不同，只能不使用当前字符
        dp[i][j] = dp[i - 1][j];
      }
    }
  }

  return dp[m][n];
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 计算字符串s的子序列中字符串t出现的个数
   - 子序列：通过删除字符得到，保持相对顺序
   - 求所有可能的匹配方案数量

2. 算法分析：
   - 时间复杂度：O(m*n)，其中m和n是两个字符串的长度
   - 空间复杂度：O(m*n)
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示s前i个字符中t前j个字符出现的子序列个数
   - 状态转移：
     * 如果s[i-1] == t[j-1]：dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
     * 否则：dp[i][j] = dp[i-1][j]
   - 边界条件：dp[i][0] = 1（空字符串t）

4. 优化思路：
   - 空间优化：可以使用一维数组代替二维数组
   - 滚动数组：只保存必要的状态
   - 剪枝：当t长度大于s长度时跳过

5. 边界情况：
   - 空字符串t：返回1
   - 空字符串s：返回0（除非t也是空字符串）
   - t长度大于s长度：返回0

6. 类似问题：
   - 最长公共子序列
   - 编辑距离
   - 字符串匹配问题

7. 关键洞察：
   - 每个位置的状态依赖于左上方和上方的状态
   - 如果字符相同，可以选择使用或不使用
   - 如果字符不同，只能不使用

8. 示例分析：
   s = "rabbbit", t = "rabbit"
   - dp[0][0] = 1, dp[1][0] = 1, ..., dp[7][0] = 1
   - dp[1][1] = 1 (r == r)
   - dp[2][2] = 1 (ra vs ra)
   - dp[3][3] = 2 (rab vs rab, 可以选择使用或不使用b)
   - ...
   - 结果：3

9. 状态转移理解：
    - 对于位置(i,j)，有两种情况：
      1. s[i-1] == t[j-1]：可以选择匹配或不匹配
      2. s[i-1] != t[j-1]：只能不匹配
    - 累加所有可能的方案数

10. 与最长公共子序列的区别：
    - 最长公共子序列：求最长长度
    - 不同子序列：求方案数量
    - 状态转移方程类似，但含义不同
*/
