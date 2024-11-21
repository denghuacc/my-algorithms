/*
 * @lc app=leetcode.cn id=815 lang=golang
 *
 * [815] 公交路线
 *
 * https://leetcode-cn.com/problems/bus-routes/description/
 *
 * algorithms
 * Hard (36.66%)
 * Likes:    162
 * Dislikes: 0
 * Total Accepted:    13K
 * Total Submissions: 34.7K
 * Testcase Example:  '[[1,2,7],[3,6,7]]\n1\n6'
 *
 * 给你一个数组 routes ，表示一系列公交线路，其中每个 routes[i] 表示一条公交线路，第 i 辆公交车将会在上面循环行驶。
 *
 *
 * 例如，路线 routes[0] = [1, 5, 7] 表示第 0 辆公交车会一直按序列 1 -> 5 -> 7 -> 1 -> 5 -> 7 -> 1
 * -> ... 这样的车站路线行驶。
 *
 *
 * 现在从 source 车站出发（初始时不在公交车上），要前往 target 车站。 期间仅可乘坐公交车。
 *
 * 求出 最少乘坐的公交车数量 。如果不可能到达终点车站，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：routes = [[1,2,7],[3,6,7]], source = 1, target = 6
 * 输出：2
 * 解释：最优策略是先乘坐第一辆公交车到达车站 7 , 然后换乘第二辆公交车到车站 6 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：routes = [[7,12],[4,5,15],[6],[15,19],[9,12,13]], source = 15, target =
 * 12
 * 输出：-1
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 .
 * 1
 * routes[i] 中的所有值 互不相同
 * sum(routes[i].length)
 * 0
 * 0
 *
 *
 */

package leetcode

import "math"

// @lc code=start
// graph + bfs
func numBusesToDestination(routes [][]int, source int, target int) int {
	if source == target {
		return 0
	}

	n := len(routes)
	edges := make([][]bool, n)
	for i := range edges {
		edges[i] = make([]bool, n)
	}
	rec := map[int][]int{}

	for i, route := range routes {
		for _, site := range route {
			for _, j := range rec[site] {
				edges[i][j] = true
				edges[j][i] = true
			}
			rec[site] = append(rec[site], i)
		}
	}

	distances := make([]int, n)
	for i := range distances {
		distances[i] = -1
	}

	queue := []int{}
	for _, site := range rec[source] {
		distances[site] = 1
		queue = append(queue, site)
	}

	for len(queue) > 0 {
		x := queue[0]
		queue = queue[1:]
		for y := 0; y < n; y++ {
			if edges[x][y] && distances[y] == -1 {
				distances[y] = distances[x] + 1
				queue = append(queue, y)
			}
		}
	}

	ret := math.MaxInt32
	for _, site := range rec[target] {
		if distances[site] != -1 {
			ret = min(ret, distances[site])
		}
	}

	if ret < math.MaxInt32 {
		return ret
	}
	return -1
}

func min(x, y int) int {
	if x < y {
		return x
	}
	return y
}

// @lc code=end
