/*
 * @lc app=leetcode.cn id=529 lang=typescript
 *
 * [529] 扫雷游戏
 *
 * https://leetcode-cn.com/problems/minesweeper/description/
 *
 * algorithms
 * Medium (60.62%)
 * Likes:    97
 * Dislikes: 0
 * Total Accepted:    11.3K
 * Total Submissions: 18.4K
 * Testcase Example:  '[["E","E","E","E","E"],["E","E","M","E","E"],["E","E","E","E","E"],["E","E","E","E","E"]]\n' +
  '[3,0]'
 *
 * 让我们一起来玩扫雷游戏！
 * 
 * 给定一个代表游戏板的二维字符矩阵。 'M' 代表一个未挖出的地雷，'E' 代表一个未挖出的空方块，'B'
 * 代表没有相邻（上，下，左，右，和所有4个对角线）地雷的已挖出的空白方块，数字（'1' 到 '8'）表示有多少地雷与这块已挖出的方块相邻，'X'
 * 则表示一个已挖出的地雷。
 * 
 * 现在给出在所有未挖出的方块中（'M'或者'E'）的下一个点击位置（行和列索引），根据以下规则，返回相应位置被点击后对应的面板：
 * 
 * 
 * 如果一个地雷（'M'）被挖出，游戏就结束了- 把它改为 'X'。
 * 如果一个没有相邻地雷的空方块（'E'）被挖出，修改它为（'B'），并且所有和其相邻的未挖出方块都应该被递归地揭露。
 * 如果一个至少与一个地雷相邻的空方块（'E'）被挖出，修改它为数字（'1'到'8'），表示相邻地雷的数量。
 * 如果在此次点击中，若无更多方块可被揭露，则返回面板。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入: 
 * 
 * [['E', 'E', 'E', 'E', 'E'],
 * ⁠['E', 'E', 'M', 'E', 'E'],
 * ⁠['E', 'E', 'E', 'E', 'E'],
 * ⁠['E', 'E', 'E', 'E', 'E']]
 * 
 * Click : [3,0]
 * 
 * 输出: 
 * 
 * [['B', '1', 'E', '1', 'B'],
 * ⁠['B', '1', 'M', '1', 'B'],
 * ⁠['B', '1', '1', '1', 'B'],
 * ⁠['B', 'B', 'B', 'B', 'B']]
 * 
 * 解释:
 * 
 * 
 * 
 * 示例 2：
 * 
 * 输入: 
 * 
 * [['B', '1', 'E', '1', 'B'],
 * ⁠['B', '1', 'M', '1', 'B'],
 * ⁠['B', '1', '1', '1', 'B'],
 * ⁠['B', 'B', 'B', 'B', 'B']]
 * 
 * Click : [1,2]
 * 
 * 输出: 
 * 
 * [['B', '1', 'E', '1', 'B'],
 * ⁠['B', '1', 'X', '1', 'B'],
 * ⁠['B', '1', '1', '1', 'B'],
 * ⁠['B', 'B', 'B', 'B', 'B']]
 * 
 * 解释:
 * 
 * 
 * 
 * 
 * 
 * 注意：
 * 
 * 
 * 输入矩阵的宽和高的范围为 [1,50]。
 * 点击的位置只能是未被挖出的方块 ('M' 或者 'E')，这也意味着面板至少包含一个可点击的方块。
 * 输入面板不会是游戏结束的状态（即有地雷已被挖出）。
 * 简单起见，未提及的规则在这个问题中可被忽略。例如，当游戏结束时你不需要挖出所有地雷，考虑所有你可能赢得游戏或标记方块的情况。
 * 
 * 
 */

// 解题思路
// 1. 如果刚好点击到地雷，这个位置标示为 X，然后游戏直接结束
// 2. 如果没有点击到地雷，则显示点击方快的周围地雷数量信息，如果没有地雷数量则标识为 B

// @lc code=start
// dfs
var updateBoard = function (board: string[][], click: number[]): string[][] {
  // 点击位置周围 8 个方块的对应坐标
  const dirX = [0, 1, 0, -1, 1, 1, -1, -1];
  const dirY = [1, 0, -1, 0, 1, -1, 1, -1];

  const x = click[0];
  const y = click[1];
  if (board[x][y] === "M") {
    board[x][y] = "X"; // 刚好点中地雷
  } else {
    dfs(board, x, y);
  }
  return board;

  function dfs(board: string[][], x: number, y: number) {
    let cnt = 0; // 点击位置周围相邻的方块里地雷的总数量

    // 遍历点击位置周围 8 个方块
    for (let i = 0; i < dirX.length; i++) {
      const tx = x + dirX[i];
      const ty = y + dirY[i];
      if (tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) {
        continue;
      }
      if (board[tx][ty] === "M") {
        cnt++;
      }
    }

    if (cnt > 0) {
      board[x][y] = String(cnt); // 设置地雷数量
    } else {
      board[x][y] = "B"; // 没有地雷标记为 B，然后继续深入搜索
      for (let i = 0; i < dirX.length; i++) {
        const tx = x + dirX[i];
        const ty = y + dirY[i];
        if (
          tx < 0 ||
          tx >= board.length ||
          ty < 0 ||
          ty >= board[0].length ||
          board[tx][ty] !== "E"
        ) {
          continue;
        }
        dfs(board, tx, ty);
      }
    }
  }
};

// bfs
var updateBoard = function (board: string[][], click: number[]): string[][] {
  const dirX = [0, 1, 0, -1, 1, 1, -1, -1];
  const dirY = [1, 0, -1, 0, 1, -1, 1, -1];

  const x = click[0];
  const y = click[1];
  if (board[x][y] === "M") {
    board[x][y] = "X";
  } else {
    bfs(board, x, y);
  }
  return board;

  function bfs(board: string[][], sx: number, sy: number) {
    const queue: [number, number][] = [];
    const vis: boolean[][] = Array.from(new Array(board.length), () =>
      new Array(board[0].length).fill(false)
    );
    queue.push([sx, sy]);
    vis[sx][sy] = true;

    while (queue.length) {
      const [x, y] = queue.shift()!;
      let cnt = 0;

      for (let i = 0; i < dirX.length; i++) {
        const tx = x + dirX[i];
        const ty = y + dirY[i];
        if (tx < 0 || tx >= board.length || ty < 0 || ty >= board[0].length) {
          continue;
        }
        if (board[tx][ty] === "M") {
          cnt++;
        }
      }

      if (cnt > 0) {
        board[x][y] = String(cnt);
      } else {
        board[x][y] = "B";
        for (let i = 0; i < dirX.length; i++) {
          const tx = x + dirX[i];
          const ty = y + dirY[i];
          if (
            tx < 0 ||
            tx >= board.length ||
            ty < 0 ||
            ty >= board[0].length ||
            board[tx][ty] !== "E" ||
            vis[tx][ty]
          ) {
            continue;
          }
          queue.push([tx, ty]);
          vis[tx][ty] = true;
        }
      }
    }
  }
};
// @lc code=end
