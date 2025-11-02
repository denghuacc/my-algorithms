/*
 * @lc app=leetcode.cn id=2257 lang=typescript
 *
 * [2257] 统计网格图中没有被保卫的格子数
 *
 * https://leetcode.cn/problems/count-unguarded-cells-in-the-grid/description/
 *
 * algorithms
 * Medium (53.42%)
 * Likes:    35
 * Dislikes: 0
 * Total Accepted:    8.4K
 * Total Submissions: 14.9K
 * Testcase Example:  '4\n6\n[[0,0],[1,1],[2,3]]\n[[0,1],[2,2],[1,4]]'
 *
 * 给你两个整数 m 和 n 表示一个下标从 0 开始的 m x n 网格图。同时给你两个二维整数数组 guards 和 walls ，其中
 * guards[i] = [rowi, coli] 且 walls[j] = [rowj, colj] ，分别表示第 i 个警卫和第 j
 * 座墙所在的位置。
 *
 * 一个警卫能看到 4 个坐标轴方向（即东、南、西、北）的 所有 格子，除非他们被一座墙或者另外一个警卫 挡住 了视线。如果一个格子能被 至少
 * 一个警卫看到，那么我们说这个格子被 保卫 了。
 *
 * 请你返回空格子中，有多少个格子是 没被保卫 的。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
 * 输出：7
 * 解释：上图中，被保卫和没有被保卫的格子分别用红色和绿色表示。
 * 总共有 7 个没有被保卫的格子，所以我们返回 7 。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
 * 输出：4
 * 解释：上图中，没有被保卫的格子用绿色表示。
 * 总共有 4 个没有被保卫的格子，所以我们返回 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m, n <= 10^5
 * 2 <= m * n <= 10^5
 * 1 <= guards.length, walls.length <= 5 * 10^4
 * 2 <= guards.length + walls.length <= m * n
 * guards[i].length == walls[j].length == 2
 * 0 <= rowi, rowj < m
 * 0 <= coli, colj < n
 * guards 和 walls 中所有位置 互不相同 。
 *
 *
 */

export {};

// @lc code=start
/**
 * 统计网格图中没有被保卫的格子数
 *
 * @description
 * 使用 BFS + 位运算优化的解法。核心思想是从每个警卫位置出发，
 * 向四个方向传播视线，标记所有能被看到的格子。
 * 使用位运算记录每个格子被哪些方向的视线覆盖，避免重复处理。
 *
 * @param m - 网格行数
 * @param n - 网格列数
 * @param guards - 警卫位置数组
 * @param walls - 墙的位置数组
 * @returns 未被保卫的格子数量
 */
