/*
 * @lc app=leetcode.cn id=494 lang=rust
 *
 * [494] 目标和
 *
 * https://leetcode-cn.com/problems/target-sum/description/
 *
 * algorithms
 * Medium (47.07%)
 * Likes:    718
 * Dislikes: 0
 * Total Accepted:    94.1K
 * Total Submissions: 200K
 * Testcase Example:  '[1,1,1,1,1]\n3'
 *
 * 给你一个整数数组 nums 和一个整数 target 。
 *
 * 向数组中的每个整数前添加 '+' 或 '-' ，然后串联起所有整数，可以构造一个 表达式 ：
 *
 *
 * 例如，nums = [2, 1] ，可以在 2 之前添加 '+' ，在 1 之前添加 '-' ，然后串联起来得到表达式 "+2-1" 。
 *
 *
 * 返回可以通过上述方法构造的、运算结果等于 target 的不同 表达式 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,1,1,1,1], target = 3
 * 输出：5
 * 解释：一共有 5 种方法让最终目标和为 3 。
 * -1 + 1 + 1 + 1 + 1 = 3
 * +1 - 1 + 1 + 1 + 1 = 3
 * +1 + 1 - 1 + 1 + 1 = 3
 * +1 + 1 + 1 - 1 + 1 = 3
 * +1 + 1 + 1 + 1 - 1 = 3
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1], target = 1
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 0
 * 0
 * -1000
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn find_target_sum_ways(nums: Vec<i32>, target: i32) -> i32 {
    //     let sum = nums.iter().fold(0, |acc, i| acc + i);
    //     let diff = sum - target;
    //     if diff < 0 || diff % 2 != 0 {
    //         return 0;
    //     }
    //     let n = nums.len();
    //     let neg = diff / 2;

    //     let mut dp = vec![vec![0; neg as usize + 1]; n + 1];
    //     dp[0][0] = 1;

    //     for i in 1..n + 1 {
    //         let num = nums[i - 1] as usize;
    //         for j in 0..neg as usize + 1 {
    //             dp[i][j] = dp[i - 1][j];
    //             if j >= num {
    //                 dp[i][j] += dp[i - 1][j - num]
    //             }
    //         }
    //     }

    //     dp[n as usize][neg as usize]
    // }

    pub fn find_target_sum_ways(nums: Vec<i32>, target: i32) -> i32 {
        let sum = nums.iter().fold(0, |acc, i| acc + i);
        let diff = sum - target;
        if diff < 0 || diff % 2 != 0 {
            return 0;
        }
        let n = nums.len();
        let neg = (diff / 2) as usize;

        let mut dp = vec![0; neg + 1];
        dp[0] = 1;

        for &num in nums.iter() {
            for j in (num as usize..neg + 1).rev() {
                dp[j] += dp[j - num as usize]
            }
        }

        dp[neg as usize]
    }
}
// @lc code=end
