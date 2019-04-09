const LinkedList = require('../LinkedList/LinkedList')

/**
 * LinkedListStack 使用链表来实现栈
 */
class LinkedListStack {
  constructor() {
    this.list = new LinkedList()
  }

  // 入栈 O(1)
  push(element) {
    this.list.addFirst(element)
  }

  // 出栈，返回出栈的元素 O(1)
  pop() {
    this.list.removeFirst()
  }

  // 返回栈顶的元素 O(1)
  peek() {
    return this.list.getFirst()
  }

  // 获取栈的元素个数 O(1)
  getSize() {
    return this.list.getSize()
  }

  // 查询栈是否为空 O(1)
  isEmpty() {
    return this.list.isEmpty()
  }

  toString() {
    let str = 'Stack: top '
    str += this.list.toString()
    return str
  }
}

module.exports = LinkedListStack
