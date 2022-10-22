/*
 * @lc app=leetcode.cn id=1235 lang=rust
 *
 * [1235] 规划兼职工作
 *
 * https://leetcode.cn/problems/maximum-profit-in-job-scheduling/description/
 *
 * algorithms
 * Hard (48.35%)
 * Likes:    264
 * Dislikes: 0
 * Total Accepted:    20.5K
 * Total Submissions: 37.4K
 * Testcase Example:  '[1,2,3,3]\n[3,4,5,6]\n[50,10,40,70]'
 *
 * 你打算利用空闲时间来做兼职工作赚些零花钱。
 *
 * 这里有 n 份兼职工作，每份工作预计从 startTime[i] 开始到 endTime[i] 结束，报酬为 profit[i]。
 *
 * 给你一份兼职工作表，包含开始时间 startTime，结束时间 endTime 和预计报酬 profit 三个数组，请你计算并返回可以获得的最大报酬。
 *
 * 注意，时间上出现重叠的 2 份工作不能同时进行。
 *
 * 如果你选择的工作在时间 X 结束，那么你可以立刻进行在时间 X 开始的下一份工作。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：startTime = [1,2,3,3], endTime = [3,4,5,6], profit = [50,10,40,70]
 * 输出：120
 * 解释：
 * 我们选出第 1 份和第 4 份工作，
 * 时间范围是 [1-3]+[3-6]，共获得报酬 120 = 50 + 70。
 *
 *
 * 示例 2：
 *
 * ⁠
 *
 * 输入：startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit =
 * [20,20,100,70,60]
 * 输出：150
 * 解释：
 * 我们选择第 1，4，5 份工作。
 * 共获得报酬 150 = 20 + 70 + 60。
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：startTime = [1,1,1], endTime = [2,3,4], profit = [5,6,4]
 * 输出：6
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= startTime.length == endTime.length == profit.length <= 5 * 10^4
 * 1 <= startTime[i] < endTime[i] <= 10^9
 * 1 <= profit[i] <= 10^4
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn job_scheduling(start_time: Vec<i32>, end_time: Vec<i32>, profit: Vec<i32>) -> i32 {
        let n = start_time.len();
        let mut jobs: Vec<Vec<i32>> = vec![];
        for i in 0..n {
            jobs.push(vec![start_time[i], end_time[i], profit[i]]);
        }
        jobs.sort_unstable_by(|a, b| a[1].cmp(&b[1]));
        let mut dp = vec![0; n + 1];
        for i in 1..=n {
            let k = Self::binary_search(&jobs, i - 1, jobs[i - 1][0]);
            dp[i] = i32::max(dp[i - 1], dp[k] + jobs[i - 1][2]);
        }
        dp[n]
    }

    fn binary_search(jobs: &Vec<Vec<i32>>, mut right: usize, target: i32) -> usize {
        let mut left = 0;
        while left < right {
            let mid = left + (right - left) / 2;
            if jobs[mid][1] > target {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        left
    }
}

// @lc code=end
