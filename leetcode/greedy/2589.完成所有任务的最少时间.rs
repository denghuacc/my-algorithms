/*
 * @lc app=leetcode.cn id=2589 lang=rust
 *
 * [2589] 完成所有任务的最少时间
 *
 * https://leetcode.cn/problems/minimum-time-to-complete-all-tasks/description/
 *
 * algorithms
 * Hard (43.74%)
 * Likes:    50
 * Dislikes: 0
 * Total Accepted:    7.2K
 * Total Submissions: 13.8K
 * Testcase Example:  '[[2,3,1],[4,5,1],[1,5,2]]'
 *
 * 你有一台电脑，它可以 同时 运行无数个任务。给你一个二维整数数组 tasks ，其中 tasks[i] = [starti, endi,
 * durationi] 表示第 i 个任务需要在 闭区间 时间段 [starti, endi] 内运行 durationi
 * 个整数时间点（但不需要连续）。
 *
 * 当电脑需要运行任务时，你可以打开电脑，如果空闲时，你可以将电脑关闭。
 *
 * 请你返回完成所有任务的情况下，电脑最少需要运行多少秒。
 *
 *
 *
 * 示例 1：
 *
 * 输入：tasks = [[2,3,1],[4,5,1],[1,5,2]]
 * 输出：2
 * 解释：
 * - 第一个任务在闭区间 [2, 2] 运行。
 * - 第二个任务在闭区间 [5, 5] 运行。
 * - 第三个任务在闭区间 [2, 2] 和 [5, 5] 运行。
 * 电脑总共运行 2 个整数时间点。
 *
 *
 * 示例 2：
 *
 * 输入：tasks = [[1,3,2],[2,5,3],[5,6,2]]
 * 输出：4
 * 解释：
 * - 第一个任务在闭区间 [2, 3] 运行
 * - 第二个任务在闭区间 [2, 3] 和 [5, 5] 运行。
 * - 第三个任务在闭区间 [5, 6] 运行。
 * 电脑总共运行 4 个整数时间点。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= tasks.length <= 2000
 * tasks[i].length == 3
 * 1 <= starti, endi <= 2000
 * 1 <= durationi <= endi - starti + 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn find_minimum_time(tasks: Vec<Vec<i32>>) -> i32 {
        let mut tasks = tasks;
        tasks.sort_by(|a, b| a[1].cmp(&b[1]));
        let mut run = vec![0; tasks.last().unwrap()[1] as usize + 1];
        let mut res = 0;
        for task in tasks.iter() {
            let start = task[0] as usize;
            let end = task[1] as usize;
            let mut duration = task[2];
            duration -= run[start..end + 1].iter().sum::<i32>();
            res += duration.max(0);
            for i in (start..=end).rev() {
                if duration <= 0 {
                    break;
                }
                if run[i] == 0 {
                    duration -= 1;
                    run[i] = 1;
                }
            }
        }
        res
    }
}
// @lc code=end
