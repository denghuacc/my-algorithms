/*
 * @lc app=leetcode.cn id=2208 lang=typescript
 *
 * [2208] 将数组和减半的最少操作次数
 *
 * https://leetcode.cn/problems/minimum-operations-to-halve-array-sum/description/
 *
 * algorithms
 * Medium (45.97%)
 * Likes:    43
 * Dislikes: 0
 * Total Accepted:    14.8K
 * Total Submissions: 32.2K
 * Testcase Example:  '[5,19,8,1]'
 *
 * 给你一个正整数数组 nums 。每一次操作中，你可以从 nums 中选择 任意 一个数并将它减小到 恰好
 * 一半。（注意，在后续操作中你可以对减半过的数继续执行操作）
 *
 * 请你返回将 nums 数组和 至少 减少一半的 最少 操作数。
 *
 *
 *
 * 示例 1：
 *
 * 输入：nums = [5,19,8,1]
 * 输出：3
 * 解释：初始 nums 的和为 5 + 19 + 8 + 1 = 33 。
 * 以下是将数组和减少至少一半的一种方法：
 * 选择数字 19 并减小为 9.5 。
 * 选择数字 9.5 并减小为 4.75 。
 * 选择数字 8 并减小为 4 。
 * 最终数组为 [5, 4.75, 4, 1] ，和为 5 + 4.75 + 4 + 1 = 14.75 。
 * nums 的和减小了 33 - 14.75 = 18.25 ，减小的部分超过了初始数组和的一半，18.25 >= 33/2 = 16.5 。
 * 我们需要 3 个操作实现题目要求，所以返回 3 。
 * 可以证明，无法通过少于 3 个操作使数组和减少至少一半。
 *
 *
 * 示例 2：
 *
 * 输入：nums = [3,8,20]
 * 输出：3
 * 解释：初始 nums 的和为 3 + 8 + 20 = 31 。
 * 以下是将数组和减少至少一半的一种方法：
 * 选择数字 20 并减小为 10 。
 * 选择数字 10 并减小为 5 。
 * 选择数字 3 并减小为 1.5 。
 * 最终数组为 [1.5, 8, 5] ，和为 1.5 + 8 + 5 = 14.5 。
 * nums 的和减小了 31 - 14.5 = 16.5 ，减小的部分超过了初始数组和的一半， 16.5 >= 31/2 = 16.5 。
 * 我们需要 3 个操作实现题目要求，所以返回 3 。
 * 可以证明，无法通过少于 3 个操作使数组和减少至少一半。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= nums.length <= 10^5
 * 1 <= nums[i] <= 10^7
 *
 *
 */

export {};

// @lc code=start
function halveArray(nums: number[]): number {
  const pq = new Heap<number>();
  let total = 0;
  for (const num of nums) {
    pq.push(num);
    total += num;
  }
  let res = 0;
  let sum = 0;
  while (sum < total / 2) {
    const num = pq.pop()!;
    sum += num / 2;
    pq.push(num / 2);
    res++;
  }
  return res;
}

class Heap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean = (a, b) => a > b) {
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

// @lc code=end
