/*
 * @lc app=leetcode.cn id=840 lang=typescript
 *
 * [840] 矩阵中的幻方
 *
 * https://leetcode.cn/problems/magic-squares-in-grid/description/
 *
 * algorithms
 * Medium (51.57%)
 * Likes:    990
 * Dislikes: 1872
 * Total Accepted:    194.5K
 * Total Submissions: 360.9K
 * Testcase Example:  '[[4,3,8,4],[9,5,1,9],[2,7,6,2]]'
 *
 * 3 x 3 幻方是一个 3 x 3 的网格，填入 1 到 9 的互不相同的数字，使得每一行、
 * 每一列以及两条对角线的和都相同。
 *
 * 给你一个 row x col 的整数网格，返回其中 3 x 3 幻方子矩阵的数量。
 *
 * 注意：幻方只允许 1 到 9 的数字，但原网格的数字可以大于 9（最大 15）。
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
 * 输出：1
 * 解释：其中只有一个 3 x 3 子矩阵为幻方。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[8]]
 * 输出：0
 *
 *
 *
 * 提示：
 *
 *
 * row == grid.length
 * col == grid[i].length
 * 1 <= row, col <= 10
 * 0 <= grid[i][j] <= 15
 *
 *
 */

// @lc code=start
/**
 * 统计网格中 3 x 3 幻方的数量。
 *
 * @param grid - 整数网格
 * @returns 3 x 3 幻方子矩阵数量
 */
function numMagicSquaresInside(grid: number[][]): number {
  const rows = grid.length;
  const cols = grid[0].length;
  let count = 0;

  for (let r = 0; r < rows - 2; r++) {
    for (let c = 0; c < cols - 2; c++) {
      // 3x3 标准幻方的中心必须是 5，可快速剪枝
      if (grid[r + 1][c + 1] !== 5) {
        continue;
      }
      if (
        isMagicSquare(
          grid[r][c],
          grid[r][c + 1],
          grid[r][c + 2],
          grid[r + 1][c],
          grid[r + 1][c + 1],
          grid[r + 1][c + 2],
          grid[r + 2][c],
          grid[r + 2][c + 1],
          grid[r + 2][c + 2]
        )
      ) {
        count++;
      }
    }
  }

  return count;

  function isMagicSquare(...vals: number[]): boolean {
    // 检查是否为 1..9 且互不相同
    const frequency = new Array(16).fill(0);
    for (const value of vals) {
      if (value < 1 || value > 9) {
        return false;
      }
      frequency[value]++;
    }
    for (let num = 1; num <= 9; num++) {
      if (frequency[num] !== 1) {
        return false;
      }
    }

    // 1..9 的 3x3 幻方每行/列/对角线的和恒为 15
    return (
      vals[0] + vals[1] + vals[2] === 15 && // 第一行
      vals[3] + vals[4] + vals[5] === 15 && // 第二行
      vals[6] + vals[7] + vals[8] === 15 && // 第三行
      vals[0] + vals[3] + vals[6] === 15 && // 第一列
      vals[1] + vals[4] + vals[7] === 15 && // 第二列
      vals[2] + vals[5] + vals[8] === 15 && // 第三列
      vals[0] + vals[4] + vals[8] === 15 && // 主对角线
      vals[2] + vals[4] + vals[6] === 15
    ); // 副对角线
  }
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在给定网格中枚举所有 3 x 3 子矩阵，判断是否为标准幻方。
   - 关键特点：幻方必须由 1..9 互不相同的数字组成，行列与对角线和相等。
   - 目标：统计满足条件的子矩阵数量。

2. 解题思路
   核心思想
   - 逐个枚举 3 x 3 子矩阵，检查是否满足幻方条件。
   - 利用“中心必须是 5”的性质做剪枝，减少不必要判断。

   算法步骤
   1) 遍历所有可能的 3 x 3 左上角位置 (r, c)。
   2) 若中心元素不是 5，直接跳过。
   3) 检查 9 个数是否都在 1..9 且互不相同。
   4) 检查三行、三列与两条对角线的和是否都为 15。
   5) 满足则计数加一。

3. 代码实现
   实现步骤
   - 外层双循环枚举子矩阵位置。
   - 通过 isMagicSquare 判断 3 x 3 是否合格。
   - 使用 frequency 计数避免重复数字。

   关键函数说明
   - numMagicSquaresInside：主函数，完成遍历与计数。
   - isMagicSquare：检查是否为 3 x 3 幻方。

4. 复杂度分析
   - 时间复杂度：O(row * col)，每个子矩阵检查是常数工作。
   - 空间复杂度：O(1)，使用固定大小的计数数组。
   - 关键观察：3 x 3 大小固定，检查代价为常数。

5. 示例分析
   示例一：grid = [[4,3,8,4],[9,5,1,9],[2,7,6,2]]
   - 以 (0,0) 为左上角形成的 3 x 3 中心为 5，且满足 1..9 与和为 15。
   - 其他位置无法同时满足中心为 5 与行列和条件，结果为 1。

   示例二：grid = [[8]]
   - 无法形成 3 x 3 子矩阵，结果为 0。

   边界情况
   - 行列小于 3 时，直接返回 0。
   - 子矩阵含 0 或大于 9 的数字，立即判定失败。

6. 算法要点总结
   核心技巧
   - 使用中心为 5 的性质进行剪枝。
   - 利用固定和 15 简化行列判断。

   优化要点
   - 仅对 3 x 3 常数大小做检查，避免额外数据结构。
   - 将重复值检测提前，减少后续和判断开销。

   类似问题
   - 固定大小子矩阵判定类问题。
   - 使用数值性质剪枝的枚举类问题。

7. 常见错误
   - 忽略“必须为 1..9 且不重复”的条件，只检查和。
   - 未使用中心为 5 的剪枝，导致多余计算。
   - 把行列和写错或遗漏对角线检查。
*/
