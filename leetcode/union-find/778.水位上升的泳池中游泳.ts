/*
 * @lc app=leetcode.cn id=778 lang=typescript
 *
 * [778] 水位上升的泳池中游泳
 *
 * https://leetcode-cn.com/problems/swim-in-rising-water/description/
 *
 * algorithms
 * Hard (53.68%)
 * Likes:    108
 * Dislikes: 0
 * Total Accepted:    9.5K
 * Total Submissions: 17.8K
 * Testcase Example:  '[[0,2],[1,3]]'
 *
 * 在一个 N x N 的坐标方格 grid 中，每一个方格的值 grid[i][j] 表示在位置 (i,j) 的平台高度。
 *
 * 现在开始下雨了。当时间为 t 时，此时雨水导致水池中任意位置的水位为 t
 * 。你可以从一个平台游向四周相邻的任意一个平台，但是前提是此时水位必须同时淹没这两个平台。假定你可以瞬间移动无限距离，也就是默认在方格内部游动是不耗时的。当然，在你游泳的时候你必须待在坐标方格里面。
 *
 * 你从坐标方格的左上平台 (0，0) 出发。最少耗时多久你才能到达坐标方格的右下平台 (N-1, N-1)？
 *
 *
 *
 * 示例 1:
 *
 *
 * 输入: [[0,2],[1,3]]
 * 输出: 3
 * 解释:
 * 时间为0时，你位于坐标方格的位置为 (0, 0)。
 * 此时你不能游向任意方向，因为四个相邻方向平台的高度都大于当前时间为 0 时的水位。
 *
 * 等时间到达 3 时，你才可以游向平台 (1, 1). 因为此时的水位是 3，坐标方格中的平台没有比水位 3
 * 更高的，所以你可以游向坐标方格中的任意位置
 *
 *
 * 示例2:
 *
 *
 * 输入:
 * [[0,1,2,3,4],[24,23,22,21,5],[12,13,14,15,16],[11,17,18,19,20],[10,9,8,7,6]]
 * 输出: 16
 * 解释:
 * ⁠0  1  2  3  4
 * 24 23 22 21  5
 * 12 13 14 15 16
 * 11 17 18 19 20
 * 10  9  8  7  6
 *
 * 最终的路线用加粗进行了标记。
 * 我们必须等到时间为 16，此时才能保证平台 (0, 0) 和 (4, 4) 是连通的
 *
 *
 *
 *
 * 提示:
 *
 *
 * 2 .
 * grid[i][j] 是 [0, ..., N*N - 1] 的排列。
 *
 *
 */

// @lc code=start

/**
 * 解法一：并查集（Union-Find）
 * 核心思想：随着时间增长，逐步连通符合条件的相邻格子，直到起点和终点连通
 */
var swimInWater = function (grid: number[][]): number {
  const n = grid.length;

  // 初始化并查集，每个位置初始时都是独立的连通分量
  const f: number[] = new Array(n * n).fill(0).map((_, index) => index);

  // idx数组用于根据高度值快速找到对应的坐标位置
  // idx[height] = [i, j] 表示高度为height的格子位置在(i,j)
  const idx: number[][] = Array.from(new Array(n * n), () =>
    new Array(2).fill(0)
  );

  // 建立高度到坐标的映射关系
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      idx[grid[i][j]][0] = i;
      idx[grid[i][j]][1] = j;
    }
  }

  // 四个方向：右、左、下、上
  const directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  // 按时间顺序（即按高度从小到大）逐步连通格子
  for (let threshold = 0; threshold < n * n; threshold++) {
    // 获取当前时间threshold对应的格子坐标
    const i = idx[threshold][0];
    const j = idx[threshold][1];

    // 检查当前格子的四个相邻格子
    for (const [x, y] of directions) {
      const ni = i + x;
      const nj = j + y;

      // 如果相邻格子在边界内且高度不超过当前阈值，则可以连通
      if (ni >= 0 && ni < n && nj >= 0 && nj < n && grid[ni][nj] <= threshold) {
        // 将当前格子与相邻格子在并查集中合并
        merge(f, i * n + j, ni * n + nj);
      }
    }

    // 检查起点(0,0)和终点(n-1,n-1)是否已经连通
    if (find(f, 0) === find(f, n * n - 1)) {
      return threshold;
    }
  }

  return -1;

  /**
   * 查找并查集中x的根节点，同时进行路径压缩优化
   */
  function find(f: number[], x: number): number {
    if (f[x] === x) {
      return x;
    }
    // 路径压缩：将路径上的所有节点直接指向根节点
    const fa = find(f, f[x]);
    f[x] = fa;
    return fa;
  }

  /**
   * 合并并查集中的两个连通分量
   */
  function merge(f: number[], x: number, y: number) {
    const fx = find(f, x);
    const fy = find(f, y);
    f[fx] = fy;
  }
};

/**
 * 解法二：二分搜索 + BFS
 * 核心思想：二分搜索最小时间，对每个时间用BFS验证是否能从起点到达终点
 */
