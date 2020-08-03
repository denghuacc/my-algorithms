/*
 * @lc app=leetcode.cn id=415 lang=typescript
 *
 * [415] 字符串相加
 *
 * https://leetcode-cn.com/problems/add-strings/description/
 *
 * algorithms
 * Easy (42.80%)
 * Likes:    200
 * Dislikes: 0
 * Total Accepted:    46.9K
 * Total Submissions: 92.3K
 * Testcase Example:  '"0"\n"0"'
 *
 * 给定两个字符串形式的非负整数 num1 和num2 ，计算它们的和。
 *
 * 注意：
 *
 *
 * num1 和num2 的长度都小于 5100.
 * num1 和num2 都只包含数字 0-9.
 * num1 和num2 都不包含任何前导零。
 * 你不能使用任何內建 BigInteger 库， 也不能直接将输入的字符串转换为整数形式。
 *
 *
 */

// @lc code=start
// math
function addStrings(num1: string, num2: string): string {
  let i = num1.length - 1;
  let j = num2.length - 1;
  let add = 0;
  const ret: number[] = [];

  while (i >= 0 || j >= 0 || add !== 0) {
    const x = i >= 0 ? parseInt(num1[i]) : 0;
    const y = j >= 0 ? parseInt(num2[j]) : 0;
    const result = x + y + add;
    ret.push(result % 10);
    add = Math.floor(result / 10);
    i--;
    j--;
  }
  return ret.reverse().join("");
}
// @lc code=end