function countUnguarded(
  m: number,
  n: number,
  guards: number[][],
  walls: number[][]
): number {
  // 1. 初始化网格，使用不同的值表示不同状态：
  //    0: 空格子（未被保卫）
  //    正数: 被保卫的格子（通过位运算记录方向）
  //    -1: 警卫位置
  //    -2: 墙的位置
  const grid = Array.from({ length: m }, () => Array(n).fill(0));

  // 2. 使用双端队列存储 BFS 的状态：[x坐标, y坐标, 方向]
  const queue = new MyDeque<[number, number, number]>();

  // 3. 标记所有墙的位置
  for (const [x, y] of walls) {
    grid[x][y] = -2;
  }

  // 4. 标记所有警卫位置，并将每个警卫的四个方向加入队列
  //    每个警卫会向上、下、左、右四个方向发射视线
  for (const [x, y] of guards) {
    grid[x][y] = -1;
    // 将四个方向都加入队列：0-上，1-下，2-左，3-右
    for (let k = 0; k < 4; k++) {
      queue.pushLast([x, y, k]);
    }
  }

  // 5. 定义四个方向的移动向量
  //    dx[0]=-1, dy[0]=0 表示向上（行减1）
  //    dx[1]=1,  dy[1]=0 表示向下（行加1）
  //    dx[2]=0,  dy[2]=-1 表示向左（列减1）
  //    dx[3]=0,  dy[3]=1 表示向右（列加1）
  const dx = [-1, 1, 0, 0];
  const dy = [0, 0, -1, 1];

  // 6. BFS 模拟警卫的视线传播
  //    关键思路：每个警卫的视线会沿着一个方向直线传播，
  //    直到遇到墙、另一个警卫或边界为止
  while (!queue.isEmpty()) {
    const [x, y, dir] = queue.popFront()!;

    // 6.1 计算当前方向的下一个格子坐标
    const nx = x + dx[dir];
    const ny = y + dy[dir];

    // 6.2 边界检查：确保下一个格子在网格内，且不是墙或警卫
    //     grid[nx][ny] >= 0 表示该格子是空格子或已被保卫的格子
    //     grid[nx][ny] < 0 表示是墙(-2)或警卫(-1)，会阻挡视线
    if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid[nx][ny] >= 0) {
      // 6.3 位运算优化：使用位掩码检查该格子是否已经被这个方向标记过
      //     这是算法的关键优化点，避免重复处理同一方向的视线
      //
      //     位运算说明：
      //     (1 << dir) 创建一个只有第 dir 位为 1 的数字：
      //       dir=0 (上): 0001 (二进制) = 1 (十进制)
      //       dir=1 (下): 0010 (二进制) = 2 (十进制)
      //       dir=2 (左): 0100 (二进制) = 4 (十进制)
      //       dir=3 (右): 1000 (二进制) = 8 (十进制)
      //
      //     grid[nx][ny] & (1 << dir) 通过按位与操作检查第 dir 位是否为 1
      //     如果结果为 0，说明该方向还没有被标记过
      if ((grid[nx][ny] & (1 << dir)) === 0) {
        // 6.4 使用按位或操作标记该方向
        //     |= 表示按位或赋值，将第 dir 位设置为 1
        //     例如：如果 grid[nx][ny] = 0010 (已被下方向标记)
        //          执行 grid[nx][ny] |= (1 << 3) 后
        //          变成 0010 | 1000 = 1010 (同时被下和右方向标记)
        grid[nx][ny] |= 1 << dir;

        // 6.5 将这个格子加入队列，继续向同方向传播视线
        //     这样视线会一直传播到遇到障碍物为止
        queue.pushLast([nx, ny, dir]);
      }
      // 6.6 如果该方向已经标记过，说明之前已经处理过这个方向的视线传播
      //     无需重复处理，直接跳过（这是关键优化，避免无限循环和重复计算）
    }
    // 6.7 如果遇到墙、警卫或边界，视线被阻挡，不再继续传播该方向
  }

  // 7. 统计未被保卫的格子数量
  //    遍历整个网格，grid[i][j] === 0 表示该格子从未被任何方向的视线标记
  let res = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) {
        res++;
      }
    }
  }
  return res;
}

/**
 * 双端队列的实现
 * 用于 BFS 中高效的队列操作
 */
class MyDeque<T> {
  items: Record<string, T>;
  frontPointer: number;
  rearPointer: number;

  constructor() {
    this.items = {};
    this.frontPointer = 0;
    this.rearPointer = 0;
  }

  get size(): number {
    return this.rearPointer - this.frontPointer;
  }

  pushFront(val: T) {
    this.frontPointer--;
    this.items[this.frontPointer] = val;
  }

  pushLast(val: T) {
    this.items[this.rearPointer] = val;
    this.rearPointer++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.frontPointer];
    delete this.items[this.frontPointer];
    this.frontPointer++;
    return res;
  }

  popLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.rearPointer--;
    const res = this.items[this.rearPointer];
    delete this.items[this.rearPointer];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontPointer];
  }

  peekLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.rearPointer - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.rearPointer = 0;
    this.frontPointer = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}

// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个网格图的视线覆盖问题
   - 每个警卫可以向四个方向（上下左右）看到所有格子，直到遇到墙或另一个警卫
   - 需要统计有多少格子没有被任何警卫的视线覆盖
   - 关键挑战：如何高效地处理多个警卫的视线重叠问题

2. 算法分析：
   - 时间复杂度：O(m*n + guards*4) ≈ O(m*n)
     * 初始化网格：O(m*n)
     * 标记墙和警卫：O(walls + guards)
     * BFS 传播视线：每个格子最多被每个方向访问一次，O(m*n*4) = O(m*n)
     * 统计结果：O(m*n)
   - 空间复杂度：O(m*n)
     * 网格数组：O(m*n)
     * 队列最坏情况：O(m*n)
   - 算法类型：BFS (广度优先搜索) + 位运算优化

3. 解题思路：

   3.1 核心思想
   - 使用 BFS 模拟警卫的视线传播过程
   - 每个警卫向四个方向发射视线，视线会一直传播直到遇到障碍物
   - 使用位运算记录每个格子被哪些方向的视线覆盖过，避免重复处理

   3.2 关键观察
   - 视线沿直线传播，可以用方向向量 (dx, dy) 表示
   - 同一方向的视线在同一格子上只需要处理一次
   - 使用 4 个二进制位可以精确记录 4 个方向的访问状态

   3.3 算法步骤
   步骤1：初始化网格，使用不同值标记不同状态
          0: 空格子（未被保卫）
          正数: 被保卫的格子（位掩码记录方向）
          -1: 警卫
          -2: 墙
   
   步骤2：标记所有墙的位置（-2）
   
   步骤3：标记所有警卫位置（-1），并将每个警卫的四个方向加入队列
          队列元素格式：[x坐标, y坐标, 方向编号]
   
   步骤4：BFS 处理队列
          - 取出队列头部元素 [x, y, dir]
          - 计算该方向的下一个格子 [nx, ny]
          - 如果下一个格子合法且未被该方向标记：
            * 使用位运算标记该方向：grid[nx][ny] |= (1 << dir)
            * 将下一个格子加入队列，继续传播
          - 如果遇到墙、警卫或边界，停止该方向的传播
   
   步骤5：遍历网格，统计值为 0 的格子数量

