/*
 * @lc app=leetcode.cn id=2850 lang=typescript
 *
 * [2850] 将石头分散到网格图的最少移动次数
 *
 * https://leetcode.cn/problems/minimum-moves-to-spread-stones-over-grid/description/
 *
 * algorithms
 * Medium (44.72%)
 * Likes:    47
 * Dislikes: 0
 * Total Accepted:    8.7K
 * Total Submissions: 16.8K
 * Testcase Example:  '[[1,1,0],[1,1,1],[1,2,1]]'
 *
 * 给你一个大小为 3 * 3 ，下标从 0 开始的二维整数矩阵 grid ，分别表示每一个格子里石头的数目。网格图中总共恰好有 9
 * 个石头，一个格子里可能会有 多个 石头。
 *
 * 每一次操作中，你可以将一个石头从它当前所在格子移动到一个至少有一条公共边的相邻格子。
 *
 * 请你返回每个格子恰好有一个石头的 最少移动次数 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：grid = [[1,1,0],[1,1,1],[1,2,1]]
 * 输出：3
 * 解释：让每个格子都有一个石头的一个操作序列为：
 * 1 - 将一个石头从格子 (2,1) 移动到 (2,2) 。
 * 2 - 将一个石头从格子 (2,2) 移动到 (1,2) 。
 * 3 - 将一个石头从格子 (1,2) 移动到 (0,2) 。
 * 总共需要 3 次操作让每个格子都有一个石头。
 * 让每个格子都有一个石头的最少操作次数为 3 。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：grid = [[1,3,0],[1,0,0],[1,0,3]]
 * 输出：4
 * 解释：让每个格子都有一个石头的一个操作序列为：
 * 1 - 将一个石头从格子 (0,1) 移动到 (0,2) 。
 * 2 - 将一个石头从格子 (0,1) 移动到 (1,1) 。
 * 3 - 将一个石头从格子 (2,2) 移动到 (1,2) 。
 * 4 - 将一个石头从格子 (2,2) 移动到 (2,1) 。
 * 总共需要 4 次操作让每个格子都有一个石头。
 * 让每个格子都有一个石头的最少操作次数为 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * grid.length == grid[i].length == 3
 * 0 <= grid[i][j] <= 9
 * grid 中元素之和为 9 。
 *
 *
 */

// @lc code=start
// bfs cv
function minimumMoves(grid: number[][]): number {
  const more: number[][] = [];
  const less: number[][] = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] > 1) {
        for (let k = 0; k < grid[i][j] - 1; k++) {
          more.push([i, j]);
        }
      } else if (grid[i][j] === 0) {
        less.push([i, j]);
      }
    }
  }
  let res = Infinity;
  do {
    let steps = 0;
    for (let i = 0; i < more.length; i++) {
      steps +=
        Math.abs(less[i][0] - more[i][0]) + Math.abs(less[i][1] - more[i][1]);
    }
    res = Math.min(res, steps);
  } while (nextPermutation(more));

  return res;

  function isLess(a: number[], b: number[]): boolean {
    return a[0] < b[0] || (a[0] === b[0] && a[1] < b[1]);
  }

  function nextPermutation(arr: number[][]): boolean {
    let p = -1;
    for (let i = 0; i < arr.length - 1; i++) {
      if (isLess(arr[i], arr[i + 1])) {
        p = i;
      }
    }
    if (p === -1) {
      return false;
    }
    let q = -1;
    for (let j = p + 1; j < arr.length; j++) {
      if (isLess(arr[p], arr[j])) {
        q = j;
      }
    }
    [arr[p], arr[q]] = [arr[q], arr[p]];
    let i = p + 1;
    let j = arr.length - 1;
    while (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
      j--;
    }
    return true;
  }
}
// @lc code=end
