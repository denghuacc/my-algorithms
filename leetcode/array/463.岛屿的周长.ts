/*
 * @lc app=leetcode.cn id=463 lang=typescript
 *
 * [463] 岛屿的周长
 *
 * https://leetcode-cn.com/problems/island-perimeter/description/
 *
 * algorithms
 * Easy (68.42%)
 * Likes:    285
 * Dislikes: 0
 * Total Accepted:    29.6K
 * Total Submissions: 42.6K
 * Testcase Example:  '[[0,1,0,0],[1,1,1,0],[0,1,0,0],[1,1,0,0]]'
 *
 * 给定一个包含 0 和 1 的二维网格地图，其中 1 表示陆地 0 表示水域。
 *
 * 网格中的格子水平和垂直方向相连（对角线方向不相连）。整个网格被水完全包围，但其中恰好有一个岛屿（或者说，一个或多个表示陆地的格子相连组成的岛屿）。
 *
 * 岛屿中没有“湖”（“湖” 指水域在岛屿内部且不和岛屿周围的水相连）。格子是边长为 1 的正方形。网格为长方形，且宽度和高度均不超过 100
 * 。计算这个岛屿的周长。
 *
 *
 *
 * 示例 :
 *
 * 输入:
 * [[0,1,0,0],
 * ⁠[1,1,1,0],
 * ⁠[0,1,0,0],
 * ⁠[1,1,0,0]]
 *
 * 输出: 16
 *
 * 解释: 它的周长是下面图片中的 16 个黄色的边：
 *
 *
 *
 *
 */

// @lc code=start
// iterative
var islandPerimeter = function (grid: number[][]): number {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const n = grid.length;
  const m = grid[0].length;
  let ret = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j]) {
        let count = 0;
        for (let k = 0; k < dx.length; k++) {
          const tx = i + dx[k];
          const ty = j + dy[k];
          if (tx < 0 || tx >= n || ty < 0 || ty >= m || !grid[tx][ty]) {
            count += 1;
          }
        }
        ret += count;
      }
    }
  }
  return ret;
};

// dfs
// Maximum call stack size exceeded
var islandPerimeter = function (grid: number[][]): number {
  const dx = [0, 1, 0, -1];
  const dy = [1, 0, -1, 0];
  const n = grid.length;
  const m = grid[0].length;

  let ret = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] === 1) {
        ret += dfs(i, j);
      }
    }
  }
  return ret;

  function dfs(x: number, y: number): number {
    if (x < 0 || x >= n || y < 0 || y >= m || grid[x][y] === 0) return 1;
    if (grid[x][y] === 2) return 0;
    grid[x][y] === 2;
    let ret = 0;
    for (let i = 0; i < dx.length; i++) {
      const tx = x + dx[i];
      const ty = y + dy[i];
      ret += dfs(tx, ty);
    }
    return ret;
  }
};
// @lc code=end
