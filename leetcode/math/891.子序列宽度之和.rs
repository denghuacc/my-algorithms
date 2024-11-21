/*
 * @lc app=leetcode.cn id=891 lang=rust
 *
 * [891] 子序列宽度之和
 *
 * https://leetcode.cn/problems/sum-of-subsequence-widths/description/
 *
 * algorithms
 * Hard (42.72%)
 * Likes:    98
 * Dislikes: 0
 * Total Accepted:    7.1K
 * Total Submissions: 16.5K
 * Testcase Example:  '[2,1,3]'
 *
 * 一个序列的 宽度 定义为该序列中最大元素和最小元素的差值。
 *
 * 给你一个整数数组 nums ，返回 nums 的所有非空 子序列 的 宽度之和 。由于答案可能非常大，请返回对 10^9 + 7 取余 后的结果。
 *
 * 子序列 定义为从一个数组里删除一些（或者不删除）元素，但不改变剩下元素的顺序得到的数组。例如，[3,6,2,7] 就是数组
 * [0,3,1,6,2,2,7] 的一个子序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [2,1,3]
 * 输出：6
 * 解释：子序列为 [1], [2], [3], [2,1], [2,3], [1,3], [2,1,3] 。
 * 相应的宽度是 0, 0, 0, 1, 1, 2, 2 。
 * 宽度之和是 6 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [2]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^5
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn sum_subseq_widths(nums: Vec<i32>) -> i32 {
        let mut res: i64 = 0;
        const MOD: i64 = 1_000_000_007;
        let mut nums = nums;
        nums.sort_by(|a, b| a.cmp(b));
        let mut x = nums[0] as i64;
        let mut y = 2;
        for i in 1..nums.len() {
            let num = nums[i] as i64;
            res = (res + num * (y - 1) - x) % MOD;
            x = (x * 2 + num) % MOD;
            y = (y * 2) % MOD;
        }
        ((res + MOD) % MOD) as i32
    }
}
// @lc code=end
