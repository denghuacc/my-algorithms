/*
 * @lc app=leetcode.cn id=915 lang=rust
 *
 * [915] 分割数组
 *
 * https://leetcode.cn/problems/partition-array-into-disjoint-intervals/description/
 *
 * algorithms
 * Medium (49.69%)
 * Likes:    137
 * Dislikes: 0
 * Total Accepted:    19.8K
 * Total Submissions: 39.8K
 * Testcase Example:  '[5,0,3,8,6]'
 *
 * 给定一个数组 nums ，将其划分为两个连续子数组 left 和 right， 使得：
 *
 *
 * left 中的每个元素都小于或等于 right 中的每个元素。
 * left 和 right 都是非空的。
 * left 的长度要尽可能小。
 *
 *
 * 在完成这样的分组后返回 left 的 长度 。
 *
 * 用例可以保证存在这样的划分方法。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [5,0,3,8,6]
 * 输出：3
 * 解释：left = [5,0,3]，right = [8,6]
 *
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,1,1,0,6,12]
 * 输出：4
 * 解释：left = [1,1,1,0]，right = [6,12]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= nums.length <= 10^5
 * 0 <= nums[i] <= 10^6
 * 可以保证至少有一种方法能够按题目所描述的那样对 nums 进行划分。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn partition_disjoint(nums: Vec<i32>) -> i32 {
        let n = nums.len();
        let mut left_max = nums[0];
        let mut cur_max = nums[0];
        let mut left_pos = 0;

        for i in 0..n {
            cur_max = i32::max(cur_max, nums[i]);
            if left_max > nums[i] {
                left_max = cur_max;
                left_pos = i;
            }
        }

        (left_pos + 1) as i32
    }
}
// @lc code=end
