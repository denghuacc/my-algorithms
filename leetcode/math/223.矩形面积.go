/*
 * @lc app=leetcode.cn id=223 lang=golang
 *
 * [223] 矩形面积
 *
 * https://leetcode-cn.com/problems/rectangle-area/description/
 *
 * algorithms
 * Medium (46.40%)
 * Likes:    133
 * Dislikes: 0
 * Total Accepted:    25.2K
 * Total Submissions: 51.5K
 * Testcase Example:  '-3\n0\n3\n4\n0\n-1\n9\n2'
 *
 * 给你 二维 平面上两个 由直线构成的 矩形，请你计算并返回两个矩形覆盖的总面积。
 *
 * 每个矩形由其 左下 顶点和 右上 顶点坐标表示：
 *
 *
 *
 * 第一个矩形由其左下顶点 (ax1, ay1) 和右上顶点 (ax2, ay2) 定义。
 * 第二个矩形由其左下顶点 (bx1, by1) 和右上顶点 (bx2, by2) 定义。
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：ax1 = -3, ay1 = 0, ax2 = 3, ay2 = 4, bx1 = 0, by1 = -1, bx2 = 9, by2 = 2
 * 输出：45
 *
 *
 * 示例 2：
 *
 *
 * 输入：ax1 = -2, ay1 = -2, ax2 = 2, ay2 = 2, bx1 = -2, by1 = -2, bx2 = 2, by2 =
 * 2
 * 输出：16
 *
 *
 *
 *
 * 提示：
 *
 *
 * -10^4
 *
 *
 */

package leetcode

// @lc code=start
func computeArea(ax1 int, ay1 int, ax2 int, ay2 int, bx1 int, by1 int, bx2 int, by2 int) int {
	area1 := (ax2 - ax1) * (ay2 - ay1)
	area2 := (bx2 - bx1) * (by2 - by1)
	overlapWidth := min(ax2, bx2) - max(ax1, bx1)
	overlapHeight := min(ay2, by2) - max(ay1, by1)
	overlapArea := max(overlapWidth, 0) * max(overlapHeight, 0)
	return area1 + area2 - overlapArea
}

func max(x, y int) int {
	if x > y {
		return x
	}
	return y
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

// @lc code=end
