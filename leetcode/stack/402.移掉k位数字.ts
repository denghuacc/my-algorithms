/*
 * @lc app=leetcode.cn id=402 lang=typescript
 *
 * [402] 移掉K位数字
 *
 * https://leetcode-cn.com/problems/remove-k-digits/description/
 *
 * algorithms
 * Medium (30.23%)
 * Likes:    348
 * Dislikes: 0
 * Total Accepted:    31K
 * Total Submissions: 102K
 * Testcase Example:  '"1432219"\n3'
 *
 * 给定一个以字符串表示的非负整数 num，移除这个数中的 k 位数字，使得剩下的数字最小。
 *
 * 注意:
 *
 *
 * num 的长度小于 10002 且 ≥ k。
 * num 不会包含任何前导零。
 *
 *
 * 示例 1 :
 *
 *
 * 输入: num = "1432219", k = 3
 * 输出: "1219"
 * 解释: 移除掉三个数字 4, 3, 和 2 形成一个新的最小的数字 1219。
 *
 *
 * 示例 2 :
 *
 *
 * 输入: num = "10200", k = 1
 * 输出: "200"
 * 解释: 移掉首位的 1 剩下的数字为 200. 注意输出不能有任何前导零。
 *
 *
 * 示例 3 :
 *
 *
 * 输入: num = "10", k = 2
 * 输出: "0"
 * 解释: 从原数字移除所有的数字，剩余为空就是0。
 *
 *
 */

// @lc code=start
// stack
var removeKdigits = function (num: string, k: number): string {
  const stack: string[] = [];
  for (const digit of num) {
    while (
      stack.length &&
      Number(stack[stack.length - 1]) > Number(digit) &&
      k
    ) {
      stack.pop(); // pop bigger digit
      k--;
    }
    stack.push(digit);
  }

  for (; k > 0; k--) {
    stack.pop(); // pop tailed digit
  }

  let ret = "";
  let isLeadingZero = true; // the first zero
  for (const digit of stack) {
    if (isLeadingZero && digit === "0") {
      continue;
    }
    isLeadingZero = false;
    ret += digit;
  }

  return ret === "" ? "0" : ret;
};
// @lc code=end
