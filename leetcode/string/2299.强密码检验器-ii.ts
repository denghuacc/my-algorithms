/*
 * @lc app=leetcode.cn id=2299 lang=typescript
 *
 * [2299] 强密码检验器 II
 *
 * https://leetcode.cn/problems/strong-password-checker-ii/description/
 *
 * algorithms
 * Easy (61.43%)
 * Likes:    16
 * Dislikes: 0
 * Total Accepted:    11.4K
 * Total Submissions: 17.5K
 * Testcase Example:  '"IloveLe3tcode!"'
 *
 * 如果一个密码满足以下所有条件，我们称它是一个 强 密码：
 *
 *
 * 它有至少 8 个字符。
 * 至少包含 一个小写英文 字母。
 * 至少包含 一个大写英文 字母。
 * 至少包含 一个数字 。
 * 至少包含 一个特殊字符 。特殊字符为："!@#$%^&*()-+" 中的一个。
 * 它 不 包含 2 个连续相同的字符（比方说 "aab" 不符合该条件，但是 "aba" 符合该条件）。
 *
 *
 * 给你一个字符串 password ，如果它是一个 强 密码，返回 true，否则返回 false 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：password = "IloveLe3tcode!"
 * 输出：true
 * 解释：密码满足所有的要求，所以我们返回 true 。
 *
 *
 * 示例 2：
 *
 * 输入：password = "Me+You--IsMyDream"
 * 输出：false
 * 解释：密码不包含数字，且包含 2 个连续相同的字符。所以我们返回 false 。
 *
 *
 * 示例 3：
 *
 * 输入：password = "1aB!"
 * 输出：false
 * 解释：密码不符合长度要求。所以我们返回 false 。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= password.length <= 100
 * password 包含字母，数字和 "!@#$%^&*()-+" 这些特殊字符。
 *
 *
 */

// @lc code=start
function strongPasswordCheckerII(password: string): boolean {
  const n = password.length;
  if (n < 8) {
    return false;
  }
  let hasOneMoreLowerChars = false;
  let hasOneMoreUpperChars = false;
  let hasOneMoreDigitChars = false;
  let hasOneMoreSpecialChars = false;

  for (let i = 0; i < n; i++) {
    if (i !== 0 && password[i] === password[i - 1]) {
      return false;
    }
    if (isLowerChar(password[i])) {
      hasOneMoreLowerChars = true;
    }
    if (isUpperChar(password[i])) {
      hasOneMoreUpperChars = true;
    }
    if (isDigitChar(password[i])) {
      hasOneMoreDigitChars = true;
    }
    if (isSpecialChar(password[i])) {
      hasOneMoreSpecialChars = true;
    }
  }

  return (
    hasOneMoreLowerChars &&
    hasOneMoreUpperChars &&
    hasOneMoreDigitChars &&
    hasOneMoreSpecialChars
  );

  function isLowerChar(ch: string): boolean {
    return ch >= "a" && ch <= "z";
  }
  function isUpperChar(ch: string): boolean {
    return ch >= "A" && ch <= "Z";
  }
  function isDigitChar(ch: string): boolean {
    return ch >= "0" && ch <= "9";
  }
  function isSpecialChar(ch: string): boolean {
    return "!@#$%^&*()-+".includes(ch);
  }
}
// @lc code=end
