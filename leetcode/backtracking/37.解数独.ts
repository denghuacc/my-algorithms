/*
 * @lc app=leetcode.cn id=37 lang=typescript
 *
 * [37] 解数独
 *
 * https://leetcode-cn.com/problems/sudoku-solver/description/
 *
 * algorithms
 * Hard (49.81%)
 * Likes:    469
 * Dislikes: 0
 * Total Accepted:    33.6K
 * Total Submissions: 54.1K
 * Testcase Example:  '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]'
 *
 * 编写一个程序，通过已填充的空格来解决数独问题。
 *
 * 一个数独的解法需遵循如下规则：
 *
 *
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 *
 *
 * 空白格用 '.' 表示。
 *
 *
 *
 * 一个数独。
 *
 *
 *
 * 答案被标成红色。
 *
 * Note:
 *
 *
 * 给定的数独序列只包含数字 1-9 和字符 '.' 。
 * 你可以假设给定的数独只有唯一解。
 * 给定数独永远是 9x9 形式的。
 *
 *
 */

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
// backtracking
function solveSudoku(board: string[][]): void {
  let n = 3;
  let N = n * n;
  let sudokuSolved = false;

  const rows: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );
  const columns: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );
  const boxes: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const num = board[i][j];
      if (num !== ".") {
        const d = Number(num);
        placeNumber(d, i, j);
      }
    }
  }

  dfs(0, 0);

  function placeNumber(d: number, row: number, col: number) {
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    rows[row][d]++;
    columns[col][d]++;
    boxes[idx][d]++;
    board[row][col] = String(d);
  }

  function dfs(row: number, col: number) {
    if (board[row][col] === ".") {
      for (let d = 1; d < 10; d++) {
        if (couldPlace(d, row, col)) {
          placeNumber(d, row, col);
          placeNextNumber(row, col);
          if (!sudokuSolved) removeNumber(d, row, col);
        }
      }
    } else {
      placeNextNumber(row, col);
    }
  }

  function couldPlace(d: number, row: number, col: number): boolean {
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    return rows[row][d] + columns[col][d] + boxes[idx][d] === 0;
  }

  function placeNextNumber(row: number, col: number) {
    if (col === N - 1 && row === N - 1) {
      sudokuSolved = true;
    } else {
      if (col === N - 1) dfs(row + 1, 0);
      else dfs(row, col + 1);
    }
  }

  function removeNumber(d: number, row: number, col: number) {
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    rows[row][d]--;
    columns[col][d]--;
    boxes[idx][d]--;
    board[row][col] = ".";
  }
}
// @lc code=end
