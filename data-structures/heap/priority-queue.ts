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

  size() {
    return this.maxHeap.size();
  }

  isEmpty() {
    return this.maxHeap.isEmpty();
  }

  enqueue(val: T) {
    this.maxHeap.add(val);
  }

  // 出列 -> 最大值出列
  dequeue() {
    return this.maxHeap.extractMax();
  }

  // 队列最前面的一直都是最大值
  peek() {
    return this.maxHeap.findMax();
  }

  clear() {
    this.maxHeap = new MaxHeap();
  }

  print() {
    if (this.isEmpty()) return "";
    let str = "PriorityQueue: front [ ";
    str += this.maxHeap.data.join(", ");
    str += " ]";
    return str;
  }
}
