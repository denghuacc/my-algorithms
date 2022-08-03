/*
 * @lc app=leetcode.cn id=696 lang=typescript
 *
 * [696] 计数二进制子串
 *
 * https://leetcode-cn.com/problems/count-binary-substrings/description/
 *
 * algorithms
 * Easy (53.65%)
 * Likes:    187
 * Dislikes: 0
 * Total Accepted:    15.9K
 * Total Submissions: 28K
 * Testcase Example:  '"00110"'
 *
 * 给定一个字符串 s，计算具有相同数量0和1的非空(连续)子字符串的数量，并且这些子字符串中的所有0和所有1都是组合在一起的。
 *
 * 重复出现的子串要计算它们出现的次数。
 *
 * 示例 1 :
 *
 *
 * 输入: "00110011"
 * 输出: 6
 * 解释: 有6个子串具有相同数量的连续1和0：“0011”，“01”，“1100”，“10”，“0011” 和 “01”。
 *
 * 请注意，一些重复出现的子串要计算它们出现的次数。
 *
 * 另外，“00110011”不是有效的子串，因为所有的0（和1）没有组合在一起。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: "10101"
 * 输出: 4
 * 解释: 有4个子串：“10”，“01”，“10”，“01”，它们具有相同数量的连续1和0。
 *
 *
 * 注意：
 *
 *
 * s.length 在1到50,000之间。
 * s 只包含“0”或“1”字符。
 *
 *
 */

// @lc code=start
// string
var countBinarySubstrings = function (s: string): number {
  const counts: number[] = [];
  let ptr = 0;
  const n = s.length;

  while (ptr < n) {
    const c = s[ptr];
    let count = 0;
    while (ptr < n && s[ptr] === c) {
      ptr++;
      count++;
    }
    counts.push(count);
  }

  let ret = 0;
  for (let i = 1; i < counts.length; i++) {
    ret += Math.min(counts[i], counts[i - 1]);
  }

  return ret;
};

// string 2 optimize
var countBinarySubstrings = function (s: string): number {
  let ptr = 0;
  const n = s.length;
  let last = 0;
  let ret = 0;

  while (ptr < n) {
    const c = s[ptr];
    let count = 0;
    while (ptr < n && s[ptr] === c) {
      ptr++;
      count++;
    }
    ret += Math.min(count, last);
    last = count;
  }

  return ret;
};
// @lc code=end
