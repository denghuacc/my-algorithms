/*
 * @lc app=leetcode.cn id=796 lang=typescript
 *
 * [796] 旋转字符串
 *
 * https://leetcode-cn.com/problems/rotate-string/description/
 *
 * algorithms
 * Easy (58.77%)
 * Likes:    195
 * Dislikes: 0
 * Total Accepted:    39.2K
 * Total Submissions: 66.8K
 * Testcase Example:  '"abcde"\n"cdeab"'
 *
 * 给定两个字符串, s 和 goal。如果在若干次旋转操作之后，s 能变成 goal ，那么返回 true 。
 *
 * s 的 旋转操作 就是将 s 最左边的字符移动到最右边。
 *
 *
 * 例如, 若 s = 'abcde'，在旋转一次之后结果就是'bcdea' 。
 *
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: s = "abcde", goal = "cdeab"
 * 输出: true
 *
 *
 * 示例 2:
 *
 *
 * 输入: s = "abcde", goal = "abced"
 * 输出: false
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= s.length, goal.length <= 100
 * s 和 goal 由小写英文字母组成
 *
 *
 */

// @lc code=start
// search string
var rotateString = function (s: string, goal: string): boolean {
  return s.length === goal.length && (s + s).includes(goal);
};

// string
var rotateString = function (s: string, goal: string): boolean {
  const sLen = s.length;
  const goalLen = goal.length;
  if (sLen !== goalLen) {
    return false;
  }
  for (let i = 0; i < sLen; i++) {
    let flag = true;
    for (let j = 0; j < goalLen; j++) {
      if (s[(i + j) % sLen] !== goal[j]) {
        flag = false;
        break;
      }
    }
    if (flag) {
      return true;
    }
  }
  return false;
};
// @lc code=end
