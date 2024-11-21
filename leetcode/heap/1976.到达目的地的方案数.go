/*
 * @lc app=leetcode.cn id=1976 lang=golang
 *
 * [1976] 到达目的地的方案数
 *
 * https://leetcode.cn/problems/number-of-ways-to-arrive-at-destination/description/
 *
 * algorithms
 * Medium (40.68%)
 * Likes:    90
 * Dislikes: 0
 * Total Accepted:    9.4K
 * Total Submissions: 23.1K
 * Testcase Example:  '7\n' +
  '[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]'
 *
 * 你在一个城市里，城市由 n 个路口组成，路口编号为 0 到 n - 1 ，某些路口之间有 双向
 * 道路。输入保证你可以从任意路口出发到达其他任意路口，且任意两个路口之间最多有一条路。
 *
 * 给你一个整数 n 和二维整数数组 roads ，其中 roads[i] = [ui, vi, timei] 表示在路口 ui 和 vi
 * 之间有一条需要花费 timei 时间才能通过的道路。你想知道花费 最少时间 从路口 0 出发到达路口 n - 1 的方案数。
 *
 * 请返回花费 最少时间 到达目的地的 路径数目 。由于答案可能很大，将结果对 10^9 + 7 取余 后返回。
 *
 *
 *
 * 示例 1：
 *
 * 输入：n = 7, roads =
 * [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
 * 输出：4
 * 解释：从路口 0 出发到路口 6 花费的最少时间是 7 分钟。
 * 四条花费 7 分钟的路径分别为：
 * - 0 ➝ 6
 * - 0 ➝ 4 ➝ 6
 * - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
 * - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
 *
 *
 * 示例 2：
 *
 * 输入：n = 2, roads = [[1,0,10]]
 * 输出：1
 * 解释：只有一条从路口 0 到路口 1 的路，花费 10 分钟。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 200
 * n - 1 <= roads.length <= n * (n - 1) / 2
 * roads[i].length == 3
 * 0 <= ui, vi <= n - 1
 * 1 <= timei <= 10^9
 * ui != vi
 * 任意两个路口之间至多有一条路。
 * 从任意路口出发，你能够到达其他任意路口。
 *
 *
*/

package leetcode

import (
	"container/heap"
	"math"
)

// @lc code=start
func countPaths(n int, roads [][]int) int {
	const MOD = int64(1e9 + 7)
	graph := make([][]Edge, n)
	for _, road := range roads {
		u, v, t := road[0], road[1], road[2]
		graph[u] = append(graph[u], Edge{v, t})
		graph[v] = append(graph[v], Edge{u, t})
	}
	dis := make([]int64, n)
	for i := range dis {
		dis[i] = math.MaxInt64
	}
	ways := make([]int64, n)
	minQueue := HP{{0, 0}}
	heap.Init(&minQueue)
	dis[0] = 0
	ways[0] = 1

	for len(minQueue) > 0 {
		p := heap.Pop(&minQueue).(Pair)
		t, u := p.x, p.y
		if t > dis[u] {
			continue
		}
		for _, edge := range graph[u] {
			v, w := edge.to, edge.time
			if t+int64(w) < dis[v] {
				dis[v] = t + int64(w)
				ways[v] = ways[u]
				heap.Push(&minQueue, Pair{t + int64(w), v})
			} else if t+int64(w) == dis[v] {
				ways[v] = (ways[u] + ways[v]) % MOD
			}

		}
	}
	return int(ways[n-1])
}

type Edge struct {
	to, time int
}

type Pair struct {
	x int64
	y int
}
type HP []Pair

func (h HP) Len() int            { return len(h) }
func (h HP) Less(i, j int) bool  { return h[i].x < h[j].x }
func (h HP) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *HP) Push(v interface{}) { *h = append(*h, v.(Pair)) }
func (h *HP) Pop() interface{}   { a := *h; v := a[len(a)-1]; *h = a[:len(a)-1]; return v }

// @lc code=end
