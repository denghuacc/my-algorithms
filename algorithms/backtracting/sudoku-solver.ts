// 数独解题器
// 数独是一个非常有趣的解谜游戏，也是史上最流行的游戏之一。
// 目标是用数字 1～9 填满一个 9 × 9 的矩阵，要求每行和每列都由这九个数字构成。
// 矩阵还包含了小方块（3 × 3 矩阵），它们同样需要分别用这九个数字填满。

const UNASSIGNED = 0;

export function sudokuSolver(grid: number[][]) {
  if (solveSudoku(grid) === true) return grid;
  else return "NO SOLUTION EXISTS!";
}

function solveSudoku(grid: number[][]) {
  let row = 0;
  let col = 0;
  let checkBlankSpaces = false; // ! 检查是否有空白，即值为 0

  for (row = 0; row < grid.length; row++) {
    for (col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === UNASSIGNED) {
        checkBlankSpaces = true;
        break;
      }
    }
    if (checkBlankSpaces === true) break;
  }

  if (checkBlankSpaces === false) return true; // ! 没有空白， 直接返回 true

  for (let num = 1; num <= 9; num++) {
    if (isSafe(grid, row, col, num)) {
      grid[row][col] = num; // ! 设置该数字
      if (solveSudoku(grid)) return true;
      grid[row][col] = UNASSIGNED; // ! 回退重置为 0
    }
  }

  return false;
}

// ! 检查 grid[row][col] 位置 num 是否合适 -> 即其它位置原先不存在该数字
function isSafe(grid: number[][], row: number, col: number, num: number) {
  return (
    !usedInRow(grid, row, num) &&
    !usedInCol(grid, col, num) &&
    !usedInBox(grid, row - (row % 3), col - (col % 3), num)
  );
}

// ! 检查数字是否在行中存在
function usedInRow(grid: number[][], row: number, num: number) {
  for (let col = 0; col < grid.length; col++) {
    if (grid[row][col] === num) return true;
  }
  return false;
}

// ! 检查数字是否在列中存在
function usedInCol(grid: number[][], col: number, num: number) {
  for (let row = 0; row < grid.length; row++) {
    if (grid[row][col] === num) return true;
  }
  return false;
}

// ! 检查数字是否在 3 * 3 盒子中存在
function usedInBox(
  grid: number[][],
  boxStartRow: number,
  boxStartCol: number,
  num: number
) {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row + boxStartRow][col + boxStartCol] === num) {
        return true;
      }
    }
  }
  return false;
}
