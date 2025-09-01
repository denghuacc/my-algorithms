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
 * 数字 1-9 在每一行只能出现一次。
 * 数字 1-9 在每一列只能出现一次。
 * 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。
 *
 *
 * 空白格用 '.' 表示。
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
 * 给定的数独序列只包含数字 1-9 和字符 '.' 。
 * 你可以假设给定的数独只有唯一解。
 * 给定数独永远是 9x9 形式的。
 *
 *
 */

export {};

// @lc code=start
/**
 Do not return anything, modify board in-place instead.
 */
function solveSudoku(board: string[][]): void {
  const n = 3; // 3x3 宫格的大小
  const N = n * n; // 9x9 数独的总大小
  let sudokuSolved = false; // 标记是否已完成数独求解

  // 使用三个二维数组来记录每行、每列、每个3x3宫格中数字的使用情况
  // rows[i][d] 表示第i行中数字d的使用次数
  const rows: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );
  // columns[j][d] 表示第j列中数字d的使用次数
  const columns: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );
  // boxes[idx][d] 表示第idx个3x3宫格中数字d的使用次数
  const boxes: number[][] = Array.from(new Array(N), () =>
    new Array(N + 1).fill(0)
  );

  // 初始化：记录数独板上已有的数字
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const num = board[i][j];
      if (num !== ".") {
        const digit = Number(num);
        placeNumber(digit, i, j);
      }
    }
  }

  // 开始回溯搜索
  dfs(0, 0);

  /**
   * 在指定位置放置数字并更新记录表
   * @param d 要放置的数字 (1-9)
   * @param row 行索引
   * @param col 列索引
   */
  function placeNumber(d: number, row: number, col: number) {
    // 计算当前格子属于哪个3x3宫格
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    // 更新记录表
    rows[row][d]++;
    columns[col][d]++;
    boxes[idx][d]++;
    // 在数独板上放置数字
    board[row][col] = String(d);
  }

  /**
   * 深度优先搜索，使用回溯算法求解数独
   * @param row 当前处理的行索引
   * @param col 当前处理的列索引
   */
  function dfs(row: number, col: number) {
    // 如果当前格子是空的，尝试放置数字1-9
    if (board[row][col] === ".") {
      for (let d = 1; d < 10; d++) {
        // 检查是否可以放置数字d
        if (couldPlace(d, row, col)) {
          // 放置数字
          placeNumber(d, row, col);
          // 处理下一个位置
          placeNextNumber(row, col);
          // 如果还没有完成，则回溯（删除刚放置的数字）
          if (!sudokuSolved) removeNumber(d, row, col);
        }
      }
    } else {
      // 如果当前格子已有数字，直接处理下一个位置
      placeNextNumber(row, col);
    }
  }

  /**
   * 检查是否可以在指定位置放置数字d
   * @param d 要检查的数字
   * @param row 行索引
   * @param col 列索引
   * @returns 如果可以放置返回true，否则返回false
   */
  function couldPlace(d: number, row: number, col: number): boolean {
    // 计算当前格子属于哪个3x3宫格
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    // 检查行、列、宫格中是否都没有使用过数字d
    return rows[row][d] + columns[col][d] + boxes[idx][d] === 0;
  }

  /**
   * 处理下一个位置
   * @param row 当前行索引
   * @param col 当前列索引
   */
  function placeNextNumber(row: number, col: number) {
    // 如果已经处理完最后一个位置，标记完成
    if (col === N - 1 && row === N - 1) {
      sudokuSolved = true;
    } else {
      // 移动到下一个位置：先向右，到行末时换行
      if (col === N - 1) {
        dfs(row + 1, 0);
      } else {
        dfs(row, col + 1);
      }
    }
  }

  /**
   * 删除指定位置的数字并更新记录表
   * @param d 要删除的数字
   * @param row 行索引
   * @param col 列索引
   */
  function removeNumber(d: number, row: number, col: number) {
    // 计算当前格子属于哪个3x3宫格
    const idx = Math.floor(row / n) * n + Math.floor(col / n);
    // 更新记录表（减少计数）
    rows[row][d]--;
    columns[col][d]--;
    boxes[idx][d]--;
    // 在数独板上删除数字
    board[row][col] = ".";
  }
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在9x9的数独网格中填入数字1-9，使得每行、每列、每个3x3宫格中的数字都不重复
   - 这是一个约束满足问题，需要满足多个约束条件

2. 算法分析：
   - 时间复杂度：O(9^(n²))，其中n是数独的大小（9），最坏情况下需要尝试所有可能的组合
   - 空间复杂度：O(n²)，用于存储行、列、宫格的记录表
   - 算法类型：回溯算法（Backtracking）

3. 实现要点：
   - 使用三个二维数组（rows、columns、boxes）来快速检查数字是否可用
   - 采用深度优先搜索遍历所有可能的数字组合
   - 当某个位置无法放置任何数字时，回溯到上一个位置尝试其他数字
   - 使用全局标志sudokuSolved来提前终止搜索

4. 优化思路：
   - 预处理：先记录数独板上已有的数字，避免重复计算
   - 剪枝：使用记录表快速判断数字是否可用，避免遍历检查
   - 早期终止：一旦找到解就立即停止搜索
   - 启发式选择：可以优先选择约束最多的位置进行填充

5. 关键技巧：
   - 3x3宫格索引计算：idx = Math.floor(row / 3) * 3 + Math.floor(col / 3)
   - 回溯时正确恢复状态：删除数字并更新记录表
   - 使用字符串表示数字，便于处理'.'字符

6. 边界情况：
   - 数独板为空的情况
   - 数独板已经填满的情况
   - 无解的情况（题目保证有唯一解）

7. 类似问题：
   - N皇后问题
   - 图的着色问题
   - 其他约束满足问题
*/
