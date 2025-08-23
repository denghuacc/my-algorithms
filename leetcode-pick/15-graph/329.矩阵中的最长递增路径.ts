/*
 * @lc app=leetcode.cn id=329 lang=typescript
 *
 * [329] 矩阵中的最长递增路径
 *
 * https://leetcode-cn.com/problems/longest-increasing-path-in-a-matrix/description/
 *
 * algorithms
 * Hard (36.42%)
 * Likes:    225
 * Dislikes: 0
 * Total Accepted:    17.7K
 * Total Submissions: 42.1K
 * Testcase Example:  '[[9,9,4],[6,6,8],[2,1,1]]'
 *
 * 给定一个整数矩阵，找出最长递增路径的长度。
 *
 * 对于每个单元格，你可以往上，下，左，右四个方向移动。 你不能在对角线方向上移动或移动到边界外（即不允许环绕）。
 *
 * 示例 1:
 *
 * 输入: nums =
 * [
 * ⁠ [9,9,4],
 * ⁠ [6,6,8],
 * ⁠ [2,1,1]
 * ]
 * 输出: 4
 * 解释: 最长递增路径为 [1, 2, 6, 9]。
 *
 * 示例 2:
 *
 * 输入: nums =
 * [
 * ⁠ [3,4,5],
 * ⁠ [3,2,6],
 * ⁠ [2,2,1]
 * ]
 * 输出: 4
 * 解释: 最长递增路径是 [3, 4, 5, 6]。注意不允许在对角线方向上移动。
 *
 *
 */

// @lc code=start
/**
 * 深度优先搜索 + 记忆化 (DFS + Memoization) 解决方案
 *
 * 核心思想：对每个格子进行DFS，计算以该格子为起点的最长递增路径，使用记忆化避免重复计算
 */
function longestIncreasingPath(matrix: number[][]): number {
  // 四个方向的偏移量：上、下、左、右
  const dirs: number[][] = [
    [-1, 0], // 上
    [1, 0], // 下
    [0, -1], // 左
    [0, 1], // 右
  ];

  const rows = matrix.length;
  const columns = rows && matrix[0].length;

  // 记忆化数组，记录每个格子的最长递增路径长度
  const memo: number[][] = Array.from(new Array(rows), () =>
    new Array(columns).fill(0)
  );

  let ret = 0;
  if (rows === 0 || columns === 0) return 0;

  // 遍历每个格子，计算以该格子为起点的最长递增路径
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      ret = Math.max(ret, dfs(matrix, i, j, memo));
    }
  }

  return ret;

  /**
   * 深度优先搜索函数，计算以(row,column)为起点的最长递增路径
   * @param matrix 输入矩阵
   * @param row 当前行坐标
   * @param column 当前列坐标
   * @param memo 记忆化数组
   * @returns 最长递增路径长度
   */
  function dfs(
    matrix: number[][],
    row: number,
    column: number,
    memo: number[][]
  ): number {
    // 如果已经计算过，直接返回记忆化结果
    if (memo[row][column] !== 0) {
      return memo[row][column];
    }

    // 初始长度为1（包含当前格子）
    memo[row][column] += 1;

    // 尝试四个方向
    for (const dir of dirs) {
      const newRow = row + dir[0];
      const newColumn = column + dir[1];

      // 检查边界条件和递增条件
      if (
        newRow >= 0 &&
        newRow < rows &&
        newColumn >= 0 &&
        newColumn < columns &&
        matrix[newRow][newColumn] > matrix[row][column]
      ) {
        // 递归计算邻居的最长路径，并更新当前格子的最长路径
        memo[row][column] = Math.max(
          memo[row][column],
          dfs(matrix, newRow, newColumn, memo) + 1
        );
      }
    }

    return memo[row][column];
  }
}

/**
 * 拓扑排序解决方案
 *
 * 核心思想：将矩阵建模为有向无环图，使用拓扑排序计算最长路径
 */
