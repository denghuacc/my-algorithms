/*
 * @lc app=leetcode.cn id=3408 lang=typescript
 *
 * [3408] 设计任务管理器
 *
 * https://leetcode.cn/problems/design-task-manager/description/
 *
 * algorithms
 * Medium (27.57%)
 * Likes:    20
 * Dislikes: 0
 * Total Accepted:    8K
 * Total Submissions: 18.7K
 * Testcase Example:  '["TaskManager","add","edit","execTop","rmv","add","execTop"]\n' +
  '[[[[1,101,10],[2,102,20],[3,103,15]]],[4,104,5],[102,8],[],[101],[5,105,15],[]]'
 *
 * 一个任务管理器系统可以让用户管理他们的任务，每个任务有一个优先级。这个系统需要高效地处理添加、修改、执行和删除任务的操作。
 * 
 * 请你设计一个 TaskManager 类：
 * 
 * 
 * 
 * TaskManager(vector<vector<int>>& tasks) 初始化任务管理器，初始化的数组格式为 [userId, taskId,
 * priority] ，表示给 userId 添加一个优先级为 priority 的任务 taskId 。
 * 
 * 
 * void add(int userId, int taskId, int priority) 表示给用户 userId 添加一个优先级为
 * priority 的任务 taskId ，输入 保证 taskId 不在系统中。
 * 
 * 
 * void edit(int taskId, int newPriority) 更新已经存在的任务 taskId 的优先级为 newPriority
 * 。输入 保证 taskId 存在于系统中。
 * 
 * 
 * void rmv(int taskId) 从系统中删除任务 taskId 。输入 保证 taskId 存在于系统中。
 * 
 * 
 * int execTop() 执行所有用户的任务中优先级 最高 的任务，如果有多个任务优先级相同且都为 最高 ，执行 taskId
 * 最大的一个任务。执行完任务后，taskId 从系统中 删除 。同时请你返回这个任务所属的用户 userId 。如果不存在任何任务，返回 -1
 * 。
 * 
 * 
 * 
 * 注意 ，一个用户可能被安排多个任务。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * ["TaskManager", "add", "edit", "execTop", "rmv", "add", "execTop"]
 * [[[[1, 101, 10], [2, 102, 20], [3, 103, 15]]], [4, 104, 5], [102, 8], [],
 * [101], [5, 105, 15], []]
 * 
 * 输出：
 * [null, null, null, 3, null, null, 5] 
 * 
 * 解释：
 * TaskManager taskManager = new TaskManager([[1, 101, 10], [2, 102, 20], [3,
 * 103, 15]]); // 分别给用户 1 ，2 和 3 初始化一个任务。
 * taskManager.add(4, 104, 5); // 给用户 4 添加优先级为 5 的任务 104 。
 * taskManager.edit(102, 8); // 更新任务 102 的优先级为 8 。
 * taskManager.execTop(); // 返回 3 。执行用户 3 的任务 103 。
 * taskManager.rmv(101); // 将系统中的任务 101 删除。
 * taskManager.add(5, 105, 15); // 给用户 5 添加优先级为 15 的任务 105 。
 * taskManager.execTop(); // 返回 5 。执行用户 5 的任务 105 。
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= tasks.length <= 10^5
 * 0 <= userId <= 10^5
 * 0 <= taskId <= 10^5
 * 0 <= priority <= 10^9
 * 0 <= newPriority <= 10^9
 * add ，edit ，rmv 和 execTop 的总操作次数 加起来 不超过 2 * 10^5 次。
 * 输入保证 taskId 是合法的。
 * 
 * 
 */

export {};

// @lc code=start
class TaskManager {
  // 存储任务信息：taskId -> [priority, userId]
  // 用于快速查找任务的所有者和当前优先级
  taskInfo: Map<number, [number, number]>;

  // 最大堆，存储 [priority, taskId] 对
  // 用于快速获取优先级最高的任务
  heap: MyHeap<[number, number]>;

