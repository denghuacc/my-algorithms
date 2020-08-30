/*
 * @lc app=leetcode.cn id=557 lang=typescript
 *
 * [557] 反转字符串中的单词 III
 *
 * https://leetcode-cn.com/problems/reverse-words-in-a-string-iii/description/
 *
 * algorithms
 * Easy (71.58%)
 * Likes:    219
 * Dislikes: 0
 * Total Accepted:    74.6K
 * Total Submissions: 103.9K
 * Testcase Example:  `"Let's take LeetCode contest"`
 *
 * 给定一个字符串，你需要反转字符串中每个单词的字符顺序，同时仍保留空格和单词的初始顺序。
 *
 *
 *
 * 示例：
 *
 * 输入："Let's take LeetCode contest"
 * 输出："s'teL ekat edoCteeL tsetnoc"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 在字符串中，每个单词由单个空格分隔，并且字符串中不会有任何额外的空格。
 *
 *
 */

// @lc code=start
// API
var reverseWords = function (s: string): string {
  return s
    .split(" ")
    .map((i) => i.split("").reverse().join(""))
    .join(" ");
};

// traverse
var reverseWords = function (s: string): string {
  const ret: string[] = [];
  const n = s.length;
  let i = 0;
  while (i < n) {
    let start = i;
    while (i < n && s[i] !== " ") {
      i++;
    }
    for (let p = start; p < i; p++) {
      ret.push(s[start + i - 1 - p]);
    }
    while (i < n && s[i] === " ") {
      i++;
      ret.push(" ");
    }
  }
  return ret.join("");
};
// @lc code=end

// traverse optimize timeout
var reverseWords = function (s: string): string {
  const n = s.length;
  let i = 0;
  while (i < n) {
    let start = i;
    while (i < n && s[i] !== " ") {
      i++;
    }
    let left = start;
    let right = i - 1;
    while (left < right) {
      s = swap(s, left, right);
      left++;
      right--;
    }
    while (i < n && s[i] === " ") {
      i++;
    }
  }
  return s;

  // 字符串换位
  function swap(s: string, i: number, j: number) {
    const arr = s.split("");
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr.join("");
  }
};