function longestIncreasingPath2(matrix: number[][]): number {
  // 四个方向的偏移量
  const dirs: number[][] = [
    [-1, 0], // 上
    [1, 0], // 下
    [0, -1], // 左
    [0, 1], // 右
  ];

  const rows = matrix.length;
  const columns = rows && matrix[0].length;

  // 出度数组，记录每个格子有多少个递增的邻居
  const outdegrees: number[][] = Array.from(new Array(rows), () =>
    new Array(columns).fill(0)
  );

  if (rows === 0 || columns === 0) return 0;

  // 计算每个格子的出度
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      for (const dir of dirs) {
        const newRow = i + dir[0];
        const newColumn = j + dir[1];

        // 如果邻居值更大，则当前格子有出边
        if (
          newRow >= 0 &&
          newRow < rows &&
          newColumn >= 0 &&
          newColumn < columns &&
          matrix[newRow][newColumn] > matrix[i][j]
        ) {
          outdegrees[i][j] += 1;
        }
      }
    }
  }

  // 将所有出度为0的格子（终点）加入队列
  const queue: number[][] = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (outdegrees[i][j] === 0) {
        queue.push([i, j]);
      }
    }
  }

  // 拓扑排序，计算层数
  let ret = 0;
  while (queue.length) {
    ret += 1; // 增加一层
    const size = queue.length;

    // 处理当前层的所有格子
    for (let i = 0; i < size; i++) {
      const cell = queue.shift()!;
      const row = cell[0];
      const column = cell[1];

      // 检查所有递减的邻居
      for (const dir of dirs) {
        const newRow = row + dir[0];
        const newColumn = column + dir[1];

        // 如果邻居值更小，减少邻居的出度
        if (
          newRow >= 0 &&
          newRow < rows &&
          newColumn >= 0 &&
          newColumn < columns &&
          matrix[newRow][newColumn] < matrix[row][column]
        ) {
          outdegrees[newRow][newColumn] -= 1;
          // 如果出度变为0，加入队列
          if (outdegrees[newRow][newColumn] === 0) {
            queue.push([newRow, newColumn]);
          }
        }
      }
    }
  }

  return ret;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在矩阵中寻找最长的严格递增路径
   - 路径定义：相邻格子之间只能上下左右移动，且值必须严格递增
   - 等价于：在有向无环图中寻找最长路径

2. 算法分析：
   - 时间复杂度：O(m * n)，其中m和n是矩阵的行数和列数
     * 每个格子最多被访问一次（记忆化）
     * 拓扑排序每个格子最多入队一次
   - 空间复杂度：O(m * n)，记忆化数组或出度数组
   - 算法类型：深度优先搜索 + 记忆化 / 拓扑排序

3. 两种解法的比较：
   - DFS + 记忆化：直观易懂，适合理解问题
   - 拓扑排序：更高效，适合大规模数据

4. DFS + 记忆化实现要点：
   - 对每个格子进行DFS，计算以该格子为起点的最长路径
   - 使用记忆化避免重复计算
   - 四个方向分别尝试，取最大值
   - 边界条件：越界或值不递增

5. 拓扑排序实现要点：
   - 将矩阵建模为有向无环图
   - 计算每个格子的出度（递增邻居数量）
   - 从出度为0的格子开始拓扑排序
   - 层数即为最长路径长度

6. 关键技巧：
   - 记忆化：避免重复计算，提高效率
   - 方向数组：简化四个方向的遍历
   - 边界检查：确保不越界
   - 递增条件：确保路径严格递增

7. 算法步骤（DFS + 记忆化）：
   - 遍历每个格子
   - 对每个格子进行DFS
   - 检查四个方向的邻居
   - 递归计算并取最大值
   - 使用记忆化避免重复

8. 算法步骤（拓扑排序）：
   - 计算每个格子的出度
   - 将所有出度为0的格子加入队列
   - 进行拓扑排序，记录层数
   - 层数即为最长路径长度

9. 类似问题：
   - 最长递增子序列 (300)
   - 矩阵中的路径问题
   - 有向无环图的最长路径
   - 任何需要寻找最长路径的问题

10. 算法优势：
    - 时间复杂度线性，效率高
    - 记忆化避免重复计算
    - 拓扑排序天然处理有向无环图
    - 代码结构清晰，易于理解

11. 边界情况处理：
    - 空矩阵：返回0
    - 单元素矩阵：返回1
    - 所有元素相同：返回1
    - 严格递增序列：返回矩阵大小
*/
