/*
 * @lc app=leetcode.cn id=1380 lang=rust
 *
 * [1380] 矩阵中的幸运数
 *
 * https://leetcode-cn.com/problems/lucky-numbers-in-a-matrix/description/
 *
 * algorithms
 * Easy (72.74%)
 * Likes:    71
 * Dislikes: 0
 * Total Accepted:    24.3K
 * Total Submissions: 32.1K
 * Testcase Example:  '[[3,7,8],[9,11,13],[15,16,17]]'
 *
 * 给你一个 m * n 的矩阵，矩阵中的数字 各不相同 。请你按 任意 顺序返回矩阵中的所有幸运数。
 *
 * 幸运数是指矩阵中满足同时下列两个条件的元素：
 *
 *
 * 在同一行的所有元素中最小
 * 在同一列的所有元素中最大
 *
 *
 *
 *
 * 示例 1：
 *
 * 输入：matrix = [[3,7,8],[9,11,13],[15,16,17]]
 * 输出：[15]
 * 解释：15 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。
 *
 *
 * 示例 2：
 *
 * 输入：matrix = [[1,10,4,2],[9,3,8,7],[15,16,17,12]]
 * 输出：[12]
 * 解释：12 是唯一的幸运数，因为它是其所在行中的最小值，也是所在列中的最大值。
 *
 *
 * 示例 3：
 *
 * 输入：matrix = [[7,8],[1,2]]
 * 输出：[7]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= n, m <= 50
 * 1 <= matrix[i][j] <= 10^5
 * 矩阵中的所有元素都是不同的
 *
 *
 */

// @lc code=start
impl Solution {
    pub fn lucky_numbers(matrix: Vec<Vec<i32>>) -> Vec<i32> {
        let mut res = vec![];
        let m = matrix.len();
        let n = matrix[0].len();
        let mut row_min = vec![std::i32::MAX; m];
        let mut col_max = vec![std::i32::MIN; n];
        for i in 0..m {
            for j in 0..n {
                row_min[i] = std::cmp::min(row_min[i], matrix[i][j]);
                col_max[j] = std::cmp::max(col_max[j], matrix[i][j]);
            }
        }
        for i in 0..m {
            for j in 0..n {
                if matrix[i][j] == row_min[i] && matrix[i][j] == col_max[j] {
                    res.push(matrix[i][j]);
                }
            }
        }
        res
    }
}
// @lc code=end
