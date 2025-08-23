/*
 * @lc app=leetcode.cn id=695 lang=typescript
 *
 * [695] 岛屿的最大面积
 *
 * https://leetcode.cn/problems/max-area-of-island/description/
 *
 * algorithms
 * Medium (67.86%)
 * Likes:    863
 * Dislikes: 0
 * Total Accepted:    244.9K
 * Total Submissions: 360.9K
 * Testcase Example:  '[[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]'
 *
 * 给你一个大小为 m x n 的二进制矩阵 grid 。
 *
 * 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在 水平或者竖直的四个方向上 相邻。你可以假设 grid
 * 的四个边缘都被 0（代表水）包围着。
 *
 * 岛屿的面积是岛上值为 1 的单元格的数目。
 *
 * 计算并返回 grid 中最大的岛屿面积。如果没有岛屿，则返回面积为 0 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid =
 * [[0,0,1,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,1,1,0,1,0,0,0,0,0,0,0,0],[0,1,0,0,1,1,0,0,1,0,1,0,0],[0,1,0,0,1,1,0,0,1,1,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,1,1,1,0,0,0],[0,0,0,0,0,0,0,1,1,0,0,0,0]]
 * 输出：6
 * 解释：答案不应该是 11 ，因为岛屿只能包含水平或垂直这四个方向上的 1 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[0,0,0,0,0,0,0,0]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 50
 * grid[i][j] 为 0 或 1
 *
 *
 */

// @lc code=start
/**
 * 深度优先搜索 (DFS) 递归解决方案
 *
 * 核心思想：遍历网格，对每个陆地格子进行DFS，计算连通区域的面积，记录最大值
 */
function maxAreaOfIsland(grid: number[][]): number {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  // 遍历整个网格
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      // 对每个陆地格子进行DFS，计算面积
      res = Math.max(res, dfs(i, j));
    }
  }

  return res;

  /**
   * 深度优先搜索函数，计算从(i,j)开始的连通区域面积
   * @param i 行坐标
   * @param j 列坐标
   * @returns 连通区域的面积
   */
  function dfs(i: number, j: number): number {
    // 边界条件：越界或遇到水
    if (i < 0 || i >= m || j < 0 || j >= n || grid[i][j] === 0) {
      return 0;
    }

    // 标记已访问，避免重复计算
    grid[i][j] = 0;

    // 四个方向的偏移量：右、左、下、上
    const dirs = [
      [0, 1], // 右
      [0, -1], // 左
      [1, 0], // 下
      [-1, 0], // 上
    ];

    let res = 1; // 当前格子面积为1
    // 递归访问四个方向的邻居
    for (const [x, y] of dirs) {
      const ni = i + x;
      const nj = j + y;
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] === 1) {
        res += dfs(ni, nj);
      }
    }
    return res;
  }
}

/**
 * 深度优先搜索 (DFS) 栈实现解决方案
 *
 * 核心思想：使用栈模拟递归，避免递归调用栈溢出
 */
function maxAreaOfIsland2(grid: number[][]): number {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let cur = 0;
      const stack = [[i, j]]; // 使用栈存储待访问的格子

      // 栈不为空时继续处理
      while (stack.length) {
        const [x, y] = stack.pop()!;

        // 边界条件检查
        if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) {
          continue;
        }

        cur++; // 增加当前连通区域面积
        grid[x][y] = 0; // 标记已访问

        // 四个方向的偏移量
        const dirs = [
          [0, 1], // 右
          [0, -1], // 左
          [1, 0], // 下
          [-1, 0], // 上
        ];

        // 将邻居加入栈中
        for (const [a, b] of dirs) {
          const nx = x + a;
          const ny = y + b;
          stack.push([nx, ny]);
        }
      }
      res = Math.max(res, cur);
    }
  }

  return res;
}

/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：使用队列进行层序遍历，适合处理大型连通区域
 */
function maxAreaOfIsland3(grid: number[][]): number {
  let res = 0;
  const m = grid.length;
  const n = grid[0].length;

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let cur = 0;
      const queue = [[i, j]]; // 使用队列存储待访问的格子

      // 队列不为空时继续处理
      while (queue.length) {
        const [x, y] = queue.shift()!;

        // 边界条件检查
        if (x < 0 || x >= m || y < 0 || y >= n || grid[x][y] === 0) {
          continue;
        }

        cur++; // 增加当前连通区域面积
        grid[x][y] = 0; // 标记已访问

        // 四个方向的偏移量
        const dirs = [
          [0, 1], // 右
          [0, -1], // 左
          [1, 0], // 下
          [-1, 0], // 上
        ];

        // 将邻居加入队列中
        for (const [a, b] of dirs) {
          const nx = x + a;
          const ny = y + b;
          queue.push([nx, ny]);
        }
      }
      res = Math.max(res, cur);
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在二维网格中寻找最大的连通陆地区域
   - 连通性定义：上下左右四个方向相邻的陆地格子
   - 需要计算每个连通区域的面积，找出最大值

2. 算法分析：
   - 时间复杂度：O(m * n)，其中m和n是网格的行数和列数
     * 每个格子最多被访问一次
     * 标记已访问避免重复计算
   - 空间复杂度：O(m * n)，最坏情况下递归栈深度或队列大小
   - 算法类型：深度优先搜索 (DFS) / 广度优先搜索 (BFS)

3. 实现要点：
   - 遍历整个网格，对每个陆地格子进行搜索
   - 使用标记避免重复访问（将访问过的格子设为0）
   - 四个方向的偏移量数组简化代码
   - 边界条件检查防止越界

4. 三种解法的比较：
   - DFS递归：代码简洁，但可能栈溢出
   - DFS栈实现：避免栈溢出，适合大型连通区域
   - BFS队列：层序遍历，适合处理大型连通区域

5. 优化思路：
   - 原地修改网格，避免额外的visited数组
   - 提前返回：如果当前连通区域面积已经不可能超过最大值，可以提前结束
   - 方向数组：使用数组存储偏移量，代码更简洁

6. 关键技巧：
   - 边界检查：确保坐标在有效范围内
   - 标记访问：避免重复计算同一区域
   - 面积计算：每个陆地格子贡献1的面积
   - 最大值更新：实时更新最大面积

7. 类似问题：
   - 岛屿数量 (200)
   - 被围绕的区域 (130)
   - 太平洋大西洋水流问题 (417)
   - 任何需要计算连通区域的问题

8. 算法优势：
   - 时间复杂度线性，每个格子只访问一次
   - 空间复杂度可控，避免重复访问
   - 代码简洁，易于理解和实现
*/
