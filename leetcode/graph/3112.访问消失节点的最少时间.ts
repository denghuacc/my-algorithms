/*
 * @lc app=leetcode.cn id=3112 lang=typescript
 *
 * [3112] 访问消失节点的最少时间
 *
 * https://leetcode.cn/problems/minimum-time-to-visit-disappearing-nodes/description/
 *
 * algorithms
 * Medium (35.91%)
 * Likes:    21
 * Dislikes: 0
 * Total Accepted:    6.1K
 * Total Submissions: 13.3K
 * Testcase Example:  '3\n[[0,1,2],[1,2,1],[0,2,4]]\n[1,1,5]'
 *
 * 给你一个二维数组 edges 表示一个 n 个点的无向图，其中 edges[i] = [ui, vi, lengthi] 表示节点 ui 和节点 vi
 * 之间有一条需要 lengthi 单位时间通过的无向边。
 *
 * 同时给你一个数组 disappear ，其中 disappear[i] 表示节点 i 从图中消失的时间点，在那一刻及以后，你无法再访问这个节点。
 *
 * 注意，图有可能一开始是不连通的，两个节点之间也可能有多条边。
 *
 * 请你返回数组 answer ，answer[i] 表示从节点 0 到节点 i 需要的 最少 单位时间。如果从节点 0 出发 无法 到达节点 i ，那么
 * res[i] 为 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,1,5]
 *
 * 输出：[0,-1,4]
 *
 * 解释：
 *
 * 我们从节点 0 出发，目的是用最少的时间在其他节点消失之前到达它们。
 *
 *
 * 对于节点 0 ，我们不需要任何时间，因为它就是我们的起点。
 * 对于节点 1 ，我们需要至少 2 单位时间，通过 edges[0] 到达。但当我们到达的时候，它已经消失了，所以我们无法到达它。
 * 对于节点 2 ，我们需要至少 4 单位时间，通过 edges[2] 到达。
 *
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：n = 3, edges = [[0,1,2],[1,2,1],[0,2,4]], disappear = [1,3,5]
 *
 * 输出：[0,2,3]
 *
 * 解释：
 *
 * 我们从节点 0 出发，目的是用最少的时间在其他节点消失之前到达它们。
 *
 *
 * 对于节点 0 ，我们不需要任何时间，因为它就是我们的起点。
 * 对于节点 1 ，我们需要至少 2 单位时间，通过 edges[0] 到达。
 * 对于节点 2 ，我们需要至少 3 单位时间，通过 edges[0] 和 edges[1] 到达。
 *
 *
 *
 * 示例 3：
 *
 *
 * 输入：n = 2, edges = [[0,1,1]], disappear = [1,1]
 *
 * 输出：[0,-1]
 *
 * 解释：
 *
 * 当我们到达节点 1 的时候，它恰好消失，所以我们无法到达节点 1 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 5 * 10^4
 * 0 <= edges.length <= 10^5
 * edges[i] == [ui, vi, lengthi]
 * 0 <= ui, vi <= n - 1
 * 1 <= lengthi <= 10^5
 * disappear.length == n
 * 1 <= disappear[i] <= 10^5
 *
 *
 */

export {};

// @lc code=start
// graph Dijktra
function minimumTime(
  n: number,
  edges: number[][],
  disappear: number[]
): number[] {
  const adj: number[][][] = Array.from(new Array(n), () => []);
  for (const [u, v, length] of edges) {
    adj[u].push([v, length]);
    adj[v].push([u, length]);
  }
  const pq = new Heap<[number, number]>((a, b) => a[0] < b[0]);
  pq.push([0, 0]);
  const res = Array(n).fill(-1);
  res[0] = 0;
  while (!pq.isEmpty()) {
    const [t, u] = pq.pop()!;
    if (t !== res[u]) {
      continue;
    }
    for (const [v, length] of adj[u]) {
      if (t + length < disappear[v] && (res[v] === -1 || t + length < res[v])) {
        pq.push([t + length, v]);
        res[v] = t + length;
      }
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