var swimInWater = function (grid: number[][]): number {
  const n = grid.length;

  // 二分搜索的左右边界
  // 最小时间是0，最大时间是n*n-1（因为grid是0到n*n-1的排列）
  let left = 0;
  let right = n * n - 1;

  // 二分搜索找到最小的可行时间
  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // 检查在时间mid时是否能从起点游到终点
    if (check(grid, mid)) {
      // 如果可以，尝试更小的时间
      right = mid;
    } else {
      // 如果不可以，需要更大的时间
      left = mid + 1;
    }
  }
  return left;

  /**
   * 使用BFS检查在给定阈值时间threshold下，是否能从(0,0)游到(n-1,n-1)
   * @param grid 网格
   * @param threshold 时间阈值，只有高度≤threshold的格子才能通过
   */
  function check(grid: number[][], threshold: number): boolean {
    // 如果起点的高度就超过阈值，无法开始游泳
    if (grid[0][0] > threshold) {
      return false;
    }

    const n = grid.length;

    // visited数组标记已访问的格子
    const visited: boolean[][] = Array.from(new Array(n), () =>
      new Array(n).fill(false)
    );

    // BFS队列，从起点开始
    visited[0][0] = true;
    const queue: [number, number][] = [[0, 0]];

    // 四个移动方向
    const directions = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0],
    ];

    // BFS遍历所有可达的格子
    while (queue.length) {
      const [i, j] = queue.shift()!;

      // 尝试向四个方向移动
      for (const [x, y] of directions) {
        const ni = i + x;
        const nj = j + y;

        // 检查新位置是否在边界内
        if (ni >= 0 && ni < n && nj >= 0 && nj < n) {
          // 如果新位置未访问过且高度不超过阈值，则可以游过去
          if (!visited[ni][nj] && grid[ni][nj] <= threshold) {
            queue.push([ni, nj]);
            visited[ni][nj] = true;
          }
        }
      }
    }

    // 检查是否能到达终点
    return visited[n - 1][n - 1];
  }
};
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 在一个N×N网格中，每个格子有不同的高度（0到N²-1的排列）
   - 只有当时间t≥格子高度时，该格子才会被水淹没，才能通过
   - 需要找到从左上角(0,0)游到右下角(N-1,N-1)的最少时间

2. 核心观察：
   - 随着时间增长，越来越多的格子会被淹没，形成连通区域
   - 我们需要找到使起点和终点连通的最小时间点
   - 这个时间点就是路径上所有格子中的最大高度值

3. 解法一：并查集（Union-Find）
   时间复杂度：O(N²α(N²)) ≈ O(N²)，其中α是反阿克曼函数
   空间复杂度：O(N²)
   
   算法步骤：
   - 按时间顺序（即按高度从0到N²-1）逐步处理每个格子
   - 对于当前时间t，将高度为t的格子与其已淹没的相邻格子连通
   - 使用并查集维护连通性，一旦起点和终点连通就返回当前时间
   
   关键技巧：
   - 使用idx数组建立高度到坐标的映射，实现按高度顺序处理
   - 将二维坐标转换为一维索引：(i,j) → i*n+j
   - 路径压缩优化并查集性能

4. 解法二：二分搜索 + BFS
   时间复杂度：O(N²logN²) = O(N²logN)
   空间复杂度：O(N²)
   
   算法步骤：
   - 二分搜索答案范围[0, N²-1]
   - 对于每个候选时间，用BFS检查是否能从起点到达终点
   - 只能通过高度≤当前时间的格子
   
   优势：
   - 思路直观，容易理解和实现
   - 适用于各种连通性检查问题

5. 算法对比：
   - 并查集解法：时间复杂度更优，适合动态连通性问题
   - 二分+BFS解法：思路更直观，代码更容易理解
   - 两种解法都能正确解决问题，选择取决于具体场景和个人偏好

6. 示例分析：
   对于grid = [[0,2],[1,3]]：
   - t=0: 只有(0,0)可通过，无法到达终点
   - t=1: (0,0)和(1,0)可通过，但仍无法到达(1,1)
   - t=2: (0,0)、(1,0)、(0,1)可通过，但路径不连通
   - t=3: 所有格子都可通过，起点和终点连通，返回3

7. 关键要点：
   - 理解水位上升的含义：时间t时，所有高度≤t的格子都被淹没
   - 连通性判断：只能在相邻且都被淹没的格子间移动
   - 最优化目标：找到能连通起点和终点的最小时间

8. 常见错误：
   - 误解题意：以为需要等水位刚好等于格子高度才能通过
   - 坐标转换错误：二维坐标与一维索引转换时出错
   - 边界检查遗漏：移动到新位置时未检查边界条件

9. 扩展思考：
   - 这类问题的本质是"最小瓶颈路径"问题
   - 可以用Dijkstra算法求解，但并查集和二分搜索更高效
   - 类似问题：网络延迟时间、连通网络的操作次数等
*/
