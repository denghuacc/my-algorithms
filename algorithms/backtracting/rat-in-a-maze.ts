// 迷宫老鼠问题
// 假设我们有一个大小为 N × N 的矩阵，矩阵的每个位置是一个方块。每个位置（或块）可以
// 是空闲的（值为 1）或是被阻挡的（值为 0），如下图所示，其中 S 是起点， D 是终点。
// 矩阵就是迷宫，“老鼠”的目标是从位置[0][0]开始并移动到[n-1][n-1]（终点）。
// 老鼠可以在垂直或水平方向上任何未被阻挡的位置间移动。

export function ratInAMaze(maze: number[][]): number[][] | "NO PATH FOUND" {
  const n = maze.length;
  const m = maze[0].length;
  const solution: number[][] = Array.from(new Array(n), () =>
    new Array(m).fill(0)
  );

  if (findPath(maze, 0, 0, solution)) return solution;
  else return "NO PATH FOUND";
}

function findPath(
  maze: number[][],
  x: number,
  y: number,
  solution: number[][]
): boolean {
  const n = maze.length;
  const m = maze[0].length;

  if (x === n - 1 && y === m - 1) {
    solution[x][y] = 1;
    return true;
  }

  if (isSafe(maze, x, y) === true) {
    solution[x][y] = 1; // 标记为 1
    if (findPath(maze, x + 1, y, solution)) return true;
    if (findPath(maze, x, y + 1, solution)) return true;
    solution[x][y] = 0; // 退回为 0
    return false;
  }

  return false;
}

// 块为 1 时空闲（安全）
function isSafe(maze: number[][], x: number, y: number): boolean {
  const n = maze.length;
  const m = maze[0].length;
  if (x >= 0 && y >= 0 && x < n && y < m && maze[x][y] !== 0) {
    return true;
  }
  return false;
}
