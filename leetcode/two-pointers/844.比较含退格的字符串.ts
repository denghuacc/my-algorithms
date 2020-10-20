/*
 * @lc app=leetcode.cn id=844 lang=typescript
 *
 * [844] 比较含退格的字符串
 *
 * https://leetcode-cn.com/problems/backspace-string-compare/description/
 *
 * algorithms
 * Easy (51.00%)
 * Likes:    218
 * Dislikes: 0
 * Total Accepted:    53.4K
 * Total Submissions: 102.3K
 * Testcase Example:  '"ab#c"\n"ad#c"'
 *
 * 给定 S 和 T 两个字符串，当它们分别被输入到空白的文本编辑器后，判断二者是否相等，并返回结果。 # 代表退格字符。
 *
 * 注意：如果对空文本输入退格字符，文本继续为空。
 *
 *
 *
 * 示例 1：
 *
 * 输入：S = "ab#c", T = "ad#c"
 * 输出：true
 * 解释：S 和 T 都会变成 “ac”。
 *
 *
 * 示例 2：
 *
 * 输入：S = "ab##", T = "c#d#"
 * 输出：true
 * 解释：S 和 T 都会变成 “”。
 *
 *
 * 示例 3：
 *
 * 输入：S = "a##c", T = "#a#c"
 * 输出：true
 * 解释：S 和 T 都会变成 “c”。
 *
 *
 * 示例 4：
 *
 * 输入：S = "a#c", T = "b"
 * 输出：false
 * 解释：S 会变成 “c”，但 T 仍然是 “b”。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= S.length <= 200
 * 1 <= T.length <= 200
 * S 和 T 只含有小写字母以及字符 '#'。
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你可以用 O(N) 的时间复杂度和 O(1) 的空间复杂度解决该问题吗？
 *
 *
 *
 *
 */

// @lc code=start
// string
var backspaceCompare = function (S: string, T: string): boolean {
  return build(S) === build(T);

  function build(s: string): string {
    const ret: string[] = [];
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c !== "#") {
        ret.push(c);
      } else {
        if (ret.length > 0) {
          ret.pop(); // remove the last element
        }
      }
    }
    return ret.join("");
  }
};

// two pointers
var backspaceCompare = function (S: string, T: string): boolean {
  let i = S.length - 1;
  let j = T.length - 1;
  let skipS = 0; // count of skip in the string
  let skipT = 0;

  while (i >= 0 || j >= 0) {
    while (i >= 0) {
      if (S[i] === "#") {
        skipS++;
        i--;
      } else if (skipS > 0) {
        skipS--;
        i--;
      } else {
        break;
      }
    }
    while (j >= 0) {
      if (T[j] === "#") {
        skipT++;
        j--;
      } else if (skipT > 0) {
        skipT--;
        j--;
      } else {
        break;
      }
    }
    if (i >= 0 && j >= 0) {
      if (S[i] !== T[j]) return false;
    } else {
      if (i >= 0 || j >= 0) return false;
    }
    i--;
    j--;
  }
  return true;
};
// @lc code=end
