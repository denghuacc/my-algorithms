/*
 * @lc app=leetcode.cn id=367 lang=rust
 *
 * [367] 有效的完全平方数
 *
 * https://leetcode-cn.com/problems/valid-perfect-square/description/
 *
 * algorithms
 * Easy (44.76%)
 * Likes:    327
 * Dislikes: 0
 * Total Accepted:    121.6K
 * Total Submissions: 271.8K
 * Testcase Example:  '16'
 *
 * 给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。
 *
 * 进阶：不要 使用任何内置的库函数，如  sqrt 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：num = 16
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：num = 14
 * 输出：false
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn is_perfect_square(num: i32) -> bool {
        let num = num as i64;
        let mut left = 0;
        let mut right = if num < 4 { num } else { num / 2 };
        while left <= right {
            let mid = left + (right - left) / 2;
            if mid * mid == num {
                return true;
            } else if mid * mid < num {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        false
    }
}
// @lc code=end
