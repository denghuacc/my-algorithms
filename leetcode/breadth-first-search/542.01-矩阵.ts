/*
 * @lc app=leetcode.cn id=542 lang=typescript
 *
 * [542] 01 矩阵
 *
 * https://leetcode.cn/problems/01-matrix/description/
 *
 * algorithms
 * Medium (46.38%)
 * Likes:    770
 * Dislikes: 0
 * Total Accepted:    118.2K
 * Total Submissions: 254.8K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。
 *
 * 两个相邻元素间的距离为 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：[[0,0,0],[0,1,0],[0,0,0]]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
 * 输出：[[0,0,0],[0,1,0],[1,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1
 * 1
 * mat[i][j] is either 0 or 1.
 * mat 中至少有一个 0
 *
 *
 */

// @lc code=start
// bfs
function updateMatrix(mat: number[][]): number[][] {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const m = mat.length;
  const n = mat[0].length;

  const res: number[][] = Array.from(new Array(m), () => new Array(n).fill(0));
  const visited: boolean[][] = Array.from(new Array(m), () =>
    new Array(n).fill(false)
  );
  const queue: [number, number][] = [];
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
        visited[i][j] = true;
      }
    }
  }
  while (queue.length) {
    const [i, j] = queue.shift()!;
    for (const [x, y] of dirs) {
      const ni = i + x;
      const nj = j + y;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {
        res[ni][nj] = res[i][j] + 1;
        queue.push([ni, nj]);
        visited[ni][nj] = true;
      }
    }
  }
  return res;
}
// @lc code=end
