/*
 * @lc app=leetcode.cn id=1631 lang=typescript
 *
 * [1631] 最小体力消耗路径
 *
 * https://leetcode-cn.com/problems/path-with-minimum-effort/description/
 *
 * algorithms
 * Medium (35.65%)
 * Likes:    84
 * Dislikes: 0
 * Total Accepted:    6.4K
 * Total Submissions: 15.8K
 * Testcase Example:  '[[1,2,2],[3,8,2],[5,3,5]]'
 *
 * 你准备参加一场远足活动。给你一个二维 rows x columns 的地图 heights ，其中 heights[row][col] 表示格子
 * (row, col) 的高度。一开始你在最左上角的格子 (0, 0) ，且你希望去最右下角的格子 (rows-1, columns-1) （注意下标从
 * 0 开始编号）。你每次可以往 上，下，左，右 四个方向之一移动，你想要找到耗费 体力 最小的一条路径。
 *
 * 一条路径耗费的 体力值 是路径上相邻格子之间 高度差绝对值 的 最大值 决定的。
 *
 * 请你返回从左上角走到右下角的最小 体力消耗值 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：heights = [[1,2,2],[3,8,2],[5,3,5]]
 * 输出：2
 * 解释：路径 [1,3,5,3,5] 连续格子的差值绝对值最大为 2 。
 * 这条路径比路径 [1,2,2,2,5] 更优，因为另一条路径差值最大值为 3 。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：heights = [[1,2,3],[3,8,4],[5,3,5]]
 * 输出：1
 * 解释：路径 [1,2,3,4,5] 的相邻格子差值绝对值最大为 1 ，比路径 [1,3,5,3,5] 更优。
 *
 *
 * 示例 3：
 *
 *
 * 输入：heights = [[1,2,1,1,1],[1,2,1,2,1],[1,2,1,2,1],[1,2,1,2,1],[1,1,1,2,1]]
 * 输出：0
 * 解释：上图所示路径不需要消耗任何体力。
 *
 *
 *
 *
 * 提示：
 *
 *
 * rows == heights.length
 * columns == heights[i].length
 * 1
 * 1
 *
 *
 */

export {};

// @lc code=start
// union find
function minimumEffortPath(heights: number[][]): number {
  const m = heights.length;
  const n = heights[0].length;
  const edges = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      const id = i * n + j;
      if (i > 0) {
        edges.push([id - n, id, Math.abs(heights[i][j] - heights[i - 1][j])]);
      }
      if (j > 0) {
        edges.push([id - 1, id, Math.abs(heights[i][j] - heights[i][j - 1])]);
      }
    }
  }
  edges.sort((a, b) => a[2] - b[2]);

  const uf = new UnionFind(m * n);
  let ret = 0;
  for (const edge of edges) {
    const x = edge[0],
      y = edge[1],
      v = edge[2];
    uf.unite(x, y);
    if (uf.connected(0, m * n - 1)) {
      ret = v;
      break;
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
    return true;
  }

  connected(a: number, b: number): boolean {
    const x = this.findSet(a);
    const y = this.findSet(b);
    return x === y;
  }
}
// @lc code=end
