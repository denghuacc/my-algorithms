// 迷宫老鼠问题

export function ratInAMaze(maze: number[][]) {
  const solution: number[][] = [];

  for (let i = 0; i < maze.length; i++) {
    solution[i] = [];
    for (let j = 0; j < maze[i].length; j++) {
      solution[i][j] = 0;
    }
  }

  if (findPath(maze, 0, 0, solution)) {
    return solution;
  } else {
    return "NO PATH FOUND";
  }
}

function findPath(
  maze: number[][],
  x: number,
  y: number,
  solution: number[][]
) {
  const n = maze.length;

  if (x === n - 1 && y === n - 1) {
    solution[x][y] = 1;
    return true;
  }

  if (isSafe(maze, x, y) === true) {
    solution[x][y] = 1;
    if (findPath(maze, x + 1, y, solution)) return true;
    if (findPath(maze, x, y + 1, solution)) return true;
    solution[x][y] = 0;
    return false;
  }

  return false;
}

function isSafe(maze: number[][], x: number, y: number) {
  const n = maze.length;
  if (x >= 0 && y >= 0 && x < n && y < n && maze[x][y] !== 0) {
    return true;
  }
  return false;
}
