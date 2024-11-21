/*
 * @lc app=leetcode.cn id=1234 lang=rust
 *
 * [1234] 替换子串得到平衡字符串
 *
 * https://leetcode.cn/problems/replace-the-substring-for-balanced-string/description/
 *
 * algorithms
 * Medium (36.08%)
 * Likes:    139
 * Dislikes: 0
 * Total Accepted:    13.2K
 * Total Submissions: 33.3K
 * Testcase Example:  '"QWER"'
 *
 * 有一个只含有 'Q', 'W', 'E', 'R' 四种字符，且长度为 n 的字符串。
 *
 * 假如在该字符串中，这四个字符都恰好出现 n/4 次，那么它就是一个「平衡字符串」。
 *
 *
 *
 * 给你一个这样的字符串 s，请通过「替换一个子串」的方式，使原字符串 s 变成一个「平衡字符串」。
 *
 * 你可以用和「待替换子串」长度相同的 任何 其他字符串来完成替换。
 *
 * 请返回待替换子串的最小可能长度。
 *
 * 如果原字符串自身就是一个平衡字符串，则返回 0。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：s = "QWER"
 * 输出：0
 * 解释：s 已经是平衡的了。
 *
 * 示例 2：
 *
 *
 * 输入：s = "QQWE"
 * 输出：1
 * 解释：我们需要把一个 'Q' 替换成 'R'，这样得到的 "RQWE" (或 "QRWE") 是平衡的。
 *
 *
 * 示例 3：
 *
 *
 * 输入：s = "QQQW"
 * 输出：2
 * 解释：我们可以把前面的 "QQ" 替换成 "ER"。
 *
 *
 * 示例 4：
 *
 *
 * 输入：s = "QQQQ"
 * 输出：3
 * 解释：我们可以替换后 3 个 'Q'，使 s = "QWER"。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= s.length <= 10^5
 * s.length 是 4 的倍数
 * s 中只含有 'Q', 'W', 'E', 'R' 四种字符
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn balanced_string(s: String) -> i32 {
        let n = s.len();
        let s = s.into_bytes();
        let mut cnt = vec![0; 26];
        for b in s.clone() {
            cnt[Solution::idx(b)] += 1;
        }
        let partial = n / 4;
        if Solution::is_balanced(&cnt, partial) {
            return 0;
        }

        let mut res = n;
        let mut r = 0;
        for l in 0..n {
            while r < n && !Solution::is_balanced(&cnt, partial) {
                cnt[Solution::idx(s[r])] -= 1;
                r += 1;
            }
            if !Solution::is_balanced(&cnt, partial) {
                break;
            }
            res = res.min(r - l);
            cnt[Solution::idx(s[l])] += 1;
        }
        res as i32
    }

    fn idx(b: u8) -> usize {
        (b - b'A') as usize
    }

    fn is_balanced(cnt: &Vec<usize>, partial: usize) -> bool {
        if cnt[Solution::idx(b'Q')] > partial
            || cnt[Solution::idx(b'W')] > partial
            || cnt[Solution::idx(b'E')] > partial
            || cnt[Solution::idx(b'R')] > partial
        {
            return false;
        }
        true
    }
}
// @lc code=end
