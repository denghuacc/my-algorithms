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

// @lc code=start
class KthLargest {
  minHeap: MinHeap;
  k: number;

  constructor(k: number, nums: number[]) {
    this.minHeap = new MinHeap();
    this.k = k;
    for (const x of nums) {
      this.add(x);
    }
  }

  add(val: number): number | null {
    this.minHeap.offer(val);
    if (this.minHeap.size > this.k) {
      this.minHeap.poll();
    }
    return this.minHeap.peek();
  }
}

class MinHeap {
  data: number[];
  comparator: (a: number, b: number) => number;

  constructor(data = []) {
    this.data = data;
    this.comparator = (a, b) => a - b;
    this.heapify();
  }

  get size(): number {
    return this.data.length;
  }

  heapify(): void {
    if (this.size < 2) return;
    for (let i = 1; i < this.size; i++) {
      this.bubbleUp(i);
    }
  }

  peek(): number | null {
    if (this.size === 0) return null;
    return this.data[0];
  }

  offer(value: number): void {
    this.data.push(value);
    this.bubbleUp(this.size - 1);
  }

  poll(): number | null {
    if (this.size === 0) {
      return null;
    }
    const result = this.data[0];
    const last = this.data.pop()!;
    if (this.size !== 0) {
      this.data[0] = last;
      this.bubbleDown(0);
    }
    return result;
  }

  bubbleUp(index: number): void {
    while (index > 0) {
      const parentIndex = (index - 1) >> 1;
      if (this.comparator(this.data[index], this.data[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown(index: number): void {
    const lastIndex = this.size - 1;
    while (true) {
      const leftIndex = index * 2 + 1;
      const rightIndex = index * 2 + 2;
      let findIndex = index;
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
      if (index !== findIndex) {
        this.swap(index, findIndex);
        index = findIndex;
      } else {
        break;
      }
    }
  }

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
