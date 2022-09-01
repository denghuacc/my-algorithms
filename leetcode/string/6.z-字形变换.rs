/*
 * @lc app=leetcode.cn id=6 lang=rust
 *
 * [6] Z 字形变换
 *
 * https://leetcode-cn.com/problems/zigzag-conversion/description/
 *
 * algorithms
 * Medium (51.08%)
 * Likes:    1525
 * Dislikes: 0
 * Total Accepted:    370.9K
 * Total Submissions: 721.5K
 * Testcase Example:  '"PAYPALISHIRING"\n3'
 *
 * 将一个给定字符串 s 根据给定的行数 numRows ，以从上往下、从左到右进行 Z 字形排列。
 *
 * 比如输入字符串为 "PAYPALISHIRING" 行数为 3 时，排列如下：
 *
 *
 * P   A   H   N
 * A P L S I I G
 * Y   I   R
 *
 * 之后，你的输出需要从左往右逐行读取，产生出一个新的字符串，比如："PAHNAPLSIIGYIR"。
 *
 * 请你实现这个将字符串进行指定行数变换的函数：
 *
 *
 * string convert(string s, int numRows);
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 3
 * 输出："PAHNAPLSIIGYIR"
 *
 * 示例 2：
 *
 *
 * 输入：s = "PAYPALISHIRING", numRows = 4
 * 输出："PINALSIGYAHRPI"
 * 解释：
 * P     I    N
 * A   L S  I G
 * Y A   H R
 * P     I
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "A", numRows = 1
 * 输出："A"
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 由英文字母（小写和大写）、',' 和 '.' 组成
 * 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn convert(s: String, num_rows: i32) -> String {
        let n = s.len();
        if n == 1 {
            return s;
        }
        let len = std::cmp::min(n, num_rows as usize);
        let mut rows = vec![String::new(); len + 1];
        let mut idx: usize = 0;
        let mut down = false;

        for i in s.chars() {
            rows[idx].push(i);
            if idx == 0 || idx == len - 1 {
                down = !down;
            }
            if down && idx < len - 1 {
                idx += 1;
            } else {
                if idx >= 1 {
                    idx -= 1;
                }
            }
        }

        let mut res = String::new();
        for row in rows {
            res.push_str(&row);
        }
        res
    }
}
// @lc code=end
