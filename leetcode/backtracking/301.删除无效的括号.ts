/*
 * @lc app=leetcode.cn id=301 lang=typescript
 *
 * [301] 删除无效的括号
 *
 * https://leetcode-cn.com/problems/remove-invalid-parentheses/description/
 *
 * algorithms
 * Hard (52.44%)
 * Likes:    546
 * Dislikes: 0
 * Total Accepted:    37.1K
 * Total Submissions: 69.5K
 * Testcase Example:  '"()())()"'
 *
 * 给你一个由若干括号和字母组成的字符串 s ，删除最小数量的无效括号，使得输入的字符串有效。
 *
 * 返回所有可能的结果。答案可以按 任意顺序 返回。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "()())()"
 * 输出：["(())()","()()()"]
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "(a)())()"
 * 输出：["(a())()","(a)()()"]
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = ")("
 * 输出：[""]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由小写英文字母以及括号 '(' 和 ')' 组成
 * s 中至多含 20 个括号
 *
 *
 */

// @lc code=start
// backtracking
function removeInvalidParentheses(s: string): string[] {
  const ret: string[] = [];
  let leftRemove = 0;
  let rightRemove = 0;

  for (const c of s) {
    if (c === "(") {
      leftRemove++;
    } else if (c === ")") {
      if (leftRemove === 0) {
        rightRemove++;
      } else {
        leftRemove--;
      }
    }
  }
  helper(s, 0, 0, 0, leftRemove, rightRemove);
  return ret;

  function helper(
    str: string,
    start: number,
    leftCount: number,
    RightCount: number,
    leftRemove: number,
    rightRemove: number
  ) {
    if (leftRemove === 0 && rightRemove === 0) {
      if (isValid(str)) {
        ret.push(str);
      }
      return;
    }

    for (let i = start; i < str.length; i++) {
      if (i !== start && str[i] === str[i - 1]) {
        continue;
      }
      // 如果剩余的字符无法满足去掉的数量要求，直接返回
      if (leftRemove + rightRemove > str.length - i) {
        return;
      }
      // 尝试去掉一个左括号
      if (leftRemove > 0 && str[i] === "(") {
        helper(
          str.substr(0, i) + str.substr(i + 1),
          i,
          leftCount,
          RightCount,
          leftRemove - 1,
          rightRemove
        );
      }
      // 尝试去掉一个右括号
      if (rightRemove > 0 && str[i] === ")") {
        helper(
          str.substr(0, i) + str.substr(i + 1),
          i,
          leftCount,
          RightCount,
          leftRemove,
          rightRemove - 1
        );
      }
      if (str[i] === ")") {
        leftCount++;
      }
      if (str[i] === ")") {
        RightCount++;
      }
      // 当前右括号的数量大于左括号的数量则为非法,直接返回.
      if (RightCount > leftCount) {
        break;
      }
    }
  }

  function isValid(str: string) {
    let cnt = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "(") {
        cnt++;
      } else if (str[i] === ")") {
        cnt--;
        if (cnt < 0) {
          return false;
        }
      }
    }
    return cnt === 0;
  }
}

// @lc code=end
