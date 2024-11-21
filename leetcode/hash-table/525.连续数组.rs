/*
 * @lc app=leetcode.cn id=525 lang=rust
 *
 * [525] 连续数组
 *
 * https://leetcode-cn.com/problems/contiguous-array/description/
 *
 * algorithms
 * Medium (45.88%)
 * Likes:    306
 * Dislikes: 0
 * Total Accepted:    16.7K
 * Total Submissions: 33.8K
 * Testcase Example:  '[0,1]'
 *
 * 给定一个二进制数组 nums , 找到含有相同数量的 0 和 1 的最长连续子数组，并返回该子数组的长度。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: nums = [0,1]
 * 输出: 2
 * 说明: [0, 1] 是具有相同数量0和1的最长连续子数组。
 *
 * 示例 2:
 *
 *
 * 输入: nums = [0,1,0]
 * 输出: 2
 * 说明: [0, 1] (或 [1, 0]) 是具有相同数量0和1的最长连续子数组。
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * nums[i] 不是 0 就是 1
 *
 *
 */

// @lc code=start
use std::collections::HashMap;
impl Solution {
    // pub fn find_max_length(nums: Vec<i32>) -> i32 {
    //     let mut max_length = 0;
    //     let mut map: HashMap<i32, i32> = HashMap::new();
    //     let mut counter = 0;
    //     map.insert(counter, -1);
    //     let n = nums.len();

    //     for i in 0..n {
    //         let num = nums[i];
    //         if num == 1 {
    //             counter += 1;
    //         } else {
    //             counter -= 1;
    //         }

    //         if map.contains_key(&counter) {
    //             let pre_index = map.get(&counter).unwrap();
    //             max_length = cmp::max(max_length, i as i32 - pre_index)
    //         } else {
    //             map.insert(counter, i as i32);
    //         }
    //     }

    //     return max_length;
    // }

    pub fn find_max_length(nums: Vec<i32>) -> i32 {
        let mut max_length = 0;
        let mut map: HashMap<i32, i32> = HashMap::new();
        let mut counter = 0;
        map.insert(counter, -1);
        let n = nums.len();

        for i in 0..n {
            match nums[i] {
                1 => counter += 1,
                _ => counter -= 1,
            }

            if map.contains_key(&counter) {
                let pre_index = map.get(&counter).unwrap();
                max_length = max_length.max(i as i32 - pre_index)
            } else {
                map.insert(counter, i as i32);
            }
        }

        max_length
    }
}
// @lc code=end
