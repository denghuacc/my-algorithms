/*
 * @lc app=leetcode.cn id=3508 lang=typescript
 *
 * [3508] 设计路由器
 *
 * https://leetcode.cn/problems/implement-router/description/
 *
 * algorithms
 * Medium (25.56%)
 * Likes:    26
 * Dislikes: 0
 * Total Accepted:    10K
 * Total Submissions: 25.2K
 * Testcase Example:  '["Router","addPacket","addPacket","addPacket","addPacket","addPacket","forwardPacket","addPacket","getCount"]\n' +
  '[[3],[1,4,90],[2,5,90],[1,4,90],[3,5,95],[4,5,105],[],[5,2,110],[5,100,110]]'
 *
 * 请你设计一个数据结构来高效管理网络路由器中的数据包。每个数据包包含以下属性：
 * 
 * 
 * source：生成该数据包的机器的唯一标识符。
 * destination：目标机器的唯一标识符。
 * timestamp：该数据包到达路由器的时间戳。
 * 
 * 
 * 实现 Router 类：
 * 
 * Router(int memoryLimit)：初始化路由器对象，并设置固定的内存限制。
 * 
 * 
 * memoryLimit 是路由器在任意时间点可以存储的 最大 数据包数量。
 * 如果添加一个新数据包会超过这个限制，则必须移除 最旧的 数据包以腾出空间。
 * 
 * 
 * bool addPacket(int source, int destination, int
 * timestamp)：将具有给定属性的数据包添加到路由器。
 * 
 * 
 * 如果路由器中已经存在一个具有相同 source、destination 和 timestamp 的数据包，则视为重复数据包。
 * 如果数据包成功添加（即不是重复数据包），返回 true；否则返回 false。
 * 
 * 
 * int[] forwardPacket()：以 FIFO（先进先出）顺序转发下一个数据包。
 * 
 * 
 * 从存储中移除该数据包。
 * 以数组 [source, destination, timestamp] 的形式返回该数据包。
 * 如果没有数据包可以转发，则返回空数组。
 * 
 * 
 * int getCount(int destination, int startTime, int endTime)：
 * 
 * 
 * 返回当前存储在路由器中（即尚未转发）的，且目标地址为指定 destination 且时间戳在范围 [startTime,
 * endTime]（包括两端）内的数据包数量。
 * 
 * 
 * 注意：对于 addPacket 的查询会按照 timestamp 的递增顺序进行。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * ["Router", "addPacket", "addPacket", "addPacket", "addPacket", "addPacket",
 * "forwardPacket", "addPacket", "getCount"]
 * [[3], [1, 4, 90], [2, 5, 90], [1, 4, 90], [3, 5, 95], [4, 5, 105], [], [5,
 * 2, 110], [5, 100, 110]]
 * 
 * 输出：
 * [null, true, true, false, true, true, [2, 5, 90], true, 1] 
 * 
 * 解释：
 * Router router = new Router(3); // 初始化路由器，内存限制为 3。
 * router.addPacket(1, 4, 90); // 数据包被添加，返回 True。
 * router.addPacket(2, 5, 90); // 数据包被添加，返回 True。
 * router.addPacket(1, 4, 90); // 这是一个重复数据包，返回 False。
 * router.addPacket(3, 5, 95); // 数据包被添加，返回 True。
 * router.addPacket(4, 5, 105); // 数据包被添加，[1, 4, 90] 被移除，因为数据包数量超过限制，返回 True。
 * router.forwardPacket(); // 转发数据包 [2, 5, 90] 并将其从路由器中移除。
 * router.addPacket(5, 2, 110); // 数据包被添加，返回 True。
 * router.getCount(5, 100, 110); // 唯一目标地址为 5 且时间在 [100, 110] 范围内的数据包是 [4, 5,
 * 105]，返回 1。
 * 
 * 示例 2：
 * 
 * 
 * 输入：
 * ["Router", "addPacket", "forwardPacket", "forwardPacket"]
 * [[2], [7, 4, 90], [], []]
 * 
 * 输出：
 * [null, true, [7, 4, 90], []] 
 * 
 * 解释：
 * Router router = new Router(2); // 初始化路由器，内存限制为 2。
 * router.addPacket(7, 4, 90); // 返回 True。
 * router.forwardPacket(); // 返回 [7, 4, 90]。
 * router.forwardPacket(); // 没有数据包可以转发，返回 []。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 2 <= memoryLimit <= 10^5
 * 1 <= source, destination <= 2 * 10^5
 * 1 <= timestamp <= 10^9
 * 1 <= startTime <= endTime <= 10^9
 * addPacket、forwardPacket 和 getCount 方法的总调用次数最多为 10^5。
 * 对于 addPacket 的查询，timestamp 按递增顺序给出。
 * 
 * 
 */

