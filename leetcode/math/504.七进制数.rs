/*
 * @lc app=leetcode.cn id=504 lang=rust
 *
 * [504] 七进制数
 *
 * https://leetcode-cn.com/problems/base-7/description/
 *
 * algorithms
 * Easy (51.36%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    43.3K
 * Total Submissions: 84.4K
 * Testcase Example:  '100'
 *
 * 给定一个整数 num，将其转化为 7 进制，并以字符串形式输出。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: num = 100
 * 输出: "202"
 *
 *
 * 示例 2:
 *
 *
 * 输入: num = -7
 * 输出: "-10"
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10^7 <= num <= 10^7
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn convert_to_base7(num: i32) -> String {
        if num == 0 {
            return "0".to_string();
        }
        let mut res = String::new();
        let mut negative = num < 0;
        let mut num = num.abs();
        while num > 0 {
            res = (num % 7).to_string() + &res;
            num /= 7;
        }
        if negative {
            res = "-".to_string() + &res;
        }
        res
    }
}
// @lc code=end
