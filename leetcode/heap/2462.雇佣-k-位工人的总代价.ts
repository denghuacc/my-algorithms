/*
 * @lc app=leetcode.cn id=2462 lang=typescript
 *
 * [2462] 雇佣 K 位工人的总代价
 *
 * https://leetcode.cn/problems/total-cost-to-hire-k-workers/description/
 *
 * algorithms
 * Medium (39.23%)
 * Likes:    95
 * Dislikes: 0
 * Total Accepted:    22.1K
 * Total Submissions: 50.1K
 * Testcase Example:  '[17,12,10,2,7,2,11,20,8]\n3\n4'
 *
 * 给你一个下标从 0 开始的整数数组 costs ，其中 costs[i] 是雇佣第 i 位工人的代价。
 *
 * 同时给你两个整数 k 和 candidates 。我们想根据以下规则恰好雇佣 k 位工人：
 *
 *
 * 总共进行 k 轮雇佣，且每一轮恰好雇佣一位工人。
 * 在每一轮雇佣中，从最前面 candidates 和最后面 candidates
 * 人中选出代价最小的一位工人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
 *
 * 比方说，costs = [3,2,7,7,1,2] 且 candidates = 2 ，第一轮雇佣中，我们选择第 4 位工人，因为他的代价最小
 * [3,2,7,7,1,2] 。
 * 第二轮雇佣，我们选择第 1 位工人，因为他们的代价与第 4 位工人一样都是最小代价，而且下标更小，[3,2,7,7,2]
 * 。注意每一轮雇佣后，剩余工人的下标可能会发生变化。
 *
 *
 * 如果剩余员工数目不足 candidates 人，那么下一轮雇佣他们中代价最小的一人，如果有多位代价相同且最小的工人，选择下标更小的一位工人。
 * 一位工人只能被选择一次。
 *
 *
 * 返回雇佣恰好 k 位工人的总代价。
 *
 *
 *
 * 示例 1：
 *
 * 输入：costs = [17,12,10,2,7,2,11,20,8], k = 3, candidates = 4
 * 输出：11
 * 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
 * - 第一轮雇佣，我们从 [17,12,10,2,7,2,11,20,8] 中选择。最小代价是 2 ，有两位工人，我们选择下标更小的一位工人，即第 3
 * 位工人。总代价是 0 + 2 = 2 。
 * - 第二轮雇佣，我们从 [17,12,10,7,2,11,20,8] 中选择。最小代价是 2 ，下标为 4 ，总代价是 2 + 2 = 4 。
 * - 第三轮雇佣，我们从 [17,12,10,7,11,20,8] 中选择，最小代价是 7 ，下标为 3 ，总代价是 4 + 7 = 11 。注意下标为
 * 3 的工人同时在最前面和最后面 4 位工人中。
 * 总雇佣代价是 11 。
 *
 *
 * 示例 2：
 *
 * 输入：costs = [1,2,4,1], k = 3, candidates = 3
 * 输出：4
 * 解释：我们总共雇佣 3 位工人。总代价一开始为 0 。
 * - 第一轮雇佣，我们从 [1,2,4,1] 中选择。最小代价为 1 ，有两位工人，我们选择下标更小的一位工人，即第 0 位工人，总代价是 0 + 1 =
 * 1 。注意，下标为 1 和 2 的工人同时在最前面和最后面 3 位工人中。
 * - 第二轮雇佣，我们从 [2,4,1] 中选择。最小代价为 1 ，下标为 2 ，总代价是 1 + 1 = 2 。
 * - 第三轮雇佣，少于 3 位工人，我们从剩余工人 [2,4] 中选择。最小代价是 2 ，下标为 0 。总代价为 2 + 2 = 4 。
 * 总雇佣代价是 4 。
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1 <= costs.length <= 10^5
 * 1 <= costs[i] <= 10^5
 * 1 <= k, candidates <= costs.length
 *
 *
 */

export {};

// @lc code=start
function totalCost(costs: number[], k: number, candidates: number): number {
  const n = costs.length;
  const pq = new Heap<[number, number]>((a, b) => {
    if (a[0] === b[0]) {
      return a[1] < b[1];
    }
    return a[0] < b[0];
  });
  let left = candidates - 1;
  let right = n - candidates;
  if (left + 1 < right) {
    for (let i = 0; i <= left; i++) {
      pq.push([costs[i], i]);
    }
    for (let i = right; i < n; i++) {
      pq.push([costs[i], i]);
    }
  } else {
    for (let i = 0; i < n; ++i) {
      pq.push([costs[i], i]);
    }
  }
  let res = 0;
  for (let i = 0; i < k; i++) {
    const [cost, id] = pq.pop()!;
    res += cost;
    if (left + 1 < right) {
      if (id <= left) {
        left++;
        pq.push([costs[left], left]);
      } else {
        right--;
        pq.push([costs[right], right]);
      }
    }
  }
  return res;
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
