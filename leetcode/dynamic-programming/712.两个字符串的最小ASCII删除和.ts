/*
 * @lc app=leetcode.cn id=712 lang=typescript
 *
 * [712] 两个字符串的最小ASCII删除和
 *
 * https://leetcode.cn/problems/minimum-ascii-delete-sum-for-two-strings/description/
 *
 * algorithms
 * Medium (66.16%)
 * Likes:    4366
 * Dislikes: 118
 * Total Accepted:    217.7K
 * Total Submissions: 317.4K
 * Testcase Example:  '"sea"\n"eat"'
 *
 * 给定两个字符串 s1 和 s2，返回使二者相等所需删除字符的最小 ASCII 总和。
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "sea", s2 = "eat"
 * 输出：231
 * 解释：从 "sea" 删除 "s" 的 ASCII 值为 115。
 * 从 "eat" 删除 "t" 的 ASCII 值为 116。
 * 删除后两字符串相等，最小总和为 115 + 116 = 231。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "delete", s2 = "leet"
 * 输出：403
 * 解释：从 "delete" 删除 "dee" 后得到 "let"，代价为 100+101+101。
 * 从 "leet" 删除 "e" 代价为 101。
 * 两者最终都为 "let"，总和为 403。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s1.length, s2.length <= 1000
 * s1 和 s2 仅包含小写英文字母
 *
 *
 */

// @lc code=start
/**
 * 计算使两个字符串相等的最小 ASCII 删除和。
 *
 * @param s1 - 第一个字符串
 * @param s2 - 第二个字符串
 * @returns 最小 ASCII 删除和
 */
function minimumDeleteSum(s1: string, s2: string): number {
  const m = s1.length;
  const n = s2.length;

  // dp[i][j] 表示 s1 前 i 个字符与 s2 前 j 个字符相等的最小删除和
  const dp: number[][] = Array.from({ length: m + 1 }, () =>
    Array(n + 1).fill(0)
  );

  for (let i = 1; i <= m; i++) {
    // s2 为空时，只能删除 s1 的前 i 个字符
    dp[i][0] = dp[i - 1][0] + s1.charCodeAt(i - 1);
  }

  for (let j = 1; j <= n; j++) {
    // s1 为空时，只能删除 s2 的前 j 个字符
    dp[0][j] = dp[0][j - 1] + s2.charCodeAt(j - 1);
  }

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] === s2[j - 1]) {
        // 字符相同，无需删除，继承左上角
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        // 删除 s1[i-1] 或 s2[j-1]，取最小代价
        dp[i][j] = Math.min(
          dp[i - 1][j] + s1.charCodeAt(i - 1),
          dp[i][j - 1] + s2.charCodeAt(j - 1)
        );
      }
    }
  }

  return dp[m][n];
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：通过删除字符让两个字符串相等，并使删除字符的 ASCII 总和最小。
   - 关键特点：只能删除，不能替换或插入；代价由 ASCII 值累加。
   - 目标：最小化删除成本。

2. 解题思路
   核心思想
   - 动态规划，比较两个字符串的前缀。
   - 若当前字符相同，则无需删除该字符。
   - 若不同，则只能删除其中一个，取较小代价。

   算法步骤
   1) 定义 dp[i][j] 为 s1 前 i 个字符与 s2 前 j 个字符相等的最小删除和。
   2) 初始化：
      - dp[i][0] 为删除 s1 前 i 个字符的 ASCII 和。
      - dp[0][j] 为删除 s2 前 j 个字符的 ASCII 和。
   3) 状态转移：
      - 若 s1[i-1] == s2[j-1]，dp[i][j] = dp[i-1][j-1]。
      - 否则，dp[i][j] 取删除 s1[i-1] 或删除 s2[j-1] 的最小值。
   4) 返回 dp[m][n]。

3. 代码实现
   实现步骤
   - 构建 (m+1) x (n+1) 的 DP 表。
   - 先填充边界，再逐行逐列更新状态。
   - 结果存于 dp[m][n]。

   关键函数说明
   - minimumDeleteSum：主函数，执行 DP 计算最小删除和。

4. 复杂度分析
   - 时间复杂度：O(m * n)，需遍历整个 DP 表。
   - 空间复杂度：O(m * n)，DP 表占用二维空间。
   - 关键观察：状态仅依赖左、上、左上，易于滚动优化。

5. 示例分析
   示例一：s1 = "sea", s2 = "eat"
   - 删除 's'（115）与 't'（116），得到 "ea"。
   - 最小总代价为 231。

   示例二：s1 = "delete", s2 = "leet"
   - 删除 "dee" 与 "e" 后得到 "let"，代价为 403。

   边界情况
   - 其中一个字符串为空：答案为另一个字符串的 ASCII 总和。
   - 完全相同的字符串：答案为 0。

6. 算法要点总结
   核心技巧
   - 用前缀 DP 比较两字符串，保证全局最优。
   - 字符相同走斜对角，不产生删除代价。

   优化要点
   - 可用滚动数组将空间优化到 O(n)。
   - ASCII 值通过 charCodeAt 快速获取。

   类似问题
   - 最小删除次数使两字符串相等（只统计次数）。
   - 最小编辑距离（允许插入、替换）。

7. 常见错误
   - 忘记初始化 dp[i][0] / dp[0][j]。
   - 把删除代价写成字符索引而非 ASCII 值。
   - 字符相同仍进行删除，导致结果偏大。
*/
