import MaxHeap from "./max-heap";

/**
 * @name PriorityQueue 优先队列
 * @description 使用最大堆实现优先队列
 */
export default class PriorityQueue<T> {
  maxHeap: MaxHeap<T>;

  constructor() {
    this.maxHeap = new MaxHeap();
  }

  get size(): number {
    return this.maxHeap.size;
  }

  isEmpty(): boolean {
    return this.maxHeap.isEmpty();
  }

  // 入列
  enqueue(val: T): void {
    this.maxHeap.add(val);
  }

  // 出列 -> 最大值出列
  dequeue(): T | undefined {
    return this.maxHeap.extractMax();
  }

  // 队列最前面的一直都是最大值
  peek(): T | undefined {
    return this.maxHeap.findMax();
  }

  clear(): void {
    this.maxHeap = new MaxHeap();
  }

  toString(): string {
    if (this.isEmpty()) return "";
    let str = "PriorityQueue: front [ ";
    str += this.maxHeap.data.join(", ");
    str += " ]";
    return str;
  }
}
