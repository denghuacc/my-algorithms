/*
 * @lc app=leetcode.cn id=1037 lang=golang
 *
 * [1037] 有效的回旋镖
 *
 * https://leetcode.cn/problems/valid-boomerang/description/
 *
 * algorithms
 * Easy (47.56%)
 * Likes:    49
 * Dislikes: 0
 * Total Accepted:    18.8K
 * Total Submissions: 39.6K
 * Testcase Example:  '[[1,1],[2,3],[3,2]]'
 *
 * 给定一个数组 points ，其中 points[i] = [xi, yi] 表示 X-Y 平面上的一个点，如果这些点构成一个 回旋镖 则返回 true
 * 。
 *
 * 回旋镖 定义为一组三个点，这些点 各不相同 且 不在一条直线上 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：points = [[1,1],[2,3],[3,2]]
 * 输出：true
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[1,1],[2,2],[3,3]]
 * 输出：false
 *
 *
 *
 * 提示：
 *
 *
 *
 * points.length == 3
 * points[i].length == 2
 * 0 <= xi, yi <= 100
 *
 *
 */

package leetcode

// @lc code=start
// math 向量叉乘
func isBoomerang(points [][]int) bool {
	x1, y1 := points[0][0], points[0][1]
	x2, y2 := points[1][0], points[1][1]
	x3, y3 := points[2][0], points[2][1]
	return (x2-x1)*(y3-y1)-(y2-y1)*(x3-x1) != 0
}

// @lc code=end
