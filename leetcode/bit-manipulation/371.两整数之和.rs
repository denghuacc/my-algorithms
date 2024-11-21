/*
 * @lc app=leetcode.cn id=371 lang=rust
 *
 * [371] 两整数之和
 *
 * https://leetcode-cn.com/problems/sum-of-two-integers/description/
 *
 * algorithms
 * Medium (59.39%)
 * Likes:    467
 * Dislikes: 0
 * Total Accepted:    60.8K
 * Total Submissions: 102.5K
 * Testcase Example:  '1\n2'
 *
 * 给你两个整数 a 和 b ，不使用 运算符 + 和 - ​​​​​​​，计算并返回两整数之和。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：a = 1, b = 2
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：a = 2, b = 3
 * 输出：5
 *
 *
 *
 *
 * 提示：
 *
 *
 * -1000 <= a, b <= 1000
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn get_sum(a: i32, b: i32) -> i32 {
        let mut a = a;
        let mut b = b;
        while b != 0 {
            let t = a ^ b;
            b = (a & b) << 1;
            a = t;
        }
        a
    }
}
// @lc code=end
