/*
 * @lc app=leetcode.cn id=1793 lang=rust
 *
 * [1793] 好子数组的最大分数
 *
 * https://leetcode.cn/problems/maximum-score-of-a-good-subarray/description/
 *
 * algorithms
 * Hard (46.83%)
 * Likes:    92
 * Dislikes: 0
 * Total Accepted:    9.9K
 * Total Submissions: 19.1K
 * Testcase Example:  '[1,4,3,7,4,5]\n3'
 *
 * 给你一个整数数组 nums （下标从 0 开始）和一个整数 k 。
 *
 * 一个子数组 (i, j) 的 分数 定义为 min(nums[i], nums[i+1], ..., nums[j]) * (j - i + 1)
 * 。一个 好 子数组的两个端点下标需要满足 i <= k <= j 。
 *
 * 请你返回 好 子数组的最大可能 分数 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [1,4,3,7,4,5], k = 3
 * 输出：15
 * 解释：最优子数组的左右端点下标是 (1, 5) ，分数为 min(4,3,7,4,5) * (5-1+1) = 3 * 5 = 15 。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [5,5,4,5,4,1,1,1], k = 0
 * 输出：20
 * 解释：最优子数组的左右端点下标是 (0, 4) ，分数为 min(5,5,4,5,4) * (4-0+1) = 4 * 5 = 20 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 2 * 10^4
 * 0 <= k < nums.length
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn maximum_score(nums: Vec<i32>, k: i32) -> i32 {
        let n = nums.len() as i32;
        let mut left = k - 1;
        let mut right = k + 1;
        let mut res = 0;
        let mut i = nums[k as usize];
        loop {
            while left >= 0 && left < n && nums[left as usize] >= i {
                left -= 1
            }
            while right < n && nums[right as usize] >= i {
                right += 1
            }
            res = res.max((right - left - 1) * i);
            if left == -1 && right == n {
                break;
            }
            let left_val = if left == -1 { -1 } else { nums[left as usize] };
            let right_val = if right == n { -1 } else { nums[right as usize] };
            i = left_val.max(right_val);
            if i == -1 {
                break;
            }
        }
        res
    }
}
// @lc code=end
