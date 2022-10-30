/*
 * @lc app=leetcode.cn id=784 lang=typescript
 *
 * [784] 字母大小写全排列
 *
 * https://leetcode-cn.com/problems/letter-case-permutation/description/
 *
 * algorithms
 * Medium (65.51%)
 * Likes:    208
 * Dislikes: 0
 * Total Accepted:    25.5K
 * Total Submissions: 38.8K
 * Testcase Example:  '"a1b2"'
 *
 * 给定一个字符串S，通过将字符串S中的每个字母转变大小写，我们可以获得一个新的字符串。返回所有可能得到的字符串集合。
 *
 *
 *
 * 示例：
 * 输入：S = "a1b2"
 * 输出：["a1b2", "a1B2", "A1b2", "A1B2"]
 *
 * 输入：S = "3z4"
 * 输出：["3z4", "3Z4"]
 *
 * 输入：S = "12345"
 * 输出：["12345"]
 *
 *
 *
 *
 * 提示：
 *
 *
 * S 的长度不超过12。
 * S 仅由数字和字母组成。
 *
 *
 */

// @lc code=start
// backtracking search
var letterCasePermutation = function (s: string): string[] {
  const res: string[] = [];
  const strArr = s.split("");
  dfs(strArr, 0);
  return res;

  function dfs(strArr: string[], idx: number) {
    if (idx === strArr.length) {
      res.push(strArr.join(""));
      return;
    }

    if (isDigit(strArr[idx])) {
      dfs(strArr, idx + 1);
      return;
    }

    strArr[idx] = strArr[idx].toUpperCase();
    dfs(strArr, idx + 1);
    strArr[idx] = strArr[idx].toLowerCase();
    dfs(strArr, idx + 1);
  }

  function isDigit(ch: string) {
    return parseFloat(ch).toString() === "NaN" ? false : true;
  }
};
// @lc code=end
