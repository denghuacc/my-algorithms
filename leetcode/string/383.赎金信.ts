/*
 * @lc app=leetcode.cn id=383 lang=typescript
 *
 * [383] 赎金信
 *
 * https://leetcode-cn.com/problems/ransom-note/description/
 *
 * algorithms
 * Easy (61.03%)
 * Likes:    216
 * Dislikes: 0
 * Total Accepted:    88.7K
 * Total Submissions: 143.1K
 * Testcase Example:  '"a"\n"b"'
 *
 * 为了不在赎金信中暴露字迹，从杂志上搜索各个需要的字母，组成单词来表达意思。
 *
 * 给你一个赎金信 (ransomNote) 字符串和一个杂志(magazine)字符串，判断 ransomNote 能不能由 magazines
 * 里面的字符构成。
 *
 * 如果可以构成，返回 true ；否则返回 false 。
 *
 * magazine 中的每个字符只能在 ransomNote 中使用一次。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：ransomNote = "a", magazine = "b"
 * 输出：false
 *
 *
 * 示例 2：
 *
 *
 * 输入：ransomNote = "aa", magazine = "ab"
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：ransomNote = "aa", magazine = "aab"
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= ransomNote.length, magazine.length <= 10^5
 * ransomNote 和 magazine 由小写英文字母组成
 *
 *
 */

// @lc code=start
var canConstruct = function (ransomNote: string, magazine: string): boolean {
  for (const char of ransomNote) {
    if (magazine.indexOf(char) === -1) {
      return false;
    }
    magazine = magazine.replace(char, "");
  }
  return true;
};

var canConstruct = function (ransomNote: string, magazine: string): boolean {
  const cnt = Array(26).fill(0);
  for (const c of magazine) {
    cnt[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  for (const c of ransomNote) {
    if (cnt[c.charCodeAt(0) - "a".charCodeAt(0)] === 0) {
      return false;
    }
    cnt[c.charCodeAt(0) - 97]--;
  }
  return true;
};
// @lc code=end
