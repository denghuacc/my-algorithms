class Node {
  constructor(element = null, next = null) {
    this.element = element
    this.next = null
  }
}

/**
 * LinkedListQueue 使用链表实现队列
 */
class LinkedListQueue {
  constructor() {
    this.head = null
    this.tail = null
    this.size = 0
  }

  // 返回队列的元素个数 O(1)
  getSize() {
    return this.size
  }

  // 查询队列是否为空 O(1)
  isEmpty() {
    return this.size === 0
  }

  // 入列 O(1)
  enqueue(element) {
    if (this.tail === null) {
      this.tail = new Node(element)
      this.head = this.tail
    } else {
      this.tail.next = new Node(element)
      this.tail = this.tail.next
    }
    this.size++
  }

  // 出列 O(1)
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Cannot dequeue from an empty queue.')
    }

    const retNode = this.head
    this.head = this.head.next
    retNode.next = null

    if (this.head === null) {
      this.tail = null
    }
    this.size--
    return retNode.element
  }

  // 返回队列的第一个元素 O(1)
  getFront() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.')
    }
    return this.head.element
  }

  toString() {
    let cur = this.head,
      str = 'Queue: front '

    // 遍历节点
    while (cur !== null) {
      str += cur.element + ' -> '
      cur = cur.next
    }

    str += 'NULL tail'
    return str
  }
}

module.exports = LinkedListQueue
