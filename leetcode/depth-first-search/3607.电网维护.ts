/*
 * @lc app=leetcode.cn id=3607 lang=typescript
 *
 * [3607] 电网维护
 *
 * https://leetcode.cn/problems/power-grid-maintenance/description/
 *
 * algorithms
 * Medium (43.80%)
 * Likes:    39
 * Dislikes: 0
 * Total Accepted:    9.7K
 * Total Submissions: 18.5K
 * Testcase Example:  '5\n[[1,2],[2,3],[3,4],[4,5]]\n[[1,3],[2,1],[1,1],[2,2],[1,2]]'
 *
 * 给你一个整数 c，表示 c 个电站，每个电站有一个唯一标识符 id，从 1 到 c 编号。
 *
 * 这些电站通过 n 条 双向 电缆互相连接，表示为一个二维数组 connections，其中每个元素 connections[i] = [ui, vi]
 * 表示电站 ui 和电站 vi 之间的连接。直接或间接连接的电站组成了一个 电网 。
 *
 * 最初，所有 电站均处于在线（正常运行）状态。
 *
 * 另给你一个二维数组 queries，其中每个查询属于以下 两种类型之一 ：
 *
 *
 *
 * [1, x]：请求对电站 x 进行维护检查。如果电站 x 在线，则它自行解决检查。如果电站 x 已离线，则检查由与 x 同一 电网 中 编号最小
 * 的在线电站解决。如果该电网中 不存在 任何 在线 电站，则返回 -1。
 *
 *
 * [2, x]：电站 x 离线（即变为非运行状态）。
 *
 *
 *
 * 返回一个整数数组，表示按照查询中出现的顺序，所有类型为 [1, x] 的查询结果。
 *
 * 注意：电网的结构是固定的；离线（非运行）的节点仍然属于其所在的电网，且离线操作不会改变电网的连接性。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries =
 * [[1,3],[2,1],[1,1],[2,2],[1,2]]
 *
 * 输出： [3,2,3]
 *
 * 解释：
 *
 *
 *
 *
 * 最初，所有电站 {1, 2, 3, 4, 5} 都在线，并组成一个电网。
 * 查询 [1,3]：电站 3 在线，因此维护检查由电站 3 自行解决。
 * 查询 [2,1]：电站 1 离线。剩余在线电站为 {2, 3, 4, 5}。
 * 查询 [1,1]：电站 1 离线，因此检查由电网中编号最小的在线电站解决，即电站 2。
 * 查询 [2,2]：电站 2 离线。剩余在线电站为 {3, 4, 5}。
 * 查询 [1,2]：电站 2 离线，因此检查由电网中编号最小的在线电站解决，即电站 3。
 *
 *
 *
 * 示例 2：
 *
 *
 * 输入： c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]
 *
 * 输出： [1,-1]
 *
 * 解释：
 *
 *
 * 没有连接，因此每个电站是一个独立的电网。
 * 查询 [1,1]：电站 1 在线，且属于其独立电网，因此维护检查由电站 1 自行解决。
 * 查询 [2,1]：电站 1 离线。
 * 查询 [1,1]：电站 1 离线，且其电网中没有其他电站，因此结果为 -1。
 *
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= c <= 10^5
 * 0 <= n == connections.length <= min(10^5, c * (c - 1) / 2)
 * connections[i].length == 2
 * 1 <= ui, vi <= c
 * ui != vi
 * 1 <= queries.length <= 2 * 10^5
 * queries[i].length == 2
 * queries[i][0] 为 1 或 2。
 * 1 <= queries[i][1] <= c
 *
 *
 */

export {};

// @lc code=start

/**
 * 电站节点接口
 */
interface Station {
  /** 电站是否离线 */
  isOffline: boolean;
  /** 所属电网ID */
  gridId: number;
  /** 电站编号 */
  id: number;
}

/**
 * 处理电网维护查询
 * @param c - 电站数量
 * @param connections - 电站之间的连接关系
 * @param queries - 查询列表
 * @returns 类型1查询的结果数组
 */
function processQueries(
  c: number,
  connections: number[][],
  queries: number[][]
): number[] {
  // 1. 构建邻接表表示的图
  const adjacencyList = buildGraph(c, connections);

  // 2. 初始化所有电站节点
  const stations = initializeStations(c);

  // 3. 使用DFS划分电网，每个连通分量是一个电网
  const grids = partitionGrids(c, adjacencyList, stations);

  // 4. 处理所有查询
  return handleQueries(queries, stations, grids);
}

/**
 * 构建邻接表表示的图
 */
function buildGraph(c: number, connections: number[][]): number[][] {
  const adjacencyList: number[][] = Array.from({ length: c + 1 }, () => []);

  // 建立双向连接
  for (const [u, v] of connections) {
    adjacencyList[u].push(v);
    adjacencyList[v].push(u);
  }

  return adjacencyList;
}

