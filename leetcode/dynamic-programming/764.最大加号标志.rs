/*
 * @lc app=leetcode.cn id=764 lang=rust
 *
 * [764] 最大加号标志
 *
 * https://leetcode.cn/problems/largest-plus-sign/description/
 *
 * algorithms
 * Medium (49.76%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    9.6K
 * Total Submissions: 18.1K
 * Testcase Example:  '5\n[[4,2]]'
 *
 * 在一个 n x n 的矩阵 grid 中，除了在数组 mines 中给出的元素为 0，其他每个元素都为 1。mines[i] = [xi, yi]表示
 * grid[xi][yi] == 0
 *
 * 返回  grid 中包含 1 的最大的 轴对齐 加号标志的阶数 。如果未找到加号标志，则返回 0 。
 *
 * 一个 k 阶由 1 组成的 “轴对称”加号标志 具有中心网格 grid[r][c] == 1 ，以及4个从中心向上、向下、向左、向右延伸，长度为
 * k-1，由 1 组成的臂。注意，只有加号标志的所有网格要求为 1 ，别的网格可能为 0 也可能为 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入: n = 5, mines = [[4, 2]]
 * 输出: 2
 * 解释: 在上面的网格中，最大加号标志的阶只能是2。一个标志已在图中标出。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入: n = 1, mines = [[0, 0]]
 * 输出: 0
 * 解释: 没有加号标志，返回 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 500
 * 1 <= mines.length <= 5000
 * 0 <= xi, yi < n
 * 每一对 (xi, yi) 都 不重复​​​​​​​
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn order_of_largest_plus_sign(n: i32, mines: Vec<Vec<i32>>) -> i32 {
        let n = n as usize;
        let mut res = 0;
        let mut dp = vec![vec![n; n]; n];
        let mut set = std::collections::HashSet::<usize>::new();
        for mine in mines.iter() {
            set.insert(mine[0] as usize * n + mine[1] as usize);
        }
        for i in 0..n {
            let mut count = 0;
            for j in 0..n {
                if set.contains(&(i * n + j)) {
                    count = 0;
                } else {
                    count += 1;
                }
                dp[i][j] = dp[i][j].min(count);
            }
            count = 0;
            for j in (0..n).rev() {
                if set.contains(&(i * n + j)) {
                    count = 0;
                } else {
                    count += 1;
                }
                dp[i][j] = dp[i][j].min(count);
            }
        }
        for i in 0..n {
            let mut count = 0;
            for j in 0..n {
                if set.contains(&(j * n + i)) {
                    count = 0;
                } else {
                    count += 1;
                }
                dp[j][i] = dp[j][i].min(count);
            }
            count = 0;
            for j in (0..n).rev() {
                if set.contains(&(j * n + i)) {
                    count = 0;
                } else {
                    count += 1;
                }
                dp[j][i] = dp[j][i].min(count);
                res = res.max(dp[j][i])
            }
        }
        return res as i32;
    }
}
// @lc code=end
