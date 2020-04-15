import { Node } from '../models/linked-list-models'

/**
 * @name LinkedListWithDummyHead 链表 -> 单向链表
 * @description
 * 特性①：每个节点由一个存储元素本身值的元素和一个指向下一个元素的引用（也称指针或链接）组成。
 * 特性②：单项链表是最简单，也是最基础的链表。
 * 应用①：链表相对于数组，在添加或移除元素的时候不需要移动其他节点，而是修改节点的指向。
 * 应用②：相对于数组，不能直接通过索引访问任何一个元素，需要从表头开始一个个去查找。
 */
export default class LinkedListWithDummyHead<T> {
  // TODO redesign Node or Structures
  // @ts-ignore
  dummyHead: Node<T> = new Node(undefined)
  size: number = 0

  constructor() {}

  // 获取链表中值的数量
  getSize() {
    return this.size
  }

  // 返回链表是否为空
  isEmpty() {
    return this.size === 0
  }

  // 在链表的 index 位置添加值
  add(index: number, key: T) {
    if (index >= 0 && index <= this.size) {
      let prev = this.dummyHead
      for (let i = 0; i < index; i++) {
        prev = prev.next!
      }
  
      prev.next = new Node(key, prev.next)
      this.size++
    }
  }

  // 在表头添加值 O(1)
  addFirst(key: T) {
    this.add(0, key)
  }

  // 在表尾添加值 O(n)
  addLast(key: T) {
    this.add(this.size, key)
  }

  // 获取链表第 index 个位置的值
  get(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error('Get failed. Illegal index.')
    }

    let cur = this.dummyHead.next
    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }
    return cur!.key
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
  set(index: number, key: T) {
    if (index < 0 || index >= this.size) {
      throw new Error('Set failed. Illegal index.')
    }

    let cur = this.dummyHead.next
    for (let i = 0; i < index; i++) {
      cur = cur!.next
    }
    cur!.key = key
  }

  // 查找链表中是否有某个值 O(1) ~ O(n)
  contains(key: T) {
    if (this.dummyHead.next == null) return false

    let cur = this.dummyHead.next

    while (cur != null) {
      if (cur.key === key) {
        return true
      }
      cur = cur.next!
    }
    return false
  }

  // 删除链表第 index 个位置的值，返回删除的元素
  remove(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error('Remove failed. Illegal index.')
    }

    let prev = this.dummyHead
    for (let i = 0; i < index; i++) {
      prev = prev.next!
    }

    const retNode = prev.next
    prev.next = retNode!.next
    retNode!.next = undefined
    this.size--
    return retNode!.key
  }

  // 删除链表的第一个值 O(1)
  removeFirst() {
    return this.remove(0)
  }

  // 删除链表的最后一个值 O(n)
  removeLast() {
    return this.remove(this.size - 1)
  }

  // 从链表中删除某个值 key 只删除前面的第一个值
  removeVal(key: T) {
    let prev = this.dummyHead

    while (prev.next != null) {
      if (prev.next.key === key) break
      prev = prev.next
    }

    if (prev.next != null) {
      let delNode = prev.next
      prev.next = delNode.next
      delNode.next = undefined
      this.size--
    }
  }

  // 转成字符串 -> 打印链表
  print() {
    let cur = this.dummyHead.next,
      str = ''

    // 遍历节点
    while (cur != null) {
      str += cur.key + ' -> '
      cur = cur.next
    }

    str += 'undefined'
    return str
  }
}
