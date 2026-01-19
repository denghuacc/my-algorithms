/*
 * @lc app=leetcode.cn id=1895 lang=typescript
 *
 * [1895] 最大的幻方
 *
 * https://leetcode.cn/problems/largest-magic-square/description/
 *
 * algorithms
 * Medium (53.23%)
 * Likes:    351
 * Dislikes: 279
 * Total Accepted:    19.7K
 * Total Submissions: 33.5K
 * Testcase Example:  '[[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]'
 *
 * 一个 k x k 的幻方指的是一个 k x k 的网格，满足每一行、每一列以及两条对角线
 * 的元素和都相同。幻方中的数字不要求互不相同。任意 1 x 1 网格都视为幻方。
 *
 * 给你一个 m x n 的整数网格，返回其中最大的幻方边长 k。
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
 * 输出：3
 * 解释：最大的幻方边长为 3，且行、列、对角线和都为 12。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
 * 输出：2
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * 1 <= grid[i][j] <= 10^6
 *
 *
 */

// @lc code=start
/**
 * 返回网格中最大的幻方边长。
 *
 * @param grid - m x n 整数网格
 * @returns 最大幻方边长
 */
function largestMagicSquare(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  // rowSum[i][j] 记录第 i 行从 0 到 j 的前缀和
  const rowSum = Array.from({ length: m }, () => Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    rowSum[i][0] = grid[i][0];
    for (let j = 1; j < n; j++) {
      rowSum[i][j] = rowSum[i][j - 1] + grid[i][j];
    }
  }

  // colSum[i][j] 记录第 j 列从 0 到 i 的前缀和
  const colSum = Array.from({ length: m }, () => Array(n).fill(0));
  for (let j = 0; j < n; j++) {
    colSum[0][j] = grid[0][j];
    for (let i = 1; i < m; i++) {
      colSum[i][j] = colSum[i - 1][j] + grid[i][j];
    }
  }

  let maxSize = 1;
  // 枚举所有可能的边长
  for (let size = 2; size <= Math.min(m, n); size++) {
    for (let i = 0; i <= m - size; i++) {
      for (let j = 0; j <= n - size; j++) {
        // 以第一行作为目标和基准
        const targetSum =
          rowSum[i][j + size - 1] - (j > 0 ? rowSum[i][j - 1] : 0);
        let isMagic = true;

        for (let k = 0; k < size; k++) {
          // 检查第 i+k 行与第 j+k 列是否与目标和一致
          const currentRowSum =
            rowSum[i + k][j + size - 1] - (j > 0 ? rowSum[i + k][j - 1] : 0);
          const currentColSum =
            colSum[i + size - 1][j + k] - (i > 0 ? colSum[i - 1][j + k] : 0);
          if (currentRowSum !== targetSum || currentColSum !== targetSum) {
            isMagic = false;
            break;
          }
        }

        if (isMagic) {
          // 校验两条对角线
          let diagSum1 = 0;
          let diagSum2 = 0;
          for (let k = 0; k < size; k++) {
            diagSum1 += grid[i + k][j + k];
            diagSum2 += grid[i + k][j + size - 1 - k];
          }
          if (diagSum1 === targetSum && diagSum2 === targetSum) {
            maxSize = Math.max(maxSize, size);
          }
        }
      }
    }
  }

  return maxSize;
}
// @lc code=end

/*
解题思路详解：

1. 题目理解
   - 问题本质：在网格中找一个 k x k 子矩阵，使行、列、两条对角线和相等。
   - 关键特点：数值不要求唯一，1x1 一定是幻方。
   - 目标：返回最大的 k。

2. 解题思路
   核心思想
   - 通过行、列前缀和在 O(1) 时间计算任意行段或列段的和。
   - 枚举所有边长与起点，检查是否满足幻方条件。

   算法步骤
   1) 预处理 rowSum 与 colSum 前缀和。
   2) 枚举边长 size，从 2 到 min(m, n)。
   3) 枚举每个 size 的左上角 (i, j)：
      - 以第一行和作为 targetSum。
      - 检查 size 行与 size 列的和是否都等于 targetSum。
      - 若行列一致，再计算两条对角线和。
      - 若全部满足，更新最大边长。
   4) 返回最大边长。

3. 代码实现
   实现步骤
   - 使用 rowSum 与 colSum 加速行列求和。
   - 对角线需要显式累加，开销为 O(size)。
   - 仅当行列校验通过时才计算对角线，避免无效计算。

   关键函数说明
   - largestMagicSquare：主函数，枚举并验证幻方。

4. 复杂度分析
   - 时间复杂度：O(m * n * min(m, n))，每个位置最多验证一遍。
   - 空间复杂度：O(m * n)，存储行列前缀和。
   - 关键观察：行列和可 O(1) 计算，主要成本来自边长与位置枚举。

5. 示例分析
   示例一：grid = [[7,1,4,5,6],[2,5,1,6,4],[1,5,4,3,2],[1,2,7,3,4]]
   - size=3 时在 (1,1) 处满足行列与对角线和均为 12，最大边长为 3。

   示例二：grid = [[5,1,3,1],[9,3,3,1],[1,3,3,8]]
   - 最大满足条件的边长为 2。

   边界情况
   - 只有 1 行或 1 列：答案恒为 1。
   - 任意 size>1 不满足时，结果仍为 1。

6. 算法要点总结
   核心技巧
   - 用前缀和快速计算任意行列段和。
   - 先验行列，再验对角线，减少计算量。

   优化要点
   - 可从大到小尝试 size，提前返回最大值。
   - 若 row/col 不一致，立即剪枝。

   类似问题
   - 固定大小子矩阵验证类问题。
   - 行列前缀和的快速区间求和问题。

7. 常见错误
   - 忘记对角线校验，导致误判。
   - 行列前缀和边界处理错误，导致和计算偏差。
   - 只比较行或列，未同时检查两者。
*/
