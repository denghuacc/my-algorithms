/*
 * @lc app=leetcode.cn id=279 lang=rust
 *
 * [279] 完全平方数
 *
 * https://leetcode-cn.com/problems/perfect-squares/description/
 *
 * algorithms
 * Medium (61.17%)
 * Likes:    909
 * Dislikes: 0
 * Total Accepted:    147.4K
 * Total Submissions: 241.1K
 * Testcase Example:  '12'
 *
 * 给定正整数 n，找到若干个完全平方数（比如 1, 4, 9, 16, ...）使得它们的和等于 n。你需要让组成和的完全平方数的个数最少。
 *
 * 给你一个整数 n ，返回和为 n 的完全平方数的 最少数量 。
 *
 * 完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。例如，1、4、9 和 16 都是完全平方数，而 3 和 11
 * 不是。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 12
 * 输出：3
 * 解释：12 = 4 + 4 + 4
 *
 * 示例 2：
 *
 *
 * 输入：n = 13
 * 输出：2
 * 解释：13 = 4 + 9
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
    // dp
    // pub fn num_squares(n: i32) -> i32 {
    //     let mut minn = n;
    //     let n = n as usize;
    //     let mut dp = vec![minn; n + 1];
    //     dp[0] = 0;
    //     for i in 1..=n {
    //         let x = i * i;
    //         for j in x..=n {
    //             dp[j] = dp[j].min(dp[(j - x)] + 1)
    //         }
    //         minn = minn.min(dp[n])
    //     }
    //     minn
    // }

    // math n=4^a(8b+7)
    pub fn num_squares(n: i32) -> i32 {
        let mut n = n;
        if Solution::is_perfect_square(n) {
            return 1;
        }

        while n % 4 == 0 {
            n /= 4;
        }
        if n % 8 == 7 {
            return 4;
        }

        for i in 1..=n {
            let j = n - i * i;
            if Solution::is_perfect_square(j) {
                return 2;
            }
        }

        3
    }

    fn is_perfect_square(n: i32) -> bool {
        let y = (n as f64).sqrt() as i32;

        n == y * y
    }
}
// @lc code=end
