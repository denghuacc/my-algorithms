/*
 * @lc app=leetcode.cn id=2104 lang=rust
 *
 * [2104] 子数组范围和
 *
 * https://leetcode-cn.com/problems/sum-of-subarray-ranges/description/
 *
 * algorithms
 * Medium (60.47%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    10.3K
 * Total Submissions: 17.1K
 * Testcase Example:  '[1,2,3]'
 *
 * 给你一个整数数组 nums 。nums 中，子数组的 范围 是子数组中最大元素和最小元素的差值。
 *
 * 返回 nums 中 所有 子数组范围的 和 。
 *
 * 子数组是数组中一个连续 非空 的元素序列。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3]
 * 输出：4
 * 解释：nums 的 6 个子数组如下所示：
 * [1]，范围 = 最大 - 最小 = 1 - 1 = 0
 * [2]，范围 = 2 - 2 = 0
 * [3]，范围 = 3 - 3 = 0
 * [1,2]，范围 = 2 - 1 = 1
 * [2,3]，范围 = 3 - 2 = 1
 * [1,2,3]，范围 = 3 - 1 = 2
 * 所有范围的和是 0 + 0 + 0 + 1 + 1 + 2 = 4
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,3,3]
 * 输出：4
 * 解释：nums 的 6 个子数组如下所示：
 * [1]，范围 = 最大 - 最小 = 1 - 1 = 0
 * [3]，范围 = 3 - 3 = 0
 * [3]，范围 = 3 - 3 = 0
 * [1,3]，范围 = 3 - 1 = 2
 * [3,3]，范围 = 3 - 3 = 0
 * [1,3,3]，范围 = 3 - 1 = 2
 * 所有范围的和是 0 + 0 + 0 + 2 + 0 + 2 = 4
 *
 *
 * 示例 3：
 *
 *
 * 输入：nums = [4,-2,-3,4,1]
 * 输出：59
 * 解释：nums 中所有子数组范围的和是 59
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 1000
 * -10^9 <= nums[i] <= 10^9
 *
 *
 *
 *
 * 进阶：你可以设计一种时间复杂度为 O(n) 的解决方案吗？
 *
 */

// @lc code=start
impl Solution {
    // pub fn sub_array_ranges(nums: Vec<i32>) -> i64 {
    //     let n = nums.len();
    //     let mut sum = 0;
    //     for i in 0..n {
    //         let mut min = i64::MAX;
    //         let mut max = i64::MIN;
    //         for j in i..n {
    //             min = min.min(nums[j] as i64);
    //             max = max.max(nums[j] as i64);
    //             sum += max - min;
    //         }
    //     }
    //     sum
    // }

    pub fn sub_array_ranges(nums: Vec<i32>) -> i64 {
        let n = nums.len();
        let mut min_left: Vec<i32> = vec![0; n];
        let mut max_left: Vec<i32> = vec![0; n];
        let mut min_right: Vec<i32> = vec![0; n];
        let mut max_right: Vec<i32> = vec![0; n];
        let mut min_stack: Vec<usize> = vec![];
        let mut max_stack: Vec<usize> = vec![];

        for i in 0..n {
            while !min_stack.is_empty() && nums[min_stack[min_stack.len() - 1]] > nums[i] {
                min_stack.pop();
            }
            min_left[i] = if min_stack.is_empty() {
                -1
            } else {
                min_stack[min_stack.len() - 1] as i32
            };
            min_stack.push(i);

            while !max_stack.is_empty() && nums[max_stack[max_stack.len() - 1]] <= nums[i] {
                max_stack.pop();
            }
            max_left[i] = if max_stack.is_empty() {
                -1
            } else {
                max_stack[max_stack.len() - 1] as i32
            };
            max_stack.push(i);
        }

        min_stack.clear();
        max_stack.clear();

        for i in (0..n).rev() {
            while !min_stack.is_empty() && nums[min_stack[min_stack.len() - 1]] >= nums[i] {
                min_stack.pop();
            }
            min_right[i] = if min_stack.is_empty() {
                n as i32
            } else {
                min_stack[min_stack.len() - 1] as i32
            };
            min_stack.push(i);

            while !max_stack.is_empty() && nums[max_stack[max_stack.len() - 1]] < nums[i] {
                max_stack.pop();
            }
            max_right[i] = if max_stack.is_empty() {
                n as i32
            } else {
                max_stack[max_stack.len() - 1] as i32
            };
            max_stack.push(i);
        }

        let mut sum_max = 0;
        let mut sum_min = 0;

        for i in 0..n {
            sum_max += (max_right[i] as i64 - i as i64)
                * (i as i64 - max_left[i] as i64)
                * (nums[i] as i64);
            sum_min += (min_right[i] as i64 - i as i64)
                * (i as i64 - min_left[i] as i64)
                * (nums[i] as i64);
        }

        sum_max - sum_min
    }
}
// @lc code=end
