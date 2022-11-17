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
 * 给定字符串 s 和单词字典 words, 求 words[i] 中是 S 的子序列的单词个数。
 *
 *
 * 示例:
 * 输入:
 * s = "abcde"
 * words = ["a", "bb", "acd", "ace"]
 * 输出: 3
 * 解释: 有三个是 S 的子序列的单词: "a", "acd", "ace"。
 *
 *
 * 注意:
 *
 *
 * 所有在words和 S 里的单词都只由小写字母组成。
 * s 的长度在 [1, 50000]。
 * words 的长度在 [1, 5000]。
 * words[i]的长度在[1, 50]。
 *
 *
 */

// @lc code=start
// two pointers
var numMatchingSubseq = function (s: string, words: string[]): number {
  let res = 0;
  for (let i = 0; i < words.length; i++) {
    let j = 0;
    let k = 0;
    while (j < words[i].length && k < s.length) {
      if (words[i][j] === s[k]) {
        j++;
      }
      k++;
    }
    if (j === words[i].length) {
      res++;
    }
  }
  return res;
};

// two pointers
var numMatchingSubseq = function (s: string, words: string[]): number {
  const bucket: [number, number][][] = Array.from(new Array(26), () => []);
  for (let i = 0; i < words.length; i++) {
    bucket[words[i].charCodeAt(0) - 97].push([i, 0]);
  }
  let res = 0;
  for (const c of s) {
    const len = bucket[c.charCodeAt(0) - 97].length;
    for (let i = 0; i < len; i++) {
      let [i, j] = bucket[c.charCodeAt(0) - 97].shift()!;
      if (j === words[i].length - 1) {
        res++;
      } else {
        j++;
        bucket[words[i].charCodeAt(j) - 97].push([i, j]);
      }
    }
  }
  return res;
};
// @lc code=end
