const LinkedList = require('../LinkedList/LinkedList')

/**
 * LinkedListSet 使用链表实现集合
 */
class LinkedListSet {
  constructor() {
    this.list = new LinkedList()
  }

  // 获取集合的元素个数 O(1)
  gitSize() {
    return this.list.getSize()
  }

  // 查询集合是否为空 O(1)
  isEmpty() {
    return this.list.isEmpty()
  }

  // 查询元素是否存在 O(n)
  contains(element) {
    return this.list.contains(element)
  }

  // 添加元素 O(n)
  add(element) {
    // 查询元素是否存在的时间复杂度 O(n)
    if (!this.contains(element)) {
      this.list.addFirst(element) // 链表头添加元素的时间复杂度 O(1)
    }
  }
  // 删除元素 O(n)
  remove(element) {
    this.list.removeElement(element)
  }
}
