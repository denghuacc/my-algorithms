/*
 * @lc app=leetcode.cn id=1001 lang=typescript
 *
 * [1001] 网格照明
 *
 * https://leetcode-cn.com/problems/grid-illumination/description/
 *
 * algorithms
 * Hard (30.12%)
 * Likes:    62
 * Dislikes: 0
 * Total Accepted:    4.2K
 * Total Submissions: 11.1K
 * Testcase Example:  '5\n[[0,0],[4,4]]\n[[1,1],[1,0]]'
 *
 * 在大小为 n x n 的网格 grid 上，每个单元格都有一盏灯，最初灯都处于 关闭 状态。
 *
 * 给你一个由灯的位置组成的二维数组 lamps ，其中 lamps[i] = [rowi, coli] 表示 打开 位于 grid[rowi][coli]
 * 的灯。即便同一盏灯可能在 lamps 中多次列出，不会影响这盏灯处于 打开 状态。
 *
 * 当一盏灯处于打开状态，它将会照亮 自身所在单元格 以及同一 行 、同一 列 和两条 对角线 上的 所有其他单元格 。
 *
 * 另给你一个二维数组 queries ，其中 queries[j] = [rowj, colj] 。对于第 j 个查询，如果单元格 [rowj,
 * colj] 是被照亮的，则查询结果为 1 ，否则为 0 。在第 j 次查询之后 [按照查询的顺序] ，关闭 位于单元格 grid[rowj][colj]
 * 上及相邻 8 个方向上（与单元格 grid[rowi][coli] 共享角或边）的任何灯。
 *
 * 返回一个整数数组 ans 作为答案， ans[j] 应等于第 j 次查询 queries[j] 的结果，1 表示照亮，0 表示未照亮。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,0]]
 * 输出：[1,0]
 * 解释：最初所有灯都是关闭的。在执行查询之前，打开位于 [0, 0] 和 [4, 4] 的灯。第 0 次查询检查 grid[1][1]
 * 是否被照亮（蓝色方框）。该单元格被照亮，所以 ans[0] = 1 。然后，关闭红色方框中的所有灯。
 *
 * 第 1 次查询检查 grid[1][0] 是否被照亮（蓝色方框）。该单元格没有被照亮，所以 ans[1] = 0 。然后，关闭红色矩形中的所有灯。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 5, lamps = [[0,0],[4,4]], queries = [[1,1],[1,1]]
 * 输出：[1,1]
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 5, lamps = [[0,0],[0,4]], queries = [[0,4],[0,1],[1,4]]
 * 输出：[1,1,0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^9
 * 0 <= lamps.length <= 20000
 * 0 <= queries.length <= 20000
 * lamps[i].length == 2
 * 0 <= rowi, coli < n
 * queries[j].length == 2
 * 0 <= rowj, colj < n
 *
 *
 */

// @lc code=start
// hash table
function gridIllumination(
  n: number,
  lamps: number[][],
  queries: number[][]
): number[] {
  const row = new Map<number, number>();
  const col = new Map<number, number>();
  const diagonals = new Map<number, number>();
  const antiDiagonals = new Map<number, number>();
  const points = new Set<string>();

  for (const lamp of lamps) {
    if (points.has(lamp.join(","))) {
      continue;
    }
    points.add(lamp.join(","));
    row.set(lamp[0], (row.get(lamp[0]) ?? 0) + 1);
    col.set(lamp[1], (col.get(lamp[1]) ?? 0) + 1);
    diagonals.set(
      lamp[0] - lamp[1],
      (diagonals.get(lamp[0] - lamp[1]) ?? 0) + 1
    );
    antiDiagonals.set(
      lamp[0] + lamp[1],
      (antiDiagonals.get(lamp[0] + lamp[1]) ?? 0) + 1
    );
  }

  const res = new Array(queries.length).fill(0);
  for (const [i, [r, c]] of queries.entries()) {
    if (
      row.get(r)! > 0 ||
      col.get(c)! > 0 ||
      diagonals.get(r - c)! > 0 ||
      antiDiagonals.get(r + c)! > 0
    ) {
      res[i] = 1;
    }
    for (let x = r - 1; x < r + 2; x++) {
      for (let y = c - 1; y < c + 2; y++) {
        if (x < 0 || x >= n || y < 0 || y >= n || !points.has(`${x},${y}`)) {
          continue;
        }
        points.delete([x, y].join(","));
        row.set(x, (row.get(x) ?? 0) - 1);
        col.set(y, (col.get(y) ?? 0) - 1);
        diagonals.set(x - y, (diagonals.get(x - y) ?? 0) - 1);
        antiDiagonals.set(x + y, (antiDiagonals.get(x + y) ?? 0) - 1);
      }
    }
  }
  return res;
}
// @lc code=end
