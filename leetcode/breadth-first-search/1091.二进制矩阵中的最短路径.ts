/*
 * @lc app=leetcode.cn id=1091 lang=typescript
 *
 * [1091] 二进制矩阵中的最短路径
 *
 * https://leetcode.cn/problems/shortest-path-in-binary-matrix/description/
 *
 * algorithms
 * Medium (38.73%)
 * Likes:    287
 * Dislikes: 0
 * Total Accepted:    67.3K
 * Total Submissions: 170.8K
 * Testcase Example:  '[[0,1],[1,0]]'
 *
 * 给你一个 n x n 的二进制矩阵 grid 中，返回矩阵中最短 畅通路径 的长度。如果不存在这样的路径，返回 -1 。
 *
 * 二进制矩阵中的 畅通路径 是一条从 左上角 单元格（即，(0, 0)）到 右下角 单元格（即，(n - 1, n -
 * 1)）的路径，该路径同时满足下述要求：
 *
 *
 * 路径途经的所有单元格都的值都是 0 。
 * 路径中所有相邻的单元格应当在 8 个方向之一 上连通（即，相邻两单元之间彼此不同且共享一条边或者一个角）。
 *
 *
 * 畅通路径的长度 是该路径途经的单元格总数。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[0,1],[1,0]]
 * 输出：2
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,0,0],[1,1,0],[1,1,0]]
 * 输出：4
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1,0,0],[1,1,0],[1,1,0]]
 * 输出：-1
 *
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
function shortestPathBinaryMatrix(grid: number[][]): number {
  if (grid[0][0] !== 0) {
    return -1;
  }
  const n = grid.length;
  const dist: number[][] = Array.from(new Array(n), () =>
    new Array(n).fill(Infinity)
  );
  dist[0][0] = 1;
  const queue: number[][] = [[0, 0]];
  while (queue.length) {
    const [x, y] = queue.shift()!;
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (x === n - 1 && y === n - 1) {
          return dist[x][y];
        }
        if (x + dx < 0 || x + dx >= n || y + dy < 0 || y + dy >= n) {
          continue;
        }
        if (
          grid[x + dx][y + dy] === 1 ||
          dist[x + dx][y + dy] <= dist[x][y] + 1
        ) {
          continue;
        }

        dist[x + dx][y + dy] = dist[x][y] + 1;
        queue.push([x + dx, y + dy]);
      }
    }
  }
  return -1;
}
// @lc code=end
