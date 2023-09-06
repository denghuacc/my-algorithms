/*
 * @lc app=leetcode.cn id=808 lang=rust
 *
 * [808] 分汤
 *
 * https://leetcode.cn/problems/soup-servings/description/
 *
 * algorithms
 * Medium (48.54%)
 * Likes:    113
 * Dislikes: 0
 * Total Accepted:    9K
 * Total Submissions: 16.5K
 * Testcase Example:  '50'
 *
 * 有 A 和 B 两种类型 的汤。一开始每种类型的汤有 n 毫升。有四种分配操作：
 *
 *
 * 提供 100ml 的 汤A 和 0ml 的 汤B 。
 * 提供 75ml 的 汤A 和 25ml 的 汤B 。
 * 提供 50ml 的 汤A 和 50ml 的 汤B 。
 * 提供 25ml 的 汤A 和 75ml 的 汤B 。
 *
 *
 * 当我们把汤分配给某人之后，汤就没有了。每个回合，我们将从四种概率同为 0.25
 * 的操作中进行分配选择。如果汤的剩余量不足以完成某次操作，我们将尽可能分配。当两种类型的汤都分配完时，停止操作。
 *
 * 注意 不存在先分配 100 ml 汤B 的操作。
 *
 * 需要返回的值： 汤A 先分配完的概率 +  汤A和汤B 同时分配完的概率 / 2。返回值在正确答案 10^-5 的范围内将被认为是正确的。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: n = 50
 * 输出: 0.62500
 * 解释:如果我们选择前两个操作，A 首先将变为空。
 * 对于第三个操作，A 和 B 会同时变为空。
 * 对于第四个操作，B 首先将变为空。
 * 所以 A 变为空的总概率加上 A 和 B 同时变为空的概率的一半是 0.25 *(1 + 1 + 0.5 + 0)= 0.625。
 *
 *
 * 示例 2:
 *
 *
 * 输入: n = 100
 * 输出: 0.71875
 *
 *
 *
 *
 * 提示:
 *
 *
 * 0 <= n <= 10^9​​​​​​​
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn soup_servings(n: i32) -> f64 {
        let n = (n as f64 / 25.0).ceil() as usize;
        if n >= 179 {
            return 1.0;
        }
        let mut dp = vec![vec![0.0; n + 1]; n + 1];
        dp[0][0] = 0.5;
        for i in 1..=n {
            dp[0][i] = 1.0;
        }
        for i in 1..=n as i32 {
            for j in 1..=n as i32 {
                dp[i as usize][j as usize] = (dp[get_index(i - 4)][j as usize]
                    + dp[get_index(i - 3)][0.max(get_index(j - 1))]
                    + dp[get_index(i - 2)][get_index(j - 2)]
                    + dp[get_index(i - 1)][get_index(j - 3)])
                    / 4.0;
            }
        }
        dp[n][n]
    }
}

fn get_index(i: i32) -> usize {
    if i < 0 {
        0
    } else {
        i as usize
    }
}
// @lc code=end
