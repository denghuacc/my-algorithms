/*
 * @lc app=leetcode.cn id=862 lang=rust
 *
 * [862] 和至少为 K 的最短子数组
 *
 * https://leetcode.cn/problems/shortest-subarray-with-sum-at-least-k/description/
 *
 * algorithms
 * Hard (22.23%)
 * Likes:    483
 * Dislikes: 0
 * Total Accepted:    29.3K
 * Total Submissions: 126.8K
 * Testcase Example:  '[1]\n1'
 *
 * 给你一个整数数组 nums 和一个整数 k ，找出 nums 中和至少为 k 的 最短非空子数组 ，并返回该子数组的长度。如果不存在这样的 子数组
 * ，返回 -1 。
 *
 * 子数组 是数组中 连续 的一部分。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1], k = 1
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,2], k = 4
 * 输出：-1
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [2,-1,2], k = 3
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^5 <= nums[i] <= 10^5
 * 1 <= k <= 10^9
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn shortest_subarray(nums: Vec<i32>, k: i32) -> i32 {
        use std::collections::VecDeque;
        let n = nums.len();
        let mut prefix_sums = vec![0; n + 1];
        for i in 0..n {
            prefix_sums[i + 1] = prefix_sums[i] + nums[i] as i64;
        }
        let mut res = n + 1;
        let mut queue = VecDeque::<usize>::new();
        for i in 0..=n {
            while let Some(&j) = queue.back() {
                if prefix_sums[i] <= prefix_sums[j] {
                    queue.pop_back();
                } else {
                    break;
                }
            }
            while let Some(&j) = queue.front() {
                if prefix_sums[i] >= prefix_sums[j] + k as i64 {
                    res = res.min(i - j);
                    queue.pop_front();
                } else {
                    break;
                }
            }
            queue.push_back(i);
        }
        return if res < n + 1 { res as i32 } else { -1 };
    }
}

// @lc code=end
