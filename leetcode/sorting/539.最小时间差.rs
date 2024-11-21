/*
 * @lc app=leetcode.cn id=539 lang=rust
 *
 * [539] 最小时间差
 *
 * https://leetcode-cn.com/problems/minimum-time-difference/description/
 *
 * algorithms
 * Medium (64.01%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    23K
 * Total Submissions: 36K
 * Testcase Example:  '["23:59","00:00"]'
 *
 * 给定一个 24 小时制（小时:分钟 "HH:MM"）的时间列表，找出列表中任意两个时间的最小时间差并以分钟数表示。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：timePoints = ["23:59","00:00"]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：timePoints = ["00:00","23:59","00:00"]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * timePoints[i] 格式为 "HH:MM"
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn find_min_difference(time_points: Vec<String>) -> i32 {
        let mut time_points = time_points;
        let n = time_points.len();
        const max_len: usize = 24 * 60;
        if n > max_len {
            return 0;
        }
        time_points.sort();
        let mut min = i32::MAX;
        for i in 0..n - 1 {
            let diff = get_diff(&time_points[i], &time_points[i + 1]);
            if diff < min {
                min = diff;
            }
        }
        let diff_of_first_and_last =
            (max_len as i32) - get_diff(&time_points[0], &time_points[n - 1]);
        if diff_of_first_and_last < min {
            min = diff_of_first_and_last;
        }
        min
    }
}

fn get_diff(time1: &String, time2: &String) -> i32 {
    let t1 = time1
        .split(':')
        .collect::<Vec<_>>()
        .iter()
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<_>>();
    let t2 = time2
        .split(':')
        .collect::<Vec<_>>()
        .iter()
        .map(|x| x.parse::<i32>().unwrap())
        .collect::<Vec<_>>();
    let diff = (t2[0] - t1[0]) * 60 + (t2[1] - t1[1]);
    diff.abs()
}
// @lc code=end
