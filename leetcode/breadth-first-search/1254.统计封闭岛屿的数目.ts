/*
 * @lc app=leetcode.cn id=1254 lang=typescript
 *
 * [1254] 统计封闭岛屿的数目
 *
 * https://leetcode.cn/problems/number-of-closed-islands/description/
 *
 * algorithms
 * Medium (62.37%)
 * Likes:    226
 * Dislikes: 0
 * Total Accepted:    51.4K
 * Total Submissions: 80.7K
 * Testcase Example:  '[[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]'
 *
 * 二维矩阵 grid 由 0 （土地）和 1 （水）组成。岛是由最大的4个方向连通的 0 组成的群，封闭岛是一个 完全 由1包围（左、上、右、下）的岛。
 *
 * 请返回 封闭岛屿 的数目。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid =
 * [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
 * 输出：2
 * 解释：
 * 灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
 * 输出：1
 *
 *
 * 示例 3：
 *
 *
 * 输入：grid = [[1,1,1,1,1,1,1],
 * [1,0,0,0,0,0,1],
 * [1,0,1,1,1,0,1],
 * [1,0,1,0,1,0,1],
 * [1,0,1,1,1,0,1],
 * [1,0,0,0,0,0,1],
 * ⁠            [1,1,1,1,1,1,1]]
 * 输出：2
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= grid.length, grid[0].length <= 100
 * 0 <= grid[i][j] <=1
 *
 *
 */

// @lc code=start
// bfs
function closedIsland(grid: number[][]): number {
  const DIR = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  const m = grid.length;
  const n = grid[0].length;
  let res = 0;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        const queue: number[][] = [];
        grid[i][j] = 1;
        let closed = true;

        queue.push([i, j]);
        while (queue.length) {
          const [cx, cy] = queue.shift()!;
          if (cx === 0 || cy === 0 || cx === m - 1 || cy === n - 1) {
            closed = false;
          }
          for (let d = 0; d < 4; d++) {
            const nx = cx + DIR[d][0];
            const ny = cy + DIR[d][1];
            if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] === 0) {
              grid[nx][ny] = 1;
              queue.push([nx, ny]);
            }
          }
        }
        if (closed) {
          res++;
        }
      }
    }
  }
  return res;
}
// @lc code=end
