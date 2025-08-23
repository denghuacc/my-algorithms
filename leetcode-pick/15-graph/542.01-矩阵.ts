/*
 * @lc app=leetcode.cn id=542 lang=typescript
 *
 * [542] 01 矩阵
 *
 * https://leetcode.cn/problems/01-matrix/description/
 *
 * algorithms
 * Medium (46.38%)
 * Likes:    770
 * Dislikes: 0
 * Total Accepted:    118.2K
 * Total Submissions: 254.8K
 * Testcase Example:  '[[0,0,0],[0,1,0],[0,0,0]]'
 *
 * 给定一个由 0 和 1 组成的矩阵 mat ，请输出一个大小相同的矩阵，其中每一个格子是 mat 中对应位置元素到最近的 0 的距离。
 *
 * 两个相邻元素间的距离为 1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[0,0,0]]
 * 输出：[[0,0,0],[0,1,0],[0,0,0]]
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：mat = [[0,0,0],[0,1,0],[1,1,1]]
 * 输出：[[0,0,0],[0,1,0],[1,2,1]]
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == mat.length
 * n == mat[i].length
 * 1
 * 1
 * mat[i][j] is either 0 or 1.
 * mat 中至少有一个 0
 *
 *
 */

export {};

// @lc code=start
/**
 * 广度优先搜索 (BFS) 解决方案
 *
 * 核心思想：从所有0开始进行多源BFS，逐层扩展，计算每个1到最近0的距离
 */
function updateMatrix(mat: number[][]): number[][] {
  // 四个方向的偏移量：右、左、下、上
  const dirs = [
    [0, 1], // 右
    [0, -1], // 左
    [1, 0], // 下
    [-1, 0], // 上
  ];

  const m = mat.length;
  const n = mat[0].length;

  // 结果矩阵，初始化为0
  const res: number[][] = Array.from(new Array(m), () => new Array(n).fill(0));

  // 访问标记数组，避免重复访问
  const visited: boolean[][] = Array.from(new Array(m), () =>
    new Array(n).fill(false)
  );

  // BFS队列，存储待处理的坐标
  const queue: [number, number][] = [];

  // 第一步：将所有0加入队列，标记为已访问
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (mat[i][j] === 0) {
        queue.push([i, j]);
        visited[i][j] = true;
      }
    }
  }

  // 第二步：多源BFS，逐层扩展
  while (queue.length) {
    const [i, j] = queue.shift()!; // 取出当前坐标

    // 检查四个方向的邻居
    for (const [x, y] of dirs) {
      const ni = i + x; // 邻居的行坐标
      const nj = j + y; // 邻居的列坐标

      // 检查边界条件和访问状态
      if (ni >= 0 && ni < m && nj >= 0 && nj < n && !visited[ni][nj]) {
        // 邻居的距离 = 当前距离 + 1
        res[ni][nj] = res[i][j] + 1;
        queue.push([ni, nj]); // 将邻居加入队列
        visited[ni][nj] = true; // 标记为已访问
      }
    }
  }

  return res;
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 计算矩阵中每个1到最近0的曼哈顿距离
   - 等价于：多源最短路径问题
   - 从所有0开始，同时向四周扩展

2. 算法分析：
   - 时间复杂度：O(m * n)，其中m和n是矩阵的行数和列数
     * 每个格子最多被访问一次
     * BFS保证找到最短路径
   - 空间复杂度：O(m * n)，队列和访问数组
   - 算法类型：多源广度优先搜索 (Multi-source BFS)

3. 实现要点：
   - 多源BFS：从所有0同时开始扩展
   - 层序遍历：确保找到最短距离
   - 访问标记：避免重复访问和无限循环
   - 边界检查：确保不越界

4. 算法步骤：
   - 初始化：将所有0加入队列
   - BFS扩展：逐层处理队列中的坐标
   - 距离计算：邻居距离 = 当前距离 + 1
   - 结果返回：返回计算好的距离矩阵

5. 关键技巧：
   - 多源起点：所有0同时作为起点
   - 层序遍历：保证距离递增
   - 方向数组：简化四个方向的遍历
   - 访问标记：避免重复计算

6. 为什么BFS有效：
   - BFS保证按距离递增的顺序访问节点
   - 第一次访问某个1时，就是最短距离
   - 多源BFS同时从所有0开始，找到全局最优解

7. 算法优势：
   - 时间复杂度线性，效率高
   - 保证找到最短距离
   - 代码简洁，易于实现
   - 适合处理网格类问题

8. 类似问题：
   - 岛屿数量 (200)
   - 被围绕的区域 (130)
   - 任何需要计算最短距离的网格问题
   - 多源最短路径问题

9. 优化思路：
   - 原地修改：可以直接修改原矩阵（如果允许）
   - 双向BFS：从0和1同时开始搜索
   - 动态规划：使用DP计算距离
   - 分治：将大矩阵分解为小矩阵

10. 边界情况处理：
    - 矩阵全为0：返回全0矩阵
    - 矩阵全为1：返回全1矩阵（除了0的位置）
    - 单个0：从该0开始扩展
    - 多个0：多源BFS

11. 复杂度分析：
    - 预处理：O(m * n)时间，O(m * n)空间
    - BFS：每个格子最多访问一次
    - 总体：线性时间复杂度，适合大规模数据
*/
