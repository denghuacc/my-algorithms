/*
 * @lc app=leetcode.cn id=1962 lang=typescript
 *
 * [1962] 移除石子使总数最小
 *
 * https://leetcode.cn/problems/remove-stones-to-minimize-the-total/description/
 *
 * algorithms
 * Medium (47.26%)
 * Likes:    42
 * Dislikes: 0
 * Total Accepted:    18.9K
 * Total Submissions: 32.7K
 * Testcase Example:  '[5,4,9]\n2'
 *
 * 给你一个整数数组 piles ，数组 下标从 0 开始 ，其中 piles[i] 表示第 i 堆石子中的石子数量。另给你一个整数 k ，请你执行下述操作
 * 恰好 k 次：
 *
 *
 * 选出任一石子堆 piles[i] ，并从中 移除 floor(piles[i] / 2) 颗石子。
 *
 *
 * 注意：你可以对 同一堆 石子多次执行此操作。
 *
 * 返回执行 k 次操作后，剩下石子的 最小 总数。
 *
 * floor(x) 为 小于 或 等于 x 的 最大 整数。（即，对 x 向下取整）。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：piles = [5,4,9], k = 2
 * 输出：12
 * 解释：可能的执行情景如下：
 * - 对第 2 堆石子执行移除操作，石子分布情况变成 [5,4,5] 。
 * - 对第 0 堆石子执行移除操作，石子分布情况变成 [3,4,5] 。
 * 剩下石子的总数为 12 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：piles = [4,3,6,7], k = 3
 * 输出：12
 * 解释：可能的执行情景如下：
 * - 对第 2 堆石子执行移除操作，石子分布情况变成 [4,3,3,7] 。
 * - 对第 3 堆石子执行移除操作，石子分布情况变成 [4,3,3,4] 。
 * - 对第 0 堆石子执行移除操作，石子分布情况变成 [2,3,3,4] 。
 * 剩下石子的总数为 12 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= piles.length <= 10^5
 * 1 <= piles[i] <= 10^4
 * 1 <= k <= 10^5
 *
 *
 */

export {};

// @lc code=start
function minStoneSum(piles: number[], k: number): number {
  const heap = new Heap<number>();
  for (const pile of piles) {
    heap.push(pile);
  }
  while (k > 0) {
    const top = heap.pop()!;
    heap.push(Math.ceil(top / 2));
    k--;
  }
  let sum = 0;
  while (!heap.isEmpty()) {
    sum += heap.pop()!;
  }
  return sum;
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
