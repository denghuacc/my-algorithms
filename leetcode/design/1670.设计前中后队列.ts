/*
 * @lc app=leetcode.cn id=1670 lang=typescript
 *
 * [1670] 设计前中后队列
 *
 * https://leetcode.cn/problems/design-front-middle-back-queue/description/
 *
 * algorithms
 * Medium (52.15%)
 * Likes:    53
 * Dislikes: 0
 * Total Accepted:    12.2K
 * Total Submissions: 21.3K
 * Testcase Example:  '["FrontMiddleBackQueue","pushFront","pushBack","pushMiddle","pushMiddle","popFront","popMiddle","popMiddle","popBack","popFront"]\n' +
  '[[],[1],[2],[3],[4],[],[],[],[],[]]'
 *
 * 请你设计一个队列，支持在前，中，后三个位置的 push 和 pop 操作。
 * 
 * 请你完成 FrontMiddleBack 类：
 * 
 * 
 * FrontMiddleBack() 初始化队列。
 * void pushFront(int val) 将 val 添加到队列的 最前面 。
 * void pushMiddle(int val) 将 val 添加到队列的 正中间 。
 * void pushBack(int val) 将 val 添加到队里的 最后面 。
 * int popFront() 将 最前面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1 。
 * int popMiddle() 将 正中间 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1 。
 * int popBack() 将 最后面 的元素从队列中删除并返回值，如果删除之前队列为空，那么返回 -1 。
 * 
 * 
 * 请注意当有 两个 中间位置的时候，选择靠前面的位置进行操作。比方说：
 * 
 * 
 * 将 6 添加到 [1, 2, 3, 4, 5] 的中间位置，结果数组为 [1, 2, 6, 3, 4, 5] 。
 * 从 [1, 2, 3, 4, 5, 6] 的中间位置弹出元素，返回 3 ，数组变为 [1, 2, 4, 5, 6] 。
 * 
 * 
 * 
 * 
 * 示例 1：
 * 
 * 
 * 输入：
 * ["FrontMiddleBackQueue", "pushFront", "pushBack", "pushMiddle",
 * "pushMiddle", "popFront", "popMiddle", "popMiddle", "popBack", "popFront"]
 * [[], [1], [2], [3], [4], [], [], [], [], []]
 * 输出：
 * [null, null, null, null, null, 1, 3, 4, 2, -1]
 * 
 * 解释：
 * FrontMiddleBackQueue q = new FrontMiddleBackQueue();
 * q.pushFront(1);   // [1]
 * q.pushBack(2);    // [1, 2]
 * q.pushMiddle(3);  // [1, 3, 2]
 * q.pushMiddle(4);  // [1, 4, 3, 2]
 * q.popFront();     // 返回 1 -> [4, 3, 2]
 * q.popMiddle();    // 返回 3 -> [4, 2]
 * q.popMiddle();    // 返回 4 -> [2]
 * q.popBack();      // 返回 2 -> []
 * q.popFront();     // 返回 -1 -> [] （队列为空）
 * 
 * 
 * 
 * 
 * 提示：
 * 
 * 
 * 1 
 * 最多调用 1000 次 pushFront， pushMiddle， pushBack， popFront， popMiddle 和 popBack
 * 。
 * 
 * 
 */

export {};

// @lc code=start
// 左右双队列模拟 [front left last(middle)] <=> [front right last]
// 当有两个中间位置的时候，选择靠前面的位置进行操作 -> 为了简便，操作左队列控制 middle 的进出
class FrontMiddleBackQueue {
  left: Deque<number>;
  right: Deque<number>;
  constructor() {
    this.left = new Deque();
    this.right = new Deque();
  }

  pushFront(val: number): void {
    this.left.pushFront(val);
    if (this.left.size === this.right.size + 2) {
      this.right.pushFront(this.left.popLast()!);
    }
  }

  pushMiddle(val: number): void {
    if (this.left.size === this.right.size + 1) {
      this.right.pushFront(this.left.popLast()!);
    }
    this.left.pushLast(val);
  }

  pushBack(val: number): void {
    this.right.pushLast(val);
    if (this.left.size + 1 === this.right.size) {
      this.left.pushLast(this.right.popFront()!);
    }
  }

  popFront(): number {
    if (this.left.isEmpty()) {
      return -1;
    }
    const val = this.left.popFront()!;
    if (this.left.size + 1 === this.right.size) {
      this.left.pushLast(this.right.popFront()!);
    }
    return val;
  }

  popMiddle(): number {
    if (this.left.isEmpty()) {
      return -1;
    }
    const val = this.left.popLast()!;
    if (this.left.size + 1 === this.right.size) {
      this.left.pushLast(this.right.popFront()!);
    }
    return val;
  }

  popBack(): number {
    if (this.left.isEmpty()) {
      return -1;
    }
    let val: number;
    if (this.right.isEmpty()) {
      val = this.left.popLast()!;
    } else {
      val = this.right.popLast()!;
      if (this.left.size === this.right.size + 2) {
        this.right.pushFront(this.left.popLast()!);
      }
    }
    return val;
  }
}

class Deque<T> {
  items: Record<string, T>;
  frontPointer: number;
  rearPointer: number;

  constructor() {
    this.items = {};
    this.frontPointer = 0;
    this.rearPointer = 0;
  }

  get size(): number {
    return this.rearPointer - this.frontPointer;
  }

  pushFront(val: T) {
    this.frontPointer--;
    this.items[this.frontPointer] = val;
  }

  pushLast(val: T) {
    this.items[this.rearPointer] = val;
    this.rearPointer++;
  }

  popFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const res = this.items[this.frontPointer];
    delete this.items[this.frontPointer];
    this.frontPointer++;
    return res;
  }

  popLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    this.rearPointer--;
    const res = this.items[this.rearPointer];
    delete this.items[this.rearPointer];
    return res;
  }

  peekFront(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.frontPointer];
  }

  peekLast(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.rearPointer - 1];
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  clear() {
    this.items = {};
    this.rearPointer = 0;
    this.frontPointer = 0;
  }

  toArray(): T[] {
    return Object.values(this.items);
  }
}

/**
 * Your FrontMiddleBackQueue object will be instantiated and called as such:
 * var obj = new FrontMiddleBackQueue()
 * obj.pushFront(val)
 * obj.pushMiddle(val)
 * obj.pushBack(val)
 * var param_4 = obj.popFront()
 * var param_5 = obj.popMiddle()
 * var param_6 = obj.popBack()
 */
// @lc code=end
