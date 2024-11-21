/*
 * @lc app=leetcode.cn id=1005 lang=rust
 *
 * [1005] K 次取反后最大化的数组和
 *
 * https://leetcode-cn.com/problems/maximize-sum-of-array-after-k-negations/description/
 *
 * algorithms
 * Easy (52.80%)
 * Likes:    136
 * Dislikes: 0
 * Total Accepted:    35.7K
 * Total Submissions: 67.4K
 * Testcase Example:  '[4,2,3]\n1'
 *
 * 给你一个整数数组 nums 和一个整数 k ，按以下方法修改该数组：
 *
 *
 * 选择某个下标 i 并将 nums[i] 替换为 -nums[i] 。
 *
 *
 * 重复这个过程恰好 k 次。可以多次选择同一个下标 i 。
 *
 * 以这种方式修改数组后，返回数组 可能的最大和 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [4,2,3], k = 1
 * 输出：5
 * 解释：选择下标 1 ，nums 变为 [4,-2,3] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [3,-1,0,2], k = 3
 * 输出：6
 * 解释：选择下标 (1, 2, 2) ，nums 变为 [3,1,0,2] 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [2,-3,-1,5,-4], k = 2
 * 输出：13
 * 解释：选择下标 (1, 4) ，nums 变为 [2,3,-1,5,4] 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^4
 * -100 <= nums[i] <= 100
 * 1 <= k <= 10^4
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn largest_sum_after_k_negations(nums: Vec<i32>, k: i32) -> i32 {
        let mut nums = nums.clone();
        nums.sort_by(|a, b| a.cmp(b));
        let mut k = k;
        let mut i = 0;
        while k > 0 && nums[i] < 0 {
            nums[i] = -nums[i];
            if i < nums.len() - 1 {
                i += 1;
            }
            k -= 1;
        }
        let mut sum = nums.iter().sum::<i32>();
        if k % 2 == 1 {
            let mut min = nums.iter().min().unwrap();
            sum -= min * 2;
        }
        sum
    }
}

// @lc code=end
