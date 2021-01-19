/*
 * @lc app=leetcode.cn id=1584 lang=typescript
 *
 * [1584] 连接所有点的最小费用
 *
 * https://leetcode-cn.com/problems/min-cost-to-connect-all-points/description/
 *
 * algorithms
 * Medium (52.69%)
 * Likes:    49
 * Dislikes: 0
 * Total Accepted:    6K
 * Total Submissions: 10.4K
 * Testcase Example:  '[[0,0],[2,2],[3,10],[5,2],[7,0]]'
 *
 * 给你一个points 数组，表示 2D 平面上的一些点，其中 points[i] = [xi, yi] 。
 *
 * 连接点 [xi, yi] 和点 [xj, yj] 的费用为它们之间的 曼哈顿距离 ：|xi - xj| + |yi - yj| ，其中 |val| 表示
 * val 的绝对值。
 *
 * 请你返回将所有点连接的最小总费用。只有任意两点之间 有且仅有 一条简单路径时，才认为所有点都已连接。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
 * 输出：20
 * 解释：
 *
 * 我们可以按照上图所示连接所有点得到最小总费用，总费用为 20 。
 * 注意到任意两个点之间只有唯一一条路径互相到达。
 *
 *
 * 示例 2：
 *
 *
 * 输入：points = [[3,12],[-2,5],[-4,1]]
 * 输出：18
 *
 *
 * 示例 3：
 *
 *
 * 输入：points = [[0,0],[1,1],[1,0],[-1,1]]
 * 输出：4
 *
 *
 * 示例 4：
 *
 *
 * 输入：points = [[-1000000,-1000000],[1000000,1000000]]
 * 输出：4000000
 *
 *
 * 示例 5：
 *
 *
 * 输入：points = [[0,0]]
 * 输出：0
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= points.length <= 1000
 * -10^6 <= xi, yi <= 10^6
 * 所有点 (xi, yi) 两两不同。
 *
 *
 */

// @lc code=start
// kruskal + union find
function minCostConnectPoints(points: number[][]): number {
  const n = points.length;
  const dsu = new DisjoinSetUnion(n);
  const edges: [number, number, number][] = [];

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      edges.push([dist(i, j), i, j]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  let ret = 0;
  let num = 1;

  for (const [length, x, y] of edges) {
    if (dsu.unionSet(x, y)) {
      ret += length;
      num += 1;
      if (num === n) {
        break;
      }
    }
  }

  return ret;

  function dist(x: number, y: number) {
    return (
      Math.abs(points[x][0] - points[y][0]) +
      Math.abs(points[x][1] - points[y][1])
    );
  }
}

class DisjoinSetUnion {
  n: number;
  rank: number[];
  f: number[];

  constructor(n: number) {
    this.n = n;
    this.rank = new Array(n).fill(1);
    this.f = new Array(n).fill(0).map((_, index) => index);
  }

  find(x: number): number {
    if (this.f[x] === x) {
      return x;
    }
    this.f[x] = this.find(this.f[x]);
    return this.f[x];
  }

  unionSet(x: number, y: number) {
    let fx = this.find(x);
    let fy = this.find(y);
    if (fx === fy) {
      return false;
    }
    if (this.rank[fx] < this.rank[fy]) {
      [fx, fy] = [fy, fx];
    }
    this.rank[fx] += this.rank[fy];
    this.f[fy] = fx;
    return true;
  }
}
// @lc code=end
