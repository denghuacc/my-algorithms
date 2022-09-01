/*
 * @lc app=leetcode.cn id=518 lang=rust
 *
 * [518] 零钱兑换 II
 *
 * https://leetcode-cn.com/problems/coin-change-2/description/
 *
 * algorithms
 * Medium (60.54%)
 * Likes:    434
 * Dislikes: 0
 * Total Accepted:    63.3K
 * Total Submissions: 104.4K
 * Testcase Example:  '5\n[1,2,5]'
 *
 * 给定不同面额的硬币和一个总金额。写出函数来计算可以凑成总金额的硬币组合数。假设每一种面额的硬币有无限个。
 *
 *
 *
 *
 *
 *
 * 示例 1:
 *
 * 输入: amount = 5, coins = [1, 2, 5]
 * 输出: 4
 * 解释: 有四种方式可以凑成总金额:
 * 5=5
 * 5=2+2+1
 * 5=2+1+1+1
 * 5=1+1+1+1+1
 *
 *
 * 示例 2:
 *
 * 输入: amount = 3, coins = [2]
 * 输出: 0
 * 解释: 只用面额2的硬币不能凑成总金额3。
 *
 *
 * 示例 3:
 *
 * 输入: amount = 10, coins = [10]
 * 输出: 1
 *
 *
 *
 *
 * 注意:
 *
 * 你可以假设：
 *
 *
 * 0 <= amount (总金额) <= 5000
 * 1 <= coin (硬币面额) <= 5000
 * 硬币种类不超过 500 种
 * 结果符合 32 位符号整数
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn change(amount: i32, coins: Vec<i32>) -> i32 {
    //     let n = coins.len();

    //     let mut dp = vec![vec![0; amount as usize + 1]; n + 1];

    //     for i in 0..=n {
    //         dp[i][0] = 1;
    //     }

    //     for i in 1..=n {
    //         for j in 1..=amount as usize {
    //             if j as i32 - coins[i - 1] >= 0 {
    //                 dp[i][j] = dp[i - 1][j] + dp[i][(j as i32 - coins[i - 1]) as usize]
    //             } else {
    //                 dp[i][j] = dp[i - 1][j]
    //             }
    //         }
    //     }

    //     dp[n][amount as usize]
    // }

    // pub fn change(amount: i32, coins: Vec<i32>) -> i32 {
    //     let n = coins.len();

    //     let mut dp = vec![0; amount as usize + 1];

    //     dp[0] = 1;

    //     for i in 0..n {
    //         for j in 1..=amount {
    //             if j - coins[i] >= 0 {
    //                 dp[j as usize] = dp[j as usize] + dp[(j - coins[i]) as usize]
    //             }
    //         }
    //     }

    //     dp[amount as usize]
    // }

    pub fn change(amount: i32, coins: Vec<i32>) -> i32 {
        let mut dp = vec![0; amount as usize + 1];

        dp[0] = 1;

        for &coin in coins.iter() {
            for i in coin..=amount {
                dp[i as usize] += dp[(i - coin) as usize]
            }
        }

        dp[amount as usize]
    }
}
// @lc code=end
