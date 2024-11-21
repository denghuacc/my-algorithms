/*
 * @lc app=leetcode.cn id=478 lang=golang
 *
 * [478] 在圆内随机生成点
 *
 * https://leetcode.cn/problems/generate-random-point-in-a-circle/description/
 *
 * algorithms
 * Medium (44.77%)
 * Likes:    125
 * Dislikes: 0
 * Total Accepted:    20K
 * Total Submissions: 42.9K
 * Testcase Example:  '["Solution","randPoint","randPoint","randPoint"]\n[[1.0,0.0,0.0],[],[],[]]'
 *
 * 给定圆的半径和圆心的位置，实现函数 randPoint ，在圆中产生均匀随机点。
 *
 * 实现 Solution 类:
 *
 *
 * Solution(double radius, double x_center, double y_center) 用圆的半径 radius
 * 和圆心的位置 (x_center, y_center) 初始化对象
 * randPoint() 返回圆内的一个随机点。圆周上的一点被认为在圆内。答案作为数组返回 [x, y] 。
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入:
 * ["Solution","randPoint","randPoint","randPoint"]
 * [[1.0, 0.0, 0.0], [], [], []]
 * 输出: [null, [-0.02493, -0.38077], [0.82314, 0.38945], [0.36572, 0.17248]]
 * 解释:
 * Solution solution = new Solution(1.0, 0.0, 0.0);
 * solution.randPoint ();//返回[-0.02493，-0.38077]
 * solution.randPoint ();//返回[0.82314,0.38945]
 * solution.randPoint ();//返回[0.36572,0.17248]
 *
 *
 *
 * 提示：
 *
 *
 * 0 < radius <= 10^8
 * -10^7 <= x_center, y_center <= 10^7
 * randPoint 最多被调用 3 * 10^4 次
 *
 *
 */

package leetcode

import "math/rand"

// @lc code=start
type Solution struct {
	radius, xCenter, yCenter float64
}

func Constructor(radius float64, xCenter float64, yCenter float64) Solution {
	return Solution{radius, xCenter, yCenter}
}

func (s *Solution) RandPoint() []float64 {
	for {
		x := rand.Float64()*2 - 1
		y := rand.Float64()*2 - 1
		if x*x+y*y <= 1 {
			return []float64{s.xCenter + s.radius*x, s.yCenter + s.radius*y}
		}
	}
}

/**
 * Your Solution object will be instantiated and called as such:
 * obj := Constructor(radius, x_center, y_center);
 * param_1 := obj.RandPoint();
 */
// @lc code=end
