/*
 * @lc app=leetcode.cn id=1020 lang=rust
 *
 * [1020] 飞地的数量
 *
 * https://leetcode-cn.com/problems/number-of-enclaves/description/
 *
 * algorithms
 * Medium (56.41%)
 * Likes:    86
 * Dislikes: 0
 * Total Accepted:    15.5K
 * Total Submissions: 26.6K
 * Testcase Example:  '[[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]'
 *
 * 给你一个大小为 m x n 的二进制矩阵 grid ，其中 0 表示一个海洋单元格、1 表示一个陆地单元格。
 *
 * 一次 移动 是指从一个陆地单元格走到另一个相邻（上、下、左、右）的陆地单元格或跨过 grid 的边界。
 *
 * 返回网格中 无法 在任意次数的移动中离开网格边界的陆地单元格的数量。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[0,0,0,0],[1,0,1,0],[0,1,1,0],[0,0,0,0]]
 * 输出：3
 * 解释：有三个 1 被 0 包围。一个 1 没有被包围，因为它在边界上。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,1,1,0],[0,0,1,0],[0,0,1,0],[0,0,0,0]]
 * 输出：0
 * 解释：所有 1 都在边界上或可以到达边界。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 500
 * grid[i][j] 的值为 0 或 1
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn num_enclaves(grid: Vec<Vec<i32>>) -> i32 {
        let mut grid = grid;
        let m = grid.len();
        let n = grid[0].len();
        let mut visited = vec![vec![false; n]; m];

        for i in 0..m {
            dfs(&grid, i, 0, &mut visited);
            dfs(&grid, i, n - 1, &mut visited);
        }
        for j in 1..n - 1 {
            dfs(&grid, 0, j, &mut visited);
            dfs(&grid, m - 1, j, &mut visited);
        }
        let mut res = 0;
        for i in 1..m - 1 {
            for j in 1..n - 1 {
                if grid[i][j] == 1 && !visited[i][j] {
                    res += 1;
                }
            }
        }
        res
    }
}

const DIRS: [(i32, i32); 4] = [(0, 1), (0, -1), (1, 0), (-1, 0)];

fn dfs(grid: &Vec<Vec<i32>>, row: usize, col: usize, visited: &mut Vec<Vec<bool>>) {
    if row < 0
        || row >= grid.len()
        || col < 0
        || col >= grid[0].len()
        || grid[row][col] == 0
        || visited[row][col]
    {
        return;
    }
    visited[row][col] = true;
    for &(dr, dc) in DIRS.iter() {
        let row = (row as i32 + dr) as usize;
        let col = (col as i32 + dc) as usize;
        dfs(grid, row, col, visited);
    }
}
// @lc code=end
