/*
 * @lc app=leetcode.cn id=459 lang=typescript
 *
 * [459] 重复的子字符串
 *
 * https://leetcode-cn.com/problems/repeated-substring-pattern/description/
 *
 * algorithms
 * Easy (47.58%)
 * Likes:    260
 * Dislikes: 0
 * Total Accepted:    24.5K
 * Total Submissions: 50.6K
 * Testcase Example:  '"abab"'
 *
 * 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
 *
 * 示例 1:
 *
 *
 * 输入: "abab"
 *
 * 输出: True
 *
 * 解释: 可由子字符串 "ab" 重复两次构成。
 *
 *
 * 示例 2:
 *
 *
 * 输入: "aba"
 *
 * 输出: False
 *
 *
 * 示例 3:
 *
 *
 * 输入: "abcabcabcabc"
 *
 * 输出: True
 *
 * 解释: 可由子字符串 "abc" 重复四次构成。 (或者子字符串 "abcabc" 重复两次构成。)
 *
 *
 */

// 解题思路 枚举
// 1. 遍历字符串的前半部分
// 2. 再遍历字符串的后半部分
// 3. 前半部分和后半部分按照索引进行对比判断

// @lc code=start
// enumerate
var repeatedSubstringPattern = function (s: string): boolean {
  const n = s.length;
  for (let i = 1; i * 2 <= n; i++) {
    if (n % i === 0) {
      let match = true;
      for (let j = i; j < n; j++) {
        if (s[j] !== s[j - i]) {
          match = false;
          break;
        }
      }
      if (match) return true;
    }
  }
  return false;
};

// string
var repeatedSubstringPattern = function (s: string): boolean {
  return (s + s).indexOf(s, 1) !== s.length;
};
// @lc code=end

// 解题思路 string 原理
// 我们将两个 s 连在一起，并移除第一个和最后一个字符。
// 如果 s 是该字符串的子串，那么 s 就满足题目要求。