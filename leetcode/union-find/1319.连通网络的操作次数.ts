/*
 * @lc app=leetcode.cn id=1319 lang=typescript
 *
 * [1319] 连通网络的操作次数
 *
 * https://leetcode-cn.com/problems/number-of-operations-to-make-network-connected/description/
 *
 * algorithms
 * Medium (55.68%)
 * Likes:    70
 * Dislikes: 0
 * Total Accepted:    11.1K
 * Total Submissions: 20K
 * Testcase Example:  '4\n[[0,1],[0,2],[1,2]]'
 *
 * 用以太网线缆将 n 台计算机连接成一个网络，计算机的编号从 0 到 n-1。线缆用 connections 表示，其中 connections[i] =
 * [a, b] 连接了计算机 a 和 b。
 *
 * 网络中的任何一台计算机都可以通过网络直接或者间接访问同一个网络中其他任意一台计算机。
 *
 * 给你这个计算机网络的初始布线
 * connections，你可以拔开任意两台直连计算机之间的线缆，并用它连接一对未直连的计算机。请你计算并返回使所有计算机都连通所需的最少操作次数。如果不可能，则返回
 * -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：n = 4, connections = [[0,1],[0,2],[1,2]]
 * 输出：1
 * 解释：拔下计算机 1 和 2 之间的线缆，并将它插到计算机 1 和 3 上。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：n = 6, connections = [[0,1],[0,2],[0,3],[1,2],[1,3]]
 * 输出：2
 *
 *
 * 示例 3：
 *
 * 输入：n = 6, connections = [[0,1],[0,2],[0,3],[1,2]]
 * 输出：-1
 * 解释：线缆数量不足。
 *
 *
 * 示例 4：
 *
 * 输入：n = 5, connections = [[0,1],[0,2],[3,4],[2,3]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= n <= 10^5
 * 1 <= connections.length <= min(n*(n-1)/2, 10^5)
 * connections[i].length == 2
 * 0 <= connections[i][0], connections[i][1] < n
 * connections[i][0] != connections[i][1]
 * 没有重复的连接。
 * 两台计算机不会通过多条线缆连接。
 *
 *
 */

export {};

// @lc code=start
// union find
var makeConnected = function (n: number, connections: number[][]): number {
  if (connections.length < n - 1) {
    return -1;
  }
  const uf = new UnionFind(n);
  for (const [x, y] of connections) {
    uf.unite(x, y);
  }
  return uf.setCount - 1;
};

class UnionFind {
  parent: number[];
  size: number[];
  setCount: number;

  constructor(n: number) {
    this.parent = new Array(n).fill(0).map((_, index) => index);
    this.size = new Array(n).fill(1);
    this.setCount = n;
  }

  findSet(x: number): number {
    if (this.parent[x] === x) {
      return x;
    }
    this.parent[x] = this.findSet(this.parent[x]);
    return this.parent[x];
  }

  unite(a: number, b: number): boolean {
    let x = this.findSet(a);
    let y = this.findSet(b);
    if (x === y) {
      return false;
    }
    if (this.size[x] < this.size[y]) {
      [x, y] = [y, x];
    }
    this.parent[y] = x;
    this.size[x] += this.size[y];
    this.setCount -= 1;
    return false;
  }

  connected(a: number, b: number): boolean {
    const x = this.findSet(a);
    const y = this.findSet(b);
    return x === y;
  }
}

// union find 2
var makeConnected = function (n: number, connections: number[][]): number {
  if (connections.length < n - 1) return -1;
  const parent = new Array(n).fill(0).map((_, index) => index);
  let part = n;
  for (let i = 0; i < connections.length; i++) {
    const [x, y] = connections[i];
    const a = find(x);
    const b = find(y);
    if (a !== b) {
      parent[a] = b;
      part -= 1;
    }
  }
  return part - 1;

  function find(x: number): number {
    return parent[x] === x ? x : (parent[x] = find(parent[x]));
  }
};
// @lc code=end
