/*
 * @lc app=leetcode.cn id=17 lang=typescript
 *
 * [17] 电话号码的字母组合
 *
 * https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number/description/
 *
 * algorithms
 * Medium (47.28%)
 * Likes:    652
 * Dislikes: 0
 * Total Accepted:    99K
 * Total Submissions: 186.4K
 * Testcase Example:  '"23"'
 *
 * 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
 *
 * 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
 *
 *
 *
 * 示例:
 *
 * 输入："23"
 * 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
 *
 *
 * 说明:
 * 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。
 *
 */

// @lc code=start
// backtracking
var letterCombinations = function (digits: string): string[] {
  const map = new Map([
    ["2", "abc"],
    ["3", "def"],
    ["4", "ghi"],
    ["5", "jkl"],
    ["6", "mno"],
    ["7", "pqrs"],
    ["8", "tuv"],
    ["9", "wxyz"],
  ]);

  const ret: string[] = [];

  if (digits.length !== 0) dfs("", digits);
  return ret;

  function dfs(combination: string, next: string) {
    if (next.length === 0) {
      ret.push(combination);
      return;
    }

    const digit = next.substring(0, 1);
    const letters = map.get(digit)!;
    for (let i = 0; i < letters.length; i++) {
      const letter = letters.substring(i, i + 1);
      dfs(combination + letter, next.substring(1));
    }
  }
};
// @lc code=end
