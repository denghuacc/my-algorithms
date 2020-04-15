import { Node } from '../models/linked-list-models'

/**
 * @name LinkedList 链表 -> 单向链表
 * @description
 * 特性①：每个节点由一个存储元素本身值的元素和一个指向下一个元素的引用（也称指针或链接）组成。
 * 特性②：单项链表是最简单，也是最基础的链表。
 * 应用①：链表相对于数组，在添加或移除元素的时候不需要移动其他节点，而是修改节点的指向。
 * 应用②：相对于数组，不能直接通过索引访问任何一个元素，需要从表头开始一个个去查找。
 */
export default class LinkedList<T> {
  head: Node<T> | undefined
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
      const node = new Node(key)

      if (index === 0) {
        const current = this.head
        node.next = current
        this.head = node
      } else {
        const previous = this.get(index - 1)
        if (previous != null) {
          node.next = previous.next
          previous.next = node
        }
      }
      this.size++
      return true
    }
    return false
  }

  // 在表头添加值 O(1)
  addFirst(key: T) {
    this.add(0, key)
  }

  // 在表尾添加值 O(n)
  addLast(key: T) {
    this.add(this.size, key)
  }

  // 获取链表第 index 个位置的节点
  get(index: number): Node<T> | undefined {
    if (index >= 0 && index <= this.size) {
      let node = this.head
      for (let i = 0; i < index && node != null; i++) {
        node = node.next
      }
      return node
    }
    return undefined
  }

  // 获取链表的第一个值 O(1)
  getFirst() {
    return this.get(0)?.key
  }

  // 获取链表的最后一个值 O(n)
  getLast() {
    return this.get(this.size - 1)?.key
  }

  // 设置链表第 index 个位置的值
  set(index: number, key: T) {
    if (index >= 0 && index < this.size) {
      const node = this.get(index)
      if (node != null) {
        node.key = key
        return true
      }
    }
    return false
  }

  // 查找链表中是否有某个值 O(1) ~ O(n)
  contains(key: T) {
    let current = this.head

    if (current == null) {
      return false
    } else {
      while (current != null) {
        if (current.key === key) {
          return true
        }
        current = current.next
      }
    }
    return false
  }

  // 删除链表第 index 个位置的值，返回删除的元素
  remove(index: number) {
    if (index >= 0 && index < this.size) {
      let current = this.head
      if (current == null) {
        return undefined
      }
      if (index === 0) {
        this.head = current.next
      } else {
        const previous = this.get(index - 1)
        if (previous != null) {
          current = previous.next
          previous.next = current!.next
        }
      }
      this.size--
      return current?.key
    }
    return undefined
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
    let current = this.head
    let delNode

    if (current == null) return undefined

    if (current.key === key) {
      delNode = current
      this.head = delNode.next
      this.size--
    } else {
      while (current.next != null) {
        if (current.next.key === key) {
          delNode = current.next
          const previous = current
          previous.next = current.next.next
          this.size--
          break
        }
        current = current.next
      }
    }
    return delNode?.key
  }

  // 转成字符串 -> 打印链表
  print() {
    let cur = this.head,
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
