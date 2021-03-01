/**
 * @name ObjectQueue 队列
 * @description  使用对象实现队列
 */
export default class ObjectQueue<T> {
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

  // 入列 O(1)
  enqueue(element: T): void {
    this.items[this.count] = element;
    this.count++;
  }

  // 出列 O(N)
  dequeue(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result;
  }

  // 获取队列的第一个元素 O(1)
  peek(): T | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }

  // 查询队列是否为空 O(1)
  isEmpty(): boolean {
    return this.size === 0;
  }

  // 清空队列 O(1)
  clear(): void {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }

  toString(): string {
    if (this.isEmpty()) return "";
    let objString = `Queue { ${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    objString += " }";
    return objString;
  }
}
