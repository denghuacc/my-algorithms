/*
 * @lc app=leetcode.cn id=816 lang=rust
 *
 * [816] 模糊坐标
 *
 * https://leetcode.cn/problems/ambiguous-coordinates/description/
 *
 * algorithms
 * Medium (50.72%)
 * Likes:    81
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 15.6K
 * Testcase Example:  '"(123)"'
 *
 * 我们有一些二维坐标，如 "(1, 3)" 或 "(2,
 * 0.5)"，然后我们移除所有逗号，小数点和空格，得到一个字符串S。返回所有可能的原始字符串到一个列表中。
 *
 * 原始的坐标表示法不会存在多余的零，所以不会出现类似于"00", "0.0", "0.00", "1.0", "001",
 * "00.01"或一些其他更小的数来表示坐标。此外，一个小数点前至少存在一个数，所以也不会出现“.1”形式的数字。
 *
 * 最后返回的列表可以是任意顺序的。而且注意返回的两个数字中间（逗号之后）都有一个空格。
 *
 *
 *
 *
 * 示例 1:
 * 输入: "(123)"
 * 输出: ["(1, 23)", "(12, 3)", "(1.2, 3)", "(1, 2.3)"]
 *
 *
 *
 * 示例 2:
 * 输入: "(00011)"
 * 输出:  ["(0.001, 1)", "(0, 0.011)"]
 * 解释:
 * 0.0, 00, 0001 或 00.01 是不被允许的。
 *
 *
 *
 * 示例 3:
 * 输入: "(0123)"
 * 输出: ["(0, 123)", "(0, 12.3)", "(0, 1.23)", "(0.1, 23)", "(0.1, 2.3)",
 * "(0.12, 3)"]
 *
 *
 *
 * 示例 4:
 * 输入: "(100)"
 * 输出: [(10, 0)]
 * 解释:
 * 1.0 是不被允许的。
 *
 *
 *
 *
 * 提示:
 *
 *
 * 4 <= S.length <= 12.
 * S[0] = "(", S[S.length - 1] = ")", 且字符串 S 中的其他元素都是数字。
 *
 *
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn ambiguous_coordinates(s: String) -> Vec<String> {
        let mut res = vec![];
        let mut s = String::from(&s[1..s.len() - 1]);
        let n = s.len();
        for i in 1..n {
            let left_pos = Self::get_pos(String::from(&s[0..i]));
            if left_pos.len() == 0 {
                continue;
            }
            let right_pos = Self::get_pos(String::from(&s[i..]));
            if right_pos.len() == 0 {
                continue;
            }
            for i in left_pos.iter() {
                for j in right_pos.iter() {
                    res.push(format!("({}, {})", i, j))
                }
            }
        }
        return res;
    }

    pub fn get_pos(s: String) -> Vec<String> {
        let mut pos = vec![];
        if s.chars().nth(0) != Some('0') || s == "0" {
            pos.push(s.clone());
        }
        for i in 1..s.len() {
            if (i != 1 && s.chars().nth(0) == Some('0')) || s.chars().nth(s.len() - 1) == Some('0')
            {
                continue;
            }
            pos.push(format!("{}.{}", &s[0..i], &s[i..]))
        }
        return pos;
    }
}

// @lc code=end
