/**
 * @name Node 节点
 * @description 链表节点
 */
class Node {
  constructor(val = null, next = null) {
    this.val = val
    this.next = next
  }
}

/**
 * @name LinkedList 链表 -> 单向链表
 * @description
 * 特性①：每个节点由一个存储元素本身值的元素和一个指向下一个元素的引用（也称指针或链接）组成。
 * 特性②：单项链表是最简单，也是最基础的链表。
 * 应用①：链表相对于数组，在添加或移除元素的时候不需要移动其他节点，而是修改节点的指向。
 * 应用②：相对于数组，不能直接通过索引访问任何一个元素，需要从表头开始一个个去查找。
 */
class LinkedList {
  constructor() {
    this.head = null
    this.dummyHead = new Node(null, null)
    this.size = 0
  }

  // 获取链表中值的数量
  getSize() {
    return this.size
  }

  // 返回链表是否为空
  isEmpty() {
    return this.size === 0
  }

  // 在链表的 index 位置添加值
  add(index, val) {
    if (index < 0 || index > this.size) {
      throw new Error('Add failed. Illegal index.')
    }

    if (index === 0) {
      this.addFirst(val)
    } else {
      let prev = this.head
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next
      }

      prev.next = new Node(val, prev.next)
      this.size++
    }
  }

  // 在表头添加值 O(1)
  addFirst(val) {
    this.head = new Node(val, this.head)
    this.size++
  }

  // 在表尾添加值 O(n)
  addLast(val) {
    this.add(this.size, val)
  }

  // 获取链表第 index 个位置的值
  get(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let cur = this.head
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    return cur.val
  }

  // 获取链表的第一个值 O(1)
  getFirst() {
    return this.get(0)
  }

  // 获取链表的最后一个值 O(n)
  getLast() {
    return this.get(this.size - 1)
  }

  // 设置链表第 index 个位置的值
  set(index, val) {
    if (index < 0 || index >= this.size) {
      throw new Error('Set failed. Illegal index.')
    }

    let cur = this.head
    for (let i = 0; i < index; i++) {
      cur = cur.next
    }
    cur.val = val
  }

  // 查找链表中是否有某个值 O(1) ~ O(n)
  contains(val) {
    let cur = this.head

    while (cur != null) {
      if (cur.val === val) {
        return true
      }
      cur = cur.next
    }
    return false
  }

  // 删除链表第 index 个位置的值，返回删除的元素
  remove(index) {
    if (index < 0 || index >= this.size) {
      throw new Error('Remove failed. Illegal index.')
    }

    let delNode
    if (index === 0) {
      delNode = this.head
      this.head = this.head.next
    } else {
      let prev = this.head
      for (let i = 0; i < index - 1; i++) {
        prev = prev.next
      }
      delNode = prev.next
      prev.next = delNode.next
    }
    delNode.next = null
    this.size--
    return delNode.val
  }

  // 删除链表的第一个值 O(1)
  removeFirst() {
    return this.remove(0)
  }

  // 删除链表的最后一个值 O(n)
  removeLast() {
    return this.remove(this.size - 1)
  }

  // 从链表中删除某个值 val 只删除前面的第一个值
  removeVal(val) {
    let delNode
    if (this.head.val === val) {
      delNode = this.head
      this.head = this.head.next
      delNode.next = null
      return
    }

    let prev = this.head
    while (prev.next != null) {
      if (prev.next.val === val) {
        break
      }
      prev = prev.next
    }

    if (prev.next != null) {
      delNode = prev.next
      prev.next = delNode.next
      delNode.next = null
      this.size--
    }
  }

  // 转成字符串 -> 打印链表
  print() {
    let cur = this.head,
      str = ''

    // 遍历节点
    while (cur != null) {
      str += cur.val + ' -> '
      cur = cur.next
    }

    str += 'null'
    return str
  }
}

module.exports = LinkedList
