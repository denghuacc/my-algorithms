/*
* @lc app=leetcode.cn id=240 lang=rust
*
* [240] 搜索二维矩阵 II
*
* https://leetcode-cn.com/problems/search-a-2d-matrix-ii/description/
*
* algorithms
* Medium (49.65%)
* Likes:    882
* Dislikes: 0
* Total Accepted:    216.5K
* Total Submissions: 435.8K
* Testcase Example:  '[[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]]\n' +
 '5'
*
* 编写一个高效的算法来搜索 m x n 矩阵 matrix 中的一个目标值 target 。该矩阵具有以下特性：
*
*
* 每行的元素从左到右升序排列。
* 每列的元素从上到下升序排列。
*
*
*
*
* 示例 1：
*
*
* 输入：matrix =
* [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
* target = 5
* 输出：true
*
*
* 示例 2：
*
*
* 输入：matrix =
* [[1,4,7,11,15],[2,5,8,12,19],[3,6,9,16,22],[10,13,14,17,24],[18,21,23,26,30]],
* target = 20
* 输出：false
*
*
*
*
* 提示：
*
*
* m == matrix.length
* n == matrix[i].length
* 1 <= n, m <= 300
* -10^9 <= matrix[i][j] <= 10^9
* 每行的所有元素从左到右升序排列
* 每列的所有元素从上到下升序排列
* -10^9 <= target <= 10^9
*
*
*/

// @lc code=start
use std::cmp::Ordering;
impl Solution {
    pub fn search_matrix(matrix: Vec<Vec<i32>>, target: i32) -> bool {
        let mut row = 0;
        let mut col = matrix[0].len() - 1;

        while row < matrix.len() && col < matrix[0].len() {
            match matrix[row][col].cmp(&target) {
                Ordering::Equal => return true,
                Ordering::Less => row += 1,
                Ordering::Greater => col -= 1,
            }
        }

        false
    }
}
// @lc code=end
