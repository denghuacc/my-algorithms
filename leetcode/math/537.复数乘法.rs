/*
 * @lc app=leetcode.cn id=537 lang=rust
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
impl Solution {
    pub fn complex_number_multiply(num1: String, num2: String) -> String {
        let n1 = num1[..num1.len() - 1].split('+').collect::<Vec<_>>();
        let n2 = num2[..num2.len() - 1].split('+').collect::<Vec<_>>();
        let r1 = n1[0].parse::<i32>().unwrap();
        let i1 = n1[1].parse::<i32>().unwrap();
        let r2 = n2[0].parse::<i32>().unwrap();
        let i2 = n2[1].parse::<i32>().unwrap();

        format!("{}+{}i", r1 * r2 - i1 * i2, r1 * i2 + r2 * i1)
    }
}
// @lc code=end
