/*
 * @lc app=leetcode.cn id=884 lang=typescript
 *
 * [884] 两句话中的不常见单词
 *
 * https://leetcode-cn.com/problems/uncommon-words-from-two-sentences/description/
 *
 * algorithms
 * Easy (70.46%)
 * Likes:    131
 * Dislikes: 0
 * Total Accepted:    31.8K
 * Total Submissions: 45.2K
 * Testcase Example:  '"this apple is sweet"\n"this apple is sour"'
 *
 * 句子 是一串由空格分隔的单词。每个 单词 仅由小写字母组成。
 *
 * 如果某个单词在其中一个句子中恰好出现一次，在另一个句子中却 没有出现 ，那么这个单词就是 不常见的 。
 *
 * 给你两个 句子 s1 和 s2 ，返回所有 不常用单词 的列表。返回列表中单词可以按 任意顺序 组织。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s1 = "this apple is sweet", s2 = "this apple is sour"
 * 输出：["sweet","sour"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s1 = "apple apple", s2 = "banana"
 * 输出：["banana"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s1.length, s2.length <= 200
 * s1 和 s2 由小写英文字母和空格组成
 * s1 和 s2 都不含前导或尾随空格
 * s1 和 s2 中的所有单词间均由单个空格分隔
 *
 *
 */

// @lc code=start
// hash table
function uncommonFromSentences(s1: string, s2: string): string[] {
  const map = new Map<string, number>();
  const s1Arr = s1.split(" ");
  const s2Arr = s2.split(" ");
  for (const word of s1Arr) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }
  for (const word of s2Arr) {
    map.set(word, (map.get(word) ?? 0) + 1);
  }

  const res: string[] = [];
  for (const [key, value] of map) {
    if (value === 1) {
      res.push(key);
    }
  }
  return res;
}
// @lc code=end