/**
 * 初始化所有电站节点
 */
function initializeStations(c: number): Station[] {
  const stations: Station[] = Array.from({ length: c + 1 });

  for (let i = 1; i <= c; i++) {
    stations[i] = {
      isOffline: false,
      gridId: -1,
      id: i,
    };
  }

  return stations;
}

/**
 * 使用DFS划分电网
 * 每个连通分量是一个独立的电网
 */
function partitionGrids(
  c: number,
  adjacencyList: number[][],
  stations: Station[]
): number[][] {
  const grids: number[][] = [];
  let currentGridId = 0;

  // 遍历所有电站，找出所有连通分量
  for (let stationId = 1; stationId <= c; stationId++) {
    if (stations[stationId].gridId === -1) {
      // 发现新的电网，使用DFS遍历这个连通分量
      const gridStations: number[] = [];
      dfsTraverse(
        stationId,
        currentGridId,
        adjacencyList,
        stations,
        gridStations
      );
      // 对电网中的电站按编号排序，保证编号小的在前面
      gridStations.sort((a, b) => a - b);
      grids.push(gridStations);
      currentGridId++;
    }
  }

  return grids;
}

/**
 * DFS遍历连通分量，标记电网ID并收集电站
 */
function dfsTraverse(
  stationId: number,
  gridId: number,
  adjacencyList: number[][],
  stations: Station[],
  gridStations: number[]
): void {
  const station = stations[stationId];

  // 标记当前电站所属的电网ID
  station.gridId = gridId;

  // 将电站ID加入电网数组
  gridStations.push(station.id);

  // 递归访问所有相邻的未访问电站
  for (const neighborId of adjacencyList[stationId]) {
    const neighbor = stations[neighborId];
    if (neighbor.gridId === -1) {
      dfsTraverse(neighborId, gridId, adjacencyList, stations, gridStations);
    }
  }
}

/**
 * 处理所有查询
 */
function handleQueries(
  queries: number[][],
  stations: Station[],
  grids: number[][]
): number[] {
  const results: number[] = [];
  // 为每个电网维护一个指针，指向当前最小的在线电站位置
  const gridPointers: number[] = new Array(grids.length).fill(0);

  for (const [operation, stationId] of queries) {
    if (operation === 1) {
      // 查询类型1：维护检查
      const result = handleMaintenanceQuery(
        stationId,
        stations,
        grids,
        gridPointers
      );
      results.push(result);
    } else if (operation === 2) {
      // 查询类型2：电站离线
      stations[stationId].isOffline = true;
    }
  }

  return results;
}

/**
 * 处理维护检查查询
 * @returns 负责处理的电站ID，如果没有在线电站则返回-1
 */
function handleMaintenanceQuery(
  stationId: number,
  stations: Station[],
  grids: number[][],
  gridPointers: number[]
): number {
  const station = stations[stationId];

  // 如果电站在线，自己处理
  if (!station.isOffline) {
    return stationId;
  }

  // 如果电站离线，找同一电网中编号最小的在线电站
  const gridId = station.gridId;
  const grid = grids[gridId];
  let pointer = gridPointers[gridId];

  // 移动指针，跳过所有离线的电站
  while (pointer < grid.length && stations[grid[pointer]].isOffline) {
    pointer++;
  }

  // 更新指针位置
  gridPointers[gridId] = pointer;

  // 返回编号最小的在线电站，如果没有则返回-1
  return pointer < grid.length ? grid[pointer] : -1;
}

// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 这是一个图的连通性问题，需要维护动态的电站状态（在线/离线）
   - 关键特征：电网结构固定，离线操作不改变连通性，只改变电站状态
   - 目标：对于维护查询，找到同一电网中编号最小的在线电站

2. 算法分析：
   - 时间复杂度：O(C + N + Q·logC)，其中 C 是电站数，N 是连接数，Q 是查询数
     * 构建图：O(N)
     * DFS划分电网：O(C + N)
     * 每个电网排序：O(C·logC)（最坏情况所有电站在一个电网）
     * 处理查询：O(Q)，每个查询均摊O(1)
   - 空间复杂度：O(C + N)
     * 邻接表：O(N)
     * 电站数组：O(C)
     * 电网数组：O(C)
     * 指针数组：O(电网数)
   - 算法类型：图的连通分量 + DFS + 双指针

