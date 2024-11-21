/*
 * @lc app=leetcode.cn id=849 lang=golang
 *
 * [849] 到最近的人的最大距离
 *
 * https://leetcode.cn/problems/maximize-distance-to-closest-person/description/
 *
 * algorithms
 * Medium (44.28%)
 * Likes:    232
 * Dislikes: 0
 * Total Accepted:    29.5K
 * Total Submissions: 61K
 * Testcase Example:  '[1,0,0,0,1,0,1]'
 *
 * 给你一个数组 seats 表示一排座位，其中 seats[i] = 1 代表有人坐在第 i 个座位上，seats[i] = 0 代表座位 i
 * 上是空的（下标从 0 开始）。
 *
 * 至少有一个空座位，且至少有一人已经坐在座位上。
 *
 * 亚历克斯希望坐在一个能够使他与离他最近的人之间的距离达到最大化的座位上。
 *
 * 返回他到离他最近的人的最大距离。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：seats = [1,0,0,0,1,0,1]
 * 输出：2
 * 解释：
 * 如果亚历克斯坐在第二个空位（seats[2]）上，他到离他最近的人的距离为 2 。
 * 如果亚历克斯坐在其它任何一个空位上，他到离他最近的人的距离为 1 。
 * 因此，他到离他最近的人的最大距离是 2 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：seats = [1,0,0,0]
 * 输出：3
 * 解释：
 * 如果亚历克斯坐在最后一个座位上，他离最近的人有 3 个座位远。
 * 这是可能的最大距离，所以答案是 3 。
 *
 *
 * 示例 3：
 *
 *
 * 输入：seats = [0,1]
 * 输出：1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2
 * seats[i] 为 0 或 1
 * 至少有一个 空座位
 * 至少有一个 座位上有人
 *
 *
 */

package leetcode

// @lc code=start
func maxDistToClosest(seats []int) (maxDist int) {
	inFirst := true
	dist := 0
	for _, seat := range seats {
		if seat == 1 {
			if inFirst {
				inFirst = false
				maxDist = max(maxDist, dist)
			} else {
				maxDist = max(maxDist, (dist+1)/2)
			}
			dist = 0
		} else {
			dist++
		}
	}
	maxDist = max(maxDist, dist)
	return
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

// @lc code=end
