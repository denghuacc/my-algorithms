/*
 * @lc app=leetcode.cn id=500 lang=typescript
 *
 * [500] 键盘行
 *
 * https://leetcode-cn.com/problems/keyboard-row/description/
 *
 * algorithms
 * Easy (70.97%)
 * Likes:    147
 * Dislikes: 0
 * Total Accepted:    33.6K
 * Total Submissions: 46.9K
 * Testcase Example:  '["Hello","Alaska","Dad","Peace"]'
 *
 * 给你一个字符串数组 words ，只返回可以使用在 美式键盘 同一行的字母打印出来的单词。键盘如下图所示。
 *
 * 美式键盘 中：
 *
 *
 * 第一行由字符 "qwertyuiop" 组成。
 * 第二行由字符 "asdfghjkl" 组成。
 * 第三行由字符 "zxcvbnm" 组成。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：words = ["Hello","Alaska","Dad","Peace"]
 * 输出：["Alaska","Dad"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：words = ["omk"]
 * 输出：[]
 *
 *
 * 示例 3：
 *
 *
 * 输入：words = ["adsdf","sfd"]
 * 输出：["adsdf","sfd"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * words[i] 由英文字母（小写和大写字母）组成
 *
 *
 */

// @lc code=start
var findWords = function (words: string[]): string[] {
  const ret: string[] = [];
  for (const word of words) {
    if (hasIncludeOneOfRow(word)) {
      ret.push(word);
    }
  }
  return ret;

  function hasIncludeOneOfRow(word: string): boolean {
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm"];
    for (const row of rows) {
      if (hasInclude(row, word)) {
        return true;
      }
    }
    return false;
  }

  function hasInclude(row: string, word: string): boolean {
    const charArr = word.toLowerCase().split("");
    for (const char of charArr) {
      if (!row.includes(char)) {
        return false;
      }
    }
    return true;
  }
};

var findWords = function (words: string[]): string[] {
  const list: string[] = [];
  const rowIdx = "12210111011122000010020202";
  for (const word of words) {
    let isValid = true;
    const idx = rowIdx[word[0].toLowerCase().charCodeAt(0) - "a".charCodeAt(0)];
    // compare with the first one
    for (let i = 1; i < word.length; i++) {
      if (
        rowIdx[word[i].toLowerCase().charCodeAt(0) - "a".charCodeAt(0)] !== idx
      ) {
        isValid = false;
        break;
      }
    }
    if (isValid) {
      list.push(word);
    }
  }
  return list;
};
// @lc code=end
