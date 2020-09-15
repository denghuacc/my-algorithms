/*
 * @lc app=leetcode.cn id=980 lang=typescript
 *
 * [980] 不同路径 III
 *
 * https://leetcode-cn.com/problems/unique-paths-iii/description/
 *
 * algorithms
 * Hard (71.52%)
 * Likes:    91
 * Dislikes: 0
 * Total Accepted:    7.8K
 * Total Submissions: 10.9K
 * Testcase Example:  '[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]'
 *
 * 在二维网格 grid 上，有 4 种类型的方格：
 *
 *
 * 1 表示起始方格。且只有一个起始方格。
 * 2 表示结束方格，且只有一个结束方格。
 * 0 表示我们可以走过的空方格。
 * -1 表示我们无法跨越的障碍。
 *
 *
 * 返回在四个方向（上、下、左、右）上行走时，从起始方格到结束方格的不同路径的数目。
 *
 * 每一个无障碍方格都要通过一次，但是一条路径中不能重复通过同一个方格。
 *
 *
 *
 * 示例 1：
 *
 * 输入：[[1,0,0,0],[0,0,0,0],[0,0,2,-1]]
 * 输出：2
 * 解释：我们有以下两条路径：
 * 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2)
 * 2. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2)
 *
 * 示例 2：
 *
 * 输入：[[1,0,0,0],[0,0,0,0],[0,0,0,2]]
 * 输出：4
 * 解释：我们有以下四条路径：
 * 1. (0,0),(0,1),(0,2),(0,3),(1,3),(1,2),(1,1),(1,0),(2,0),(2,1),(2,2),(2,3)
 * 2. (0,0),(0,1),(1,1),(1,0),(2,0),(2,1),(2,2),(1,2),(0,2),(0,3),(1,3),(2,3)
 * 3. (0,0),(1,0),(2,0),(2,1),(2,2),(1,2),(1,1),(0,1),(0,2),(0,3),(1,3),(2,3)
 * 4. (0,0),(1,0),(2,0),(2,1),(1,1),(0,1),(0,2),(0,3),(1,3),(1,2),(2,2),(2,3)
 *
 * 示例 3：
 *
 * 输入：[[0,1],[2,0]]
 * 输出：0
 * 解释：
 * 没有一条路能完全穿过每一个空的方格一次。
 * 请注意，起始和结束方格可以位于网格中的任意位置。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= grid.length * grid[0].length <= 20
 *
 *
 */

// @lc code=start

// backtracking
var uniquePathsIII = function (grid: number[][]): number {
  const R = grid.length;
  const C = grid[0].length;
  let todo = 0;
  let startRow = 0;
  let startCol = 0;
  let endRow = 0;
  let endCol = 0;
  let ret = 0;
  const dirRow = [0, -1, 0, 1];
  const dirCol = [1, 0, -1, 0];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] !== -1) {
        todo++;
      }
      if (grid[r][c] === 1) {
        startRow = r;
        startCol = c;
      } else if (grid[r][c] === 2) {
        endRow = r;
        endCol = c;
      }
    }
  }

  dfs(startRow, startCol, todo);
  return ret;

  function dfs(r: number, c: number, todo: number) {
    todo--;
    if (todo < 0) return;
    if (r === endRow && c === endCol) {
      if (todo === 0) ret++;
      return;
    }

    grid[r][c] = 3;
    for (let k = 0; k < dirRow.length; k++) {
      const newRow = r + dirRow[k];
      const newCol = c + dirCol[k];

      if (inArea(newRow, newCol) && grid[newRow][newCol] % 2 === 0) {
        dfs(newRow, newCol, todo);
      }
    }
    grid[r][c] = 0; // 回退
  }

  function inArea(r: number, c: number): boolean {
    return r >= 0 && r < R && c >= 0 && c < C;
  }
};

// dp
var uniquePathsIII = function (grid: number[][]): number {
  const R = grid.length;
  const C = grid[0].length;
  let target = 0;
  // memo[r][c][todo]
  const memo: number[][][] = Array.from(new Array(R), () =>
    Array.from(new Array(C), () => new Array(1 << (R * C)).fill(0))
  );
  let startRow = 0;
  let startCol = 0;
  let endRow = 0;
  let endCol = 0;
  const dirRow = [0, -1, 0, 1];
  const dirCol = [1, 0, -1, 0];

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c] % 2 === 0) {
        target |= code(r, c);
      }
      if (grid[r][c] === 1) {
        startRow = r;
        startCol = c;
      } else if (grid[r][c] === 2) {
        endRow = r;
        endCol = c;
      }
    }
  }

  return dpf(startRow, startCol, target);

  function code(r: number, c: number): number {
    return 1 << (r * C + c);
  }

  function dpf(r: number, c: number, todo: number): number {
    if (memo[r][c][todo]) {
      return memo[r][c][todo];
    }

    if (r === endRow && c === endCol) {
      return todo === 0 ? 1 : 0;
    }

    let ret = 0;
    for (let k = 0; k < dirRow.length; k++) {
      const newRow = r + dirRow[k];
      const newCol = c + dirCol[k];

      if (inArea(newRow, newCol)) {
        if ((todo & code(newRow, newCol)) !== 0) {
          ret += dpf(newRow, newCol, todo ^ code(newRow, newCol));
        }
      }
    }
    memo[r][c][todo] = ret;
    return ret;
  }

  function inArea(r: number, c: number): boolean {
    return r >= 0 && r < R && c >= 0 && c < C;
  }
};
// @lc code=end
