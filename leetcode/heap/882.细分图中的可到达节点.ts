/*
 * @lc app=leetcode.cn id=882 lang=typescript
 *
 * [882] 细分图中的可到达节点
 *
 * https://leetcode.cn/problems/reachable-nodes-in-subdivided-graph/description/
 *
 * algorithms
 * Hard (49.90%)
 * Likes:    98
 * Dislikes: 0
 * Total Accepted:    6.1K
 * Total Submissions: 10.4K
 * Testcase Example:  '[[0,1,10],[0,2,1],[1,2,2]]\n6\n3'
 *
 * 给你一个无向图（原始图），图中有 n 个节点，编号从 0 到 n - 1 。你决定将图中的每条边 细分 为一条节点链，每条边之间的新节点数各不相同。
 *
 * 图用由边组成的二维数组 edges 表示，其中 edges[i] = [ui, vi, cnti] 表示原始图中节点 ui 和 vi
 * 之间存在一条边，cnti 是将边 细分 后的新节点总数。注意，cnti == 0 表示边不可细分。
 *
 * 要 细分 边 [ui, vi] ，需要将其替换为 (cnti + 1) 条新边，和 cnti 个新节点。新节点为 x1, x2, ..., xcnti
 * ，新边为 [ui, x1], [x1, x2], [x2, x3], ..., [xcnti+1, xcnti], [xcnti, vi] 。
 *
 * 现在得到一个 新的细分图 ，请你计算从节点 0 出发，可以到达多少个节点？如果节点间距离是 maxMoves 或更少，则视为 可以到达 。
 *
 * 给你原始图和 maxMoves ，返回 新的细分图中从节点 0 出发 可到达的节点数 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：edges = [[0,1,10],[0,2,1],[1,2,2]], maxMoves = 6, n = 3
 * 输出：13
 * 解释：边的细分情况如上图所示。
 * 可以到达的节点已经用黄色标注出来。
 *
 *
 * 示例 2：
 *
 *
 * 输入：edges = [[0,1,4],[1,2,6],[0,2,8],[1,3,1]], maxMoves = 10, n = 4
 * 输出：23
 *
 *
 * 示例 3：
 *
 *
 * 输入：edges = [[1,2,4],[1,4,5],[1,3,1],[2,3,4],[3,4,5]], maxMoves = 17, n = 5
 * 输出：1
 * 解释：节点 0 与图的其余部分没有连通，所以只有节点 0 可以到达。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 0 <= edges.length <= min(n * (n - 1) / 2, 10^4)
 * edges[i].length == 3
 * 0 <= ui < vi < n
 * 图中 不存在平行边
 * 0 <= cnti <= 10^4
 * 0 <= maxMoves <= 10^9
 * 1 <= n <= 3000
 *
 *
 */

export {};

// @lc code=start
class Heap<T> {
  items: T[] = [];
  compare: (a: T, b: T) => boolean;

  constructor(compare: (a: T, b: T) => boolean = (a, b) => a < b) {
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

// Dijkstra cv
function reachableNodes(
  edges: number[][],
  maxMoves: number,
  n: number
): number {
  const adList: number[][][] = Array.from(new Array(n), () => []);
  for (const [u, v, nodes] of edges) {
    adList[u].push([v, nodes]);
    adList[v].push([u, nodes]);
  }
  const used: Map<number, number> = new Map();
  const visited: Set<number> = new Set();
  let res = 0;
  const pq = new Heap<[number, number]>((a, b) => a?.[0] < b?.[0]);
  pq.push([0, 0]);
  while (!pq.isEmpty() && pq.peek()![0] <= maxMoves) {
    const [step, u] = pq.pop()!;
    if (visited.has(u)) {
      continue;
    }
    visited.add(u);
    res++;
    for (const [v, nodes] of adList[u]) {
      if (nodes + step + 1 <= maxMoves && !visited.has(v)) {
        pq.push([nodes + step + 1, v]);
      }
      used.set(u * n + v, Math.min(nodes, maxMoves - step));
    }
  }
  for (const [u, v, nodes] of edges) {
    res += Math.min(
      nodes,
      (used.get(u * n + v) ?? 0) + (used.get(v * n + u) ?? 0)
    );
  }
  return res;
}
// @lc code=end
