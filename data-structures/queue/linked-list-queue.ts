import { Node } from '../models/linked-list-models'

/**
 * @name LinkedListQueue 队列 -> 使用链表实现队列
 * @description 这里使用了表头 head 和表尾 tail 属性，入列和出列都是 O(1)
 */
export default class LinkedListQueue<T> {
  head: Node<T> | undefined
  tail: Node<T> | undefined
  size: number

  constructor() {
    this.head = undefined // 表头
    this.tail = undefined // 表尾
    this.size = 0
  }

  // 入列 O(1)
  enqueue(key: T) {
    if (this.tail == undefined) {
      this.tail = new Node(key)
      this.head = this.tail
    } else {
      this.tail.next = new Node(key)
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
    this.head = this.head!.next!
    retNode!.next = undefined

    if (this.head == undefined) {
      this.tail = undefined
    }
    this.size--
    return retNode!.key
  }

  // 获取队列的第一个元素 O(1)
  getFront() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty.')
    }
    return this.head!.key
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
    while (cur != undefined) {
      str += cur.key + ' -> '
      cur = cur.next!
    }

    str += 'undefined tail'
    return str
  }
}
