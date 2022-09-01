/*
 * @lc app=leetcode.cn id=1239 lang=rust
 *
 * [1239] 串联字符串的最大长度
 *
 * https://leetcode-cn.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/description/
 *
 * algorithms
 * Medium (41.38%)
 * Likes:    116
 * Dislikes: 0
 * Total Accepted:    20K
 * Total Submissions: 45.5K
 * Testcase Example:  '["un","iq","ue"]'
 *
 * 给定一个字符串数组 arr，字符串 s 是将 arr 某一子序列字符串连接所得的字符串，如果 s 中的每一个字符都只出现过一次，那么它就是一个可行解。
 *
 * 请返回所有可行解 s 中最长长度。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = ["un","iq","ue"]
 * 输出：4
 * 解释：所有可能的串联组合是 "","un","iq","ue","uniq" 和 "ique"，最大长度为 4。
 *
 *
 * 示例 2：
 *
 * 输入：arr = ["cha","r","act","ers"]
 * 输出：6
 * 解释：可能的解答有 "chaers" 和 "acters"。
 *
 *
 * 示例 3：
 *
 * 输入：arr = ["abcdefghijklmnopqrstuvwxyz"]
 * 输出：26
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 16
 * 1 <= arr[i].length <= 26
 * arr[i] 中只含有小写英文字母
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn max_length(arr: Vec<String>) -> i32 {
        let mut ret = 0;
        let mut masks = vec![0];

        for s in arr {
            let mut mask = 0;
            for ch in s.chars() {
                let mut ch = ch as usize;
                ch = ch - 97;
                if (mask >> ch) & 1 != 0 {
                    mask = 0;
                    break;
                }
                mask |= 1 << ch;
            }
            if mask == 0 {
                continue;
            }

            let n = masks.len();
            for i in 0..n {
                let m = masks[i];
                if m & mask == 0 {
                    masks.push(m | mask);
                    ret = ret.max(((m | mask) as usize).count_ones())
                }
            }
        }

        ret as i32
    }
}
// @lc code=end
