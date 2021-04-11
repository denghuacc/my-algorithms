/*
 * @lc app=leetcode.cn id=264 lang=typescript
 *
 * [264] 丑数 II
 *
 * https://leetcode-cn.com/problems/ugly-number-ii/description/
 *
 * algorithms
 * Medium (38.00%)
 * Likes:    264
 * Dislikes: 0
 * Total Accepted:    23.4K
 * Total Submissions: 45.7K
 * Testcase Example:  '10'
 *
 * 编写一个程序，找出第 n 个丑数。
 *
 * 丑数就是只包含质因数 2, 3, 5 的正整数。
 *
 * 示例:
 *
 * 输入: n = 10
 * 输出: 12
 * 解释: 1, 2, 3, 4, 5, 6, 8, 9, 10, 12 是前 10 个丑数。
 *
 * 说明:
 *
 *
 * 1 是丑数。
 * n 不超过1690。
 *
 *
 */

export {};

// @lc code=start
// dp
var nthUglyNumber = function (n: number): number {
  const dp: number[] = new Array(n + 1).fill(0);
  dp[1] = 1;
  let p2 = 1;
  let p3 = 1;
  let p5 = 1;

  for (let i = 2; i <= n; i++) {
    const num2 = dp[p2] * 2;
    const num3 = dp[p3] * 3;
    const num5 = dp[p5] * 5;

    dp[i] = Math.min(num2, num3, num5);

    if (dp[i] === num2) p2++;
    if (dp[i] === num3) p3++;
    if (dp[i] === num5) p5++;
  }

  return dp[n];
};

// min heap
var nthUglyNumber = function (n: number): number {
  const factors: number[] = [2, 3, 5];
  const seen: Set<number> = new Set();
  const heap: MinHeap<number> = new MinHeap();
  seen.add(1);
  heap.add(1);

  let ugly = 0;
  for (let i = 0; i < n; i++) {
    ugly = heap.extractMin()!;
    for (const factor of factors) {
      const next = ugly * factor;
      if (!seen.has(next)) {
        seen.add(next);
        heap.add(next);
      }
    }
  }

  return ugly;
};

class MinHeap<T> {
  data: T[] = [];

  constructor(arr?: T[]) {
    if (!arr) {
      this.data = new Array();
    } else {
      // 将一个数组转换成堆
      if (Array.isArray(arr) && arr.length !== 0) {
        this.data = arr;

        // 从最后一个非叶子节点开始下沉，直到第一个元素
        // 因为减少了叶子节点的下沉，比起在空堆中一个一个添加元素效率更高
        for (let i = this.parent(this.size - 1); i >= 0; i--) {
          this.siftDown(i);
        }
      }
    }
  }

  // 获取堆中的元素数量
  get size(): number {
    return this.data.length;
  }

  // 判断堆是否为空
  isEmpty(): boolean {
    return this.data.length === 0;
  }

  // 获取元素的父亲节点的索引
  private parent(index: number): number {
    if (index !== 0) {
      return Math.floor((index - 1) / 2);
    } else {
      return 0;
    }
  }

  // 获取左孩子节点的索引
  private leftChild(index: number): number {
    return index * 2 + 1;
  }

  // 获取右孩子节点的索引
  private rightChild(index: number): number {
    return index * 2 + 2;
  }

  // 添加元素
  add(val: T): void {
    this.data.push(val);
    this.siftUp(this.size - 1);
  }

  // 查找最大元素
  findMin(): T | undefined {
    if (!this.isEmpty()) {
      return this.data[0];
    }
  }

  // 取出最小元素
  extractMin(): T | undefined {
    const ret = this.findMin(); // 先存储返回值（第一个元素）
    swap(this.data, 0, this.size - 1); // 第一个元素和最后一个元素交换位置
    this.data.pop(); // 删除最后一个元素（即原来的第一个元素）
    this.siftDown(0); // 现在的第一个元素下浮
    return ret;
  }

  // 取出堆中的最小值，并且替换成 val
  replace(val: T): T | undefined {
    const ret = this.findMin();
    this.data[0] = val;
    this.siftDown(0);
    return ret;
  }

  // 元素上浮
  private siftUp(index: number): void {
    // 父节点比子节点大时，交换节点位置
    while (index > 0 && this.data[this.parent(index)] > this.data[index]) {
      swap(this.data, index, this.parent(index));
      index = this.parent(index);
    }
  }

  // 元素下沉
  private siftDown(index: number): void {
    // 当存在左子节点时
    while (this.leftChild(index) < this.size) {
      let minIndex = this.leftChild(index);

      // 如果存在右子节点且比左子节点的值更小时，最小的子节点索引赋值为右子节点
      if (minIndex + 1 && this.data[minIndex + 1] < this.data[minIndex]) {
        minIndex = this.rightChild(index);
      }

      // 父节点小于子节点时，下沉终止
      if (this.data[index] <= this.data[minIndex]) break;

      swap(this.data, index, minIndex);
      index = minIndex; // 继续下沉
    }
  }
}

function swap<T>(array: T[], a: number, b: number) {
  [array[a], array[b]] = [array[b], array[a]];
}
// @lc code=end
