/*
 * @lc app=leetcode.cn id=1626 lang=rust
 *
 * [1626] 无矛盾的最佳球队
 *
 * https://leetcode.cn/problems/best-team-with-no-conflicts/description/
 *
 * algorithms
 * Medium (41.98%)
 * Likes:    102
 * Dislikes: 0
 * Total Accepted:    10K
 * Total Submissions: 20.8K
 * Testcase Example:  '[1,3,5,10,15]\n[1,2,3,4,5]'
 *
 * 假设你是球队的经理。对于即将到来的锦标赛，你想组合一支总体得分最高的球队。球队的得分是球队中所有球员的分数 总和 。
 *
 * 然而，球队中的矛盾会限制球员的发挥，所以必须选出一支 没有矛盾 的球队。如果一名年龄较小球员的分数 严格大于
 * 一名年龄较大的球员，则存在矛盾。同龄球员之间不会发生矛盾。
 *
 * 给你两个列表 scores 和 ages，其中每组 scores[i] 和 ages[i] 表示第 i 名球员的分数和年龄。请你返回
 * 所有可能的无矛盾球队中得分最高那支的分数 。
 *
 *
 *
 * 示例 1：
 *
 * 输入：scores = [1,3,5,10,15], ages = [1,2,3,4,5]
 * 输出：34
 * 解释：你可以选中所有球员。
 *
 * 示例 2：
 *
 * 输入：scores = [4,5,6,5], ages = [2,1,2,1]
 * 输出：16
 * 解释：最佳的选择是后 3 名球员。注意，你可以选中多个同龄球员。
 *
 *
 * 示例 3：
 *
 * 输入：scores = [1,2,3,5], ages = [8,9,10,1]
 * 输出：6
 * 解释：最佳的选择是前 3 名球员。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= scores.length, ages.length <= 1000
 * scores.length == ages.length
 * 1 <= scores[i] <= 10^6
 * 1 <= ages[i] <= 1000
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn best_team_score(scores: Vec<i32>, ages: Vec<i32>) -> i32 {
        let n = scores.len();
        let mut ages_scores = vec![(0, 0); n];
        for i in 0..n {
            ages_scores[i] = (ages[i], scores[i]);
        }
        ages_scores.sort_by(|a, b| {
            if a.1 != b.1 {
                a.1.cmp(&b.1)
            } else {
                a.0.cmp(&b.0)
            }
        });
        let mut dp = vec![0; n];
        let mut res = 0;
        for i in 0..n {
            for j in 0..i {
                if ages_scores[i].0 >= ages_scores[j].0 {
                    dp[i] = dp[i].max(dp[j]);
                }
            }
            dp[i] += ages_scores[i].1;
            res = res.max(dp[i])
        }
        res
    }
}
// @lc code=end
