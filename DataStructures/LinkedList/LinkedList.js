/**
 * @name Node 链表节点
 * @description 链表的基本单位
 */
class Node {
  constructor(element = null, next = null) {
    this.element = element
    this.next = next
  }
}

/**
 * @name LinkedList 单向链表
 * @description 每个元素由一个存储元素本身的节点和一个指向下一个元素的引用（也称指针或链接）组成；
 * 链表相对于数组，在添加或移除元素的时候不需要移动其他元素；
 * 相对于数组，不能直接访问任何元素，需要从表头一个个迭代查找；
 * 单项链表是最简单的链表
 */
class LinkedList {
  constructor() {
    // this.head = null
    this.dummyHead = new Node(null, null) // 虚拟头部节点
    this.size = 0
  }

  // 获取链表中的元素个数
  getSize() {
    return this.size
  }

  // 返回链表是否为空
  isEmpty() {
    return this.size === 0
  }

  // 在链表的 index（0-based）位置添加新的元素 e
  // 在链表中不是一个常用的操作，练习用
  add(index, element) {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index.')
    }

    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next
    }

    // const node = new Node(element)
    // node.next = prev.next
    // prev.next = node

    prev.next = new Node(element, prev.next)
    this.size++
  }

  // 在链表头添加元素 e
  addFirst(element) {
    // const node = new Node(element)
    // node.next = this.head
    // this.head = node

    // this.head = new Node(element, this.head)
    // this.size++

    this.add(0, element)
  }

  // 在链表末尾添加元素 e
  addLast(element) {
    this.add(this.size, element)
  }

  // 获得链表第 index（0-based）个位置的元素
  // 在链表中不是一个常用的操作，练习用
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let cur = this.dummyHead.next
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    return cur.element
  }

  // 获得链表的第一个元素
  getFirst() {
    return this.get(0)
  }

  // 获得链表的最后一个元素
  getLast() {
    return this.get(this.size - 1)
  }

  // 设置链表第 index（0-based）个位置的元素为新元素 e
  // 在链表中不是一个常用的操作，练习用
  set(index, element) {
    if (index < 0 || index >= this.size) {
      throw new Error('Set failed. Illegal index.')
    }

    let cur = this.dummyHead.next
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    cur.element = element
  }

  // 查找链表中是否有元素 e
  contains(element) {
    let cur = this.dummyHead.next

    while (cur !== null) {
      if (cur.element === element) {
        return true
      }
      cur = cur.next
    }
    return false
  }

  // 删除链表第 index（0-based）个位置的元素，返回删除的元素
  // 在链表中不是一个常用的操作，练习用
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Remove failed. Illegal index.')
    }

    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next
    }

    const retNode = prev.next
    prev.next = retNode.next
    retNode.next = null
    this.size--
    return retNode.element
  }

  // 删除链表的第一个元素，返回删除的元素
  removeFirst() {
    return this.remove(0)
  }

  // 删除链表的最后一个元素，返回删除的元素
  removeLast() {
    return this.remove(this.size - 1)
  }

  // 从链表中删除元素 element
  removeElement(element) {
    let prev = this.dummyHead

    while (prev.next !== null) {
      if (prev.next.element === element) {
        break
      }
      prev = prev.next
    }

    if (prev.next !== null) {
      let delNode = prev.next
      prev.next = delNode.next
      delNode.next = null
      this.size--
    }
  }

  // 转成字符串
  toString() {
    let cur = this.dummyHead.next,
      str = ''

    // 遍历节点
    while (cur !== null) {
      str += cur.element + ' -> '
      cur = cur.next
    }

    str += 'NULL'
    return str
  }
}

module.exports = LinkedList
