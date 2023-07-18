/*
 * @lc app=leetcode.cn id=1851 lang=typescript
 *
 * [1851] 包含每个查询的最小区间
 *
 * https://leetcode.cn/problems/minimum-interval-to-include-each-query/description/
 *
 * algorithms
 * Hard (48.93%)
 * Likes:    77
 * Dislikes: 0
 * Total Accepted:    6.2K
 * Total Submissions: 12.7K
 * Testcase Example:  '[[1,4],[2,4],[3,6],[4,4]]\n[2,3,4,5]'
 *
 * 给你一个二维整数数组 intervals ，其中 intervals[i] = [lefti, righti] 表示第 i 个区间开始于 lefti
 * 、结束于 righti（包含两侧取值，闭区间）。区间的 长度 定义为区间中包含的整数数目，更正式地表达是 righti - lefti + 1 。
 *
 * 再给你一个整数数组 queries 。第 j 个查询的答案是满足 lefti <= queries[j] <= righti 的 长度最小区间 i
 * 的长度 。如果不存在这样的区间，那么答案是 -1 。
 *
 * 以数组形式返回对应查询的所有答案。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：intervals = [[1,4],[2,4],[3,6],[4,4]], queries = [2,3,4,5]
 * 输出：[3,3,1,4]
 * 解释：查询处理如下：
 * - Query = 2 ：区间 [2,4] 是包含 2 的最小区间，答案为 4 - 2 + 1 = 3 。
 * - Query = 3 ：区间 [2,4] 是包含 3 的最小区间，答案为 4 - 2 + 1 = 3 。
 * - Query = 4 ：区间 [4,4] 是包含 4 的最小区间，答案为 4 - 4 + 1 = 1 。
 * - Query = 5 ：区间 [3,6] 是包含 5 的最小区间，答案为 6 - 3 + 1 = 4 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：intervals = [[2,3],[2,5],[1,8],[20,25]], queries = [2,19,5,22]
 * 输出：[2,-1,4,6]
 * 解释：查询处理如下：
 * - Query = 2 ：区间 [2,3] 是包含 2 的最小区间，答案为 3 - 2 + 1 = 2 。
 * - Query = 19：不存在包含 19 的区间，答案为 -1 。
 * - Query = 5 ：区间 [2,5] 是包含 5 的最小区间，答案为 5 - 2 + 1 = 4 。
 * - Query = 22：区间 [20,25] 是包含 22 的最小区间，答案为 25 - 20 + 1 = 6 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= intervals.length <= 10^5
 * 1 <= queries.length <= 10^5
 * intervals[i].length == 2
 * 1 <= lefti <= righti <= 10^7
 * 1 <= queries[j] <= 10^7
 *
 *
 */

export {};

// @lc code=start
function minInterval(intervals: number[][], queries: number[]): number[] {
  const n = queries.length;
  const qIndex = Array.from(new Array(n), (_, index) => index);
  qIndex.sort((a, b) => queries[a] - queries[b]);
  intervals.sort((a, b) => a[0] - b[0]);
  const pq = new Heap<number[]>((a, b) => a?.[0] < b?.[0]);
  const res: number[] = new Array(n).fill(-1);
  let i = 0;
  for (const idx of qIndex) {
    while (i < intervals.length && intervals[i][0] <= queries[idx]) {
      pq.push([
        intervals[i][1] - intervals[i][0] + 1,
        intervals[i][0],
        intervals[i][1],
      ]);
      i++;
    }
    while (!pq.isEmpty() && pq.peek()![2] < queries[idx]) {
      pq.pop();
    }
    if (!pq.isEmpty()) {
      res[idx] = pq.peek()![0];
    }
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
