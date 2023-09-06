/*
 * @lc app=leetcode.cn id=1124 lang=rust
 *
 * [1124] 表现良好的最长时间段
 *
 * https://leetcode.cn/problems/longest-well-performing-interval/description/
 *
 * algorithms
 * Medium (34.84%)
 * Likes:    307
 * Dislikes: 0
 * Total Accepted:    25K
 * Total Submissions: 69.3K
 * Testcase Example:  '[9,9,6,0,6,6,9]'
 *
 * 给你一份工作时间表 hours，上面记录着某一位员工每天的工作小时数。
 *
 * 我们认为当员工一天中的工作小时数大于 8 小时的时候，那么这一天就是「劳累的一天」。
 *
 * 所谓「表现良好的时间段」，意味在这段时间内，「劳累的天数」是严格 大于「不劳累的天数」。
 *
 * 请你返回「表现良好时间段」的最大长度。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：hours = [9,9,6,0,6,6,9]
 * 输出：3
 * 解释：最长的表现良好时间段是 [9,9,6]。
 *
 * 示例 2：
 *
 *
 * 输入：hours = [6,6,6]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= hours.length <= 10^4
 * 0 <= hours[i] <= 16
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn longest_wpi(hours: Vec<i32>) -> i32 {
        use std::collections::HashMap;
        let n = hours.len();
        let mut res = 0;
        let mut sum = 0;
        let mut map = HashMap::new();
        for i in 0..n {
            sum += if hours[i] > 8 { 1 } else { -1 };
            if sum > 0 {
                res = res.max(i + 1);
            } else {
                if map.contains_key(&(sum - 1)) {
                    res = res.max(i - map.get(&(sum - 1)).unwrap());
                }
            }
            if !map.contains_key(&sum) {
                map.insert(sum, i);
            }
        }
        res as i32
    }
}
// @lc code=end
