/*
 * @lc app=leetcode.cn id=1189 lang=rust
 *
 * [1189] “气球” 的最大数量
 *
 * https://leetcode-cn.com/problems/maximum-number-of-balloons/description/
 *
 * algorithms
 * Easy (64.67%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    34.6K
 * Total Submissions: 51.1K
 * Testcase Example:  '"nlaebolko"'
 *
 * 给你一个字符串 text，你需要使用 text 中的字母来拼凑尽可能多的单词 "balloon"（气球）。
 *
 * 字符串 text 中的每个字母最多只能被使用一次。请你返回最多可以拼凑出多少个单词 "balloon"。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：text = "nlaebolko"
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：text = "loonbalxballpoon"
 * 输出：2
 *
 *
 * 示例 3：
 *
 * 输入：text = "leetcode"
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= text.length <= 10^4
 * text 全部由小写英文字母组成
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn max_number_of_balloons(text: String) -> i32 {
        let mut cnt = vec![0; 5];
        for c in text.chars() {
            match c {
                'b' => cnt[0] += 1,
                'a' => cnt[1] += 1,
                'l' => cnt[2] += 1,
                'o' => cnt[3] += 1,
                'n' => cnt[4] += 1,
                _ => (),
            }
        }

        cnt[2] /= 2;
        cnt[3] /= 2;

        *cnt.iter().min().unwrap() as i32
    }
}

// @lc code=end
