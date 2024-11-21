/*
 * @lc app=leetcode.cn id=1139 lang=rust
 *
 * [1139] 最大的以 1 为边界的正方形
 *
 * https://leetcode.cn/problems/largest-1-bordered-square/description/
 *
 * algorithms
 * Medium (49.51%)
 * Likes:    135
 * Dislikes: 0
 * Total Accepted:    16.4K
 * Total Submissions: 31.4K
 * Testcase Example:  '[[1,1,1],[1,0,1],[1,1,1]]'
 *
 * 给你一个由若干 0 和 1 组成的二维网格 grid，请你找出边界全部由 1 组成的最大 正方形 子网格，并返回该子网格中的元素数量。如果不存在，则返回
 * 0。
 *
 *
 *
 * 示例 1：
 *
 * 输入：grid = [[1,1,1],[1,0,1],[1,1,1]]
 * 输出：9
 *
 *
 * 示例 2：
 *
 * 输入：grid = [[1,1,0,0]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= grid.length <= 100
 * 1 <= grid[0].length <= 100
 * grid[i][j] 为 0 或 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn largest1_bordered_square(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        // 以 (x,y) 为起点左侧连续 1 的最大数目
        let mut left = vec![vec![0 as usize; n + 1]; m + 1];
        // 以 (x,y) 为起点上方连续 1 的最大数目
        let mut up = vec![vec![0 as usize; n + 1]; m + 1];
        let mut max_border = 0;
        for i in 1..=m {
            for j in 1..=n {
                if grid[i - 1][j - 1] == 1 {
                    left[i][j] = left[i][j - 1] + 1;
                    up[i][j] = up[i - 1][j] + 1;
                    let mut border = left[i][j].min(up[i][j]);
                    while left[i - border + 1][j] < border || up[i][j - border + 1] < border {
                        border -= 1;
                    }
                    max_border = max_border.max(border);
                }
            }
        }
        (max_border * max_border) as i32
    }
}
// @lc code=end
