/*
 * @lc app=leetcode.cn id=1489 lang=typescript
 *
 * [1489] 找到最小生成树里的关键边和伪关键边
 *
 * https://leetcode-cn.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/description/
 *
 * algorithms
 * Hard (50.60%)
 * Likes:    37
 * Dislikes: 0
 * Total Accepted:    2.3K
 * Total Submissions: 3.7K
 * Testcase Example:  '5\n[[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]'
 *
 * 给你一个 n 个点的带权无向连通图，节点编号为 0 到 n-1 ，同时还有一个数组 edges ，其中 edges[i] = [fromi, toi,
 * weighti] 表示在 fromi 和 toi 节点之间有一条带权无向边。最小生成树 (MST)
 * 是给定图中边的一个子集，它连接了所有节点且没有环，而且这些边的权值和最小。
 *
 *
 * 请你找到给定图中最小生成树的所有关键边和伪关键边。如果从图中删去某条边，会导致最小生成树的权值和增加，那么我们就说它是一条关键边。伪关键边则是可能会出现在某些最小生成树中但不会出现在所有最小生成树中的边。
 *
 * 请注意，你可以分别以任意顺序返回关键边的下标和伪关键边的下标。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：n = 5, edges = [[0,1,1],[1,2,1],[2,3,2],[0,3,2],[0,4,3],[3,4,3],[1,4,6]]
 * 输出：[[0,1],[2,3,4,5]]
 * 解释：上图描述了给定图。
 * 下图是所有的最小生成树。
 *
 * 注意到第 0 条边和第 1 条边出现在了所有最小生成树中，所以它们是关键边，我们将这两个下标作为输出的第一个列表。
 * 边 2，3，4 和 5 是所有 MST 的剩余边，所以它们是伪关键边。我们将它们作为输出的第二个列表。
 *
 *
 * 示例 2 ：
 *
 *
 *
 * 输入：n = 4, edges = [[0,1,1],[1,2,1],[2,3,1],[0,3,1]]
 * 输出：[[],[0,1,2,3]]
 * 解释：可以观察到 4 条边都有相同的权值，任选它们中的 3 条可以形成一棵 MST 。所以 4 条边都是伪关键边。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 2 <= n <= 100
 * 1 <= edges.length <= min(200, n * (n - 1) / 2)
 * edges[i].length == 3
 * 0 <= fromi < toi < n
 * 1 <= weighti <= 1000
 * 所有 (fromi, toi) 数对都是互不相同的。
 *
 *
 */

export {};

// @lc code=start
// kruskal + union find
function findCriticalAndPseudoCriticalEdges(
  n: number,
  edges: number[][]
): number[][] {
  const m = edges.length;
  for (const [i, edge] of edges.entries()) {
    edge.push(i);
  }
  edges.sort((a, b) => a[2] - b[2]);

  // 计算 value
  const uf_std = new UnionFind(n);
  let value = 0;
  for (let i = 0; i < m; i++) {
    if (uf_std.unite(edges[i][0], edges[i][1])) {
      value += edges[i][2];
    }
  }

  const ret: number[][] = [[], []];

  for (let i = 0; i < m; i++) {
    // 判断是否是关键边
    let uf = new UnionFind(n);
    let v = 0;
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
        v += edges[j][2];
      }
    }
    if (uf.setCount !== 1 || (uf.setCount === 1 && v > value)) {
      ret[0].push(edges[i][3]);
      continue;
    }

    // 判断是否是伪关键边
    uf = new UnionFind(n);
    uf.unite(edges[i][0], edges[i][1]);
    v = edges[i][2];
    for (let j = 0; j < m; j++) {
      if (i !== j && uf.unite(edges[j][0], edges[j][1])) {
        v += edges[j][2];
      }
    }
    if (v === value) {
      ret[1].push(edges[i][3]);
    }
  }
  return ret;
}

class UnionFind {
  parent: number[];
  size: number[];
  setCount: number;

  constructor(n: number) {
    this.parent = new Array(n).fill(0).map((_, index) => index);
    this.size = new Array(n).fill(1);
    this.setCount = n; // 当前连通分量数目
  }

  findset(x: number): number {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.findset(this.parent[x]);
    return this.parent[x];
  }

  unite(a: number, b: number): boolean {
    let x = this.findset(a);
    let y = this.findset(b);
    if (x === y) {
      return false;
    }
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
    this.setCount -= 1;
    return true;
  }

  connected(a: number, b: number): boolean {
    const x = this.findset(a);
    const y = this.findset(b);
    return x === y;
  }
}

// @lc code=end
