/*
 * @lc app=leetcode.cn id=51 lang=typescript
 *
 * [51] N皇后
 *
 * https://leetcode-cn.com/problems/n-queens/description/
 *
 * algorithms
 * Hard (58.04%)
 * Likes:    436
 * Dislikes: 0
 * Total Accepted:    45.9K
 * Total Submissions: 65.5K
 * Testcase Example:  '4'
 *
 * n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。
 *
 *
 *
 * 上图为 8 皇后问题的一种解法。
 *
 * 给定一个整数 n，返回所有不同的 n 皇后问题的解决方案。
 *
 * 每一种解法包含一个明确的 n 皇后问题的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。
 *
 * 示例:
 *
 * 输入: 4
 * 输出: [
 * ⁠[".Q..",  // 解法 1
 * ⁠ "...Q",
 * ⁠ "Q...",
 * ⁠ "..Q."],
 *
 * ⁠["..Q.",  // 解法 2
 * ⁠ "Q...",
 * ⁠ "...Q",
 * ⁠ ".Q.."]
 * ]
 * 解释: 4 皇后问题存在两个不同的解法。
 *
 *
 *
 *
 * 提示：
 *
 *
 *
 * 皇后，是国际象棋中的棋子，意味着国王的妻子。皇后只做一件事，那就是“吃子”。当她遇见可以吃的棋子时，就迅速冲上去吃掉棋子。当然，她横、竖、斜都可走一到七步，可进可退。（引用自
 * 百度百科 - 皇后 ）
 *
 *
 */

// @lc code=start
// backtrack1
var solveNQueens = function (n: number): string[][] {
  const ret: string[][] = [];
  backtrack(n, [], ret);
  return ret;

  function backtrack(n: number, tmp: number[], ret: string[][]) {
    if (tmp.length === n) {
      ret.push(
        tmp.map((i) => {
          let arr = Array(n).fill(".");
          arr.splice(i, 1, "Q");
          return arr.join("");
        })
      );
      return;
    }

    for (let i = 0; i < n; i++) {
      if (isValid(tmp, i)) {
        tmp.push(i);
        backtrack(n, tmp, ret);
        tmp.pop();
      }
    }
  }

  function isValid(arr: number[], idx: number) {
    const len = arr.length;
    for (let i = 0; i < len; i++) {
      const item = arr[i];
      if (item === idx || i - item === len - idx || i + item === len + idx) {
        return false;
      }
    }
    return true;
  }
};

// backtrack2
var solveNQueens = function (n: number): string[][] {
  const obj: Record<string, number> = {};
  const add: number[] = [];
  const sub: number[] = [];
  const ret: string[][] = [];
  backtrack(0);
  return ret;

  function backtrack(row: number) {
    if (row === n) {
      const arr: string[] = [];
      for (const key in obj) {
        arr.push("Q".padStart(obj[key] + 1, ".").padEnd(n, "."));
      }
      ret.push(arr);
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

      backtrack(row + 1);

      obj[row] = -1;
      add.pop();
      sub.pop();
    }
  }
};
// @lc code=end
