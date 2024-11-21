/*
 * @lc app=leetcode.cn id=689 lang=rust
 *
 * [689] 三个无重叠子数组的最大和
 *
 * https://leetcode-cn.com/problems/maximum-sum-of-3-non-overlapping-subarrays/description/
 *
 * algorithms
 * Hard (53.72%)
 * Likes:    183
 * Dislikes: 0
 * Total Accepted:    5.7K
 * Total Submissions: 10.6K
 * Testcase Example:  '[1,2,1,2,6,7,5,1]\n2'
 *
 * 给你一个整数数组 nums 和一个整数 k ，找出三个长度为 k 、互不重叠、且 3 * k 项的和最大的子数组，并返回这三个子数组。
 *
 * 以下标的数组形式返回结果，数组中的每一项分别指示每个子数组的起始位置（下标从 0 开始）。如果有多个结果，返回字典序最小的一个。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,1,2,6,7,5,1], k = 2
 * 输出：[0,3,5]
 * 解释：子数组 [1, 2], [2, 6], [7, 5] 对应的起始下标为 [0, 3, 5]。
 * 也可以取 [2, 1], 但是结果 [1, 3, 5] 在字典序上更大。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2,1,2,1,2,1,2,1], k = 2
 * 输出：[0,2,4]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 2 * 10^4
 * 1 <= nums[i] < 2^16
 * 1 <= k <= floor(nums.length / 3)
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn max_sum_of_three_subarrays(nums: Vec<i32>, k: i32) -> Vec<i32> {
        let mut res = vec![0; 3];
        let mut sum1 = 0;
        let mut max_sum1 = 0;
        let mut max_sum1_index = 0;
        let mut sum2 = 0;
        let mut max_sum12 = 0;
        let mut max_sum12_index1 = 0;
        let mut max_sum12_index2 = 0;
        let mut sum3 = 0;
        let mut max_total = 0;

        let k = k as usize;
        for i in k * 2..nums.len() {
            sum1 += nums[i - k * 2];
            sum2 += nums[i - k];
            sum3 += nums[i];
            if i >= k * 3 - 1 {
                if sum1 > max_sum1 {
                    max_sum1 = sum1;
                    max_sum1_index = i - k * 3 + 1;
                }
                if max_sum1 + sum2 > max_sum12 {
                    max_sum12 = max_sum1 + sum2;
                    max_sum12_index1 = max_sum1_index;
                    max_sum12_index2 = i - k * 2 + 1;
                }
                if max_sum12 + sum3 > max_total {
                    max_total = max_sum12 + sum3;
                    res[0] = max_sum12_index1 as i32;
                    res[1] = max_sum12_index2 as i32;
                    res[2] = (i - k + 1) as i32;
                }
                sum1 -= nums[i - k * 3 + 1];
                sum2 -= nums[i - k * 2 + 1];
                sum3 -= nums[i - k + 1];
            }
        }
        res
    }
}
// @lc code=end
