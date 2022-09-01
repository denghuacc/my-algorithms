/*
 * @lc app=leetcode.cn id=400 lang=rust
 *
 * [400] 第 N 位数字
 *
 * https://leetcode-cn.com/problems/nth-digit/description/
 *
 * algorithms
 * Medium (43.51%)
 * Likes:    215
 * Dislikes: 0
 * Total Accepted:    24.1K
 * Total Submissions: 55.4K
 * Testcase Example:  '3'
 *
 * 给你一个整数 n ，请你在无限的整数序列 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ...] 中找出并返回第 n
 * 位数字。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 3
 * 输出：3
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 11
 * 输出：0
 * 解释：第 11 位数字在序列 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, ... 里是 0 ，它是 10 的一部分。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 2^31 - 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn find_nth_digit(n: i32) -> i32 {
        let mut digit = 1;
        let mut count = 9;
        let mut n = n;
        let mut start = 1;

        while n as u64 > digit as u64 * count as u64 {
            n -= digit * count;
            digit += 1;
            count *= 10;
            start *= 10;
        }

        let mut num = start + (n - 1) / digit;
        let digit_index = (n - 1) % digit;
        let c = digit - digit_index - 1;
        for _ in 0..c {
            num /= 10;
        }
        num % 10
    }
}
// @lc code=end
