/*
 * @lc app=leetcode.cn id=52 lang=typescript
 *
 * [52] N皇后 II
 *
 * https://leetcode-cn.com/problems/n-queens-ii/description/
 *
 * algorithms
 * Hard (69.54%)
 * Likes:    126
 * Dislikes: 0
 * Total Accepted:    25.5K
 * Total Submissions: 32.4K
 * Testcase Example:  '4'
 *
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 *
 *
 * 上图为 8 皇后问题的一种解法。
 *
 * 给定一个整数 n，返回 n 皇后不同的解决方案的数量。
 *
 * 示例:
 *
 * 输入: 4
 * 输出: 2
 * 解释: 4 皇后问题存在如下两个不同的解法。
 * [
 * [".Q..",  // 解法 1
 * "...Q",
 * "Q...",
 * "..Q."],
 *
 * ["..Q.",  // 解法 2
 * "Q...",
 * "...Q",
 * ".Q.."]
 * ]
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一或七步，可进可退。（引用自
 * 百度百科 - 皇后 ）
 *
 *
 */

// @lc code=start
// backtracking
var totalNQueens = function (n: number): number {
  const obj: Record<string, number> = {};
  const add: number[] = [];
  const sub: number[] = [];
  let ret = 0;
  dfs(0);
  return ret;

  function dfs(row: number) {
    if (row === n) {
      ret++;
      return;
    }

    for (let i = 0; i < n; i++) {
      if (
        Object.values(obj).indexOf(i) !== -1 ||
        add.indexOf(row + i) !== -1 ||
        sub.indexOf(row - i) !== -1
      ) {
        continue;
      }

      obj[row] = i;
      add.push(row + i);
      sub.push(row - i);

      dfs(row + 1);

      obj[row] = -1;
      add.pop();
      sub.pop();
    }
  }
};
// @lc code=end
