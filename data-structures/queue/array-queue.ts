/**
 * @name ArrayQueue 队列
 * @description  使用数组实现队列
 * 特性①：队列是遵循FIFO（First In First Out， 先进先出，也称为先来先服务）原则的一组有序的项。
 * 特性②：队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
 * 在现实中，最常见的队列例子就是排队。
 */
export default class ArrayQueue<T> {
  items: Array<T>

  constructor() {
    this.items = []
  }

  // 入列 O(1)
  enqueue(element: T) {
    this.items.push(element)
  }

  // 出列 O(n)
  dequeue() {
    return this.items.shift()
  }

  // 获取队列的第一个元素 O(1)
  peek() {
    return this.items[0]
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
