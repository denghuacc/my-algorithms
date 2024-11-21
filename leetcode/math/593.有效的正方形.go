/*
 * @lc app=leetcode.cn id=593 lang=golang
 *
 * [593] 有效的正方形
 *
 * https://leetcode.cn/problems/valid-square/description/
 *
 * algorithms
 * Medium (44.15%)
 * Likes:    119
 * Dislikes: 0
 * Total Accepted:    16.1K
 * Total Submissions: 34.9K
 * Testcase Example:  '[0,0]\n[1,1]\n[1,0]\n[0,1]'
 *
 * 给定2D空间中四个点的坐标 p1, p2, p3 和 p4，如果这四个点构成一个正方形，则返回 true 。
 *
 * 点的坐标 pi 表示为 [xi, yi] 。输入 不是 按任何顺序给出的。
 *
 * 一个 有效的正方形 有四条等边和四个等角(90度角)。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,1]
 * 输出: True
 *
 *
 * 示例 2:
 *
 *
 * 输入：p1 = [0,0], p2 = [1,1], p3 = [1,0], p4 = [0,12]
 * 输出：false
 *
 *
 * 示例 3:
 *
 *
 * 输入：p1 = [1,0], p2 = [-1,0], p3 = [0,1], p4 = [0,-1]
 * 输出：true
 *
 *
 *
 *
 * 提示:
 *
 *
 * p1.length == p2.length == p3.length == p4.length == 2
 * -10^4 <= xi, yi <= 10^4
 *
 *
 */

package leetcode

import "sort"

// @lc code=start
func validSquare(p1 []int, p2 []int, p3 []int, p4 []int) bool {
	points := append([][]int{}, p1, p2, p3, p4)
	sort.Slice(points, func(x, y int) bool {
		if points[x][0] == points[y][0] {
			return points[x][1] < points[y][1]
		}
		return points[x][0] < points[y][0]
	})
	a1, a2, a3, a4 := points[0], points[1], points[2], points[3]

	d1, d2, d3, d4 := a3[1]-a1[1], a3[0]-a1[0], a4[1]-a2[1], a4[0]-a2[0]  // 两条平行线
	d5, d6 := a2[1]-a1[1], a2[0]-a1[0]                                    // 与上面任一条线相邻
	d7, d8, d9, d10 := a4[1]-a1[1], a4[0]-a1[0], a3[1]-a2[1], a3[0]-a2[0] // 两条对角线

	q1 := d1*d1+d2*d2 == d3*d3+d4*d4   // 平行线相等
	q2 := d1*d1+d2*d2 == d5*d5+d6*d6   // 相邻线相等
	q3 := d7*d7+d8*d8 == d9*d9+d10*d10 // 对角线相等
	q4 := d1*d1+d2*d2 != 0             // 线段长不为零

	if q1 && q2 && q3 && q4 {
		return true
	}
	return false
}

// @lc code=end
