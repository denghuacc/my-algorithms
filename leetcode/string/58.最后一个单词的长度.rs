/*
 * @lc app=leetcode.cn id=58 lang=rust
 *
 * [58] 最后一个单词的长度
 *
 * https://leetcode-cn.com/problems/length-of-last-word/description/
 *
 * algorithms
 * Easy (38.21%)
 * Likes:    401
 * Dislikes: 0
 * Total Accepted:    265K
 * Total Submissions: 693.3K
 * Testcase Example:  '"Hello World"'
 *
 * 给你一个字符串 s，由若干单词组成，单词前后用一些空格字符隔开。返回字符串中最后一个单词的长度。
 *
 * 单词 是指仅由字母组成、不包含任何空格字符的最大子字符串。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "Hello World"
 * 输出：5
 *
 *
 * 示例 2：
 *
 *
 * 输入：s = "   fly me   to   the moon  "
 * 输出：4
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "luffy is still joyboy"
 * 输出：6
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^4
 * s 仅有英文字母和空格 ' ' 组成
 * s 中至少存在一个单词
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn length_of_last_word(s: String) -> i32 {
    //     s.trim().split_whitespace().last().unwrap().len() as i32
    // }

    pub fn length_of_last_word(s: String) -> i32 {
        let mut res = 0;
        let mut flag = false;
        for c in s.chars().rev() {
            if c == ' ' {
                if flag {
                    break;
                }
            } else {
                flag = true;
                res += 1;
            }
        }
        res
    }
}
// @lc code=end
