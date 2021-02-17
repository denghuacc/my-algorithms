/**
 * @name ArrayDeque 双端队列
 * @description  使用数组实现双端队列，JavaScript 的数组天生就是一个双端队列
 */
export default class ArrayDeque<T> {
  items: T[];

  constructor() {
    this.items = [];
  }

  // 返回队列的元素的数量 O(1)
  get size(): number {
    return this.items.length;
  }

  // 队首入列 O(N)
  addFront(element: T): void {
    this.items.unshift(element);
  }

  // 队尾入列 O(1)
  addBack(element: T): void {
    this.items.push(element);
  }

  // 队首出列 O(N)
  removeFront(): T | undefined {
    return this.items.shift();
  }

  // 队尾出列 O(1)
  removeBack(): T | undefined {
    return this.items.pop();
  }

  // 获取队列的第一个元素 O(1)
  peekFront(): T | undefined {
    return this.items[0];
  }

  // 获取队列的最后一个元素 O(1)
  peekBack(): T | undefined {
    return this.items[this.items.length - 1];
  }

  // 查询队列是否为空 O(1)
  isEmpty(): boolean {
    return this.size === 0;
  }

  // 清空队列 O(1)
  clear(): void {
    this.items = [];
  }

  toString(): string {
    return this.items.toString();
  }
}
