/*
 * @lc app=leetcode.cn id=1353 lang=typescript
 *
 * [1353] 最多可以参加的会议数目
 *
 * https://leetcode.cn/problems/maximum-number-of-events-that-can-be-attended/description/
 *
 * algorithms
 * Medium (30.95%)
 * Likes:    310
 * Dislikes: 0
 * Total Accepted:    25.8K
 * Total Submissions: 80.7K
 * Testcase Example:  '[[1,2],[2,3],[3,4]]'
 *
 * 给你一个数组 events，其中 events[i] = [startDayi, endDayi] ，表示会议 i 开始于 startDayi ，结束于
 * endDayi 。
 * 
 * 你可以在满足 startDayi <= d <= endDayi 中的任意一天 d 参加会议 i 。在任意一天 d 中只能参加一场会议。
 * 
 * 请你返回你可以参加的 最大 会议数目。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 
 * 
 * 输入：events = [[1,2],[2,3],[3,4]]
 * 输出：3
 * 解释：你可以参加所有的三个会议。
 * 安排会议的一种方案如上图。
 * 第 1 天参加第一个会议。
 * 第 2 天参加第二个会议。
 * 第 3 天参加第三个会议。
 * 
 * 
 * 示例 2：
 * 
 * 
 * 输入：events= [[1,2],[2,3],[3,4],[1,2]]
 * 输出：4
 * 
 * 
 * 
 * 
 * 提示：​​​​​​
 * 
 * 
 * 1 <= events.length <= 10^5
 * events[i].length == 2
 * 1 <= startDayi <= endDayi <= 10^5
 * 
 * 
 */

export {};

// @lc code=start
function maxEvents(events: number[][]): number {
    const n = events.length;
    
    // 找到所有会议的最晚结束时间
    let maxDay = 1;
    for (const [start, end] of events) {
      maxDay = Math.max(maxDay, end);
    }
    
    // 按开始时间排序，便于按时间顺序处理
    events.sort((a, b) => a[0] - b[0]);
    
    // 使用最小堆存储当前可参加的会议的结束时间
    // 堆顶始终是结束时间最早的会议
    const pq = new Heap<number>();
    let res = 0;
    
    // 遍历每一天，从第1天到最晚结束时间
    for (let i = 1, j = 0; i <= maxDay; i++) {
      // 将今天可以开始参加的会议加入堆中
      while (j < n && events[j][0] <= i) {
        pq.push(events[j][1]); // 将结束时间加入堆
        j++;
      }
      
      // 移除已经过期的会议（结束时间早于今天）
      while (!pq.isEmpty() && pq.peek()! < i) {
        pq.pop();
      }
      
      // 如果今天还有可参加的会议，选择结束时间最早的参加
      if (!pq.isEmpty()) {
        pq.pop(); // 参加这个会议
        res++;
      }
    }
    
    return res;
};

class Heap<T> {
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

/*
解题思路详解：

1. 问题本质：
   - 这是一个贪心算法问题，需要在有限的时间内安排最多的会议
   - 每个会议可以在其时间范围内的任意一天参加，每天只能参加一个会议
   - 目标是最大化参加的会议数量

2. 算法分析：
   - 时间复杂度：O(n log n + D log n)，其中 n 是会议数量，D 是最晚结束时间
     * 排序：O(n log n)
     * 遍历每一天：O(D)
     * 堆操作：每次 O(log n)，总共 O(D log n)
   - 空间复杂度：O(n)，用于存储堆
   - 算法类型：贪心算法 + 堆（优先队列）

3. 实现要点：
   - 核心思想：每天选择结束时间最早的会议参加
   - 按开始时间排序：确保按时间顺序处理会议
   - 使用最小堆：维护当前可参加的会议，堆顶是结束时间最早的
   - 贪心策略：优先参加结束时间早的会议，给后续会议留出更多时间

4. 算法步骤：
   a) 找到所有会议的最晚结束时间，确定遍历范围
   b) 按开始时间排序会议数组
   c) 遍历每一天（从第1天到最晚结束时间）：
      - 将今天可以开始的会议加入堆
      - 移除已经过期的会议
      - 如果今天有可参加的会议，选择结束时间最早的参加
   d) 返回参加的会议总数

5. 优化思路：
   - 使用堆来高效维护当前可参加的会议
   - 按时间顺序处理，避免重复计算
   - 及时移除过期会议，减少堆的大小

6. 关键技巧：
   - 贪心选择：每天选择结束时间最早的会议
   - 时间管理：按天遍历，确保时间连续性
   - 堆的应用：动态维护可选择的会议集合

7. 类似问题：
   - 会议室安排问题
   - 任务调度问题
   - 区间覆盖问题
*/

// @lc code=end

