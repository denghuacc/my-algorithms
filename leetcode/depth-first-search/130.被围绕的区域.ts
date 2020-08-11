/*
 * @lc app=leetcode.cn id=130 lang=typescript
 *
 * [130] 被围绕的区域
 *
 * https://leetcode-cn.com/problems/surrounded-regions/description/
 *
 * algorithms
 * Medium (34.21%)
 * Likes:    259
 * Dislikes: 0
 * Total Accepted:    42.2K
 * Total Submissions: 104.5K
 * Testcase Example:  '[["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]'
 *
 * 给定一个二维的矩阵，包含 'X' 和 'O'（字母 O）。
 *
 * 找到所有被 'X' 围绕的区域，并将这些区域里所有的 'O' 用 'X' 填充。
 *
 * 示例:
 *
 * X X X X
 * X O O X
 * X X O X
 * X O X X
 *
 *
 * 运行你的函数后，矩阵变为：
 *
 * X X X X
 * X X X X
 * X X X X
 * X O X X
 *
 *
 * 解释:
 *
 * 被围绕的区间不会存在于边界上，换句话说，任何边界上的 'O' 都不会被填充为 'X'。 任何不在边界上，或不与边界上的 'O' 相连的 'O'
 * 最终都会被填充为 'X'。如果两个元素在水平或垂直方向相邻，则称它们是“相连”的。
 *
 */

// 解题思路
// 找到边缘上的`O` 把它替换成特殊的符号 `#`
// 并且把它周围的 `O` 也替换成 `#`
// 然后哪些没有被替换成 `#` 的 `O` 就是被围绕的，全部替换成 `X`
// 最后把 `#` 还原成 `O`

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
// dfs
var solve = function (board: string[][]): void {
  const m = board.length;
  const n = m && board[0].length;
  if (m === 0) return;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 判断是否处于边缘位置
      const isEdge = i === 0 || j === 0 || i === m - 1 || j === n - 1;
      if (isEdge && board[i][j] === "O") {
        dfs(board, i, j);
      }
    }
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 非边缘位置的 `O` 变成 `X`
      if (board[i][j] === "O") board[i][j] = "X";
      // 边缘位置的 `#` 还原成 `O`
      if (board[i][j] === "#") board[i][j] = "O";
    }
  }

  // 把边缘位置的 `O` 及其四周都改成 `#`
  function dfs(board: string[][], i: number, j: number) {
    if (
      i < 0 ||
      j < 0 ||
      i >= m ||
      j >= n ||
      board[i][j] === "X" ||
      board[i][j] === "#"
    ) {
      return;
    }

    board[i][j] = "#";
    dfs(board, i - 1, j); // 上
    dfs(board, i + 1, j); // 下
    dfs(board, i, j - 1); // 左
    dfs(board, i, j + 1); // 右
  }
};

// bfs
var solve = function (board: string[][]): void {
  const dx = [1, -1, 0, 0];
  const dy = [0, 0, 1, -1];
  const n = board.length;
  if (n === 0) return;
  const m = board[0].length;
  const queue: [number, number][] = [];

  // 标记边缘 `O`
  for (let i = 0; i < n; i++) {
    if (board[i][0] === "O") queue.push([i, 0]);
    if (board[i][m - 1] === "O") queue.push([i, m - 1]);
  }

  for (let i = 1; i < m - 1; i++) {
    if (board[0][i] === "O") queue.push([0, i]);
    if (board[n - 1][i] === "O") queue.push([n - 1, i]);
  }

  while (queue.length) {
    const [x, y] = queue.shift()!;
    board[x][y] = "#";

    for (let i = 0; i < dx.length; i++) {
      const mx = x + dx[i];
      const my = y + dy[i];
      if (mx < 0 || my < 0 || mx >= n || my >= m || board[mx][my] !== "O") {
        continue;
      }
      queue.push([mx, my]);
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (board[i][j] === "#") {
        board[i][j] = "O";
      } else if (board[i][j] === "O") {
        board[i][j] = "X";
      }
    }
  }
};
// @lc code=end
