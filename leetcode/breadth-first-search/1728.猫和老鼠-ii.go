/*
 * @lc app=leetcode.cn id=1728 lang=golang
 *
 * [1728] 猫和老鼠 II
 *
 * https://leetcode.cn/problems/cat-and-mouse-ii/description/
 *
 * algorithms
 * Hard (59.14%)
 * Likes:    66
 * Dislikes: 0
 * Total Accepted:    4.4K
 * Total Submissions: 7.5K
 * Testcase Example:  '["####F","#C...","M...."]\n1\n2'
 *
 * 一只猫和一只老鼠在玩一个叫做猫和老鼠的游戏。
 *
 * 它们所处的环境设定是一个 rows x cols 的方格 grid ，其中每个格子可能是一堵墙、一块地板、一位玩家（猫或者老鼠）或者食物。
 *
 *
 * 玩家由字符 'C' （代表猫）和 'M' （代表老鼠）表示。
 * 地板由字符 '.' 表示，玩家可以通过这个格子。
 * 墙用字符 '#' 表示，玩家不能通过这个格子。
 * 食物用字符 'F' 表示，玩家可以通过这个格子。
 * 字符 'C' ， 'M' 和 'F' 在 grid 中都只会出现一次。
 *
 *
 * 猫和老鼠按照如下规则移动：
 *
 *
 * 老鼠 先移动 ，然后两名玩家轮流移动。
 * 每一次操作时，猫和老鼠可以跳到上下左右四个方向之一的格子，他们不能跳过墙也不能跳出 grid 。
 * catJump 和 mouseJump 是猫和老鼠分别跳一次能到达的最远距离，它们也可以跳小于最大距离的长度。
 * 它们可以停留在原地。
 * 老鼠可以跳跃过猫的位置。
 *
 *
 * 游戏有 4 种方式会结束：
 *
 *
 * 如果猫跟老鼠处在相同的位置，那么猫获胜。
 * 如果猫先到达食物，那么猫获胜。
 * 如果老鼠先到达食物，那么老鼠获胜。
 * 如果老鼠不能在 1000 次操作以内到达食物，那么猫获胜。
 *
 *
 * 给你 rows x cols 的矩阵 grid 和两个整数 catJump 和 mouseJump ，双方都采取最优策略，如果老鼠获胜，那么请你返回
 * true ，否则返回 false 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = ["####F","#C...","M...."], catJump = 1, mouseJump = 2
 * 输出：true
 * 解释：猫无法抓到老鼠，也没法比老鼠先到达食物。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：grid = ["M.C...F"], catJump = 1, mouseJump = 4
 * 输出：true
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = ["M.C...F"], catJump = 1, mouseJump = 3
 * 输出：false
 *
 *
 * 示例 4：
 *
 *
 * 输入：grid = ["C...#","...#F","....#","M...."], catJump = 2, mouseJump = 5
 * 输出：false
 *
 *
 * 示例 5：
 *
 *
 * 输入：grid = [".M...","..#..","#..#.","C#.#.","...#F"], catJump = 3, mouseJump
 * = 1
 * 输出：true
 *
 *
 *
 *
 * 提示：
 *
 *
 * rows == grid.length
 * cols = grid[i].length
 * 1
 * grid[i][j] 只包含字符 'C' ，'M' ，'F' ，'.' 和 '#' 。
 * grid 中只包含一个 'C' ，'M' 和 'F' 。
 * 1
 *
 *
 */

package leetcode

// @lc code=start
const (
	MouseTurn = 0
	CatTurn   = 1
	UNKNOWN   = 0
	MouseWin  = 1
	CatWin    = 2
	MaxMoves  = 1000
)

var dirs = []struct{ x, y int }{{-1, 0}, {1, 0}, {0, -1}, {0, 1}}