// @lc code=start
class Router {
  private memoryLimit: number;
  // FIFO队列，存储数据包的完整信息 [source, destination, timestamp]
  private packetQueue: Array<[number, number, number]>;
  // 用于快速检测重复数据包的哈希集合
  private packetSet: Set<string>;
  // 核心优化：Map<destination, [timestamps[], removedCount]>
  // timestamps[] 存储该目标地址的所有时间戳（按递增顺序）
  // removedCount 记录已转发的数据包数量，用于二分查找的起始位置
  private destToTimestamps: Map<number, [number[], number]>;

  constructor(memoryLimit: number) {
    this.memoryLimit = memoryLimit;
    this.packetQueue = [];
    this.packetSet = new Set();
    this.destToTimestamps = new Map();
  }

  addPacket(source: number, destination: number, timestamp: number): boolean {
    const packetKey = this.key(source, destination, timestamp);

    // 1. 重复数据包检测：O(1)
    if (this.packetSet.has(packetKey)) {
      return false;
    }

    // 2. 内存管理：当达到内存限制时，自动转发最旧的数据包
    // 这里直接调用 forwardPacket() 而不是手动删除，简化逻辑
    if (this.packetQueue.length === this.memoryLimit) {
      this.forwardPacket();
    }

    // 3. 添加新数据包到队列和哈希集合
    this.packetQueue.push([source, destination, timestamp]);
    this.packetSet.add(packetKey);

    // 4. 更新目标地址的时间戳数组
    // 由于题目保证 timestamp 按递增顺序，直接 push 即可维持有序性
    if (!this.destToTimestamps.has(destination)) {
      this.destToTimestamps.set(destination, [[], 0]);
    }
    this.destToTimestamps.get(destination)![0].push(timestamp);
    return true;
  }

  forwardPacket(): number[] {
    if (this.packetQueue.length === 0) {
      return [];
    }

    // 从队列头部移除数据包（FIFO）
    const [source, destination, timestamp] = this.packetQueue.shift()!;
    const packetKey = this.key(source, destination, timestamp);

    // 从重复检测集合中移除
    this.packetSet.delete(packetKey);

    // 关键优化：不直接删除时间戳，而是增加已移除计数
    // 这避免了数组删除操作的 O(n) 复杂度
    this.destToTimestamps.get(destination)![1]++;

    return [source, destination, timestamp];
  }

  getCount(destination: number, startTime: number, endTime: number): number {
    const entry = this.destToTimestamps.get(destination);
    if (!entry) {
      return 0;
    }

    // 核心优化：使用二分查找计算范围内的数据包数量
    // entry[0] 是时间戳数组，entry[1] 是已转发的数据包数量
    const timestamps = entry[0];
    const removedCount = entry[1];

    // 找到 >= startTime 的第一个位置（左边界）
    const left = this.lowerBound(timestamps, startTime, removedCount);
    // 找到 > endTime 的第一个位置（右边界）
    const right = this.lowerBound(timestamps, endTime + 1, removedCount);

    // 范围内的数据包数量 = right - left
    return right - left;
  }

  /**
   * 生成数据包的唯一标识符
   * 使用逗号分隔三个字段，确保唯一性
   */
  private key(source: number, destination: number, timestamp: number): string {
    return `${source},${destination},${timestamp}`;
  }

  /**
   * 二分查找：在有序数组中找到第一个 >= target 的位置
   * @param arr 有序数组
   * @param target 目标值
   * @param left 搜索起始位置（已转发的数据包数量）
   * @returns 第一个 >= target 的索引位置
   */
  private lowerBound(arr: number[], target: number, left: number): number {
    let right = arr.length;

    // 标准的二分查找模板
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (arr[mid] < target) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }
    return right;
  }
}

