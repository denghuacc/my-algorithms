/*
 * @lc app=leetcode.cn id=907 lang=rust
 *
 * [907] 子数组的最小值之和
 *
 * https://leetcode.cn/problems/sum-of-subarray-minimums/description/
 *
 * algorithms
 * Medium (35.26%)
 * Likes:    463
 * Dislikes: 0
 * Total Accepted:    25.7K
 * Total Submissions: 70.9K
 * Testcase Example:  '[3,1,2,4]'
 *
 * 给定一个整数数组 arr，找到 min(b) 的总和，其中 b 的范围为 arr 的每个（连续）子数组。
 *
 * 由于答案可能很大，因此 返回答案模 10^9 + 7 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：arr = [3,1,2,4]
 * 输出：17
 * 解释：
 * 子数组为 [3]，[1]，[2]，[4]，[3,1]，[1,2]，[2,4]，[3,1,2]，[1,2,4]，[3,1,2,4]。
 * 最小值为 3，1，2，4，1，1，2，1，1，1，和为 17。
 *
 * 示例 2：
 *
 *
 * 输入：arr = [11,81,94,43,3]
 * 输出：444
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 *
 *
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn sum_subarray_mins(arr: Vec<i32>) -> i32 {
        const MOD: i32 = 1_000_000_007;
        let n = arr.len();
        let mut stack: Vec<usize> = vec![];
        let mut dp = vec![0; n];
        let mut res = 0;
        for i in 0..n {
            while !stack.is_empty() && arr[stack[stack.len() - 1]] > arr[i] {
                stack.pop();
            }
            if !stack.is_empty() {
                let k: usize = i - stack[stack.len() - 1];
                dp[i] = (k as i32) * arr[i] + dp[i - k];
            } else {
                let k = i + 1;
                dp[i] = (k as i32) * arr[i];
            }
            res = (res + dp[i]) % MOD;
            stack.push(i);
        }
        res
    }
}
// @lc code=end
