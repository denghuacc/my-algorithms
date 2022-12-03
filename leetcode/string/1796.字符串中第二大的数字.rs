/*
 * @lc app=leetcode.cn id=1796 lang=rust
 *
 * [1796] 字符串中第二大的数字
 *
 * https://leetcode.cn/problems/second-largest-digit-in-a-string/description/
 *
 * algorithms
 * Easy (48.91%)
 * Likes:    28
 * Dislikes: 0
 * Total Accepted:    19.4K
 * Total Submissions: 36.9K
 * Testcase Example:  '"dfa12321afd"'
 *
 * 给你一个混合字符串 s ，请你返回 s 中 第二大 的数字，如果不存在第二大的数字，请你返回 -1 。
 *
 * 混合字符串 由小写英文字母和数字组成。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "dfa12321afd"
 * 输出：2
 * 解释：出现在 s 中的数字包括 [1, 2, 3] 。第二大的数字是 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "abc1111"
 * 输出：-1
 * 解释：出现在 s 中的数字只包含 [1] 。没有第二大的数字。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 只包含小写英文字母和（或）数字。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn second_highest(s: String) -> i32 {
        let mut a = -1;
        let mut b = -1;
        for ch in s.chars() {
            if ch.is_ascii_digit() {
                let num = ch.to_digit(10).unwrap() as i32;
                if num > a {
                    b = a;
                    a = num
                } else if num < a && num > b {
                    b = num
                }
            }
        }
        return b;
    }
}
// @lc code=end