  constructor(tasks: number[][]) {
    // 初始化任务信息映射表
    this.taskInfo = new Map();

    // 初始化最大堆，比较函数：
    // 1. 优先按优先级降序排列（高优先级在前）
    // 2. 优先级相同时，按taskId降序排列（大taskId在前）
    this.heap = new MyHeap((a, b) =>
      a[0] === b[0] ? a[1] > b[1] : a[0] > b[0]
    );

    // 初始化时添加所有任务
    for (const [userId, taskId, priority] of tasks) {
      // 在映射表中记录任务信息：[优先级, 用户ID]
      this.taskInfo.set(taskId, [priority, userId]);
      // 在堆中插入任务：[优先级, 任务ID]
      this.heap.push([priority, taskId]);
    }
  }

  /**
   * 添加新任务
   * @param userId - 用户ID
   * @param taskId - 任务ID（保证唯一）
   * @param priority - 任务优先级
   */
  add(userId: number, taskId: number, priority: number): void {
    // 在映射表中记录新任务信息
    this.taskInfo.set(taskId, [priority, userId]);
    // 在堆中插入新任务
    this.heap.push([priority, taskId]);
  }

  /**
   * 编辑已存在任务的优先级
   * @param taskId - 要编辑的任务ID
   * @param newPriority - 新的优先级
   */
  edit(taskId: number, newPriority: number): void {
    if (this.taskInfo.has(taskId)) {
      // 获取任务的用户ID（保持不变）
      const [, userId] = this.taskInfo.get(taskId)!;
      // 更新任务信息：新的优先级，相同的用户ID
      this.taskInfo.set(taskId, [newPriority, userId]);
      // 在堆中插入新的优先级记录（旧记录会在execTop时被过滤掉）
      this.heap.push([newPriority, taskId]);
    }
  }

  /**
   * 删除指定任务
   * @param taskId - 要删除的任务ID
   */
  rmv(taskId: number): void {
    if (this.taskInfo.has(taskId)) {
      // 从映射表中删除任务信息
      // 注意：堆中的记录不会立即删除，会在execTop时被过滤掉
      this.taskInfo.delete(taskId);
    }
  }

  /**
   * 执行优先级最高的任务
   * @returns 执行任务的用户ID，如果没有任务则返回-1
   */
  execTop(): number {
    // 持续从堆顶取出任务，直到找到有效的任务
    while (!this.heap.isEmpty()) {
      // 取出堆顶元素：[优先级, 任务ID]
      const [priority, taskId] = this.heap.pop()!;

      // 检查任务是否仍然有效：
      // 1. 任务仍然存在于映射表中（未被删除）
      // 2. 任务的优先级与堆中记录的优先级一致（未被编辑过）
      if (
        this.taskInfo.has(taskId) &&
        this.taskInfo.get(taskId)![0] === priority
      ) {
        // 获取任务所属的用户ID
        const userId = this.taskInfo.get(taskId)![1];
        // 从映射表中删除已执行的任务
        this.taskInfo.delete(taskId);
        // 返回执行任务的用户ID
        return userId;
      }
      // 如果任务无效，继续从堆中取出下一个任务
    }

    // 堆为空，没有可执行的任务
    return -1;
  }
}

