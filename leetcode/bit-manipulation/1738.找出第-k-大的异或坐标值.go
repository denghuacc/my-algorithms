/*
 * @lc app=leetcode.cn id=1738 lang=golang
 *
 * [1738] 找出第 K 大的异或坐标值
 *
 * https://leetcode-cn.com/problems/find-kth-largest-xor-coordinate-value/description/
 *
 * algorithms
 * Medium (66.15%)
 * Likes:    31
 * Dislikes: 0
 * Total Accepted:    7.7K
 * Total Submissions: 11.7K
 * Testcase Example:  '[[5,2],[1,6]]\n1'
 *
 * 给你一个二维矩阵 matrix 和一个整数 k ，矩阵大小为 m x n 由非负整数组成。
 *
 * 矩阵中坐标 (a, b) 的 值 可由对所有满足 0 <= i <= a < m 且 0 <= j <= b < n 的元素
 * matrix[i][j]（下标从 0 开始计数）执行异或运算得到。
 *
 * 请你找出 matrix 的所有坐标中第 k 大的值（k 的值从 1 开始计数）。
 *
 *
 *
 * 示例 1：
 *
 * 输入：matrix = [[5,2],[1,6]], k = 1
 * 输出：7
 * 解释：坐标 (0,1) 的值是 5 XOR 2 = 7 ，为最大的值。
 *
 * 示例 2：
 *
 * 输入：matrix = [[5,2],[1,6]], k = 2
 * 输出：5
 * 解释：坐标 (0,0) 的值是 5 = 5 ，为第 2 大的值。
 *
 * 示例 3：
 *
 * 输入：matrix = [[5,2],[1,6]], k = 3
 * 输出：4
 * 解释：坐标 (1,0) 的值是 5 XOR 1 = 4 ，为第 3 大的值。
 *
 * 示例 4：
 *
 * 输入：matrix = [[5,2],[1,6]], k = 4
 * 输出：0
 * 解释：坐标 (1,1) 的值是 5 XOR 2 XOR 1 XOR 6 = 0 ，为第 4 大的值。
 *
 *
 *
 * 提示：
 *
 *
 * m == matrix.length
 * n == matrix[i].length
 * 1 <= m, n <= 1000
 * 0 <= matrix[i][j] <= 10^6
 * 1 <= k <= m * n
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
// sort
func kthLargestValue(matrix [][]int, k int) int {
	m := len(matrix)
	n := len(matrix[0])

	results := make([]int, 0, m*n)
	pre := make([][]int, m+1)
	pre[0] = make([]int, n+1)

	for i, row := range matrix {
		pre[i+1] = make([]int, n+1)
		for j, val := range row {
			pre[i+1][j+1] = pre[i+1][j] ^ pre[i][j+1] ^ pre[i][j] ^ val
			results = append(results, pre[i+1][j+1])
		}
	}

	sort.Sort(sort.Reverse(sort.IntSlice(results)))
	return results[k-1]
}

// @lc code=end
