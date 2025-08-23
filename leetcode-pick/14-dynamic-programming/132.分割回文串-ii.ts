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
/**
 * 动态规划解法
 * 核心思想：先预处理回文串，再计算最少分割次数
 */
function minCut(s: string): number {
  const n = s.length;

  // g[i][j] 表示 s[i...j] 是否为回文串
  const g: boolean[][] = Array.from(new Array(n), () =>
    new Array(n).fill(true)
  );

  // 预处理回文串：从后往前计算
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      // s[i...j] 是回文串的条件：s[i] == s[j] 且 s[i+1...j-1] 是回文串
      g[i][j] = s[i] === s[j] && g[i + 1][j - 1];
    }
  }

  // f[i] 表示 s[0...i] 的最少分割次数
  const f: number[] = new Array(n).fill(Infinity);

  for (let i = 0; i < n; i++) {
    if (g[0][i]) {
      // 如果 s[0...i] 本身就是回文串，不需要分割
      f[i] = 0;
    } else {
      // 尝试在位置j处分割：s[0...j] + s[j+1...i]
      for (let j = 0; j < i; j++) {
        if (g[j + 1][i]) {
          // 如果 s[j+1...i] 是回文串，则 f[i] = f[j] + 1
          f[i] = Math.min(f[i], f[j] + 1);
        }
      }
    }
  }

  return f[n - 1];
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 将字符串分割成若干个回文子串
   - 求最少的分割次数
   - 每个子串都必须是回文串

2. 算法分析：
   - 时间复杂度：O(n²)
   - 空间复杂度：O(n²)
   - 算法类型：动态规划

3. 实现要点：
   - 预处理：计算所有子串是否为回文串
   - 状态定义：f[i]表示s[0...i]的最少分割次数
   - 状态转移：f[i] = min(f[j] + 1) for all j where s[j+1...i] is palindrome
   - 边界条件：如果s[0...i]本身就是回文串，f[i] = 0

4. 优化思路：
   - 预处理回文串：避免重复判断
   - 空间优化：可以使用一维数组
   - 剪枝：只考虑有效的分割点

5. 边界情况：
   - 空字符串：返回0
   - 单个字符：返回0（本身就是回文串）
   - 整个字符串是回文串：返回0

6. 类似问题：
   - 分割回文串（求所有分割方案）
   - 最长回文子串
   - 其他回文串问题

7. 关键洞察：
   - 需要先预处理所有子串的回文性质
   - 每个位置的最少分割次数依赖于前面的所有可能分割点
   - 如果整个前缀是回文串，则不需要分割

8. 示例分析：
   s = "aab"
   - g[0][0] = true, g[1][1] = true, g[2][2] = true
   - g[0][1] = true (aa), g[1][2] = false (ab)
   - g[0][2] = false (aab)
   - f[0] = 0 (a是回文串)
   - f[1] = 0 (aa是回文串)
   - f[2] = 1 (aab需要分割：aa|b)

9. 预处理回文串的理解：
   - g[i][j] = true 表示 s[i...j] 是回文串
   - 状态转移：g[i][j] = (s[i] == s[j]) && g[i+1][j-1]
   - 从后往前计算，确保子问题已经解决

10. 状态转移理解：
    - 对于位置i，尝试在位置j处分割
    - 如果s[j+1...i]是回文串，则f[i] = f[j] + 1
    - 选择所有可能分割中的最小值
    - 如果s[0...i]本身就是回文串，则f[i] = 0
*/
