/*
 * @lc app=leetcode.cn id=125 lang=typescript
 *
 * [125] 验证回文串
 *
 * https://leetcode-cn.com/problems/valid-palindrome/description/
 *
 * algorithms
 * Easy (37.71%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    106.9K
 * Total Submissions: 243.5K
 * Testcase Example:  '"A man, a plan, a canal: Panama"'
 *
 * 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
 *
 * 说明：本题中，我们将空字符串定义为有效的回文串。
 *
 * 示例 1:
 *
 * 输入: "A man, a plan, a canal: Panama"
 * 输出: true
 *
 *
 * 示例 2:
 *
 * 输入: "race a car"
 * 输出: false
 *
 *
 */

export {};

// @lc code=start
// two pointers
var isPalindrome = function (s: string): boolean {
  s = s.replace(/[^0-9a-zA-Z]/g, "").toLowerCase();
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    if (s[left] !== s[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
};
// @lc code=end
