/*
 * @lc app=leetcode.cn id=703 lang=typescript
 *
 * [703] 数据流中的第 K 大元素
 *
 * https://leetcode-cn.com/problems/kth-largest-element-in-a-stream/description/
 *
 * algorithms
 * Easy (49.08%)
 * Likes:    223
 * Dislikes: 0
 * Total Accepted:    41.9K
 * Total Submissions: 85.5K
 * Testcase Example:  '["KthLargest","add","add","add","add","add"]\n' +
  '[[3,[4,5,8,2]],[3],[5],[10],[9],[4]]'
 *
 * 设计一个找到数据流中第 k 大元素的类（class）。注意是排序后的第 k 大元素，不是第 k 个不同的元素。
 * 
 * 请实现 KthLargest 类：
 * 
 * 
 * KthLargest(int k, int[] nums) 使用整数 k 和整数流 nums 初始化对象。
 * int add(int val) 将 val 插入数据流 nums 后，返回当前数据流中第 k 大的元素。
 * 
 * 
 * 
 * 
 * 示例：
 * 
 * 
 * 输入：
 * ["KthLargest", "add", "add", "add", "add", "add"]
 * [[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
 * 输出：
 * [null, 4, 5, 5, 8, 8]
 * 
 * 解释：
 * KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
 * kthLargest.add(3);   // return 4
 * kthLargest.add(5);   // return 5
 * kthLargest.add(10);  // return 5
 * kthLargest.add(9);   // return 8
 * kthLargest.add(4);   // return 8
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 0 
 * -10^4 
 * -10^4 
 * 最多调用 add 方法 10^4 次
 * 题目数据保证，在查找第 k 大元素时，数组中至少有 k 个元素
 * 
 * 
 */

export {};

// @lc code=start
/**
 * 数据流中的第K大元素类
 * 使用最小堆来维护数据流中最大的k个元素
 */
class KthLargest {
  minHeap: MinHeap; // 最小堆，用于存储最大的k个元素
  k: number; // 需要找到第k大的元素

  /**
   * 构造函数
   * @param k 第k大元素的k值
   * @param nums 初始数组
   */
  constructor(k: number, nums: number[]) {
    this.minHeap = new MinHeap();
    this.k = k;

    // 将初始数组中的所有元素添加到数据流中
    for (const x of nums) {
      this.add(x);
    }
  }

  /**
   * 向数据流中添加一个元素，并返回当前第k大的元素
   * @param val 要添加的元素
   * @returns 当前数据流中第k大的元素
   */
  add(val: number): number | null {
    // 将新元素添加到最小堆中
    this.minHeap.offer(val);

    // 如果堆大小超过k，移除最小的元素
    // 这样堆中始终保持最大的k个元素
    if (this.minHeap.size > this.k) {
      this.minHeap.poll();
    }

    // 堆顶元素就是第k大的元素（堆中最小的元素）
    return this.minHeap.peek();
  }
}

/**
 * 最小堆实现
 * 用于维护一组数据中的最小值在堆顶
 */
class MinHeap {
  data: number[]; // 存储堆数据的数组
  comparator: (a: number, b: number) => number; // 比较函数，用于确定元素优先级

  /**
   * 构造函数
   * @param data 初始数据数组，默认为空数组
   */
  constructor(data = []) {
    this.data = data;
    // 最小堆的比较函数：a - b < 0 表示 a 比 b 小，a 的优先级更高
    this.comparator = (a, b) => a - b;
    this.heapify(); // 对初始数据进行堆化
  }

  /**
   * 获取堆的大小
   */
  get size(): number {
    return this.data.length;
  }

  /**
   * 将数组堆化（自底向上构建堆）
   */
  heapify(): void {
    if (this.size < 2) return;
    // 从第二个元素开始，依次向上调整
    for (let i = 1; i < this.size; i++) {
      this.bubbleUp(i);
    }
  }

  /**
   * 查看堆顶元素但不移除
   * @returns 堆顶元素（最小值）
   */
  peek(): number | null {
    if (this.size === 0) return null;
    return this.data[0];
  }

  /**
   * 向堆中添加元素
   * @param value 要添加的元素
   */
  offer(value: number): void {
    this.data.push(value); // 添加到数组末尾
    this.bubbleUp(this.size - 1); // 向上调整维护堆性质
  }

  /**
   * 移除并返回堆顶元素
   * @returns 堆顶元素（最小值）
   */
  poll(): number | null {
    if (this.size === 0) {
      return null;
    }

    const result = this.data[0]; // 保存堆顶元素
    const last = this.data.pop()!; // 取出最后一个元素

    // 如果堆还有元素，将最后一个元素放到堆顶，然后向下调整
    if (this.size !== 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }

    return result;
  }

