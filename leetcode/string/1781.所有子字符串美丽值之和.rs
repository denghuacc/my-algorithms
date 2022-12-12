/*
 * @lc app=leetcode.cn id=1781 lang=rust
 *
 * [1781] 所有子字符串美丽值之和
 *
 * https://leetcode.cn/problems/sum-of-beauty-of-all-substrings/description/
 *
 * algorithms
 * Medium (65.56%)
 * Likes:    75
 * Dislikes: 0
 * Total Accepted:    18.7K
 * Total Submissions: 28.6K
 * Testcase Example:  '"aabcb"'
 *
 * 一个字符串的 美丽值 定义为：出现频率最高字符与出现频率最低字符的出现次数之差。
 *
 *
 * 比方说，"abaacc" 的美丽值为 3 - 1 = 2 。
 *
 *
 * 给你一个字符串 s ，请你返回它所有子字符串的 美丽值 之和。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "aabcb"
 * 输出：5
 * 解释：美丽值不为零的字符串包括 ["aab","aabc","aabcb","abcb","bcb"] ，每一个字符串的美丽值都为 1 。
 *
 * 示例 2：
 *
 *
 * 输入：s = "aabcbaa"
 * 输出：17
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * s 只包含小写英文字母。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn beauty_sum(s: String) -> i32 {
        let mut res = 0;
        let n = s.len();
        for i in 0..n {
            let mut cnt = vec![0; 26];
            let mut max_freq = 0;
            for j in i..n {
                let idx = (s.bytes().nth(j).unwrap() - b'a') as usize;
                cnt[idx] += 1;
                max_freq = max_freq.max(cnt[idx]);
                let mut min_freq = n;
                for k in 0..26 {
                    if cnt[k] > 0 {
                        min_freq = min_freq.min(cnt[k]);
                    }
                }
                res += max_freq - min_freq;
            }
        }
        return res as i32;
    }
}
// @lc code=end
