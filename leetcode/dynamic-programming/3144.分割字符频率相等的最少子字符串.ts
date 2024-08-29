/*
 * @lc app=leetcode.cn id=3144 lang=typescript
 *
 * [3144] 分割字符频率相等的最少子字符串
 *
 * https://leetcode.cn/problems/minimum-substring-partition-of-equal-character-frequency/description/
 *
 * algorithms
 * Medium (51.30%)
 * Likes:    21
 * Dislikes: 0
 * Total Accepted:    6K
 * Total Submissions: 9.8K
 * Testcase Example:  '"fabccddg"'
 *
 * 给你一个字符串 s ，你需要将它分割成一个或者更多的 平衡 子字符串。比方说，s == "ababcc" 那么 ("abab", "c", "c")
 * ，("ab", "abc", "c") 和 ("ababcc") 都是合法分割，但是 ("a", "bab", "cc") ，("aba", "bc",
 * "c") 和 ("ab", "abcc") 不是，不平衡的子字符串用粗体表示。
 *
 * 请你返回 s 最少 能分割成多少个平衡子字符串。
 *
 * 注意：一个 平衡 字符串指的是字符串中所有字符出现的次数都相同。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "fabccddg"
 *
 * 输出：3
 *
 * 解释：
 *
 * 我们可以将 s 分割成 3 个子字符串：("fab, "ccdd", "g") 或者 ("fabc", "cd", "dg") 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abababaccddb"
 *
 * 输出：2
 *
 * 解释：
 *
 * 我们可以将 s 分割成 2 个子字符串：("abab", "abaccddb") 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 1000
 * s 只包含小写英文字母。
 *
 *
 */

// @lc code=start
function minimumSubstringsInPartition(s: string): number {
  const INF = 0x3f3f3f3f;
  const n = s.length;
  const dp: number[] = new Array(n + 1).fill(INF);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    let maxCnt = 0;
    const occCnt: Map<string, number> = new Map();
    for (let j = i; j >= 1; j--) {
      const ch = s[j - 1];
      occCnt.set(ch, (occCnt.get(ch) || 0) + 1);
      maxCnt = Math.max(maxCnt, occCnt.get(ch)!);
      if (maxCnt * occCnt.size === i - j + 1 && dp[j - 1] !== INF) {
        dp[i] = Math.min(dp[i], dp[j - 1] + 1);
      }
    }
  }
  return dp[n];
}
// @lc code=end
