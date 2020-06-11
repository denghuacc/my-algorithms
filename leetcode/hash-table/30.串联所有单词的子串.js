/*
 * @lc app=leetcode.cn id=30 lang=javascript
 *
 * [30] 串联所有单词的子串
 *
 * https://leetcode-cn.com/problems/substring-with-concatenation-of-all-words/description/
 *
 * algorithms
 * Hard (23.96%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    32.6K
 * Total Submissions: 106.9K
 * Testcase Example:  '"barfoothefoobarman"\n["foo","bar"]'
 *
 * 给定一个字符串 s 和一些长度相同的单词 words。找出 s 中恰好可以由 words 中所有单词串联形成的子串的起始位置。
 *
 * 注意子串要与 words 中的单词完全匹配，中间不能有其他字符，但不需要考虑 words 中单词串联的顺序。
 *
 *
 *
 * 示例 1：
 *
 * 输入：
 * ⁠ s = "barfoothefoobarman",
 * ⁠ words = ["foo","bar"]
 * 输出：[0,9]
 * 解释：
 * 从索引 0 和 9 开始的子串分别是 "barfoo" 和 "foobar" 。
 * 输出的顺序不重要, [9,0] 也是有效答案。
 *
 *
 * 示例 2：
 *
 * 输入：
 * ⁠ s = "wordgoodgoodgoodbestword",
 * ⁠ words = ["word","good","best","word"]
 * 输出：[]
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number[]}
 */
var findSubstring = function (s, words) {
  const ret = [];
  let wordNum = words.length;
  if (wordNum === 0) return ret;

  let wordLen = words[0].length;

  const wordMap = new Map();
  for (const w of words) {
    wordMap.set(w, (wordMap.get(w) || 0) + 1);
  }

  for (let i = 0; i < s.length - wordNum * wordLen + 1; i++) {
    const hasMap = new Map();
    let num = 0;
    while (num < wordNum) {
      const word = s.substring(i + num * wordLen, i + (num + 1) * wordLen);
      if (wordMap.has(word)) {
        hasMap.set(word, (hasMap.get(word) || 0) + 1);
        if (hasMap.get(word) > wordMap.get(word)) break;
      } else break;
      num++;
    }
    if (num === wordNum) ret.push(i);
  }

  return ret;
};

var findSubstring = function (s, words) {
  const ret = [];
  let wordNum = words.length;
  if (wordNum === 0) return ret;

  let wordLen = words[0].length;

  const wordMap = new Map();
  for (const w of words) {
    wordMap.set(w, (wordMap.get(w) || 0) + 1);
  }

  for (let j = 0; j < wordLen; j++) {
    const hasMap = new Map();
    let num = 0;
    for (let i = j; i < s.length - wordNum * wordLen + 1; i = i + wordLen) {
      let hasRemoved = false;
      while (num < wordNum) {
        const word = s.substring(i + num * wordLen, i + (num + 1) * wordLen);
        if (wordMap.has(word)) {
          hasMap.set(word, (hasMap.get(word) || 0) + 1);
          if (hasMap.get(word) > wordMap.get(word)) {
            hasRemoved = true;
            let removeNum = 0;
            while (hasMap.get(word) > wordMap.get(word)) {
              const firstWord = s.substring(
                i + removeNum * wordLen,
                i + (removeNum + 1) * wordLen
              );
              let v = hasMap.get(firstWord);
              hasMap.set(firstWord, v - 1);
              removeNum++;
            }
            num = num - removeNum + 1;
            i = i + (removeNum - 1) * wordLen;
            break;
          }
        } else {
          hasMap.clear();
          i = i + num * wordLen;
          num = 0;
          break;
        }
        num++;
      }
      if (num === wordNum) ret.push(i);
      if (num > 0 && !hasRemoved) {
        const firstWord = s.substring(i, i + wordLen);
        let v = hasMap.get(firstWord);
        hasMap.set(firstWord, v - 1);
        num = num - 1;
      }
    }
  }

  return ret;
};
// @lc code=end