4. 实现要点：

   4.1 位运算优化（核心技巧）
   - 使用一个整数的 4 个二进制位记录 4 个方向的访问状态
   - 位 0：上方向 (1 << 0 = 1)
   - 位 1：下方向 (1 << 1 = 2)
   - 位 2：左方向 (1 << 2 = 4)
   - 位 3：右方向 (1 << 3 = 8)
   
   检查某方向是否被标记：(grid[x][y] & (1 << dir)) === 0
   标记某方向：grid[x][y] |= (1 << dir)

   4.2 数据结构选择
   - 使用二维数组表示网格，空间换时间
   - 使用双端队列实现 BFS，支持高效的头部出队和尾部入队操作
   - 队列存储三元组 [x, y, dir]，包含位置和方向信息

   4.3 边界条件处理
   - 检查坐标是否在 [0, m) 和 [0, n) 范围内
   - grid[x][y] >= 0 表示该位置可以被视线穿过
   - grid[x][y] < 0 表示该位置会阻挡视线（墙或警卫）

   4.4 避免重复处理
   - 使用位掩码检查格子是否已被该方向的视线覆盖
   - 如果已覆盖，不再加入队列，避免无限循环和重复计算

5. 示例分析：

   示例：m=4, n=6, guards=[[0,0],[1,1],[2,3]], walls=[[0,1],[2,2],[1,4]]
   
   步骤1：初始化 4x6 网格，所有格子为 0
   
   步骤2：标记墙（-2）
   grid[0][1] = -2
   grid[2][2] = -2
   grid[1][4] = -2
   
   步骤3：标记警卫（-1）并入队
   grid[0][0] = -1，入队 [0,0,0], [0,0,1], [0,0,2], [0,0,3]
   grid[1][1] = -1，入队 [1,1,0], [1,1,1], [1,1,2], [1,1,3]
   grid[2][3] = -1，入队 [2,3,0], [2,3,1], [2,3,2], [2,3,3]
   
   步骤4：BFS 传播视线
   - 处理 [0,0,1]（警卫[0,0]向下看）：
     标记 [1,0], [2,0], [3,0]
   - 处理 [0,0,3]（警卫[0,0]向右看）：
     遇到墙 [0,1]，停止
   - 处理 [1,1,0]（警卫[1,1]向上看）：
     标记 [0,2]（[0,1]是墙，所以向上传播到[0,2]需要从[1,2]）
   ... 以此类推
   
   步骤5：统计 grid[i][j] === 0 的格子数量
   
   最终结果：7 个未被保卫的格子

6. 算法优势：
   - 使用 BFS 确保每个格子只被访问常数次（每个方向最多一次）
   - 位运算优化大幅减少了重复计算
   - 时间复杂度接近理论最优 O(m*n)
   - 代码简洁，易于理解和实现

7. 常见错误：
   - 忘记使用位运算检查，导致重复处理同一方向，造成无限循环
   - 没有正确处理墙和警卫的阻挡，导致视线穿透障碍物
   - 边界条件判断不完整，导致数组越界
   - 统计时没有排除墙和警卫本身的位置

8. 扩展思考：
   - 如果警卫的视线范围有限（如只能看到 k 格），如何修改算法？
     答：在 BFS 中增加距离参数，当距离超过 k 时停止传播
   
   - 如果有障碍物可以被视线部分穿透，如何处理？
     答：需要修改阻挡条件，可能需要用衰减值记录视线强度
   
   - 类似问题：
     * LeetCode 302: 岛屿数量（类似的网格 BFS）
     * LeetCode 1162: 地图分析（多源 BFS）
     * LeetCode 1284: 转化为全零矩阵的最少反转次数

9. 复杂度优化思考：
   - 当前方案已经比较优秀，时间复杂度 O(m*n) 接近理论最优
   - 空间复杂度可以进一步优化：
     * 如果不需要保留网格状态，可以用三个集合分别存储墙、警卫、被保卫的格子
     * 但这样会增加查询复杂度，总体上不一定更优
*/
