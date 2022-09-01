/*
 * @lc app=leetcode.cn id=219 lang=rust
 *
 * [219] 存在重复元素 II
 *
 * https://leetcode-cn.com/problems/contains-duplicate-ii/description/
 *
 * algorithms
 * Easy (42.21%)
 * Likes:    380
 * Dislikes: 0
 * Total Accepted:    133.3K
 * Total Submissions: 309.5K
 * Testcase Example:  '[1,2,3,1]\n3'
 *
 * 给你一个整数数组 nums 和一个整数 k ，判断数组中是否存在两个 不同的索引 i 和 j ，满足 nums[i] == nums[j] 且
 * abs(i - j) <= k 。如果存在，返回 true ；否则，返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：nums = [1,2,3,1], k = 3
 * 输出：true
 *
 * 示例 2：
 *
 *
 * 输入：nums = [1,0,1,1], k = 1
 * 输出：true
 *
 * 示例 3：
 *
 *
 * 输入：nums = [1,2,3,1,2,3], k = 2
 * 输出：false
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * -10^9 <= nums[i] <= 10^9
 * 0 <= k <= 10^5
 *
 *
 */

// @lc code=start
impl Solution {
    // pub fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
    //     let mut map = std::collections::HashMap::new();
    //     for i in 0..nums.len() {
    //         if let Some(v) = map.get(&nums[i]) {
    //             if i - v <= k as usize {
    //                 return true;
    //             }
    //         }
    //         map.insert(nums[i], i);
    //     }
    //     false
    // }

    // pub fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
    //     let mut set = std::collections::HashSet::new();
    //     for i in 0..nums.len() {
    //         if (set.contains(&nums[i])) {
    //             return true;
    //         }
    //         set.insert(nums[i]);
    //         if i >= k as usize {
    //             set.remove(&nums[i - k as usize]);
    //         }
    //     }
    //     false
    // }

    pub fn contains_nearby_duplicate(nums: Vec<i32>, k: i32) -> bool {
        for i in 0..nums.len() {
            let mut j = i32::max(0, i as i32 - k);
            while j < i as i32 {
                if nums[i] == nums[j as usize] {
                    return true;
                }
                j += 1;
            }
        }
        false
    }
}
// @lc code=end
