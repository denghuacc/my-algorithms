/*
 * @lc app=leetcode.cn id=2931 lang=typescript
 *
 * [2931] 购买物品的最大开销
 *
 * https://leetcode.cn/problems/maximum-spending-after-buying-items/description/
 *
 * algorithms
 * Hard (67.85%)
 * Likes:    16
 * Dislikes: 0
 * Total Accepted:    7K
 * Total Submissions: 9.7K
 * Testcase Example:  '[[8,5,2],[6,4,1],[9,7,3]]'
 *
 * 给你一个下标从 0 开始大小为 m * n 的整数矩阵 values ，表示 m 个不同商店里 m * n 件不同的物品。每个商店有 n 件物品，第 i
 * 个商店的第 j 件物品的价值为 values[i][j] 。除此以外，第 i 个商店的物品已经按照价值非递增排好序了，也就是说对于所有 0 <= j <
 * n - 1 都有 values[i][j] >= values[i][j + 1] 。
 *
 * 每一天，你可以在一个商店里购买一件物品。具体来说，在第 d 天，你可以：
 *
 *
 * 选择商店 i 。
 * 购买数组中最右边的物品 j ，开销为 values[i][j] * d 。换句话说，选择该商店中还没购买过的物品中最大的下标 j ，并且花费
 * values[i][j] * d 去购买。
 *
 *
 * 注意，所有物品都视为不同的物品。比方说如果你已经从商店 1 购买了物品 0 ，你还可以在别的商店里购买其他商店的物品 0 。
 *
 * 请你返回购买所有 m * n 件物品需要的 最大开销 。
 *
 *
 *
 * 示例 1：
 *
 *
 * 输入：values = [[8,5,2],[6,4,1],[9,7,3]]
 * 输出：285
 * 解释：第一天，从商店 1 购买物品 2 ，开销为 values[1][2] * 1 = 1 。
 * 第二天，从商店 0 购买物品 2 ，开销为 values[0][2] * 2 = 4 。
 * 第三天，从商店 2 购买物品 2 ，开销为 values[2][2] * 3 = 9 。
 * 第四天，从商店 1 购买物品 1 ，开销为 values[1][1] * 4 = 16 。
 * 第五天，从商店 0 购买物品 1 ，开销为 values[0][1] * 5 = 25 。
 * 第六天，从商店 1 购买物品 0 ，开销为 values[1][0] * 6 = 36 。
 * 第七天，从商店 2 购买物品 1 ，开销为 values[2][1] * 7 = 49 。
 * 第八天，从商店 0 购买物品 0 ，开销为 values[0][0] * 8 = 64 。
 * 第九天，从商店 2 购买物品 0 ，开销为 values[2][0] * 9 = 81 。
 * 所以总开销为 285 。
 * 285 是购买所有 m * n 件物品的最大总开销。
 *
 *
 * 示例 2：
 *
 *
 * 输入：values = [[10,8,6,4,2],[9,7,5,3,2]]
 * 输出：386
 * 解释：第一天，从商店 0 购买物品 4 ，开销为 values[0][4] * 1 = 2 。
 * 第二天，从商店 1 购买物品 4 ，开销为 values[1][4] * 2 = 4 。
 * 第三天，从商店 1 购买物品 3 ，开销为 values[1][3] * 3 = 9 。
 * 第四天，从商店 0 购买物品 3 ，开销为 values[0][3] * 4 = 16 。
 * 第五天，从商店 1 购买物品 2 ，开销为 values[1][2] * 5 = 25 。
 * 第六天，从商店 0 购买物品 2 ，开销为 values[0][2] * 6 = 36 。
 * 第七天，从商店 1 购买物品 1 ，开销为 values[1][1] * 7 = 49 。
 * 第八天，从商店 0 购买物品 1 ，开销为 values[0][1] * 8 = 64 。
 * 第九天，从商店 1 购买物品 0 ，开销为 values[1][0] * 9 = 81 。
 * 第十天，从商店 0 购买物品 0 ，开销为 values[0][0] * 10 = 100 。
 * 所以总开销为 386 。
 * 386 是购买所有 m * n 件物品的最大总开销。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= m == values.length <= 10
 * 1 <= n == values[i].length <= 10^4
 * 1 <= values[i][j] <= 10^6
 * values[i] 按照非递增顺序排序。
 *
 *
 */

export {};

// @lc code=start
function maxSpending(values: number[][]): number {
  const m = values.length;
  const n = values[0].length;
  const pq = new Heap<number>();
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      pq.push(values[i][j]);
    }
  }
  let res = 0;
  let idx = 1;
  while (!pq.isEmpty()) {
    const v = pq.pop()!;
    res += v * idx;
    idx++;
  }
  return res;
}

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
// @lc code=end
