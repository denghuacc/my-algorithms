/*
 * @lc app=leetcode.cn id=883 lang=typescript
 *
 * [883] 三维形体投影面积
 *
 * https://leetcode-cn.com/problems/projection-area-of-3d-shapes/description/
 *
 * algorithms
 * Easy (69.94%)
 * Likes:    85
 * Dislikes: 0
 * Total Accepted:    19.7K
 * Total Submissions: 26.7K
 * Testcase Example:  '[[1,2],[3,4]]'
 *
 * 在 n x n 的网格 grid 中，我们放置了一些与 x，y，z 三轴对齐的 1 x 1 x 1 立方体。
 *
 * 每个值 v = grid[i][j] 表示 v 个正方体叠放在单元格 (i, j) 上。
 *
 * 现在，我们查看这些立方体在 xy 、yz 和 zx 平面上的投影。
 *
 * 投影 就像影子，将 三维 形体映射到一个 二维 平面上。从顶部、前面和侧面看立方体时，我们会看到“影子”。
 *
 * 返回 所有三个投影的总面积 。
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：[[1,2],[3,4]]
 * 输出：17
 * 解释：这里有该形体在三个轴对齐平面上的三个投影(“阴影部分”)。
 *
 *
 * 示例 2:
 *
 *
 * 输入：grid = [[2]]
 * 输出：5
 *
 *
 * 示例 3：
 *
 *
 * 输入：[[1,0],[0,2]]
 * 输出：8
 *
 *
 *
 *
 * 提示：
 *
 *
 * n == grid.length == grid[i].length
 * 1 <= n <= 50
 * 0 <= grid[i][j] <= 50
 *
 *
 */

// @lc code=start
var projectionArea = function (grid: number[][]): number {
  const m = grid.length;
  let maxLength = 0;
  const maxRowItems: number[] = [];
  const maxColItems: number[] = [];
  for (let i = 0; i < m; i++) {
    const row = grid[i];
    let max = 0;
    for (const v of row) {
      max = Math.max(max, v);
    }
    maxRowItems.push(max);
  }

  const maxRowSum = maxRowItems.reduce((a, b) => a + b, 0);

  for (let i = 0; i < m; i++) {
    const col = grid.map((row) => row[i]);
    let max = 0;
    for (const v of col) {
      if (v > 0) {
        maxLength++;
        max = Math.max(max, v);
      }
    }
    maxColItems.push(max);
  }

  const maxColSum = maxColItems.reduce((a, b) => a + b, 0);

  return maxLength + maxRowSum + maxColSum;
};

// two traversal ✅
var projectionArea = function (grid: number[][]): number {
  const n = grid.length;
  let xyArea = 0;
  let yzArea = 0;
  let xzArea = 0;
  for (let i = 0; i < n; i++) {
    let yzHight = 0;
    let xzHight = 0;
    for (let j = 0; j < n; j++) {
      if (grid[i][j] > 0) {
        xyArea++;
      }
      yzHight = Math.max(yzHight, grid[j][i]);
      xzHight = Math.max(xzHight, grid[i][j]);
    }
    yzArea += yzHight;
    xzArea += xzHight;
  }
  return xyArea + yzArea + xzArea;
};
// @lc code=end
