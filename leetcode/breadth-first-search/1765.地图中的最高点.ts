/*
 * @lc app=leetcode.cn id=1765 lang=typescript
 *
 * [1765] 地图中的最高点
 *
 * https://leetcode-cn.com/problems/map-of-highest-peak/description/
 *
 * algorithms
 * Medium (55.16%)
 * Likes:    41
 * Dislikes: 0
 * Total Accepted:    7.4K
 * Total Submissions: 12K
 * Testcase Example:  '[[0,1],[0,0]]'
 *
 * 给你一个大小为 m x n 的整数矩阵 isWater ，它代表了一个由 陆地 和 水域 单元格组成的地图。
 *
 *
 * 如果 isWater[i][j] == 0 ，格子 (i, j) 是一个 陆地 格子。
 * 如果 isWater[i][j] == 1 ，格子 (i, j) 是一个 水域 格子。
 *
 *
 * 你需要按照如下规则给每个单元格安排高度：
 *
 *
 * 每个格子的高度都必须是非负的。
 * 如果一个格子是是 水域 ，那么它的高度必须为 0 。
 * 任意相邻的格子高度差 至多 为 1 。当两个格子在正东、南、西、北方向上相互紧挨着，就称它们为相邻的格子。（也就是说它们有一条公共边）
 *
 *
 * 找到一种安排高度的方案，使得矩阵中的最高高度值 最大 。
 *
 * 请你返回一个大小为 m x n 的整数矩阵 height ，其中 height[i][j] 是格子 (i, j) 的高度。如果有多种解法，请返回
 * 任意一个 。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：isWater = [[0,1],[0,0]]
 * 输出：[[1,0],[2,1]]
 * 解释：上图展示了给各个格子安排的高度。
 * 蓝色格子是水域格，绿色格子是陆地格。
 *
 *
 * 示例 2：
 *
 *
 *
 *
 * 输入：isWater = [[0,0,1],[1,0,0],[0,0,0]]
 * 输出：[[1,1,0],[0,1,1],[1,2,2]]
 * 解释：所有安排方案中，最高可行高度为 2 。
 * 任意安排方案中，只要最高高度为 2 且符合上述规则的，都为可行方案。
 *
 *
 *
 *
 * 提示：
 *
 *
 * m == isWater.length
 * n == isWater[i].length
 * 1
 * isWater[i][j] 要么是 0 ，要么是 1 。
 * 至少有 1 个水域格子。
 *
 *
 */

// @lc code=start
class Deque<T> {
  items: Record<string, T>;
  count: number;
  lowestCount: number;

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  get size(): number {
    return this.count - this.lowestCount;
  }

  pushFront(val: T) {
    this.lowestCount--;
    this.items[this.lowestCount] = val;
  }

  pushBack(val: T) {
    this.items[this.count] = val;
    this.count++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return res;
  }

  popBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const res = this.items[this.count];
    delete this.items[this.count];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  peekBack(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}

function highestPeak(isWater: number[][]): number[][] {
  const dirs = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];
  const m = isWater.length;
  const n = isWater[0].length;
  const res: number[][] = Array.from(new Array(m), () => new Array(n).fill(-1));
  const queue: Deque<[number, number]> = new Deque();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (isWater[i][j] === 1) {
        res[i][j] = 0;
        queue.pushBack([i, j]);
      }
    }
  }
  while (!queue.isEmpty()) {
    const [x, y] = queue.popFront()!;
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || nx >= m || ny < 0 || ny >= n || res[nx][ny] !== -1) {
        continue;
      }
      res[nx][ny] = res[x][y] + 1;
      queue.pushBack([nx, ny]);
    }
  }
  return res;
}
// @lc code=end