/**
 * Your Router object will be instantiated and called as such:
 * var obj = new Router(memoryLimit)
 * var param_1 = obj.addPacket(source,destination,timestamp)
 * var param_2 = obj.forwardPacket()
 * var param_3 = obj.getCount(destination,startTime,endTime)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计路由器数据结构，支持添加、转发、统计数据包
   - 核心挑战：在有限内存下高效管理数据包，并快速执行范围查询
   - 关键约束：FIFO顺序、重复检测、内存限制、时间戳递增输入

2. 算法分析：
   - 时间复杂度：
     * addPacket: O(1) - 哈希表操作 + 数组尾部插入
     * forwardPacket: O(1) - 队列头部删除 + 计数器更新  
     * getCount: O(log k) - 二分查找，k为目标地址的时间戳数量
   - 空间复杂度：O(n) - n为内存限制数量
   - 算法类型：队列 + 哈希表 + 二分查找

3. 核心设计思想：
   - 时间换空间优化：不删除已转发的时间戳，用计数器记录偏移
   - 利用输入特性：timestamp按递增顺序，数组天然有序
   - 范围查询优化：二分查找替代线性扫描

4. 数据结构设计：
   ```typescript
   packetQueue: Array<[number, number, number]>  // FIFO队列
   packetSet: Set<string>                        // 重复检测
   destToTimestamps: Map<destination, [timestamps[], removedCount]>
   ```
   
   关键创新点：
   - timestamps[] 存储所有时间戳，保持有序（利用输入特性）
   - removedCount 记录已转发数量，避免数组删除操作
   - 二分查找时从 removedCount 开始，跳过已转发的数据包

5. 核心算法步骤：

   ### addPacket 流程：
   1. 生成唯一键检查重复 - O(1)
   2. 内存满时自动转发最旧数据包 - O(1) 
   3. 添加到队列和哈希集合 - O(1)
   4. 追加时间戳到有序数组 - O(1)（利用递增特性）

   ### forwardPacket 流程：
   1. 从队列头部取出数据包 - O(1)
   2. 从哈希集合移除 - O(1)
   3. 增加已转发计数器 - O(1)（避免数组删除）

   ### getCount 流程：
   1. 获取目标地址的时间戳数组和偏移量
   2. 二分查找 startTime 的左边界 - O(log k)
   3. 二分查找 endTime+1 的右边界 - O(log k)
   4. 返回 right - left

6. 性能优化关键：
   - **避免数组删除**：转发时不删除时间戳，用计数器标记
   - **利用输入有序性**：timestamp递增，数组天然有序
   - **二分查找**：O(log k) 替代 O(k) 的线性扫描
   - **延迟删除**：只在真正需要时才清理过期数据

7. 示例执行追踪：
   ```
   初始状态：memoryLimit=3
   
   addPacket(1,4,90):
   - queue: [[1,4,90]]
   - destMap: {4: [[90], 0]}
   
   addPacket(2,5,90):
   - queue: [[1,4,90], [2,5,90]]  
   - destMap: {4: [[90], 0], 5: [[90], 0]}
   
   addPacket(1,4,90): 
   - 重复数据包，返回 false
   
   addPacket(3,5,95):
   - queue: [[1,4,90], [2,5,90], [3,5,95]]
   - destMap: {4: [[90], 0], 5: [[90,95], 0]}
   
   addPacket(4,5,105):
   - 内存满，先转发 [1,4,90]
   - destMap: {4: [[90], 1], 5: [[90,95], 0]}  // 4的removedCount+1
   - 然后添加新数据包
   - queue: [[2,5,90], [3,5,95], [4,5,105]]
   - destMap: {4: [[90], 1], 5: [[90,95,105], 0]}
   
   getCount(5, 100, 110):
   - timestamps: [90,95,105], removedCount: 0
   - lowerBound([90,95,105], 100, 0) = 2  // 第一个>=100的位置
   - lowerBound([90,95,105], 111, 0) = 3  // 第一个>=111的位置  
   - 返回 3-2 = 1 （只有105在范围内）
   ```

8. 边界情况处理：
   - 空队列转发：返回空数组
   - 不存在的目标地址：返回0
   - 范围查询越界：二分查找自然处理
   - 内存限制为1：正常工作，每次添加都会转发

9. 时间复杂度分析：
   - 最坏情况：10^5次操作，每次getCount最多O(log(10^5))
   - 总时间复杂度：O(n log n)，远优于朴素O(n²)方案
   - 关键优化：二分查找 + 延迟删除策略

10. 算法优势：
    - 充分利用题目约束（时间戳递增）
    - 避免了昂贵的数组删除操作
    - 二分查找大幅优化范围查询性能
    - 代码简洁，逻辑清晰

11. 扩展思考：
    - 如果时间戳不保证递增，需要在插入时维护有序性
    - 对于超大数据量，可考虑定期清理过期时间戳
    - 可以扩展支持更复杂的查询条件（源地址范围等）
*/
