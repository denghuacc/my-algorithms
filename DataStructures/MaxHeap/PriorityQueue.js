const MaxHeap = require('./MaxHeap')

/**
 * @name PriorityQueue 优先队列
 * @description 使用最大堆实现优先队列
 */
class PriorityQueue {
  constructor() {
    this.maxHeap = new MaxHeap()
  }

  getSize() {
    return this.maxHeap.size()
  }

  isEmpty() {
    return this.maxHeap.isEmpty()
  }

  enqueue(element) {
    this.maxHeap.add(element)
  }

  // 出列 优先出最大值
  dequeue() {
    return this.maxHeap.extractMax()
  }

  // 队列最前面的也是最大值
  getFront() {
    return this.maxHeap.findMax()
  }
}
