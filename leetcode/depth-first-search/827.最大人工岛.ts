/*
 * @lc app=leetcode.cn id=827 lang=typescript
 *
 * [827] 最大人工岛
 *
 * https://leetcode.cn/problems/making-a-large-island/description/
 *
 * algorithms
 * Hard (44.67%)
 * Likes:    246
 * Dislikes: 0
 * Total Accepted:    24.9K
 * Total Submissions: 55.7K
 * Testcase Example:  '[[1,0],[0,1]]'
 *
 * 给你一个大小为 n x n 二进制矩阵 grid 。最多 只能将一格 0 变成 1 。
 *
 * 返回执行此操作后，grid 中最大的岛屿面积是多少？
 *
 * 岛屿 由一组上、下、左、右四个方向相连的 1 形成。
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: grid = [[1, 0], [0, 1]]
 * 输出: 3
 * 解释: 将一格0变成1，最终连通两个小岛得到面积为 3 的岛屿。
 *
 *
 * 示例 2:
 *
 *
 * 输入: grid = [[1, 1], [1, 0]]
 * 输出: 4
 * 解释: 将一格0变成1，岛屿的面积扩大为 4。
 *
 * 示例 3:
 *
 *
 * 输入: grid = [[1, 1], [1, 1]]
 * 输出: 4
 * 解释: 没有0可以让我们变成1，面积依然为 4。
 *
 *
 *
 * 提示：
 *
 *
 * n == grid.length
 * n == grid[i].length
 * 1
 * grid[i][j] 为 0 或 1
 *
 *
 */

// @lc code=start
// dfs cv
function largestIsland(grid: number[][]): number {
  const DIR = [0, -1, 0, 1, 0];
  let res = 0;
  const n = grid.length;
  const tag = Array.from(new Array(n), () => new Array(n).fill(0));
  const area: Map<number, number> = new Map();
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 1 && tag[i][j] === 0) {
        const t = i * n + j + 1;
        area.set(t, dfs(i, j, t));
        res = Math.max(res, area.get(t)!);
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        let z = 1;
        const connected: Set<number> = new Set();
        for (let k = 0; k < 4; k++) {
          const x = i + DIR[k];
          const y = j + DIR[k + 1];
          if (
            !(x >= 0 && x < n && y >= 0 && y < n) ||
            tag[x][y] === 0 ||
            connected.has(tag[x][y])
          ) {
            continue;
          }
          z += area.get(tag[x][y])!;
          connected.add(tag[x][y]);
        }
        res = Math.max(res, z);
      }
    }
  }
  return res;

  function dfs(x: number, y: number, t: number): number {
    let res = 1;
    tag[x][y] = t;
    for (let i = 0; i < 4; i++) {
      const sx = x + DIR[i];
      const sy = y + DIR[i + 1];
      if (
        sx >= 0 &&
        sx < n &&
        sy >= 0 &&
        sy < n &&
        grid[sx][sy] === 1 &&
        tag[sx][sy] === 0
      ) {
        res += dfs(sx, sy, t);
      }
    }
    return res;
  }
}
// @lc code=end
