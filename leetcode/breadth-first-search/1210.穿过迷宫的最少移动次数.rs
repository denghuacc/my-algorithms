/*
 * @lc app=leetcode.cn id=1210 lang=rust
 *
 * [1210] 穿过迷宫的最少移动次数
 *
 * https://leetcode.cn/problems/minimum-moves-to-reach-target-with-rotations/description/
 *
 * algorithms
 * Hard (47.47%)
 * Likes:    76
 * Dislikes: 0
 * Total Accepted:    7K
 * Total Submissions: 12K
 * Testcase Example:  '[[0,0,0,0,0,1],[1,1,0,0,1,0],[0,0,0,0,1,1],[0,0,1,0,1,0],[0,1,1,0,0,0],[0,1,1,0,0,0]]\r'
 *
 * 你还记得那条风靡全球的贪吃蛇吗？
 *
 * 我们在一个 n*n 的网格上构建了新的迷宫地图，蛇的长度为 2，也就是说它会占去两个单元格。蛇会从左上角（(0, 0) 和 (0,
 * 1)）开始移动。我们用 0 表示空单元格，用 1 表示障碍物。蛇需要移动到迷宫的右下角（(n-1, n-2) 和 (n-1, n-1)）。
 *
 * 每次移动，蛇可以这样走：
 *
 *
 * 如果没有障碍，则向右移动一个单元格。并仍然保持身体的水平／竖直状态。
 * 如果没有障碍，则向下移动一个单元格。并仍然保持身体的水平／竖直状态。
 * 如果它处于水平状态并且其下面的两个单元都是空的，就顺时针旋转 90 度。蛇从（(r, c)、(r, c+1)）移动到 （(r, c)、(r+1,
 * c)）。
 *
 * 如果它处于竖直状态并且其右面的两个单元都是空的，就逆时针旋转 90 度。蛇从（(r, c)、(r+1, c)）移动到（(r, c)、(r,
 * c+1)）。
 *
 *
 *
 * 返回蛇抵达目的地所需的最少移动次数。
 *
 * 如果无法到达目的地，请返回 -1。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：grid = [[0,0,0,0,0,1],
 * ⁠              [1,1,0,0,1,0],
 * [0,0,0,0,1,1],
 * [0,0,1,0,1,0],
 * [0,1,1,0,0,0],
 * [0,1,1,0,0,0]]
 * 输出：11
 * 解释：
 * 一种可能的解决方案是 [右, 右, 顺时针旋转, 右, 下, 下, 下, 下, 逆时针旋转, 右, 下]。
 *
 *
 * 示例 2：
 *
 * 输入：grid = [[0,0,1,1,1,1],
 * [0,0,0,0,1,1],
 * [1,1,0,0,0,1],
 * [1,1,1,0,0,1],
 * [1,1,1,0,0,1],
 * [1,1,1,0,0,0]]
 * 输出：9
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 100
 * 0 <= grid[i][j] <= 1
 * 蛇保证从空单元格开始出发。
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn minimum_moves(grid: Vec<Vec<i32>>) -> i32 {
        use std::collections::VecDeque;
        let n = grid.len();
        let mut dist = vec![vec![vec![-1; 2]; n]; n];
        dist[0][0][0] = 0;
        let mut queue = VecDeque::new();
        queue.push_back((0, 0, 0));

        while !queue.is_empty() {
            if let Some((x, y, status)) = queue.pop_front() {
                if status == 0 {
                    // 向右移动一个单元格
                    if y + 2 < n && dist[x][y + 1][0] == -1 && grid[x][y + 2] == 0 {
                        dist[x][y + 1][0] = dist[x][y][0] + 1;
                        queue.push_back((x, y + 1, 0));
                    }
                    // 向下移动一个单元格
                    if x + 1 < n
                        && dist[x + 1][y][0] == -1
                        && grid[x + 1][y] == 0
                        && grid[x + 1][y + 1] == 0
                    {
                        dist[x + 1][y][0] = dist[x][y][0] + 1;
                        queue.push_back((x + 1, y, 0));
                    }
                    // 顺时针旋转 90 度
                    if x + 1 < n
                        && y + 1 < n
                        && dist[x][y][1] == -1
                        && grid[x + 1][y] == 0
                        && grid[x + 1][y + 1] == 0
                    {
                        dist[x][y][1] = dist[x][y][0] + 1;
                        queue.push_back((x, y, 1));
                    }
                } else {
                    // 向右移动一个单元格
                    if y + 1 < n
                        && dist[x][y + 1][1] == -1
                        && grid[x][y + 1] == 0
                        && grid[x + 1][y + 1] == 0
                    {
                        dist[x][y + 1][1] = dist[x][y][1] + 1;
                        queue.push_back((x, y + 1, 1));
                    }
                    // 向下移动一个单元格
                    if x + 2 < n && dist[x + 1][y][1] == -1 && grid[x + 2][y] == 0 {
                        dist[x + 1][y][1] = dist[x][y][1] + 1;
                        queue.push_back((x + 1, y, 1));
                    }
                    // 逆时针旋转 90 度
                    if x + 1 < n
                        && y + 1 < n
                        && dist[x][y][0] == -1
                        && grid[x][y + 1] == 0
                        && grid[x + 1][y + 1] == 0
                    {
                        dist[x][y][0] = dist[x][y][1] + 1;
                        queue.push_back((x, y, 0));
                    }
                }
            }
        }
        dist[n - 1][n - 2][0]
    }
}
// @lc code=end
