/*
 * @lc app=leetcode.cn id=14 lang=typescript
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (31.58%)
 * Likes:    936
 * Dislikes: 0
 * Total Accepted:    220K
 * Total Submissions: 597.9K
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 * 示例 1:
 *
 * 输入: ["flower","flow","flight"]
 * 输出: "fl"
 *
 *
 * 示例 2:
 *
 * 输入: ["dog","racecar","car"]
 * 输出: ""
 * 解释: 输入不存在公共前缀。
 *
 *
 * 说明:
 *
 * 所有输入只包含小写字母 a-z 。
 *
 */

// @lc code=start
var longestCommonPrefix = function (strs: string[]): string {
  if (strs.length === 0) return "";
  const first = strs[0];
  let index = 0;
  let ret = "";

  while (index < first.length) {
    let bool;
    for (let j = 0; j < strs.length; j++) {
      if (first[index] !== strs[j][index]) {
        bool = false;
        break; // 只要有一次不匹配就打断循环并返回 ret
      } else {
        bool = true;
      }
    }
    if (bool) {
      ret += first[index];
    } else {
      return ret;
    }
    index++;
  }

  return ret;
};
// @lc code=end
