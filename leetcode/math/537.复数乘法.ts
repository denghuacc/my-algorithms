/*
 * @lc app=leetcode.cn id=537 lang=typescript
 *
 * [537] 复数乘法
 *
 * https://leetcode-cn.com/problems/complex-number-multiplication/description/
 *
 * algorithms
 * Medium (71.42%)
 * Likes:    88
 * Dislikes: 0
 * Total Accepted:    18.5K
 * Total Submissions: 25.1K
 * Testcase Example:  '"1+1i"\n"1+1i"'
 *
 * 复数 可以用字符串表示，遵循 "实部+虚部i" 的形式，并满足下述条件：
 *
 *
 * 实部 是一个整数，取值范围是 [-100, 100]
 * 虚部 也是一个整数，取值范围是 [-100, 100]
 * i^2 == -1
 *
 *
 * 给你两个字符串表示的复数 num1 和 num2 ，请你遵循复数表示形式，返回表示它们乘积的字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num1 = "1+1i", num2 = "1+1i"
 * 输出："0+2i"
 * 解释：(1 + i) * (1 + i) = 1 + i2 + 2 * i = 2i ，你需要将它转换为 0+2i 的形式。
 *
 *
 * 示例 2：
 *
 *
 * 输入：num1 = "1+-1i", num2 = "1+-1i"
 * 输出："0+-2i"
 * 解释：(1 - i) * (1 - i) = 1 + i2 - 2 * i = -2i ，你需要将它转换为 0+-2i 的形式。
 *
 *
 *
 *
 * 提示：
 *
 *
 * num1 和 num2 都是有效的复数表示。
 *
 *
 */

// @lc code=start
// math
function complexNumberMultiply(num1: string, num2: string): string {
  const [rs1, is1] = num1.slice(0, -1).split("+");
  const [rs2, is2] = num2.slice(0, -1).split("+");
  const r1 = parseInt(rs1);
  const r2 = parseInt(rs2);
  const i1 = parseInt(is1);
  const i2 = parseInt(is2);

  return `${r1 * r2 - i1 * i2}+${r1 * i2 + r2 * i1}i`;
}
// @lc code=end
