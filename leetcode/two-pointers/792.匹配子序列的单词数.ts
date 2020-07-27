/*
 * @lc app=leetcode.cn id=792 lang=typescript
 *
 * [792] 匹配子序列的单词数
 *
 * https://leetcode-cn.com/problems/number-of-matching-subsequences/description/
 *
 * algorithms
 * Medium (31.84%)
 * Likes:    91
 * Dislikes: 0
 * Total Accepted:    4.6K
 * Total Submissions: 10.9K
 * Testcase Example:  '"abcde"\n["a","bb","acd","ace"]'
 *
 * 给定字符串 S 和单词字典 words, 求 words[i] 中是 S 的子序列的单词个数。
 *
 *
 * 示例:
 * 输入:
 * S = "abcde"
 * words = ["a", "bb", "acd", "ace"]
 * 输出: 3
 * 解释: 有三个是 S 的子序列的单词: "a", "acd", "ace"。
 *
 *
 * 注意:
 *
 *
 * 所有在words和 S 里的单词都只由小写字母组成。
 * S 的长度在 [1, 50000]。
 * words 的长度在 [1, 5000]。
 * words[i]的长度在[1, 50]。
 *
 *
 */

// @lc code=start
// two pointers
var numMatchingSubseq = function (S: string, words: string[]): number {
  let ret = 0;
  for (let i = 0; i < words.length; i++) {
    let j = 0;
    let k = 0;

    while (j < words[i].length && k < S.length) {
      if (words[i][j] === S[k]) j++;
      k++;
    }
    if (j === words[i].length) ret++;
  }

  return ret;
};

// bucket sort
var numMatchingSubseq = function (S: string, words: string[]): number {
  let bucket: { word: string; index: number }[][] = Array.from(
    new Array(26),
    () => []
  );
  for (const word of words) {
    bucket[word.charCodeAt(0) - 97].push({
      word,
      index: 0,
    });
  }
  let count = 0;
  for (const c of S) {
    let list = bucket[c.charCodeAt(0) - 97];
    bucket[c.charCodeAt(0) - 97] = [];
    let len = list.length;
    for (let i = 0; i < len; i++) {
      let { word, index } = list[i];
      if (index === word.length - 1) {
        count++;
      } else {
        index++;
        bucket[word.charCodeAt(index) - 97].push({
          word,
          index,
        });
      }
    }
  }
  return count;
};
// @lc code=end