func canMouseWin(grid []string, catJump int, mouseJump int) bool {
	rows, cols := len(grid), len(grid[0])
	getPos := func(row, col int) int { return row*cols + col }
	var startMouse, startCat, food int
	for i, row := range grid {
		for j, ch := range row {
			if ch == 'M' {
				startMouse = getPos(i, j)
			} else if ch == 'C' {
				startCat = getPos(i, j)
			} else if ch == 'F' {
				food = getPos(i, j)
			}
		}
	}

	// 计算每个状态的度
	total := rows * cols
	degrees := [64][64][2]int{}
	for mouse := 0; mouse < total; mouse++ {
		mouseRow := mouse / cols
		mouseCol := mouse % cols
		if grid[mouseRow][mouseCol] == '#' {
			continue
		}
		for cat := 0; cat < total; cat++ {
			catRow := cat / cols
			catCol := cat % cols
			if grid[catRow][catCol] == '#' {
				continue
			}
			degrees[mouse][cat][MouseTurn]++
			degrees[mouse][cat][CatTurn]++
			for _, dir := range dirs {
				for row, col, jump := mouseRow+dir.x, mouseCol+dir.y, 1; row >= 0 && row < rows && col >= 0 && col < cols && grid[row][col] != '#' && jump <= mouseJump; jump++ {
					nextMouse := getPos(row, col)
					nextCat := getPos(catRow, catCol)
					degrees[nextMouse][nextCat][MouseTurn]++
					row += dir.x
					col += dir.y
				}
				for row, col, jump := catRow+dir.x, catCol+dir.y, 1; row >= 0 && row < rows && col >= 0 && col < cols && grid[row][col] != '#' && jump <= catJump; jump++ {
					nextMouse := getPos(mouseRow, mouseCol)
					nextCat := getPos(row, col)
					degrees[nextMouse][nextCat][CatTurn]++
					row += dir.x
					col += dir.y
				}
			}
		}
	}

	results := [64][64][2][2]int{}
	type state struct{ mouse, cat, turn int }
	q := []state{}

	// 猫和老鼠在同一个单元格，猫获胜
	for pos := 0; pos < total; pos++ {
		row := pos / cols
		col := pos % cols
		if grid[row][col] == '#' {
			continue
		}
		results[pos][pos][MouseTurn][0] = CatWin
		results[pos][pos][MouseTurn][1] = 0
		results[pos][pos][CatTurn][0] = CatWin
		results[pos][pos][CatTurn][1] = 0
		q = append(q, state{pos, pos, MouseTurn}, state{pos, pos, CatTurn})
	}

	// 猫和食物在同一个单元格，猫获胜
	for mouse := 0; mouse < total; mouse++ {
		mouseRow := mouse / cols
		mouseCol := mouse % cols
		if grid[mouseRow][mouseCol] == '#' || mouse == food {
			continue
		}
		results[mouse][food][MouseTurn][0] = CatWin
		results[mouse][food][MouseTurn][1] = 0
		results[mouse][food][CatTurn][0] = CatWin
		results[mouse][food][CatTurn][1] = 0
		q = append(q, state{mouse, food, MouseTurn}, state{mouse, food, CatTurn})
	}

	// 老鼠和食物在同一个单元格且猫和食物不在同一个单元格，老鼠获胜
	for cat := 0; cat < total; cat++ {
		catRow := cat / cols
		catCol := cat % cols
		if grid[catRow][catCol] == '#' || cat == food {
			continue
		}
		results[food][cat][MouseTurn][0] = MouseWin
		results[food][cat][MouseTurn][1] = 0
		results[food][cat][CatTurn][0] = MouseWin
		results[food][cat][CatTurn][1] = 0
		q = append(q, state{food, cat, MouseTurn}, state{food, cat, CatTurn})
	}

	getPrevStates := func(mouse, cat, turn int) []state {
		mouseRow := mouse / cols
		mouseCol := mouse % cols
		catRow := cat / cols
		catCol := cat % cols
		prevTurn := MouseTurn
		if turn == MouseTurn {
			prevTurn = CatTurn
		}
		maxJump, startRow, startCol := catJump, catRow, catCol
		if prevTurn == MouseTurn {
			maxJump, startRow, startCol = mouseJump, mouseRow, mouseCol
		}
		prevStates := []state{{mouse, cat, prevTurn}}
		for _, dir := range dirs {
			for i, j, jump := startRow+dir.x, startCol+dir.y, 1; i >= 0 && i < rows && j >= 0 && j < cols && grid[i][j] != '#' && jump <= maxJump; jump++ {
				prevMouseRow := mouseRow
				prevMouseCol := mouseCol
				prevCatRow := i
				prevCatCol := j
				if prevTurn == MouseTurn {
					prevMouseRow = i
					prevMouseCol = j
					prevCatRow = catRow
					prevCatCol = catCol
				}
				prevMouse := getPos(prevMouseRow, prevMouseCol)
				prevCat := getPos(prevCatRow, prevCatCol)
				prevStates = append(prevStates, state{prevMouse, prevCat, prevTurn})
				i += dir.x
				j += dir.y
			}
		}
		return prevStates
	}

	// 拓扑排序
	for len(q) > 0 {
		s := q[0]
		q = q[1:]
		mouse, cat, turn := s.mouse, s.cat, s.turn
		result := results[mouse][cat][turn][0]
		moves := results[mouse][cat][turn][1]
		for _, s := range getPrevStates(mouse, cat, turn) {
			prevMouse, prevCat, prevTurn := s.mouse, s.cat, s.turn
			if results[prevMouse][prevCat][prevTurn][0] == UNKNOWN {
				canWin := result == MouseWin && prevTurn == MouseTurn || result == CatWin && prevTurn == CatTurn
				if canWin {
					results[prevMouse][prevCat][prevTurn][0] = result
					results[prevMouse][prevCat][prevTurn][1] = moves + 1
					q = append(q, state{prevMouse, prevCat, prevTurn})
				} else {
					degrees[prevMouse][prevCat][prevTurn]--
					if degrees[prevMouse][prevCat][prevTurn] == 0 {
						loseResult := MouseWin
						if prevTurn == MouseTurn {
							loseResult = CatWin
						}
						results[prevMouse][prevCat][prevTurn][0] = loseResult
						results[prevMouse][prevCat][prevTurn][1] = moves + 1
						q = append(q, state{prevMouse, prevCat, prevTurn})
					}
				}
			}
		}
	}
	return results[startMouse][startCat][MouseTurn][0] == MouseWin && results[startMouse][startCat][MouseTurn][1] <= MaxMoves
}

// @lc code=end
