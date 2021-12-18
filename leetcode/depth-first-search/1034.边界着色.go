/*
 * @lc app=leetcode.cn id=1034 lang=golang
 *
 * [1034] 边界着色
 *
 * https://leetcode-cn.com/problems/coloring-a-border/description/
 *
 * algorithms
 * Medium (56.04%)
 * Likes:    137
 * Dislikes: 0
 * Total Accepted:    28.2K
 * Total Submissions: 50.4K
 * Testcase Example:  '[[1,1],[1,2]]\n0\n0\n3'
 *
 * 给你一个大小为 m x n 的整数矩阵 grid ，表示一个网格。另给你三个整数 row、col 和 color
 * 。网格中的每个值表示该位置处的网格块的颜色。
 *
 * 两个网格块属于同一 连通分量 需满足下述全部条件：
 *
 *
 * 两个网格块颜色相同
 * 在上、下、左、右任意一个方向上相邻
 *
 *
 * 连通分量的边界 是指连通分量中满足下述条件之一的所有网格块：
 *
 *
 * 在上、下、左、右任意一个方向上与不属于同一连通分量的网格块相邻
 * 在网格的边界上（第一行/列或最后一行/列）
 *
 *
 * 请你使用指定颜色 color 为所有包含网格块 grid[row][col] 的 连通分量的边界 进行着色，并返回最终的网格 grid 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,1],[1,2]], row = 0, col = 0, color = 3
 * 输出：[[3,3],[3,2]]
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[1,2,2],[2,3,2]], row = 0, col = 1, color = 3
 * 输出：[[1,3,3],[2,3,3]]
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1,1,1],[1,1,1],[1,1,1]], row = 1, col = 1, color = 2
 * 输出：[[2,2,2],[2,1,2],[2,2,2]]
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * 1 <= grid[i][j], color <= 1000
 * 0 <= row < m
 * 0 <= col < n
 *
 *
 *
 *
 */

package leetcode

// @lc code=start
func colorBorder(grid [][]int, row int, col int, color int) [][]int {
	var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}
	m, n := len(grid), len(grid[0])
	type point struct{ x, y int }
	borders := []point{}
	originalColor := grid[row][col]
	vis := make([][]bool, m)
	for i := range vis {
		vis[i] = make([]bool, n)
	}

	var dfs func(int, int)
	dfs = func(x, y int) {
		vis[x][y] = true
		isBorder := false
		for _, dir := range dirs {
			nx, ny := x+dir.x, y+dir.y
			if !(0 <= nx && nx < m && 0 <= ny && ny < n && grid[nx][ny] == originalColor) {
				isBorder = true
			} else if !vis[nx][ny] {
				vis[nx][ny] = true
				dfs(nx, ny)
			}
		}
		if isBorder {
			borders = append(borders, point{x, y})
		}
	}
	dfs(row, col)

	for _, p := range borders {
		grid[p.x][p.y] = color
	}
	return grid
}

// @lc code=end
