/*
 * @lc app=leetcode.cn id=524 lang=typescript
 *
 * [524] 通过删除字母匹配到字典里最长单词
 *
 * https://leetcode-cn.com/problems/longest-word-in-dictionary-through-deleting/description/
 *
 * algorithms
 * Medium (47.27%)
 * Likes:    192
 * Dislikes: 0
 * Total Accepted:    46.3K
 * Total Submissions: 96.1K
 * Testcase Example:  '"abpcplea"\n["ale","apple","monkey","plea"]'
 *
 * 给你一个字符串 s 和一个字符串数组 dictionary 作为字典，找出并返回字典中最长的字符串，该字符串可以通过删除 s 中的某些字符得到。
 *
 * 如果答案不止一个，返回长度最长且字典序最小的字符串。如果答案不存在，则返回空字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "abpcplea", dictionary = ["ale","apple","monkey","plea"]
 * 输出："apple"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abpcplea", dictionary = ["a","b","c"]
 * 输出："a"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 * s 和 dictionary[i] 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
// two pointers
var findLongestWord = function (s: string, dictionary: string[]): string {
  let ret = "";
  for (const t of dictionary) {
    let i = 0;
    let j = 0;
    while (i < t.length && j < s.length) {
      if (t[i] === s[j]) {
        i++;
      }
      j++;
    }
    if (i === t.length) {
      if (t.length > ret.length || (t.length === ret.length && t < ret)) {
        ret = t;
      }
    }
  }
  return ret;
};

// sorting
var findLongestWord = function (s: string, dictionary: string[]): string {
  let ret = "";
  dictionary.sort((word1, word2) => {
    if (word1.length !== word2.length) {
      return word2.length - word1.length;
    }
    return word1.localeCompare(word2);
  });

  for (const t of dictionary) {
    let i = 0;
    let j = 0;
    while (i < t.length && j < s.length) {
      if (t[i] === s[j]) {
        i++;
      }
      j++;
    }
    if (i === t.length) {
      if (t.length > ret.length || (t.length === ret.length && t < ret)) {
        ret = t;
      }
    }
  }
  return ret;
};
// @lc code=end
