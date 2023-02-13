/*
 * @lc app=leetcode.cn id=857 lang=typescript
 *
 * [857] 雇佣 K 名工人的最低成本
 *
 * https://leetcode.cn/problems/minimum-cost-to-hire-k-workers/description/
 *
 * algorithms
 * Hard (49.07%)
 * Likes:    171
 * Dislikes: 0
 * Total Accepted:    5.3K
 * Total Submissions: 10K
 * Testcase Example:  '[10,20,5]\n[70,50,30]\n2'
 *
 * 有 n 名工人。 给定两个数组 quality 和 wage ，其中，quality[i] 表示第 i 名工人的工作质量，其最低期望工资为
 * wage[i] 。
 *
 * 现在我们想雇佣 k 名工人组成一个工资组。在雇佣 一组 k 名工人时，我们必须按照下述规则向他们支付工资：
 *
 *
 * 对工资组中的每名工人，应当按其工作质量与同组其他工人的工作质量的比例来支付工资。
 * 工资组中的每名工人至少应当得到他们的最低期望工资。
 *
 *
 * 给定整数 k ，返回 组成满足上述条件的付费群体所需的最小金额 。在实际答案的 10^-5 以内的答案将被接受。。
 *
 *
 *
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入： quality = [10,20,5], wage = [70,50,30], k = 2
 * 输出： 105.00000
 * 解释： 我们向 0 号工人支付 70，向 2 号工人支付 35。
 *
 * 示例 2：
 *
 *
 * 输入： quality = [3,1,10,10,1], wage = [4,8,2,2,7], k = 3
 * 输出： 30.66667
 * 解释： 我们向 0 号工人支付 4，向 2 号和 3 号分别支付 13.33333。
 *
 *
 *
 * 提示：
 *
 *
 * n == quality.length == wage.length
 * 1 <= k <= n <= 10^4
 * 1 <= quality[i], wage[i] <= 10^4
 *
 *
 */

export {};

// @lc code=start
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

function mincostToHireWorkers(
  quality: number[],
  wage: number[],
  k: number
): number {
  const n = quality.length;
  const h = new Array(n).fill(0).map((_, i) => i);
  h.sort((a, b) => {
    return quality[b] * wage[a] - quality[a] * wage[b];
  });
  let res = 1e9;
  let totalQuality = 0.0;
  const pq = new Heap<number>();
  for (let i = 0; i < k - 1; i++) {
    totalQuality += quality[h[i]];
    pq.push(quality[h[i]]);
  }
  for (let i = k - 1; i < n; i++) {
    const idx = h[i];
    totalQuality += quality[idx];
    pq.push(quality[idx]);
    const totalCost = (wage[idx] / quality[idx]) * totalQuality;
    res = Math.min(res, totalCost);
    totalQuality -= pq.pop()!;
  }
  return res;
}
// @lc code=end