3. 核心思路：

   **预处理阶段：**
   - 使用DFS将整个图划分为多个连通分量（电网）
   - 每个电网用一个数组存储其包含的电站编号
   - 对每个电网的电站按编号排序，保证编号小的在前面

   **查询处理阶段：**
   - 维护每个电网的指针，指向当前最小的在线电站
   - 类型1查询（维护检查）：
     * 如果电站在线，返回自己的编号
     * 如果电站离线，从所属电网的指针位置开始查找第一个在线电站
     * 移动指针跳过所有离线电站
   - 类型2查询（离线操作）：
     * 标记电站为离线状态

4. 实现要点：

   **数据结构选择：**
   - 邻接表表示图：便于DFS遍历
   - Station接口：封装电站的状态信息
   - 排序数组 + 指针：支持高效查找最小编号的在线电站

   **DFS遍历技巧：**
   - 使用gridId标记访问状态，避免重复访问
   - DFS收集完所有电站后统一排序
   - 保证每个电网内电站编号有序

   **查询优化：**
   - 使用指针懒删除策略：只在查询时才移动指针跳过离线电站
   - 指针永远不回退，保证均摊O(1)的查询时间
   - 避免每次离线操作都更新所有电网

5. 算法步骤详解：

   步骤1：构建图的邻接表
   ```
   对于每条连接[u, v]：
     adjacencyList[u].push(v)
     adjacencyList[v].push(u)
   ```

   步骤2：初始化电站节点
   ```
   对于每个电站i（1到c）：
     创建Station对象，初始状态为在线，gridId为-1
   ```

   步骤3：DFS划分电网并排序
   ```
   对于每个未访问的电站：
     创建新的电网数组
     DFS遍历这个连通分量
     将所有访问到的电站加入数组并标记gridId
     对数组按编号排序
   ```

   步骤4：处理查询（使用指针）
   ```
   初始化每个电网的指针为0
   对于每个查询：
     if 类型1：
       if 电站在线：返回自己
       else：从指针位置开始找第一个在线电站，更新指针
     if 类型2：标记电站为离线
   ```

6. 示例分析：

   **示例1追踪：** c=5, connections=[[1,2],[2,3],[3,4],[4,5]]
   
   预处理阶段：
   - 构建图：1-2-3-4-5（链式结构）
   - DFS划分：所有电站属于同一电网（gridId=0）
   - 排序后电网数组：[1, 2, 3, 4, 5]
   - 指针：pointer[0] = 0

   查询处理：
   - [1,3]：电站3在线 → 返回3
   - [2,1]：电站1离线
   - [1,1]：电站1离线，pointer=0指向1（离线），移到1
           继续检查，grid[1]=2（在线）→ 返回2，pointer=1
   - [2,2]：电站2离线
   - [1,2]：电站2离线，pointer=1指向2（离线），移到2
           继续检查，grid[2]=3（在线）→ 返回3，pointer=2

   **边界情况处理：**
   - 孤立电站：每个电站是独立的电网
   - 所有电站离线：指针超出数组范围，返回-1
   - 完全连通图：所有电站在同一电网

7. 关键优化技巧：

   **懒删除 + 指针策略：**
   - 不在离线操作时立即处理
   - 只在查询时按需移动指针
   - 每个电站最多被访问一次，均摊O(1)

   **排序保证有序性：**
   - DFS后统一排序，保证编号最小的在前
   - 无需维护复杂的数据结构
   - 查询时直接从指针位置线性扫描

   **空间效率：**
   - 使用简单数组存储电网
   - 指针数组额外空间仅O(电网数)
   - 避免使用堆或平衡树的额外开销

8. 算法优势：

   - 预处理简单高效，只需DFS + 排序
   - 查询均摊O(1)，指针永不回退
   - 代码简洁，易于理解和实现
   - 空间复杂度优化，无额外数据结构开销

9. 常见错误：

   - **忘记排序**：DFS遍历顺序不保证编号有序
   - 忘记处理所有电站都离线的情况（应返回-1）
   - 指针更新错误，导致重复检查已离线的电站
   - 未考虑孤立电站的情况

10. 类似问题：

    - LeetCode 323: 无向图中连通分量的数目
    - LeetCode 547: 省份数量
    - LeetCode 1319: 连通网络的操作次数
    - LeetCode 1462: 课程表 IV

11. 扩展思考：

    **如果电站可以重新上线怎么办？**
    - 需要维护每个电网的最小堆或有序集合
    - 离线时从集合中移除，上线时加回集合中

    **如果需要支持动态添加连接怎么办？**
    - 使用并查集维护连通性
    - 合并两个电网时需要合并并排序数组

    **如果查询量极大，如何进一步优化？**
    - 使用线段树或平衡树维护每个电网的在线电站
    - 支持O(logN)的查询和更新
    
    **为什么不继续使用Deque？**
    - 本题的关键是保证电网内电站编号有序
    - DFS遍历顺序无法保证编号有序，必须排序
    - 排序后使用数组+指针比Deque更简单高效
*/
