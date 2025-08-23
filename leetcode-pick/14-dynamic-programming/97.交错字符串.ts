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
/**
 * 二维动态规划解法
 * 核心思想：dp[i][j]表示s1前i个字符和s2前j个字符能否交错形成s3前i+j个字符
 */
var isInterleave = function (s1: string, s2: string, s3: string): boolean {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;

  // 长度检查：s3的长度必须等于s1和s2长度之和
  if (l1 + l2 !== l3) return false;

  // dp[i][j] 表示 s1 的前 i 个元素和 s2 的前 j 个元素能否交错形成 s3 的前 i + j 个元素
  const dp: boolean[][] = Array.from(new Array(l1 + 1), () =>
    new Array(l2 + 1).fill(false)
  );

  // 空字符串可以交错形成空字符串
  dp[0][0] = true;

  for (let i = 0; i <= l1; i++) {
    for (let j = 0; j <= l2; j++) {
      const p = i + j - 1; // s3中的当前位置

      if (i > 0) {
        // 如果使用s1的第i个字符，需要dp[i-1][j]为true且s1[i-1] == s3[p]
        dp[i][j] = dp[i][j] || (dp[i - 1][j] && s1[i - 1] === s3[p]);
      }
      if (j > 0) {
        // 如果使用s2的第j个字符，需要dp[i][j-1]为true且s2[j-1] == s3[p]
        dp[i][j] = dp[i][j] || (dp[i][j - 1] && s2[j - 1] === s3[p]);
      }
    }
  }

  return dp[l1][l2];
};

/**
 * 一维动态规划解法（空间优化）
 * 核心思想：使用一维数组代替二维数组，节省空间
 */
var isInterleave = function (s1: string, s2: string, s3: string): boolean {
  const l1 = s1.length;
  const l2 = s2.length;
  const l3 = s3.length;

  if (l1 + l2 !== l3) return false;

  // 只保存一行的状态，dp[j]表示当前行第j列的状态
  const dp: boolean[] = new Array(l2 + 1).fill(false);
  dp[0] = true;

  for (let i = 0; i <= l1; i++) {
    for (let j = 0; j <= l2; j++) {
      const p = i + j - 1;

      if (i > 0) {
        // 更新dp[j]：如果使用s1的第i个字符
        dp[j] = dp[j] && s1[i - 1] === s3[p];
      }
      if (j > 0) {
        // 更新dp[j]：如果使用s2的第j个字符
        dp[j] = dp[j] || (dp[j - 1] && s2[j - 1] === s3[p]);
      }
    }
  }

  return dp[l2];
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 判断字符串s3是否由s1和s2交错组成
   - 交错：s3中的字符按顺序来自s1或s2，保持各自字符串中的相对顺序
   - 例如：s1="ab", s2="cd", s3="acbd"是交错的，但s3="adbc"不是

2. 算法分析：
   - 时间复杂度：O(m*n)，其中m和n分别是s1和s2的长度
   - 空间复杂度：O(m*n)（二维）或O(n)（一维优化）
   - 算法类型：动态规划

3. 实现要点：
   - 状态定义：dp[i][j]表示s1前i个字符和s2前j个字符能否交错形成s3前i+j个字符
   - 状态转移：
     * dp[i][j] = (dp[i-1][j] && s1[i-1] == s3[i+j-1]) || (dp[i][j-1] && s2[j-1] == s3[i+j-1])
   - 边界条件：dp[0][0] = true（空字符串可以交错形成空字符串）

4. 优化思路：
   - 空间优化：使用一维数组代替二维数组
   - 提前返回：长度不匹配时直接返回false
   - 状态压缩：只保存必要的状态信息

5. 边界情况：
   - 空字符串的处理
   - 长度不匹配的情况
   - 单个字符串为空的情况

6. 类似问题：
   - 编辑距离
   - 最长公共子序列
   - 字符串匹配问题

7. 关键洞察：
   - 交错字符串的长度必须等于两个原字符串长度之和
   - 每个位置的状态只依赖于左上方的状态
   - 可以使用滚动数组优化空间复杂度

8. 示例分析：
   s1="aabcc", s2="dbbca", s3="aadbbcbcac"
   - 检查每个位置是否可以通过s1或s2的字符到达
   - 最终dp[5][5]表示是否能够交错形成完整的s3
*/
