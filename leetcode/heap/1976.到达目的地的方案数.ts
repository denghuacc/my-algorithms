/*
 * @lc app=leetcode.cn id=1976 lang=typescript
 *
 * [1976] 到达目的地的方案数
 *
 * https://leetcode.cn/problems/number-of-ways-to-arrive-at-destination/description/
 *
 * algorithms
 * Medium (40.68%)
 * Likes:    90
 * Dislikes: 0
 * Total Accepted:    9.4K
 * Total Submissions: 23.1K
 * Testcase Example:  '7\n' +
  '[[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]'
 *
 * 你在一个城市里，城市由 n 个路口组成，路口编号为 0 到 n - 1 ，某些路口之间有 双向
 * 道路。输入保证你可以从任意路口出发到达其他任意路口，且任意两个路口之间最多有一条路。
 * 
 * 给你一个整数 n 和二维整数数组 roads ，其中 roads[i] = [ui, vi, timei] 表示在路口 ui 和 vi
 * 之间有一条需要花费 timei 时间才能通过的道路。你想知道花费 最少时间 从路口 0 出发到达路口 n - 1 的方案数。
 * 
 * 请返回花费 最少时间 到达目的地的 路径数目 。由于答案可能很大，将结果对 10^9 + 7 取余 后返回。
 * 
 * 
 * 
 * 示例 1：
 * 
 * 输入：n = 7, roads =
 * [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
 * 输出：4
 * 解释：从路口 0 出发到路口 6 花费的最少时间是 7 分钟。
 * 四条花费 7 分钟的路径分别为：
 * - 0 ➝ 6
 * - 0 ➝ 4 ➝ 6
 * - 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
 * - 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
 * 
 * 
 * 示例 2：
 * 
 * 输入：n = 2, roads = [[1,0,10]]
 * 输出：1
 * 解释：只有一条从路口 0 到路口 1 的路，花费 10 分钟。
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 <= n <= 200
 * n - 1 <= roads.length <= n * (n - 1) / 2
 * roads[i].length == 3
 * 0 <= ui, vi <= n - 1
 * 1 <= timei <= 10^9
 * ui != vi
 * 任意两个路口之间至多有一条路。
 * 从任意路口出发，你能够到达其他任意路口。
 * 
 * 
 */

export {};

// @lc code=start
// Dijkstra cv
function countPaths(n: number, roads: number[][]): number {
  const MOD = 1e9 + 7;
  const graph: number[][][] = Array.from(new Array(n), () => []);
  for (const [x, y, t] of roads) {
    graph[x].push([y, t]);
    graph[y].push([x, t]);
  }

  const dis = [0].concat(Array(n - 1).fill(Infinity));
  const ways = [1].concat(Array(n - 1).fill(0));
  const minQueue = new Heap<[number, number]>((a, b) => a[0] < b[0]);
  minQueue.push([0, 0]);

  while (!minQueue.isEmpty()) {
    const [t, u] = minQueue.peek()!;
    minQueue.pop();
    if (t > dis[u]) continue;
    for (const [v, w] of graph[u]) {
      if (t + w < dis[v]) {
        dis[v] = t + w;
        ways[v] = ways[u];
        minQueue.push([t + w, v]);
      } else if (t + w == dis[v]) {
        ways[v] = (ways[u] + ways[v]) % MOD;
      }
    }
  }
  return ways[n - 1];
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
