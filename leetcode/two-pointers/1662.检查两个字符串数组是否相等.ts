/*
 * @lc app=leetcode.cn id=1662 lang=typescript
 *
 * [1662] 检查两个字符串数组是否相等
 *
 * https://leetcode.cn/problems/check-if-two-string-arrays-are-equivalent/description/
 *
 * algorithms
 * Easy (80.92%)
 * Likes:    44
 * Dislikes: 0
 * Total Accepted:    40.4K
 * Total Submissions: 49.1K
 * Testcase Example:  '["ab", "c"]\n["a", "bc"]'
 *
 * 给你两个字符串数组 word1 和 word2 。如果两个数组表示的字符串相同，返回 true ；否则，返回 false 。
 *
 * 数组表示的字符串 是由数组中的所有元素 按顺序 连接形成的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：word1 = ["ab", "c"], word2 = ["a", "bc"]
 * 输出：true
 * 解释：
 * word1 表示的字符串为 "ab" + "c" -> "abc"
 * word2 表示的字符串为 "a" + "bc" -> "abc"
 * 两个字符串相同，返回 true
 *
 * 示例 2：
 *
 *
 * 输入：word1 = ["a", "cb"], word2 = ["ab", "c"]
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：word1  = ["abc", "d", "defg"], word2 = ["abcddefg"]
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * 1
 * word1[i] 和 word2[i] 由小写字母组成
 *
 *
 */

// @lc code=start
var arrayStringsAreEqual = function (
  word1: string[],
  word2: string[]
): boolean {
  return word1.join("") === word2.join("");
};

// two pointers
var arrayStringsAreEqual = function (
  word1: string[],
  word2: string[]
): boolean {
  let p1 = 0;
  let p2 = 0;
  let i = 0;
  let j = 0;

  while (p1 < word1.length && p2 < word2.length) {
    if (word1[p1][i] !== word2[p2][j]) {
      return false;
    }
    i++;
    if (i === word1[p1].length) {
      p1++;
      i = 0;
    }
    j++;
    if (j === word2[p2].length) {
      p2++;
      j = 0;
    }
  }

  return p1 === word1.length && p2 === word2.length;
};
// @lc code=end
