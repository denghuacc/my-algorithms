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
var letterCasePermutation = function (S: string): string[] {
  const ret: string[] = [];
  const n = S.length;
  if (n === 0) return ret;
  const strArr = S.split("");
  dfs(strArr, 0);
  return ret;

  function dfs(strArr: string[], idx: number) {
    if (idx === n) {
      ret.push(strArr.join(""));
      return;
    }

    strArr[idx] = S[idx];
    dfs(strArr, idx + 1);

    // create a branch if str is letter 
    if (!Number.isInteger(parseInt(S[idx]))) {
      strArr[idx] = exchangeCase(S[idx]);
      dfs(strArr, idx + 1);
    }
  }

  function exchangeCase(letter: string) {
    return letter.charCodeAt(0) >= "a".charCodeAt(0)
      ? letter.toUpperCase()
      : letter.toLowerCase();
  }
};
// @lc code=end
