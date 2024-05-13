/*
 * @lc app=leetcode.cn id=994 lang=rust
 *
 * [994] 腐烂的橘子
 *
 * https://leetcode.cn/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (51.34%)
 * Likes:    859
 * Dislikes: 0
 * Total Accepted:    173.4K
 * Total Submissions: 335.2K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 *
 *
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 *
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 *
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn oranges_rotting(grid: Vec<Vec<i32>>) -> i32 {
        let mut grid = grid.clone();
        use std::collections::{HashMap, VecDeque};
        let m = grid.len();
        let n = grid[0].len();
        const DIRS: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];
        let mut queue = VecDeque::new();
        let mut depth = HashMap::new();

        for i in 0..m {
            for j in 0..n {
                if grid[i][j] == 2 {
                    queue.push_back((i, j));
                    depth.insert((i, j), 0);
                }
            }
        }
        let mut res = 0;
        while let Some((i, j)) = queue.pop_front() {
            for k in 0..4 {
                let ni = i + DIRS[k].0 as usize;
                let nj = j + DIRS[k].1 as usize;

                if ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] == 1 {
                    grid[ni][nj] = 2;
                    queue.push_back((ni, nj));
                    depth.insert((ni, nj), *depth.get(&(i, j)).unwrap() + 1);
                    res = *depth.get(&(ni, nj)).unwrap()
                }
            }
        }

        for row in grid {
            for v in row {
                if v == 1 {
                    return -1;
                }
            }
        }
        res
    }
}
// @lc code=end