class MyHeap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
    this.items = [];
    this.compare = compare;
  }

  get size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  private parent(index: number): number {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    } else {
      return 0;
    }
  }

  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  push(val: T) {
    this.items.push(val);
    this.siftUp(this.size - 1);
  }

  pop(): T | undefined {
    const res = this.peek();
    this.swap(this.items, 0, this.size - 1);
    this.items.pop();
    this.siftDown(0);
    return res;
  }

  peek(): T | undefined {
    if (!this.isEmpty()) {
      return this.items[0];
    }
  }

  private siftUp(index: number): void {
    while (
      index > 0 &&
      this.compare(this.items[index], this.items[this.parent(index)])
    ) {
      this.swap(this.items, index, this.parent(index));
      index = this.parent(index);
    }
  }

  private siftDown(index: number): void {
    while (this.leftChild(index) < this.size) {
      let pos = this.leftChild(index);

      if (
        pos + 1 < this.size &&
        this.compare(this.items[pos + 1], this.items[pos])
      ) {
        pos = pos + 1; // right child
      }
      if (this.compare(this.items[index], this.items[pos])) {
        break;
      }
      this.swap(this.items, index, pos);
      index = pos;
    }
  }

  private swap(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Your TaskManager object will be instantiated and called as such:
 * var obj = new TaskManager(tasks)
 * obj.add(userId,taskId,priority)
 * obj.edit(taskId,newPriority)
 * obj.rmv(taskId)
 * var param_4 = obj.execTop()
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个任务管理系统，支持添加、编辑、删除任务，并能快速获取优先级最高的任务
   - 核心挑战：如何在频繁的增删改操作中，高效地维护任务的优先级排序
   - 关键约束：优先级相同时，选择taskId最大的任务

2. 算法分析：
   - 时间复杂度：
     * add: O(log n) - 堆插入操作
     * edit: O(log n) - 堆插入操作（延迟删除策略）
     * rmv: O(1) - 哈希表删除操作
     * execTop: O(log n) 到 O(k*log n) - k为无效任务数量
   - 空间复杂度：O(n) - 存储所有任务信息和堆数据
   - 算法类型：堆 + 哈希表 + 延迟删除

3. 核心设计思想：
   - 双数据结构策略：哈希表 + 最大堆
     * 哈希表：快速查找任务信息（O(1)）
     * 最大堆：快速获取最高优先级任务（O(log n)）
   - 延迟删除策略：解决堆中元素修改和删除的难题
     * 不直接从堆中删除元素（堆不支持随机删除）
     * 在execTop时过滤无效任务（已删除或已修改的任务）

4. 数据结构选择：
   - taskInfo: Map<number, [number, number]>
     * key: taskId，value: [priority, userId]
     * 作用：存储任务的完整信息，支持O(1)查找
   - heap: MyHeap<[number, number]>
     * 存储[priority, taskId]对
     * 比较函数：优先按priority降序，相同时按taskId降序
     * 作用：快速获取优先级最高的任务

5. 关键实现细节：
   - 堆的比较函数设计：
     ```typescript
     (a, b) => a[0] === b[0] ? a[1] > b[1] : a[0] > b[0]
     ```
     * 首先按优先级降序排列
     * 优先级相同时，按taskId降序排列（满足题目要求）
   
   - 延迟删除的实现：
     * edit操作：不删除旧记录，直接插入新记录
     * rmv操作：只从哈希表删除，堆中记录保留
     * execTop操作：检查任务有效性，过滤无效任务

6. 示例分析：
   初始任务：[[1, 101, 10], [2, 102, 20], [3, 103, 15]]
   
   堆状态：[20,102] -> [15,103] -> [10,101]
   映射表：{101: [10,1], 102: [20,2], 103: [15,3]}
   
   edit(102, 8) 后：
   堆状态：[20,102] -> [15,103] -> [10,101] -> [8,102]
   映射表：{101: [10,1], 102: [8,2], 103: [15,3]}
   
   execTop() 执行过程：
   1. 取出[20,102]，检查102的优先级是8≠20，无效
   2. 取出[15,103]，检查103的优先级是15=15，有效，执行并返回3

7. 算法优势：
   - 时间复杂度优秀：所有操作都是O(log n)或O(1)
   - 实现简单：利用堆的天然排序特性
   - 空间效率：延迟删除避免了复杂的堆维护操作
   - 扩展性好：容易支持其他优先级策略

8. 潜在优化：
   - 如果edit和rmv操作频繁，可以考虑使用平衡二叉搜索树
   - 对于大量重复优先级的情况，可以考虑使用多级堆结构
   - 可以使用计数器来跟踪堆中的无效元素数量

9. 边界情况处理：
   - 空任务列表：execTop返回-1
   - 重复taskId：题目保证不会出现
   - 优先级为0：正常处理，0也是有效优先级
   - 大量edit操作：堆中会积累无效记录，但execTop会过滤

10. 类似问题：
    - 设计Twitter：需要维护时间线排序
    - 任务调度器：需要按优先级调度任务
    - 排行榜系统：需要维护动态排序
    - 缓存系统：需要LRU/LFU策略
*/
