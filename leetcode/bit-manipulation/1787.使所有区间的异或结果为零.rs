/*
 * @lc app=leetcode.cn id=1787 lang=rust
 *
 * [1787] 使所有区间的异或结果为零
 *
 * https://leetcode-cn.com/problems/make-the-xor-of-all-segments-equal-to-zero/description/
 *
 * algorithms
 * Hard (65.26%)
 * Likes:    125
 * Dislikes: 0
 * Total Accepted:    11.8K
 * Total Submissions: 18.2K
 * Testcase Example:  '[1,2,0,3,0]\n1'
 *
 * 给你一个整数数组 nums​​​ 和一个整数 k​​​​​ 。区间 [left, right]（left ）的 异或结果 是对下标位于 left 和
 * right（包括 left 和 right ）之间所有元素进行 XOR 运算的结果：nums[left] XOR nums[left+1] XOR
 * ... XOR nums[right] 。
 *
 * 返回数组中 要更改的最小元素数 ，以使所有长度为 k 的区间异或结果等于零。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,0,3,0], k = 1
 * 输出：3
 * 解释：将数组 [1,2,0,3,0] 修改为 [0,0,0,0,0]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,4,5,2,1,7,3,4,7], k = 3
 * 输出：3
 * 解释：将数组 [3,4,5,2,1,7,3,4,7] 修改为 [3,4,7,3,4,7,3,4,7]
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,4,1,2,5,1,2,6], k = 3
 * 输出：3
 * 解释：将数组[1,2,4,1,2,5,1,2,6] 修改为 [1,2,3,1,2,3,1,2,3]
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * ​​​​​​0
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn min_changes(nums: Vec<i32>, k: i32) -> i32 {
        use std::collections::HashMap;
        const N: usize = 1024;
        let k = k as usize;
        let n = nums.len();
        let mut group_amount = vec![0; k as usize];
        let mut group_record: Vec<HashMap<i32, i32>> = vec![HashMap::new(); k];

        for i in 0..n {
            group_amount[i % k] += 1;
            let count = group_record[i % k].entry(nums[i]).or_insert(0);
            *count += 1;
        }

        let mut dp = vec![vec![0; N]; k];
        for j in 0..N {
            let count = group_record[0].entry(j as i32).or_insert(0);
            dp[0][j] = group_amount[0] - *count;
        }

        for i in 1..k {
            let upper_limit = dp[i - 1].iter().fold(i32::MAX, |a, b| a.min(*b)) + group_amount[i];
            // dp[i].fill(upper_limit); //need high version rust
            for _fill in dp[i].iter_mut() {
                *_fill = upper_limit;
            }

            for (num, amount) in group_record[i % k].iter() {
                let num = *num as usize;
                for j in 0..N {
                    dp[i][j ^ num] = dp[i][j ^ num].min(dp[i - 1][j] + group_amount[i] - amount);
                }
            }
        }
        dp[k - 1][0]
    }
}
// @lc code=end
