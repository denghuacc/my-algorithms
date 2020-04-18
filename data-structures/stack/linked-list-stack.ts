import LinkedList from '../linked-list/linked-list'

/**
 * @name LinkedListStack 栈
 * @description 使用链表来实现栈
 */
export default class LinkedListStack<T> {
  list: LinkedList<T>

  constructor() {
    this.list = new LinkedList()
  }

  // 入栈 O(1)
  push(element: T) {
    this.list.addFirst(element)
  }

  // 出栈，返回出栈的元素 O(1)
  pop() {
    return this.list.removeFirst()
  }

  // 获取栈顶的元素 O(1)
  peek() {
    return this.list.getFirst()
  }

  // 获取栈的元素的数量 O(1)
  size() {
    return this.list.size()
  }

  // 查询栈是否为空 O(1)
  isEmpty() {
    return this.list.isEmpty()
  }

  clear() {
    this.list = new LinkedList()
  }

  // 打印栈
  toString() {
    let str = this.list.toString()
    str = str.replace('Linked List', 'Linked List Stock').replace('{', 'Top {')
    return str
  }
}
