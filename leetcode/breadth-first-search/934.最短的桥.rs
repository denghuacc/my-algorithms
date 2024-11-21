/*
 * @lc app=leetcode.cn id=934 lang=rust
 *
 * [934] 最短的桥
 *
 * https://leetcode.cn/problems/shortest-bridge/description/
 *
 * algorithms
 * Medium (48.04%)
 * Likes:    316
 * Dislikes: 0
 * Total Accepted:    43.4K
 * Total Submissions: 87.6K
 * Testcase Example:  '[[0,1],[1,0]]'
 *
 * 给你一个大小为 n x n 的二元矩阵 grid ，其中 1 表示陆地，0 表示水域。
 *
 * 岛 是由四面相连的 1 形成的一个最大组，即不会与非组内的任何其他 1 相连。grid 中 恰好存在两座岛 。
 *
 *
 *
 * 你可以将任意数量的 0 变为 1 ，以使两座岛连接起来，变成 一座岛 。
 *
 * 返回必须翻转的 0 的最小数目。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[0,1],[1,0]]
 * 输出：1
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,1,0],[0,0,0],[0,0,1]]
 * 输出：2
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1,1,1,1,1],[1,0,0,0,1],[1,0,1,0,1],[1,0,0,0,1],[1,1,1,1,1]]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == grid.length == grid[i].length
 * 2 <= n <= 100
 * grid[i][j] 为 0 或 1
 * grid 中恰有两个岛
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn shortest_bridge(mut grid: Vec<Vec<i32>>) -> i32 {
        use std::collections::VecDeque;
        let n = grid.len();
        const DIRS: [(i32, i32); 4] = [(0, 1), (1, 0), (0, -1), (-1, 0)];
        let mut islands = vec![];
        let mut queue = VecDeque::new();

        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 {
                    queue.push_back((i, j));
                    grid[i][j] = -1;
                    while !queue.is_empty() {
                        if let Some((x, y)) = queue.pop_front() {
                            islands.push((x, y));
                            for (x1, y1) in DIRS {
                                let nx = x + x1 as usize;
                                let ny = y + y1 as usize;
                                if nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == 1 {
                                    queue.push_back((nx, ny));
                                    grid[nx][ny] = -1;
                                }
                            }
                        }
                    }
                    for island in islands.clone() {
                        queue.push_back(island);
                    }
                    let mut step = 0;
                    while !queue.is_empty() {
                        let size = queue.len();
                        for k in 0..size {
                            if let Some((x, y)) = queue.pop_front() {
                                for (x1, y1) in DIRS {
                                    let nx = x + x1 as usize;
                                    let ny = y + y1 as usize;
                                    if nx >= 0 && nx < n && ny >= 0 && ny < n {
                                        if grid[nx][ny] == 0 {
                                            queue.push_back((nx, ny));
                                            grid[nx][ny] = -1;
                                        } else if grid[nx][ny] == 1 {
                                            return step;
                                        }
                                    }
                                }
                            }
                        }
                        step += 1;
                    }
                }
            }
        }
        0
    }
}

// @lc code=end
