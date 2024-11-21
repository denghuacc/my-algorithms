/*
 * @lc app=leetcode.cn id=3248 lang=typescript
 *
 * [3248] 矩阵中的蛇
 *
 * https://leetcode.cn/problems/snake-in-matrix/description/
 *
 * algorithms
 * Easy (87.20%)
 * Likes:    13
 * Dislikes: 0
 * Total Accepted:    10.6K
 * Total Submissions: 11.8K
 * Testcase Example:  '2\n["RIGHT","DOWN"]'
 *
 * 大小为 n x n 的矩阵 grid 中有一条蛇。蛇可以朝 四个可能的方向 移动。矩阵中的每个单元格都使用位置进行标识： grid[i][j] = (i
 * * n) + j。
 *
 * 蛇从单元格 0 开始，并遵循一系列命令移动。
 *
 * 给你一个整数 n 表示 grid 的大小，另给你一个字符串数组 commands，其中包括 "UP"、"RIGHT"、"DOWN" 和
 * "LEFT"。题目测评数据保证蛇在整个移动过程中将始终位于 grid 边界内。
 *
 * 返回执行 commands 后蛇所停留的最终单元格的位置。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：n = 2, commands = ["RIGHT","DOWN"]
 *
 * 输出：3
 *
 * 解释：
 *
 *
 *
 *
 *
 * 0
 * 1
 *
 *
 * 2
 * 3
 *
 *
 *
 *
 *
 *
 *
 * 0
 * 1
 *
 *
 * 2
 * 3
 *
 *
 *
 *
 *
 *
 *
 * 0
 * 1
 *
 *
 * 2
 * 3
 *
 *
 *
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入：n = 3, commands = ["DOWN","RIGHT","UP"]
 *
 * 输出：1
 *
 * 解释：
 *
 *
 *
 *
 *
 * 0
 * 1
 * 2
 *
 *
 * 3
 * 4
 * 5
 *
 *
 * 6
 * 7
 * 8
 *
 *
 *
 *
 *
 *
 *
 * 0
 * 1
 * 2
 *
 *
 * 3
 * 4
 * 5
 *
 *
 * 6
 * 7
 * 8
 *
 *
 *
 *
 *
 *
 *
 * 0
 * 1
 * 2
 *
 *
 * 3
 * 4
 * 5
 *
 *
 * 6
 * 7
 * 8
 *
 *
 *
 *
 *
 *
 *
 * 0
 * 1
 * 2
 *
 *
 * 3
 * 4
 * 5
 *
 *
 * 6
 * 7
 * 8
 *
 *
 *
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 10
 * 1 <= commands.length <= 100
 * commands 仅由 "UP"、"RIGHT"、"DOWN" 和 "LEFT" 组成。
 * 生成的测评数据确保蛇不会移动到矩阵的边界外。
 *
 *
 */

// @lc code=start
var finalPositionOfSnake = function (n: number, commands: string[]): number {
  let x = 0;
  let y = 0;
  for (const c of commands) {
    if (c === "UP") {
      x -= 1;
    } else if (c === "RIGHT") {
      y += 1;
    } else if (c === "DOWN") {
      x += 1;
    } else {
      y -= 1;
    }
  }
  return x * n + y;
};

var finalPositionOfSnake = function (n: number, commands: string[]): number {
  let res = 0;
  for (const c of commands) {
    if (c === "UP") {
      res -= n;
    } else if (c === "RIGHT") {
      res += 1;
    } else if (c === "DOWN") {
      res += n;
    } else {
      res -= 1;
    }
  }
  return res;
};
// @lc code=end
