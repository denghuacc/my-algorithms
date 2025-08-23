/*
 * @lc app=leetcode.cn id=347 lang=typescript
 *
 * [347] 前K个高频元素
 *
 * https://leetcode-cn.com/problems/top-k-frequent-elements/description/
 *
 * algorithms
 * Medium (53.30%)
 * Total Accepted:    9.7K
 * Total Submissions: 17.7K
 * Testcase Example:  '[1,1,1,2,2,3]\n2'
 *
 * 给定一个非空的整数数组，返回其中出现频率前 k 高的元素。
 *
 * 示例 1:
 *
 * 输入: nums = [1,1,1,2,2,3], k = 2
 * 输出: [1,2]
 *
 *
 * 示例 2:
 *
 * 输入: nums = [1], k = 1
 * 输出: [1]
 *
 * 说明：
 *
 *
 * 你可以假设给定的 k 总是合理的，且 1 ≤ k ≤ 数组中不相同的元素的个数。
 * 你的算法的时间复杂度必须优于 O(n log n) , n 是数组的大小。
 *
 *
 */

// @lc code=start
/**
 * 找出数组中前k个高频元素
 * 方法一：哈希表 + 排序
 * @param nums 输入数组
 * @param k 需要返回的高频元素个数
 * @returns 前k个高频元素数组
 */
var topKFrequent = function (nums: number[], k: number): number[] {
  // 第一步：统计每个元素的出现频率
  const map: Map<number, number> = new Map();
  for (const num of nums) {
    // 使用空值合并运算符，如果元素不存在则初始化为0，然后+1
    map.set(num, (map.get(num) ?? 0) + 1);
  }

  // 第二步：按照频率降序排序
  // 将Map转换为数组，然后按频率（value）进行降序排序
  const sortMap = new Map([...map].sort((a, b) => b[1] - a[1]));

  // 第三步：提取前k个元素
  const keyArr = Array.from(sortMap.keys()); // 获取排序后的所有key
  const ret = keyArr.slice(0, k); // 取前k个

  return ret;
};

/**
 * 方法二：最小堆实现（更优解法）
 * 时间复杂度：O(n log k)，空间复杂度：O(n + k)
 */
class FrequencyMinHeap {
  data: [number, number][] = []; // 存储[元素值, 频率]对

  constructor() {
    this.data = [];
  }

  get size(): number {
    return this.data.length;
  }

  // 比较函数：按频率比较，频率小的优先级高（最小堆）
  private compare(a: [number, number], b: [number, number]): boolean {
    return a[1] < b[1]; // 比较频率
  }

  offer(item: [number, number]): void {
    this.data.push(item);
    this.siftUp(this.size - 1);
  }

  poll(): [number, number] | undefined {
    if (this.size === 0) return undefined;

    const result = this.data[0];
    const last = this.data.pop()!;

    if (this.size > 0) {
      this.data[0] = last;
      this.siftDown(0);
    }

    return result;
  }

  peek(): [number, number] | undefined {
    return this.size > 0 ? this.data[0] : undefined;
  }

  private siftUp(index: number): void {
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.data[index], this.data[parentIndex])) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  private siftDown(index: number): void {
    while (true) {
      const leftChild = 2 * index + 1;
      const rightChild = 2 * index + 2;
      let smallest = index;

      if (
        leftChild < this.size &&
        this.compare(this.data[leftChild], this.data[smallest])
      ) {
        smallest = leftChild;
      }

      if (
        rightChild < this.size &&
        this.compare(this.data[rightChild], this.data[smallest])
      ) {
        smallest = rightChild;
      }

      if (smallest !== index) {
        this.swap(index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  }

  private swap(i: number, j: number): void {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }
}

/**
 * 使用最小堆的优化版本
 * @param nums 输入数组
 * @param k 需要返回的高频元素个数
 * @returns 前k个高频元素数组
 */
function topKFrequentOptimized(nums: number[], k: number): number[] {
  // 第一步：统计频率
  const frequencyMap = new Map<number, number>();
  for (const num of nums) {
    frequencyMap.set(num, (frequencyMap.get(num) ?? 0) + 1);
  }

  // 第二步：使用最小堆维护前k个高频元素
  const minHeap = new FrequencyMinHeap();

  for (const [num, freq] of frequencyMap) {
    minHeap.offer([num, freq]);

    // 如果堆大小超过k，移除频率最小的元素
    if (minHeap.size > k) {
      minHeap.poll();
    }
  }

  // 第三步：提取结果
  const result: number[] = [];
  while (minHeap.size > 0) {
    const item = minHeap.poll();
    if (item) {
      result.push(item[0]); // 只要元素值，不要频率
    }
  }

  return result.reverse(); // 因为是最小堆，所以需要反转得到降序
}
// @lc code=end

/*
解题思路详解：

1. 问题本质：
   - 找出数组中出现频率最高的k个元素
   - 需要统计频率并按频率排序
   - 时间复杂度要求优于O(n log n)

2. 方法一：哈希表 + 排序（当前实现）
   - 时间复杂度：O(n + m log m)，其中n是数组长度，m是不同元素个数
   - 空间复杂度：O(m)，用于存储哈希表
   - 步骤：
     1. 用Map统计每个元素的出现频率
     2. 将Map转换为数组并按频率降序排序
     3. 取前k个元素

3. 方法二：最小堆（更优解法）
   - 时间复杂度：O(n + m log k)，其中n是数组长度，m是不同元素个数
   - 空间复杂度：O(m + k)
   - 优势：当k << m时，性能更好
   - 步骤：
     1. 用Map统计频率
     2. 用大小为k的最小堆维护前k个高频元素
     3. 遍历频率表，如果堆未满就加入，如果堆满且当前频率大于堆顶，则替换

4. 核心思想：
   - 为什么用最小堆而不是最大堆？
     * 我们要维护前k个最大频率的元素
     * 使用最小堆可以快速淘汰频率较小的元素
     * 堆顶是k个元素中频率最小的，方便比较和替换

5. 算法对比：
   方法一（排序）：
   - 优点：实现简单，代码清晰
   - 缺点：当m很大时效率低
   
   方法二（堆）：
   - 优点：当k << m时效率更高，满足题目要求
   - 缺点：实现稍复杂，需要自定义堆

6. 实现要点：
   - 使用Map而不是Object统计频率，支持数字和字符串key
   - 最小堆存储[元素值, 频率]对，按频率比较
   - 最终结果需要反转，因为最小堆弹出顺序是频率从小到大

7. 边界情况：
   - k等于不同元素个数：返回所有元素
   - 数组中所有元素相同：任意返回k个相同元素
   - k为1：返回频率最高的元素

8. 其他解法：
   - 桶排序：O(n)时间复杂度，空间复杂度O(n)
   - 快速选择：平均O(n)，最坏O(n²)
   - 计数排序：适用于频率范围小的情况
*/
