/*
 * @lc app=leetcode.cn id=79 lang=typescript
 *
 * [79] 单词搜索
 *
 * https://leetcode-cn.com/problems/word-search/description/
 *
 * algorithms
 * Medium (35.55%)
 * Likes:    399
 * Dislikes: 0
 * Total Accepted:    54.5K
 * Total Submissions: 131.9K
 * Testcase Example:  '[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]\n"ABCCED"'
 *
 * 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
 *
 * 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。
 *
 *
 *
 * 示例:
 *
 * board =
 * [
 * ⁠ ['A','B','C','E'],
 * ⁠ ['S','F','C','S'],
 * ⁠ ['A','D','E','E']
 * ]
 *
 * 给定 word = "ABCCED", 返回 true
 * 给定 word = "SEE", 返回 true
 * 给定 word = "ABCB", 返回 false
 *
 *
 *
 * 提示：
 *
 *
 * board 和 word 中只包含大写和小写英文字母。
 * 1 <= board.length <= 200
 * 1 <= board[i].length <= 200
 * 1 <= word.length <= 10^3
 *
 *
 */

// @lc code=start
// backtracking
var exist = function (board: string[][], word: string): boolean {
  let m = board.length;
  let n = board[0].length;
  if (m === 0) return false;
  // const marked = new Array(m).fill(new Array(n).fill(false))
  const marked = new Array(m)
    .fill(0)
    .map(() => new Array<boolean>(n).fill(false));

  let direction = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === word[0]) {
        if (dfs(i, j, 0)) {
          return true;
        }
      }
    }
  }

  return false;

  function dfs(i: number, j: number, start: number) {
    if (start === word.length - 1) {
      return board[i][j] === word[start];
    }

    if (board[i][j] === word[start]) {
      marked[i][j] = true;
      for (let k = 0; k < 4; k++) {
        let newX = i + direction[k][0];
        let newY = j + direction[k][1];
        if (inArea(newX, newY) && !marked[newX][newY]) {
          if (dfs(newX, newY, start + 1)) {
            return true;
          }
        }
      }
      marked[i][j] = false;
    }
    return false;
  }

  function inArea(x: number, y: number) {
    return x >= 0 && x < m && y >= 0 && y < n;
  }
};
// @lc code=end
