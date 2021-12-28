/*
 * @lc app=leetcode.cn id=472 lang=typescript
 *
 * [472] 连接词
 *
 * https://leetcode-cn.com/problems/concatenated-words/description/
 *
 * algorithms
 * Hard (42.31%)
 * Likes:    153
 * Dislikes: 0
 * Total Accepted:    8.9K
 * Total Submissions: 21.1K
 * Testcase Example:  '["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]'
 *
 * 给你一个 不含重复 单词的字符串数组 words ，请你找出并返回 words 中的所有 连接词 。
 *
 * 连接词 定义为：一个完全由给定数组中的至少两个较短单词组成的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words =
 * ["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"]
 * 输出：["catsdogcats","dogcatsdog","ratcatdogcat"]
 * 解释："catsdogcats" 由 "cats", "dog" 和 "cats" 组成;
 * ⁠    "dogcatsdog" 由 "dog", "cats" 和 "dog" 组成;
 * ⁠    "ratcatdogcat" 由 "rat", "cat", "dog" 和 "cat" 组成。
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["cat","dog","catdog"]
 * 输出：["catdog"]
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= words.length <= 10^4
 * 0 <= words[i].length <= 1000
 * words[i] 仅由小写字母组成
 * 0 <= sum(words[i].length) <= 10^5
 *
 *
 */

// @lc code=start
// dp
function findAllConcatenatedWordsInADict(words: string[]): string[] {
  const set: Set<string> = new Set();
  const res: string[] = [];
  for (const word of words) {
    set.add(word);
  }
  for (const word of words) {
    if (word === "") {
      continue;
    }
    set.delete(word);
    if (canCheck(word)) {
      res.push(word);
    }
    set.add(word);
  }
  return res;

  function canCheck(s: string): boolean {
    const n = s.length;
    if (set.size === 0 || n === 0) {
      return false;
    }
    const dp = new Array(n + 1).fill(false);
    dp[0] = true;
    for (let i = 1; i <= n; i++) {
      for (let j = 0; j < i; j++) {
        if (!dp[j]) {
          continue;
        }
        if (set.has(s.slice(j, i))) {
          dp[i] = true;
          break;
        }
      }
    }
    return dp[n];
  }
}
// @lc code=end
