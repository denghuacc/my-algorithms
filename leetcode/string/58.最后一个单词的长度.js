/*
 * @lc app=leetcode.cn id=58 lang=javascript
 *
 * [58] 最后一个单词的长度
 *
 * https://leetcode-cn.com/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (28.55%)
 * Likes:    184
 * Dislikes: 0
 * Total Accepted:    80.1K
 * Total Submissions: 243.6K
 * Testcase Example:  '"Hello World"'
 *
 * 给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。
 *
 * 如果不存在最后一个单词，请返回 0 。
 *
 * 说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。
 *
 *
 *
 * 示例:
 *
 * 输入: "Hello World"
 * 输出: 5
 *
 *
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLastWord = function (s) {
  s = s.trim()
  const arr = s.split(' ')
  if (arr.length === 0) return 0
  return arr.pop().length
}

var lengthOfLastWord = function (s) {
  let end = s.length - 1
  while (end >= 0 && s[end] === ' ') end--
  if (end < 0) return 0
  let start = end
  while (start >= 0 && s[start] !== ' ') start--
  return end - start
}

var lengthOfLastWord = function (s) {
  s = s.trim()
  let end = s.length - 1
  if (end < 0) return 0
  let start = end
  while (start >= 0 && s[start] !== ' ') start--
  return end - start
}
// @lc code=end
