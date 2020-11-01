/*
 * @lc app=leetcode.cn id=140 lang=typescript
 *
 * [140] 单词拆分 II
 *
 * https://leetcode-cn.com/problems/word-break-ii/description/
 *
 * algorithms
 * Hard (38.71%)
 * Likes:    263
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 60K
 * Testcase Example:  '"catsanddog"\n["cat","cats","and","sand","dog"]'
 *
 * 给定一个非空字符串 s 和一个包含非空单词列表的字典
 * wordDict，在字符串中增加空格来构建一个句子，使得句子中所有的单词都在词典中。返回所有这些可能的句子。
 *
 * 说明：
 *
 *
 * 分隔时可以重复使用字典中的单词。
 * 你可以假设字典中没有重复的单词。
 *
 *
 * 示例 1：
 *
 * 输入:
 * s = "catsanddog"
 * wordDict = ["cat", "cats", "and", "sand", "dog"]
 * 输出:
 * [
 * "cats and dog",
 * "cat sand dog"
 * ]
 *
 *
 * 示例 2：
 *
 * 输入:
 * s = "pineapplepenapple"
 * wordDict = ["apple", "pen", "applepen", "pine", "pineapple"]
 * 输出:
 * [
 * "pine apple pen apple",
 * "pineapple pen apple",
 * "pine applepen apple"
 * ]
 * 解释: 注意你可以重复使用字典中的单词。
 *
 *
 * 示例 3：
 *
 * 输入:
 * s = "catsandog"
 * wordDict = ["cats", "dog", "sand", "and", "cat"]
 * 输出:
 * []
 *
 *
 */

export {};

// @lc code=start
// backtracking
var wordBreak = function (s: string, wordDict: string[]): string[] {
  const map: Map<number, string[][]> = new Map();
  const n = s.length;
  const wordSet = new Set(wordDict);
  const words = dfs(0);
  const ret: string[] = [];
  for (const word of words) {
    ret.push(word.join(" "));
  }
  return ret;

  function dfs(index: number): string[][] {
    if (map.has(index)) return map.get(index)!;

    const words: string[][] = [];

    if (index === n) words.push([]);

    for (let i = index + 1; i <= n; i++) {
      const word = s.substring(index, i);
      if (wordSet.has(word)) {
        const nextWords = dfs(i);
        for (const nextWord of nextWords) {
          const newWord = [word, ...nextWord];
          words.push(newWord);
        }
      }
    }
    map.set(index, words);
    return words;
  }
};
// @lc code=end
