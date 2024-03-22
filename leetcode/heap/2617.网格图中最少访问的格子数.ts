/*
 * @lc app=leetcode.cn id=2617 lang=typescript
 *
 * [2617] 网格图中最少访问的格子数
 *
 * https://leetcode.cn/problems/minimum-number-of-visited-cells-in-a-grid/description/
 *
 * algorithms
 * Hard (32.47%)
 * Likes:    36
 * Dislikes: 0
 * Total Accepted:    5.8K
 * Total Submissions: 15.9K
 * Testcase Example:  '[[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]'
 *
 * 给你一个下标从 0 开始的 m x n 整数矩阵 grid 。你一开始的位置在 左上角 格子 (0, 0) 。
 *
 * 当你在格子 (i, j) 的时候，你可以移动到以下格子之一：
 *
 *
 * 满足 j < k <= grid[i][j] + j 的格子 (i, k) （向右移动），或者
 * 满足 i < k <= grid[i][j] + i 的格子 (k, j) （向下移动）。
 *
 *
 * 请你返回到达 右下角 格子 (m - 1, n - 1) 需要经过的最少移动格子数，如果无法到达右下角格子，请你返回 -1 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 * 输入：grid = [[3,4,2,1],[4,2,3,1],[2,1,0,0],[2,4,0,0]]
 * 输出：4
 * 解释：上图展示了到达右下角格子经过的 4 个格子。
 *
 *
 * 示例 2：
 *
 *
 *
 * 输入：grid = [[3,4,2,1],[4,2,1,1],[2,1,1,0],[3,4,1,0]]
 * 输出：3
 * 解释：上图展示了到达右下角格子经过的 3 个格子。
 *
 *
 * 示例 3：
 *
 *
 *
 * 输入：grid = [[2,1,0],[1,0,0]]
 * 输出：-1
 * 解释：无法到达右下角格子。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == grid.length
 * n == grid[i].length
 * 1 <= m, n <= 10^5
 * 1 <= m * n <= 10^5
 * 0 <= grid[i][j] < m * n
 * grid[m - 1][n - 1] == 0
 *
 *
 */

export {};

// @lc code=start
function minimumVisitedCells(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;
  const dist = Array.from(new Array(m), () => new Array(n).fill(-1));
  dist[0][0] = 1;
  const row = Array.from(
    new Array(m),
    () => new Heap<[number, number]>((a, b) => a[0] < b[0])
  );
  const col = Array.from(
    new Array(n),
    () => new Heap<[number, number]>((a, b) => a[0] < b[0])
  );

  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      while (
        !row[i].isEmpty() &&
        row[i].peek()![1] + grid[i][row[i].peek()![1]] < j
      ) {
        row[i].pop();
      }
      if (!row[i].isEmpty()) {
        dist[i][j] = update(dist[i][j], dist[i][row[i].peek()![1]] + 1);
      }

      while (
        !col[j].isEmpty() &&
        col[j].peek()![1] + grid[col[j].peek()![1]][j] < i
      ) {
        col[j].pop();
      }
      if (!col[j].isEmpty()) {
        dist[i][j] = update(dist[i][j], dist[col[j].peek()![1]][j] + 1);
      }
      if (dist[i][j] !== -1) {
        row[i].push([dist[i][j], j]);
        col[j].push([dist[i][j], i]);
      }
    }
  }
  return dist[m - 1][n - 1];

  function update(x: number, y: number): number {
    if (x === -1 || y < x) {
      return y;
    }
    return x;
  }
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
