/*
 * @lc app=leetcode.cn id=879 lang=rust
 *
 * [879] 盈利计划
 *
 * https://leetcode-cn.com/problems/profitable-schemes/description/
 *
 * algorithms
 * Hard (48.44%)
 * Likes:    107
 * Dislikes: 0
 * Total Accepted:    5.9K
 * Total Submissions: 12.3K
 * Testcase Example:  '5\n3\n[2,2]\n[2,3]'
 *
 * 集团里有 n 名员工，他们可以完成各种各样的工作创造利润。
 *
 * 第 i 种工作会产生 profit[i] 的利润，它要求 group[i] 名成员共同参与。如果成员参与了其中一项工作，就不能参与另一项工作。
 *
 * 工作的任何至少产生 minProfit 利润的子集称为 盈利计划 。并且工作的成员总数最多为 n 。
 *
 * 有多少种计划可以选择？因为答案很大，所以 返回结果模 10^9 + 7 的值。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, minProfit = 3, group = [2,2], profit = [2,3]
 * 输出：2
 * 解释：至少产生 3 的利润，该集团可以完成工作 0 和工作 1 ，或仅完成工作 1 。
 * 总的来说，有两种计划。
 *
 * 示例 2：
 *
 *
 * 输入：n = 10, minProfit = 5, group = [2,3,5], profit = [6,7,8]
 * 输出：7
 * 解释：至少产生 5 的利润，只要完成其中一种工作就行，所以该集团可以完成任何工作。
 * 有 7 种可能的计划：(0)，(1)，(2)，(0,1)，(0,2)，(1,2)，以及 (0,1,2) 。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 1
 * 1
 * profit.length == group.length
 * 0
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn profitable_schemes(n: i32, min_profit: i32, group: Vec<i32>, profit: Vec<i32>) -> i32 {
    //     const MOD: i32 = 1e9 as i32 + 7;
    //     let len = group.len();
    //     let n = n as usize;
    //     let min_profit = min_profit as usize;

    //     其中 dp[i][j][k] -> 表示在前 i 个工作中选择了 j 个员工，并且满足工作利润至少为 k 的情况下的盈利计划的总数目
    //     let mut dp = vec![vec![vec![0; min_profit as usize + 1]; n as usize + 1]; len + 1];
    //     dp[0][0][0] = 1;

    //     for i in 1..=len {
    //         let members = group[i - 1] as usize;
    //         let earn = profit[i - 1];
    //         for j in 0..=n {
    //             for k in 0..=min_profit {
    //                 if j < members {
    //                     dp[i][j][k] = dp[i - 1][j][k];
    //                 } else {
    //                     dp[i][j][k] = (dp[i - 1][j][k]
    //                         + dp[i - 1][j - members][0.max(k as i32 - earn) as usize])
    //                         % MOD;
    //                 }
    //             }
    //         }
    //     }

    //     let mut sum = 0;
    //     for j in 0..n + 1 {
    //         sum = (sum + dp[len][j as usize][min_profit]) % MOD;
    //     }

    //     sum
    // }

    pub fn profitable_schemes(n: i32, min_profit: i32, group: Vec<i32>, profit: Vec<i32>) -> i32 {
        let n = n as usize;
        let min_profit = min_profit as usize;
        const MOD: i32 = 1e9 as i32 + 7;
        let len = group.len();

        let mut dp = vec![vec![0; min_profit + 1]; n + 1];
        for i in 0..n + 1 {
            dp[i][0] = 1
        }

        for i in 1..=len {
            let members = group[i - 1] as usize;
            let earn = profit[i - 1];
            for j in (members..=n).rev() {
                for k in (0..=min_profit).rev() {
                    dp[j][k] = (dp[j][k] + dp[j - members][0.max(k as i32 - earn) as usize]) % MOD;
                }
            }
        }

        dp[n][min_profit]
    }
}
// @lc code=end
