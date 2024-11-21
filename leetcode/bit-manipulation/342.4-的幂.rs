/*
 * @lc app=leetcode.cn id=342 lang=rust
 *
 * [342] 4的幂
 *
 * https://leetcode-cn.com/problems/power-of-four/description/
 *
 * algorithms
 * Easy (51.53%)
 * Likes:    205
 * Dislikes: 0
 * Total Accepted:    54.5K
 * Total Submissions: 105.8K
 * Testcase Example:  '16'
 *
 * 给定一个整数，写一个函数来判断它是否是 4 的幂次方。如果是，返回 true ；否则，返回 false 。
 *
 * 整数 n 是 4 的幂次方需满足：存在整数 x 使得 n == 4^x
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 16
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 5
 * 输出：false
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 1
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * -2^31
 *
 *
 *
 *
 * 进阶：
 *
 *
 * 你能不使用循环或者递归来完成本题吗？
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn is_power_of_four(n: i32) -> bool {
    //     let mut m = n;

    //     while m > 1 {
    //         if m % 4 != 0 {
    //             return false;
    //         }
    //         m /= 4;
    //     }

    //     if n <= 0 {
    //         false
    //     } else {
    //         true
    //     }
    // }

    // bit manipulation
    pub fn is_power_of_four(n: i32) -> bool {
        n > 0 && n & (n - 1) == 0 && n % 3 == 1
    }
}
// @lc code=end
