/*
 * @lc app=leetcode.cn id=803 lang=typescript
 *
 * [803] 打砖块
 *
 * https://leetcode-cn.com/problems/bricks-falling-when-hit/description/
 *
 * algorithms
 * Hard (37.00%)
 * Likes:    92
 * Dislikes: 0
 * Total Accepted:    2.4K
 * Total Submissions: 6.5K
 * Testcase Example:  '[[1,0,0,0],[1,1,1,0]]\n[[1,0]]'
 *
 * 有一个 m x n 的二元网格，其中 1 表示砖块，0 表示空白。砖块 稳定（不会掉落）的前提是：
 *
 *
 * 一块砖直接连接到网格的顶部，或者
 * 至少有一块相邻（4 个方向之一）砖块 稳定 不会掉落时
 *
 *
 * 给你一个数组 hits ，这是需要依次消除砖块的位置。每当消除 hits[i] = (rowi, coli)
 * 位置上的砖块时，对应位置的砖块（若存在）会消失，然后其他的砖块可能因为这一消除操作而掉落。一旦砖块掉落，它会立即从网格中消失（即，它不会落在其他稳定的砖块上）。
 *
 * 返回一个数组 result ，其中 result[i] 表示第 i 次消除操作对应掉落的砖块数目。
 *
 * 注意，消除可能指向是没有砖块的空白位置，如果发生这种情况，则没有砖块掉落。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：grid = [[1,0,0,0],[1,1,1,0]], hits = [[1,0]]
 * 输出：[2]
 * 解释：
 * 网格开始为：
 * [[1,0,0,0]，
 * ⁠[1,1,1,0]]
 * 消除 (1,0) 处加粗的砖块，得到网格：
 * [[1,0,0,0]
 * ⁠[0,1,1,0]]
 * 两个加粗的砖不再稳定，因为它们不再与顶部相连，也不再与另一个稳定的砖相邻，因此它们将掉落。得到网格：
 * [[1,0,0,0],
 * ⁠[0,0,0,0]]
 * 因此，结果为 [2] 。
 *
 *
 * 示例 2：
 *
 *
 * 输入：grid = [[1,0,0,0],[1,1,0,0]], hits = [[1,1],[1,0]]
 * 输出：[0,0]
 * 解释：
 * 网格开始为：
 * [[1,0,0,0],
 * ⁠[1,1,0,0]]
 * 消除 (1,1) 处加粗的砖块，得到网格：
 * [[1,0,0,0],
 * ⁠[1,0,0,0]]
 * 剩下的砖都很稳定，所以不会掉落。网格保持不变：
 * [[1,0,0,0],
 * ⁠[1,0,0,0]]
 * 接下来消除 (1,0) 处加粗的砖块，得到网格：
 * [[1,0,0,0],
 * ⁠[0,0,0,0]]
 * 剩下的砖块仍然是稳定的，所以不会有砖块掉落。
 * 因此，结果为 [0,0] 。
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1
 * grid[i][j] 为 0 或 1
 * 1
 * hits[i].length == 2
 * 0 i
 * 0 i
 * 所有 (xi, yi) 互不相同
 *
 *
 */

export {};

// @lc code=start
// union find
function hitBricks(grid: number[][], hits: number[][]): number[] {
  const h = grid.length;
  const w = grid[0].length;

  const uf = new UnionFind(h * w + 1);
  const status: number[][] = JSON.parse(JSON.stringify(grid));
  for (let i = 0; i < hits.length; i++) {
    const [x, y] = hits[i];
    status[x][y] = 0;
  }
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      if (status[i][j] === 1) {
        if (i === 0) {
          uf.merge(h * w, i * w + j);
        }
        if (i > 0 && status[i - 1][j] === 1) {
          uf.merge(i * w + j, (i - 1) * w + j);
        }
        if (j > 0 && status[i][j - 1] === 1) {
          uf.merge(i * w + j, i * w + j - 1);
        }
      }
    }
  }

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const ret: number[] = new Array(hits.length).fill(0);
  for (let i = hits.length - 1; i >= 0; i--) {
    const r = hits[i][0];
    const c = hits[i][1];
    if (grid[r][c] === 0) {
      console.log(1);
      continue;
    }
    const prev = uf.size(h * w);

    if (r === 0) {
      console.log(2);
      uf.merge(c, h * w);
    }
    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < h && nc >= 0 && nc < w) {
        if (status[nr][nc] === 1) {
          console.log(3);
          uf.merge(r * w + c, nr * w + nc);
        }
      }
    }
    const size = uf.size(h * w);
    ret[i] = Math.max(0, size - prev - 1);
    status[r][c] = 1;
  }
  return ret;
}

class UnionFind {
  f: number[];
  sz: number[];

  constructor(n: number) {
    this.f = new Array(n).fill(0).map((_, index) => index);
    this.sz = new Array(n).fill(1);
  }

  find(x: number) {
    if (this.f[x] === x) {
      return x;
    }
    const newF = this.find(this.f[x]);
    this.f[x] = newF;
    return this.f[x];
  }

  merge(x: number, y: number) {
    const fx = this.find(x),
      fy = this.find(y);
    if (fx === fy) {
      return;
    }
    this.f[fx] = fy;
    this.sz[fy] += this.sz[fx];
  }

  size(x: number) {
    return this.sz[this.find(x)];
  }
}

// @lc code=end
