/*
 * @lc app=leetcode.cn id=1606 lang=typescript
 *
 * [1606] 找到处理最多请求的服务器
 *
 * https://leetcode-cn.com/problems/find-servers-that-handled-most-number-of-requests/description/
 *
 * algorithms
 * Hard (36.17%)
 * Likes:    49
 * Dislikes: 0
 * Total Accepted:    4.4K
 * Total Submissions: 9.7K
 * Testcase Example:  '3\n[1,2,3,4,5]\n[5,2,3,3,3]'
 *
 * 你有 k 个服务器，编号为 0 到 k-1 ，它们可以同时处理多个请求组。每个服务器有无穷的计算能力但是 不能同时处理超过一个请求
 * 。请求分配到服务器的规则如下：
 *
 *
 * 第 i （序号从 0 开始）个请求到达。
 * 如果所有服务器都已被占据，那么该请求被舍弃（完全不处理）。
 * 如果第 (i % k) 个服务器空闲，那么对应服务器会处理该请求。
 * 否则，将请求安排给下一个空闲的服务器（服务器构成一个环，必要的话可能从第 0 个服务器开始继续找下一个空闲的服务器）。比方说，如果第 i
 * 个服务器在忙，那么会查看第 (i+1) 个服务器，第 (i+2) 个服务器等等。
 *
 *
 * 给你一个 严格递增 的正整数数组 arrival ，表示第 i 个任务的到达时间，和另一个数组 load ，其中 load[i] 表示第 i
 * 个请求的工作量（也就是服务器完成它所需要的时间）。你的任务是找到 最繁忙的服务器 。最繁忙定义为一个服务器处理的请求数是所有服务器里最多的。
 *
 * 请你返回包含所有 最繁忙服务器 序号的列表，你可以以任意顺序返回这个列表。
 *
 *
 *
 * 示例 1：
 *
 *
 *
 *
 * 输入：k = 3, arrival = [1,2,3,4,5], load = [5,2,3,3,3]
 * 输出：[1]
 * 解释：
 * 所有服务器一开始都是空闲的。
 * 前 3 个请求分别由前 3 台服务器依次处理。
 * 请求 3 进来的时候，服务器 0 被占据，所以它呗安排到下一台空闲的服务器，也就是服务器 1 。
 * 请求 4 进来的时候，由于所有服务器都被占据，该请求被舍弃。
 * 服务器 0 和 2 分别都处理了一个请求，服务器 1 处理了两个请求。所以服务器 1 是最忙的服务器。
 *
 *
 * 示例 2：
 *
 *
 * 输入：k = 3, arrival = [1,2,3,4], load = [1,2,1,2]
 * 输出：[0]
 * 解释：
 * 前 3 个请求分别被前 3 个服务器处理。
 * 请求 3 进来，由于服务器 0 空闲，它被服务器 0 处理。
 * 服务器 0 处理了两个请求，服务器 1 和 2 分别处理了一个请求。所以服务器 0 是最忙的服务器。
 *
 *
 * 示例 3：
 *
 *
 * 输入：k = 3, arrival = [1,2,3], load = [10,12,11]
 * 输出：[0,1,2]
 * 解释：每个服务器分别处理了一个请求，所以它们都是最忙的服务器。
 *
 *
 * 示例 4：
 *
 *
 * 输入：k = 3, arrival = [1,2,3,4,8,9,10], load = [5,2,10,3,1,2,2]
 * 输出：[1]
 *
 *
 * 示例 5：
 *
 *
 * 输入：k = 1, arrival = [1], load = [1]
 * 输出：[0]
 *
 *
 *
 *
 * 提示：
 *
 *
 * 1
 * 1
 * arrival.length == load.length
 * 1
 * arrival 保证 严格递增 。
 *
 *
 */

// @lc code=start
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
      let idx = this.leftChild(index);

      if (idx + 1 && this.compare(this.items[idx + 1], this.items[idx])) {
        idx = this.rightChild(index);
      }
      if (this.compare(this.items[index], this.items[idx])) {
        break;
      }
      this.swap(this.items, index, idx);
      index = idx;
    }
  }

  private swap(arr: T[], i: number, j: number): void {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function busiestServers(
  k: number,
  arrival: number[],
  load: number[]
): number[] {
  const available = new Heap<number>((a, b) => a - b < 0);
  for (let i = 0; i < k; i++) {
    available.push(i);
  }
  const busy = new Heap<[number, number]>((a, b) => a?.[0] - b?.[0] < 0);
  const requests: number[] = new Array(k).fill(0);
  for (let i = 0; i < arrival.length; i++) {
    while (!busy.isEmpty() && busy.peek()![0] <= arrival[i]) {
      const id = busy.peek()![1];
      busy.pop();
      available.push(i + ((((id - i) % k) + k) % k));
    }
    if (available.isEmpty()) {
      continue;
    }
    const server = available.pop()! % k;
    requests[server]++;
    busy.push([load[i] + arrival[i], server]);
  }
  const maxRequest = Math.max(...requests);
  const res: number[] = [];
  for (let i = 0; i < k; i++) {
    if (requests[i] === maxRequest) {
      res.push(i);
    }
  }
  return res;
}
// @lc code=end
