/*
 * @lc app=leetcode.cn id=994 lang=typescript
 *
 * [994] 腐烂的橘子
 *
 * https://leetcode.cn/problems/rotting-oranges/description/
 *
 * algorithms
 * Medium (51.34%)
 * Likes:    859
 * Dislikes: 0
 * Total Accepted:    173.4K
 * Total Submissions: 335.2K
 * Testcase Example:  '[[2,1,1],[1,1,0],[0,1,1]]'
 *
 * 在给定的 m x n 网格 grid 中，每个单元格可以有以下三个值之一：
 *
 *
 * 值 0 代表空单元格；
 * 值 1 代表新鲜橘子；
 * 值 2 代表腐烂的橘子。
 *
 *
 * 每分钟，腐烂的橘子 周围 4 个方向上相邻 的新鲜橘子都会腐烂。
 *
 * 返回 直到单元格中没有新鲜橘子为止所必须经过的最小分钟数。如果不可能，返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[2,1,1],[1,1,0],[0,1,1]]
 * 输出：4
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[2,1,1],[0,1,1],[1,0,1]]
 * 输出：-1
 * 解释：左下角的橘子（第 2 行， 第 0 列）永远不会腐烂，因为腐烂只会发生在 4 个方向上。
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[0,2]]
 * 输出：0
 * 解释：因为 0 分钟时已经没有新鲜橘子了，所以答案就是 0 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10
 * grid[i][j] 仅为 0、1 或 2
 *
 *
 */

// @lc code=start
function orangesRotting(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const DIRS = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const queue: number[] = [];
  const depth = new Map();

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 2) {
        const code = i * n + j;
        queue.push(code);
        depth.set(code, 0);
      }
    }
  }

  let res = 0;
  while (queue.length) {
    const code = queue.shift()!;
    const i = Math.floor(code / n);
    const j = code % n;
    for (let k = 0; k < 4; k++) {
      const ni = i + DIRS[k][0];
      const nj = j + DIRS[k][1];
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {
        grid[ni][nj] = 2;
        const newCode = ni * n + nj;
        queue.push(newCode);
        depth.set(newCode, depth.get(code)! + 1);
        res = depth.get(newCode);
      }
    }
  }

  const freshOrange = grid.flat().filter((v) => v === 1).length;
  return freshOrange === 0 ? res : -1;
}
// @lc code=end
