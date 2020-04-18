/**
 * @name ArrayDeque 双端队列
 * @description  使用数组实现双端队列
 */
export default class ArrayDeque<T> {
  items: Array<T>

  constructor() {
    this.items = []
  }

  // 队首入列 O(n)
  addFront(element: T) {
    this.items.unshift(element)
  }

  // 队尾入列 O(1)
  addBack(element: T) {
    this.items.push(element)
  }

  // 队首出列 O(n)
  removeFront() {
    return this.items.shift()
  }

  // 队尾出列 O(1)
  removeBack() {
    return this.items.pop()
  }

  // 获取队列的第一个元素 O(1)
  peekFront() {
    return this.items[0]
  }

  // 获取队列的最后一个元素 O(1)
  peekBack() {
    return this.items[this.items.length - 1]
  }

  // 返回队列的元素的数量 O(1)
  size() {
    return this.items.length
  }

  // 查询队列是否为空 O(1)
  isEmpty() {
    return this.items.length === 0
  }

  // 清空队列
  clear() {
    this.items = []
  }

  toString() {
    return this.items.toString()
  }
}
