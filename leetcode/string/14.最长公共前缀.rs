/*
 * @lc app=leetcode.cn id=14 lang=rust
 *
 * [14] 最长公共前缀
 *
 * https://leetcode-cn.com/problems/longest-common-prefix/description/
 *
 * algorithms
 * Easy (41.28%)
 * Likes:    1890
 * Dislikes: 0
 * Total Accepted:    669.2K
 * Total Submissions: 1.6M
 * Testcase Example:  '["flower","flow","flight"]'
 *
 * 编写一个函数来查找字符串数组中的最长公共前缀。
 *
 * 如果不存在公共前缀，返回空字符串 ""。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：strs = ["flower","flow","flight"]
 * 输出："fl"
 *
 *
 * 示例 2：
 *
 *
 * 输入：strs = ["dog","racecar","car"]
 * 输出：""
 * 解释：输入不存在公共前缀。
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= strs.length <= 200
 * 0 <= strs[i].length <= 200
 * strs[i] 仅由小写英文字母组成
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn longest_common_prefix(strs: Vec<String>) -> String {
        if strs.len() == 0 {
            return String::new();
        }
        let mut min_len = strs[0].len();
        for i in 1..strs.len() {
            if strs[i].len() < min_len {
                min_len = strs[i].len();
            }
        }
        let mut res = String::new();
        for i in 0..min_len {
            let mut flag = true;
            for j in 1..strs.len() {
                if strs[j].as_bytes()[i] != strs[0].as_bytes()[i] {
                    flag = false;
                    break;
                }
            }
            if flag {
                res.push(strs[0].as_bytes()[i] as char);
            } else {
                break;
            }
        }
        res
    }
}
// @lc code=end
