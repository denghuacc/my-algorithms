/**
 * @name Node 链表节点
 * @description 链表的基本单位
 * @property { any } element 元素
 * @property { Node } next 指向一个节点的链接
 */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
  }
}

/**
 * @name CircularLinkedList 单向循环链表
 * @description 单向循环链表最后一个节点的指向不是 null，而是 表头，所以形成一个循环。
 * 相比于普通的单向链表，需要注意边界边界条件，不然很容易造成死循环。
 * @property { Node } head
 * @property { Number } length
 * @method append 向列表尾部添加一个新的项
 * @method removeAt 从列表的特定位置移除一项
 * @method remove 从列表中移除一项
 * @method insert 向列表的特定位置插入一个新的项
 * @method toString 打印元素
 * @method indexOf 返回元素在列表中的索引
 * @method isEmpty 检查是否为空
 * @method size 返回链表包含的元素个数
 * @method getHead 返回链表的表头
 *
 */
class CircularLinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }

  // 向列表尾部添加一个新的项
  append(element) {
    const node = new Node(element)
    let current
    if (this.head === null) {
      this.head = node
      this.head.next = this.head // 新增 只有表头时，指向它自己
    } else {
      current = this.head
      while (current.next !== this.head) {
        current = current.next
      }
      current.next = node
      node.next = this.head // 每一个尾部添加的节点都指向表头 head
    }
    this.length++
  }

  // 删除元素(指定位置)
  removeAt(position) {
    if (position > -1 && position < this.length) {
      let current = this.head,
        previous,
        index = 0
      if (position === 0) {
        this.head = current.next
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length--
      return current.element
    } else {
      return null
    }
  }

  // 插入元素(指定位置)
  insert(position, element) {
    if (position >= 0 && position <= this.length) {
      const node = new Node(element)
      let current = this.head,
        previous,
        index = 0
      if (position === 0) {
        node.next = current
        this.head = node
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node
      }
      this.length++
      return true
    } else {
      return false
    }
  }

  toString() {
    let current = this.head,
      string = ''

    while (current.next) {
      string +=
        current.element + (current.next !== this.head ? ' -> ' : ' -> "Head"') // 修改标记条件
      current = current.next
      if (current === this.head) break // 新增打断条件,避免死循环
    }
    return string
  }

  // 查找元素索引
  indexOf(element) {
    let current = this.head,
      index = 0

    while (current) {
      if (element === current.element) {
        return index
      }
      index++
      current = current.next
      if (current.next === this.head) break // 新增打断条件,避免死循环
    }

    return -1
  }

  // 删除元素(指定元素)
  remove(element) {
    const index = this.indexOf(element)
    return this.removeAt(index)
  }

  // 检查是否为空
  isEmpty() {
    return this.length === 0
  }

  // 链表的元素个数
  size() {
    return this.length
  }

  // 获取链表的表头
  getHead() {
    return this.head
  }
}

module.exports = CircularLinkedList
