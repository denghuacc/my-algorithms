/*
 * @lc app=leetcode.cn id=688 lang=rust
 *
 * [688] 骑士在棋盘上的概率
 *
 * https://leetcode-cn.com/problems/knight-probability-in-chessboard/description/
 *
 * algorithms
 * Medium (51.61%)
 * Likes:    176
 * Dislikes: 0
 * Total Accepted:    12.5K
 * Total Submissions: 22.8K
 * Testcase Example:  '3\n2\n0\n0'
 *
 * 在一个 n x n 的国际象棋棋盘上，一个骑士从单元格 (row, column) 开始，并尝试进行 k 次移动。行和列是 从 0 开始
 * 的，所以左上单元格是 (0,0) ，右下单元格是 (n - 1, n - 1) 。
 *
 * 象棋骑士有8种可能的走法，如下图所示。每次移动在基本方向上是两个单元格，然后在正交方向上是一个单元格。
 *
 *
 *
 * 每次骑士要移动时，它都会随机从8种可能的移动中选择一种(即使棋子会离开棋盘)，然后移动到那里。
 *
 * 骑士继续移动，直到它走了 k 步或离开了棋盘。
 *
 * 返回 骑士在棋盘停止移动后仍留在棋盘上的概率 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入: n = 3, k = 2, row = 0, column = 0
 * 输出: 0.0625
 * 解释: 有两步(到(1,2)，(2,1))可以让骑士留在棋盘上。
 * 在每一个位置上，也有两种移动可以让骑士留在棋盘上。
 * 骑士留在棋盘上的总概率是0.0625。
 *
 *
 * 示例 2：
 *
 *
 * 输入: n = 1, k = 0, row = 0, column = 0
 * 输出: 1.00000
 *
 *
 *
 *
 * 提示:
 *
 *
 * 1 <= n <= 25
 * 0 <= k <= 100
 * 0 <= row, column <= n
 *
 *
 */

// @lc code=start
const DIRS: [(i32, i32); 8] = [
    (1, 2),
    (2, 1),
    (2, -1),
    (1, -2),
    (-1, -2),
    (-2, -1),
    (-2, 1),
    (-1, 2),
];

impl Solution {
    pub fn knight_probability(n: i32, k: i32, row: i32, column: i32) -> f64 {
        let mut dp = vec![vec![vec![0.0; n as usize]; n as usize]; k as usize + 1];
        for step in 0..=k {
            for i in 0..n {
                for j in 0..n {
                    if step == 0 {
                        dp[step as usize][i as usize][j as usize] = 1.0;
                    } else {
                        for &(di, dj) in DIRS.iter() {
                            let ni = i as i32 + di;
                            let nj = j as i32 + dj;
                            if ni >= 0 && ni < n && nj >= 0 && nj < n {
                                dp[step as usize][i as usize][j as usize] +=
                                    dp[step as usize - 1][ni as usize][nj as usize] / 8.0;
                            }
                        }
                    }
                }
            }
        }
        dp[k as usize][row as usize][column as usize]
    }
}
// @lc code=end
