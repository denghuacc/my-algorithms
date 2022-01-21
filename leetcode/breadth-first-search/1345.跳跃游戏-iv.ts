/*
 * @lc app=leetcode.cn id=1345 lang=typescript
 *
 * [1345] 跳跃游戏 IV
 *
 * https://leetcode-cn.com/problems/jump-game-iv/description/
 *
 * algorithms
 * Hard (36.73%)
 * Likes:    106
 * Dislikes: 0
 * Total Accepted:    9.2K
 * Total Submissions: 22.5K
 * Testcase Example:  '[100,-23,-23,404,100,23,23,23,3,404]'
 *
 * 给你一个整数数组 arr ，你一开始在数组的第一个元素处（下标为 0）。
 *
 * 每一步，你可以从下标 i 跳到下标：
 *
 *
 * i + 1 满足：i + 1 < arr.length
 * i - 1 满足：i - 1 >= 0
 * j 满足：arr[i] == arr[j] 且 i != j
 *
 *
 * 请你返回到达数组最后一个元素的下标处所需的 最少操作次数 。
 *
 * 注意：任何时候你都不能跳到数组外面。
 *
 *
 *
 * 示例 1：
 *
 * 输入：arr = [100,-23,-23,404,100,23,23,23,3,404]
 * 输出：3
 * 解释：那你需要跳跃 3 次，下标依次为 0 --> 4 --> 3 --> 9 。下标 9 为数组的最后一个元素的下标。
 *
 *
 * 示例 2：
 *
 * 输入：arr = [7]
 * 输出：0
 * 解释：一开始就在最后一个元素处，所以你不需要跳跃。
 *
 *
 * 示例 3：
 *
 * 输入：arr = [7,6,9,6,9,6,9,7]
 * 输出：1
 * 解释：你可以直接从下标 0 处跳到下标 7 处，也就是数组的最后一个元素处。
 *
 *
 * 示例 4：
 *
 * 输入：arr = [6,1,9]
 * 输出：2
 *
 *
 * 示例 5：
 *
 * 输入：arr = [11,22,7,7,7,7,7,7,7,22,13]
 * 输出：3
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= arr.length <= 5 * 10^4
 * -10^8 <= arr[i] <= 10^8
 *
 *
 */

// @lc code=start
// bfs
class ObjectDeque<T> {
  items: Record<string, T>;
  count: number;
  lowestCount: number;

  constructor() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  // 返回队列的元素的数量 O(1)
  get size(): number {
    return this.count - this.lowestCount;
  }

  // 队尾入列 O(1)
  addBack(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  // 队首出列 O(1)
  removeFront(): T | undefined {
    if (this.size === 0) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }
}

function minJumps(arr: number[]): number {
  const n = arr.length;
  const map: Map<number, number[]> = new Map();
  for (let i = 0; i < n; i++) {
    const step = arr[i];
    if (!map.has(step)) {
      map.set(step, [i]);
    } else {
      map.get(step)!.push(i);
    }
  }
  const visited: Set<number> = new Set();
  const queue = new ObjectDeque<[number, number]>();
  queue.addBack([0, 0]);
  visited.add(0);
  while (queue.size) {
    const [idx, step] = queue.removeFront()!;
    if (idx === n - 1) {
      return step;
    }
    const val = arr[idx];
    if (map.has(val)) {
      for (const s of map.get(val)!) {
        if (!visited.has(s)) {
          visited.add(s);
          queue.addBack([s, step + 1]);
        }
      }
      map.delete(val);
    }
    if (idx + 1 < n && !visited.has(idx + 1)) {
      visited.add(idx + 1);
      queue.addBack([idx + 1, step + 1]);
    }
    if (idx - 1 >= 0 && !visited.has(idx - 1)) {
      visited.add(idx - 1);
      queue.addBack([idx - 1, step + 1]);
    }
  }
  return -1;
}
// @lc code=end
