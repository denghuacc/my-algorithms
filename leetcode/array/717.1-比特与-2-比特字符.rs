/*
 * @lc app=leetcode.cn id=717 lang=rust
 *
 * [717] 1比特与2比特字符
 *
 * https://leetcode-cn.com/problems/1-bit-and-2-bit-characters/description/
 *
 * algorithms
 * Easy (52.47%)
 * Likes:    217
 * Dislikes: 0
 * Total Accepted:    37.9K
 * Total Submissions: 72.3K
 * Testcase Example:  '[1,0,0]'
 *
 * 有两种特殊字符：
 *
 *
 * 第一种字符可以用一个比特 0 来表示
 * 第二种字符可以用两个比特(10 或 11)来表示、
 *
 *
 * 给定一个以 0 结尾的二进制数组 bits ，如果最后一个字符必须是一位字符，则返回 true 。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: bits = [1, 0, 0]
 * 输出: true
 * 解释: 唯一的编码方式是一个两比特字符和一个一比特字符。
 * 所以最后一个字符是一比特字符。
 *
 *
 * 示例 2:
 *
 *
 * 输入: bits = [1, 1, 1, 0]
 * 输出: false
 * 解释: 唯一的编码方式是两比特字符和两比特字符。
 * 所以最后一个字符不是一比特字符。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= bits.length <= 1000
 * bits[i] == 0 or 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn is_one_bit_character(bits: Vec<i32>) -> bool {
        let mut n = bits.len();
        let mut i = 0;
        while i < n - 1 {
            if bits[i] == 0 {
                i += 1;
            } else {
                i += 2;
            }
        }
        i == n - 1
    }
}
// @lc code=end