  /**
   * 向上调整（上浮）：用于插入新元素后维护堆性质
   * @param index 需要调整的元素索引
   */
  bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1; // 父节点索引：(index-1)/2

      // 如果当前节点比父节点小，交换位置
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break; // 堆性质已满足，停止调整
      }
    }
  }

  /**
   * 向下调整（下沉）：用于删除堆顶元素后维护堆性质
   * @param index 需要调整的元素索引
   */
  bubbleDown(index: number): void {
    const lastIndex = this.size - 1;

    while (true) {
      const leftIndex = index * 2 + 1; // 左子节点索引
      const rightIndex = index * 2 + 2; // 右子节点索引
      let findIndex = index; // 最小值的索引

      // 找到当前节点和其子节点中的最小值
      if (
        leftIndex <= lastIndex &&
        this.comparator(this.data[leftIndex], this.data[findIndex]) < 0
      ) {
        findIndex = leftIndex;
      }

      if (
        rightIndex <= lastIndex &&
        this.comparator(this.data[rightIndex], this.data[findIndex]) < 0
      ) {
        findIndex = rightIndex;
      }

      // 如果最小值不是当前节点，交换并继续调整
      if (index !== findIndex) {
        this.swap(index, findIndex);
        index = findIndex;
      } else {
        break; // 堆性质已满足，停止调整
      }
    }
  }

  /**
   * 交换数组中两个位置的元素
   * @param index1 第一个元素的索引
   * @param index2 第二个元素的索引
   */
  swap(index1: number, index2: number) {
    [this.data[index1], this.data[index2]] = [
      this.data[index2],
      this.data[index1],
    ];
  }
}

/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 设计一个数据结构，能够动态维护数据流中的第k大元素
   - 需要支持add操作，每次添加元素后返回当前第k大的元素
   - 注意是第k大（从大到小排序），不是第k个不同的元素

2. 算法分析：
   - 时间复杂度：add操作 O(log k)，构造函数 O(n log k)
   - 空间复杂度：O(k)，最小堆中最多存储k个元素
   - 算法类型：最小堆（优先队列）

3. 实现要点：
   - 使用最小堆来维护数据流中最大的k个元素
   - 堆顶始终是这k个元素中最小的，即第k大的元素
   - 当堆大小超过k时，移除堆顶（最小元素）
   - 这样保证堆中始终是最大的k个元素

4. 核心思想：
   - 为什么用最小堆而不是最大堆？
     * 我们需要的是第k大元素，即从大到小排序的第k个
     * 如果维护所有元素的最大堆，找第k大需要弹出k-1次，效率低
     * 维护大小为k的最小堆，堆顶就是第k大元素，查询O(1)
   
5. 关键操作流程：
   - 添加元素：offer(val) -> 堆大小+1
   - 检查堆大小：如果 > k，poll()移除最小元素
   - 返回结果：peek()获取堆顶（第k大元素）

6. 示例分析：
   - k=3, nums=[4,5,8,2]
   - 初始化过程：
     * add(4): heap=[4], 返回4 (第3大)
     * add(5): heap=[4,5], 返回4 (第3大)
     * add(8): heap=[4,5,8], 返回4 (第3大)
     * add(2): heap=[2,4,5,8] -> poll() -> heap=[4,5,8], 返回4
   - 后续操作：
     * add(3): heap=[3,4,5,8] -> poll() -> heap=[4,5,8], 返回4
     * add(5): heap=[4,5,5,8] -> poll() -> heap=[5,5,8], 返回5
     * add(10): heap=[5,5,8,10] -> poll() -> heap=[5,8,10], 返回5
     * add(9): heap=[5,8,9,10] -> poll() -> heap=[8,9,10], 返回8

7. 堆操作详解：
   - bubbleUp（上浮）：新元素插入后，与父节点比较，小的上浮
   - bubbleDown（下沉）：删除堆顶后，将末尾元素放到堆顶，然后下沉
   - 堆的性质：父节点 <= 子节点（最小堆）

8. 优化要点：
   - 堆的大小始终不超过k，空间效率高
   - 每次add操作只需要O(log k)时间
   - 相比于每次排序整个数组O(n log n)，效率大大提升
   - 相比于维护有序数组O(n)插入，堆操作更高效

9. 边界情况：
   - 初始数组为空：正常工作，逐个添加元素
   - k=1：堆中只保留一个最大元素
   - 所有元素相同：堆正常维护k个相同元素
   - 数据流元素少于k个：返回当前最小元素

10. 类似问题：
    - 滑动窗口最大值：可以用双端队列优化
    - Top K频繁元素：结合哈希表统计频率
    - 数据流的中位数：需要两个堆（最大堆+最小堆）
*/
