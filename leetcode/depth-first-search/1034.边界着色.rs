/*
 * @lc app=leetcode.cn id=1034 lang=rust
 *
 * [1034] 边界着色
 *
 * https://leetcode-cn.com/problems/coloring-a-border/description/
 *
 * algorithms
 * Medium (49.83%)
 * Likes:    57
 * Dislikes: 0
 * Total Accepted:    8.2K
 * Total Submissions: 16.5K
 * Testcase Example:  '[[1,1],[1,2]]\n0\n0\n3'
 *
 * 给你一个大小为 m x n 的整数矩阵 grid ，表示一个网格。另给你三个整数 row、col 和 color
 * 。网格中的每个值表示该位置处的网格块的颜色。
 *
 * 当两个网格块的颜色相同，而且在四个方向中任意一个方向上相邻时，它们属于同一 连通分量 。
 *
 * 连通分量的边界 是指连通分量中的所有与不在分量中的网格块相邻（四个方向上）的所有网格块，或者在网格的边界上（第一行/列或最后一行/列）的所有网格块。
 *
 * 请你使用指定颜色 color 为所有包含网格块 grid[row][col] 的 连通分量的边界 进行着色，并返回最终的网格 grid 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
 * 输出：[[3,3],[3,2]]
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
 * 输出：[[1,3,3],[2,3,3]]
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
 * 输出：[[2,2,2],[2,1,2],[2,2,2]]
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * 1 <= grid[i][j], color <= 1000
 * 0 <= row < m
 * 0 <= col < n
 *
 *
 *
 *
 */

// @lc code=start
impl Solution {
    // bfs
    // pub fn color_border(grid: Vec<Vec<i32>>, row: i32, col: i32, color: i32) -> Vec<Vec<i32>> {
    //     let mut grid = grid;
    //     let m = grid.len();
    //     let n = grid[0].len();
    //     let mut visited = vec![vec![false; n]; m];
    //     let mut borders = vec![];
    //     let original_color = grid[row as usize][col as usize];
    //     let dire = [[0, 1], [0, -1], [1, 0], [-1, 0]];
    //     let mut queue: Vec<Vec<i32>> = vec![];
    //     queue.push(vec![row, col]);
    //     visited[row as usize][col as usize] = true;
    //     while queue.len() > 0 {
    //         let node = queue.pop().unwrap();
    //         let x = node[0];
    //         let y = node[1];
    //         let mut is_border = false;
    //         for i in 0..4 {
    //             let nx = dire[i][0] + x;
    //             let ny = dire[i][1] + y;
    //             if !(nx >= 0
    //                 && nx < m as i32
    //                 && ny >= 0
    //                 && ny < n as i32
    //                 && grid[nx as usize][ny as usize] == original_color)
    //             {
    //                 is_border = true;
    //             } else if !visited[nx as usize][ny as usize] {
    //                 visited[nx as usize][ny as usize] = true;
    //                 queue.push(vec![nx, ny]);
    //             }
    //         }
    //         if is_border {
    //             borders.push(vec![x, y]);
    //         }
    //     }
    //     for i in 0..borders.len() {
    //         let x = borders[i][0];
    //         let y = borders[i][1];
    //         grid[x as usize][y as usize] = color;
    //     }
    //     return grid;
    // }

    // dfs
    pub fn color_border(grid: Vec<Vec<i32>>, row: i32, col: i32, color: i32) -> Vec<Vec<i32>> {
        let mut grid = grid;
        let m = grid.len();
        let n = grid[0].len();
        let mut visited = vec![vec![false; n]; m];
        let mut borders: Vec<Vec<i32>> = vec![];
        let original_color = grid[row as usize][col as usize];
        visited[row as usize][col as usize] = true;
        dfs(&grid, row, col, &mut visited, original_color, &mut borders);
        for i in 0..borders.len() {
            let x = borders[i][0];
            let y = borders[i][1];
            grid[x as usize][y as usize] = color;
        }
        return grid;

        fn dfs(
            grid: &Vec<Vec<i32>>,
            x: i32,
            y: i32,
            visited: &mut Vec<Vec<bool>>,
            original_color: i32,
            borders: &mut Vec<Vec<i32>>,
        ) {
            let m = grid.len();
            let n = grid[0].len();
            let mut is_border = false;
            let dire = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            for i in 0..4 {
                let nx = dire[i][0] + x;
                let ny = dire[i][1] + y;
                if !(nx >= 0
                    && nx < m as i32
                    && ny >= 0
                    && ny < n as i32
                    && grid[nx as usize][ny as usize] == original_color)
                {
                    is_border = true;
                } else if !visited[nx as usize][ny as usize] {
                    visited[nx as usize][ny as usize] = true;
                    dfs(grid, nx, ny, visited, original_color, borders);
                }
            }
            if is_border {
                borders.push(vec![x, y]);
            }
        }
    }
}
// @lc code=end
