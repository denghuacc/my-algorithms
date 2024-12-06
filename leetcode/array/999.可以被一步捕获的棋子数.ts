/*
 * @lc app=leetcode.cn id=999 lang=typescript
 *
 * [999] 可以被一步捕获的棋子数
 *
 * https://leetcode.cn/problems/available-captures-for-rook/description/
 *
 * algorithms
 * Easy (69.73%)
 * Likes:    128
 * Dislikes: 0
 * Total Accepted:    45.2K
 * Total Submissions: 62.9K
 * Testcase Example:  '[[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]'
 *
 * 给定一个 8 x 8 的棋盘，只有一个 白色的车，用字符 'R' 表示。棋盘上还可能存在白色的象 'B' 以及黑色的卒 'p'。空方块用字符 '.'
 * 表示。
 *
 * 车可以按水平或竖直方向（上，下，左，右）移动任意个方格直到它遇到另一个棋子或棋盘的边界。如果它能够在一次移动中移动到棋子的方格，则能够 吃掉 棋子。
 *
 * 注意：车不能穿过其它棋子，比如象和卒。这意味着如果有其它棋子挡住了路径，车就不能够吃掉棋子。
 *
 * 返回白车 攻击 范围内 兵的数量。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 *
 * 输入：[[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","R",".",".",".","p"],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
 * 输出：3
 * 解释：
 * 在本例中，车能够吃掉所有的卒。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 *
 * 输入：[[".",".",".",".",".",".",".","."],[".","p","p","p","p","p",".","."],[".","p","p","B","p","p",".","."],[".","p","B","R","B","p",".","."],[".","p","p","B","p","p",".","."],[".","p","p","p","p","p",".","."],[".",".",".",".",".",".",".","."],[".",".",".",".",".",".",".","."]]
 * 输出：0
 * 解释：
 * 象阻止了车吃掉任何卒。
 *
 *
 * 示例 3：
 *
 *
 *
 *
 *
 * 输入：[[".",".",".",".",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".","p",".",".",".","."],["p","p",".","R",".","p","B","."],[".",".",".",".",".",".",".","."],[".",".",".","B",".",".",".","."],[".",".",".","p",".",".",".","."],[".",".",".",".",".",".",".","."]]
 * 输出：3
 * 解释：
 * 车可以吃掉位置 b5，d6 和 f5 的卒。
 *
 *
 *
 *
 * 提示：
 *
 *
 * board.length == 8
 * board[i].length == 8
 * board[i][j] 可以是 'R'，'.'，'B' 或 'p'
 * 只有一个格子上存在 board[i][j] == 'R'
 *
 *
 */

// @lc code=start
function numRookCaptures(board: string[][]): number {
  let r = [0, 0];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j] === "R") {
        r = [i, j];
        break;
      }
    }
  }
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  let res = 0;
  for (const [x, y] of dirs) {
    let nx = r[0];
    let ny = r[1];
    for (let i = 0; i < 8; i++) {
      nx += x;
      ny += y;
      if (nx < 0 || nx >= 8 || ny < 0 || ny >= 8 || board[nx][ny] === "B") {
        break;
      }
      if (board[nx][ny] === "p") {
        res++;
        break;
      }
    }
  }
  return res;
}
// @lc code=end
