/*
 * @lc app=leetcode.cn id=67 lang=rust
 *
 * [67] 二进制求和
 *
 * https://leetcode-cn.com/problems/add-binary/description/
 *
 * algorithms
 * Easy (54.15%)
 * Likes:    709
 * Dislikes: 0
 * Total Accepted:    207.4K
 * Total Submissions: 383.1K
 * Testcase Example:  '"11"\n"1"'
 *
 * 给你两个二进制字符串，返回它们的和（用二进制表示）。
 *
 * 输入为 非空 字符串且只包含数字 1 和 0。
 *
 *
 *
 * 示例 1:
 *
 * 输入: a = "11", b = "1"
 * 输出: "100"
 *
 * 示例 2:
 *
 * 输入: a = "1010", b = "1011"
 * 输出: "10101"
 *
 *
 *
 * 提示：
 *
 *
 * 每个字符串仅由字符 '0' 或 '1' 组成。
 * 1 <= a.length, b.length <= 10^4
 * 字符串如果不是 "0" ，就都不含前导零。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn add_binary(mut a: String, mut b: String) -> String {
        let a_len = a.len();
        let b_len = b.len();
        let max_len = usize::max(a_len, b_len);
        if a_len < max_len {
            a.insert_str(0, &"0".repeat(max_len - a.len()));
        }
        if b_len < max_len {
            b.insert_str(0, &"0".repeat(max_len - b.len()));
        }

        let mut a = a.chars().rev();
        let mut b = b.chars().rev();
        let mut sum = String::new();
        let mut carry = 0;
        while let (Some(a_char), Some(b_char)) = (a.next(), b.next()) {
            let mut tmp = carry;
            if a_char == '1' {
                tmp += 1;
            }
            if b_char == '1' {
                tmp += 1;
            }
            if tmp == 2 {
                sum.push('0');
                carry = 1;
            } else if tmp == 3 {
                sum.push('1');
                carry = 1;
            } else {
                sum.push(if tmp == 0 { '0' } else { '1' });
                carry = 0;
            }
        }
        if carry == 1 {
            sum.push('1');
        }
        sum.chars().rev().collect()
    }
}
// @lc code=end
