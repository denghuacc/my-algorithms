/*
 * @lc app=leetcode.cn id=507 lang=rust
 *
 * [507] 完美数
 *
 * https://leetcode-cn.com/problems/perfect-number/description/
 *
 * algorithms
 * Easy (42.02%)
 * Likes:    127
 * Dislikes: 0
 * Total Accepted:    40.7K
 * Total Submissions: 90.8K
 * Testcase Example:  '28'
 *
 * 对于一个 正整数，如果它和除了它自身以外的所有 正因子 之和相等，我们称它为 「完美数」。
 *
 * 给定一个 整数 n， 如果是完美数，返回 true，否则返回 false
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 28
 * 输出：true
 * 解释：28 = 1 + 2 + 4 + 7 + 14
 * 1, 2, 4, 7, 和 14 是 28 的所有正因子。
 *
 * 示例 2：
 *
 *
 * 输入：num = 6
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：num = 496
 * 输出：true
 *
 *
 * 示例 4：
 *
 *
 * 输入：num = 8128
 * 输出：true
 *
 *
 * 示例 5：
 *
 *
 * 输入：num = 2
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= num <= 10^8
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn check_perfect_number(num: i32) -> bool {
        if num <= 1 {
            return false;
        }
        let mut sum = 1;
        let mut i = 2;
        while i * i <= num {
            if num % i == 0 {
                sum += i + num / i;
            }
            i += 1;
        }
        sum == num
    }
}
// @lc code=end
