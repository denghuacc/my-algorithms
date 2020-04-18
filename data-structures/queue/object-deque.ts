/**
 * @name ObjectDeque 双端队列
 * @description  使用对象实现双端队列
 * 双端队列是一种特殊的队列，它允许在两端添加和移除元素
 */
export default class ObjectDeque<T> {
  items: any
  count: number
  lowestCount: number

  constructor() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  // 队首入列 O(n)
  addFront(element: T) {
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1]
      }
      this.count++
      this.items[0] = element
    }
  }

  // 队尾入列 O(1)
  addBack(element: T) {
    this.items[this.count] = element
    this.count++
  }

  // 队首出列 O(1)
  removeFront() {
    if (this.isEmpty()) {
      return undefined
    }
    const result = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return result
  }

  // 队尾出列 O(1)
  removeBack() {
    if (this.isEmpty()) {
      return undefined
    }
    this.count--
    const result = this.items[this.count]
    delete this.items[this.count]
    return result
  }

  // 获取队列的第一个元素 O(1)
  peekFront() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.lowestCount]
  }

  // 获取队列的最后一个元素 O(1)
  peekBack() {
    if (this.isEmpty()) {
      return undefined
    }
    return this.items[this.count - 1]
  }

  // 返回队列的元素的数量 O(1)
  size() {
    return this.count - this.lowestCount
  }

  // 查询队列是否为空 O(1)
  isEmpty() {
    return this.size() === 0
  }

  // 清空队列
  clear() {
    this.items = {}
    this.count = 0
    this.lowestCount = 0
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    let objString = `Deque { ${this.items[this.lowestCount]}`
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`
    }
    objString += ' }'
    return objString
  }
}
