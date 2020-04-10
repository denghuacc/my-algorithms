/**
 * @name Node 节点
 * @description 链表节点
 */
class Node {
  constructor(val = null, next = null) {
    this.val = val
    this.next = null
  }
}

/**
 * @name LinkedListQueue 队列 -> 使用链表实现队列
 * @description 这里使用了表头 head 和表尾 tail 属性，入列和出列都是 O(1)
 */
class LinkedListQueue {
  constructor() {
    this.head = null // 表头
    this.tail = null // 表尾
    this.size = 0
  }

  // 入列 O(1)
  enqueue(val) {
    if (this.tail == null) {
      this.tail = new Node(val)
      this.head = this.tail
    } else {
      this.tail.next = new Node(val)
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

    if (this.head == null) {
      this.tail = null
    }
    this.size--
    return retNode.val
  }

  // 获取队列的第一个元素 O(1)
  getFront() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.')
    }
    return this.head.val
  }

  // 获取队列的元素数量 O(1)
  getSize() {
    return this.size
  }

  // 查询队列是否为空 O(1)
  isEmpty() {
    return this.size === 0
  }

  print() {
    let cur = this.head,
      str = 'Queue: front '

    // 遍历节点
    while (cur != null) {
      str += cur.val + ' -> '
      cur = cur.next
    }

    str += 'null tail'
    return str
  }
}

module.exports = LinkedListQueue
