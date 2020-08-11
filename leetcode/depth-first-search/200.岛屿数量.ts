/*
 * @lc app=leetcode.cn id=200 lang=typescript
 *
 * [200] 岛屿数量
 *
 * https://leetcode-cn.com/problems/number-of-islands/description/
 *
 * algorithms
 * Medium (49.90%)
 * Likes:    700
 * Dislikes: 0
 * Total Accepted:    140.2K
 * Total Submissions: 280.4K
 * Testcase Example:  '[["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]'
 *
 * 给你一个由 '1'（陆地）和 '0'（水）组成的的二维网格，请你计算网格中岛屿的数量。
 *
 * 岛屿总是被水包围，并且每座岛屿只能由水平方向或竖直方向上相邻的陆地连接形成。
 *
 * 此外，你可以假设该网格的四条边均被水包围。
 *
 *
 *
 * 示例 1:
 *
 * 输入:
 * [
 * ['1','1','1','1','0'],
 * ['1','1','0','1','0'],
 * ['1','1','0','0','0'],
 * ['0','0','0','0','0']
 * ]
 * 输出: 1
 *
 *
 * 示例 2:
 *
 * 输入:
 * [
 * ['1','1','0','0','0'],
 * ['1','1','0','0','0'],
 * ['0','0','1','0','0'],
 * ['0','0','0','1','1']
 * ]
 * 输出: 3
 * 解释: 每座岛屿只能由水平和/或竖直方向上相邻的陆地连接而成。
 *
 *
 */

// 解题思路
// 查找陆地`1`四周的地形，如果也是陆地`1`就把它变为水`0`
// 最后陆地`1`的数量就是岛屿的数量

// @lc code=start
// dfs
var numIslands = function (grid: string[][]): number {
  const n = grid.length;
  if (n === 0) return 0;
  const m = grid[0].length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        count++;
        dfs(grid, i, j);
      }
    }
  }

  return count;

  function dfs(grid: string[][], i: number, j: number) {
    if (i < 0 || j < 0 || i >= n || j >= m || grid[i][j] === "0") {
      return;
    }

    grid[i][j] = "0";
    dfs(grid, i - 1, j); // 上
    dfs(grid, i + 1, j); // 下
    dfs(grid, i, j - 1); // 左
    dfs(grid, i, j + 1); // 右
  }
};

// bfs
var numIslands = function (grid: string[][]): number {
  const n = grid.length;
  if (n === 0) return 0;
  const m = grid[0].length;
  let count = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === "1") {
        count++;
        grid[i][j] = "0";
        const queue: number[] = [];
        queue.push(i * m + j);
        while (queue.length) {
          const id = queue.shift()!;
          const row = Math.floor(id / m);
          const col = id % m;

          if (row - 1 >= 0 && grid[row - 1][col] === "1") {
            queue.push((row - 1) * m + col);
            grid[row - 1][col] = "0";
          }
          if (row + 1 < n && grid[row + 1][col] === "1") {
            queue.push((row + 1) * m + col);
            grid[row + 1][col] = "0";
          }
          if (col - 1 >= 0 && grid[row][col - 1] === "1") {
            queue.push(row * m + col - 1);
            grid[row][col - 1] = "0";
          }
          if (col + 1 < m && grid[row][col + 1] === "1") {
            queue.push(row * m + col + 1);
            grid[row][col + 1] = "0";
          }
        }
      }
    }
  }

  return count;
};
// @lc code=end
