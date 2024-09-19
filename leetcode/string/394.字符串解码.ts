/*
 * @lc app=leetcode.cn id=394 lang=typescript
 *
 * [394] 字符串解码
 *
 * https://leetcode.cn/problems/decode-string/description/
 *
 * algorithms
 * Medium (58.26%)
 * Likes:    1835
 * Dislikes: 0
 * Total Accepted:    358.5K
 * Total Submissions: 614.7K
 * Testcase Example:  '"3[a]2[bc]"'
 *
 * 给定一个经过编码的字符串，返回它解码后的字符串。
 *
 * 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
 *
 * 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
 *
 * 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "3[a]2[bc]"
 * 输出："aaabcbc"
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "3[a2[c]]"
 * 输出："accaccacc"
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "2[abc]3[cd]ef"
 * 输出："abcabccdcdcdef"
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "abc3[cd]xyz"
 * 输出："abccdcdcdxyz"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 30
 * s 由小写英文字母、数字和方括号 '[]' 组成
 * s 保证是一个 有效 的输入。
 * s 中所有整数的取值范围为 [1, 300]
 *
 *
 */

// @lc code=start
var decodeString = function (s: string): string {
  const stk: string[] = [];
  for (const c of s) {
    if (c === "]") {
      let str = "";
      while (stk[stk.length - 1] !== "[") {
        str = stk.pop() + str; //  tips: need not use reverse
      }
      stk.pop(); // remove "["
      let digit = "";
      while (isDigit(stk[stk.length - 1])) {
        digit = stk.pop() + digit;
      }
      stk.push(str.repeat(Number(digit)));
    } else {
      stk.push(c);
    }
  }
  return stk.join("");

  function isDigit(c: string): boolean {
    return c >= "0" && c <= "9";
  }
};

var decodeString = function (s: string): string {
  const stk: string[] = [];
  const n = s.length;
  let i = 0;
  while (i < n) {
    if (isDigit(s[i])) {
      let num = "";
      while (i < n && isDigit(s[i])) {
        num += s[i];
        i++;
      }
      stk.push(num);
    } else if (s[i] === "[") {
      stk.push(s[i]);
      i++;
    } else if (s[i] === "]") {
      let str = "";
      while (stk.length && stk[stk.length - 1] !== "[") {
        str = stk.pop()! + str;
      }
      stk.pop(); // remove "["
      const num = Number(stk.pop()!);
      let multiStr = "";
      for (let j = 0; j < num; j++) {
        multiStr += str;
      }
      stk.push(multiStr);
      i++;
    } else {
      let str = "";
      while (i < n && isLetter(s[i])) {
        str += s[i];
        i++;
      }
      stk.push(str);
    }
  }

  return stk.join("");

  function isDigit(c: string): boolean {
    return c >= "0" && c <= "9";
  }

  function isLetter(c: string): boolean {
    return (c >= "A" && c <= "Z") || (c >= "a" && c <= "z");
  }
};
// @lc code=end
