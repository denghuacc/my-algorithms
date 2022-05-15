/*
 * @lc app=leetcode.cn id=812 lang=golang
 *
 * [812] 最大三角形面积
 *
 * https://leetcode.cn/problems/largest-triangle-area/description/
 *
 * algorithms
 * Easy (63.12%)
 * Likes:    132
 * Dislikes: 0
 * Total Accepted:    18.6K
 * Total Submissions: 28.2K
 * Testcase Example:  '[[0,0],[0,1],[1,0],[0,2],[2,0]]'
 *
 * 给定包含多个点的集合，从其中取三个点组成三角形，返回能组成的最大三角形的面积。
 *
 *
 * 示例:
 * 输入: points = [[0,0],[0,1],[1,0],[0,2],[2,0]]
 * 输出: 2
 * 解释:
 * 这五个点如下图所示。组成的橙色三角形是最大的，面积为2。
 *
 *
 *
 *
 * 注意:
 *
 *
 * 3 <= points.length <= 50.
 * 不存在重复的点。
 * -50 <= points[i][j] <= 50.
 * 结果误差值在 10^-6 以内都认为是正确答案。
 *
 *
 */

package leetcode

// @lc code=start
func largestTriangleArea(points [][]int) (res float64) {
	n := len(points)
	for i := 0; i < n; i++ {
		for j := i + 1; j < n; j++ {
			for k := j + 1; k < n; k++ {
				res = max(res, area(points[i], points[j], points[k]))
			}
		}
	}
	return
}

func max(a, b float64) float64 {
	if a > b {
		return a
	}
	return b
}

func abs(a int) float64 {
	if a < 0 {
		return float64(-a)
	}
	return float64(a)
}

func area(a, b, c []int) float64 {
	return 0.5 * abs(a[0]*b[1]+b[0]*c[1]+c[0]*a[1]-a[0]*c[1]-b[0]*a[1]-c[0]*b[1])
}

// @lc code=end
