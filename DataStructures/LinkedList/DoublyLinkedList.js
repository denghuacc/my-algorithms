/**
 * @name Node 链表节点
 * @description 链表的基本单位
 * @property { any } element
 * @property { Node } next
 * @property { Node } prev // 新增指向上一个节点的链接
 */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null // 新增指向上一个节点的链接
  }
}

/**
 * @name DoublyLinkedList 双向链表
 * @description 相比于单向链表（普通链表），多了一个指向上上一个节点的链接
 * 在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。
 * 在双向链表中，为了方便操作，新增尾巴 tail 属性，表示双向链表的最后一个节点；
 * 在双向链表中，表头的上一个节点为 null， 尾巴的下一个节点为 null。
 * @property { Node } head
 * @property { Number } length
 * @property { Node } tail
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
class DoublyLinkedList {
  constructor() {
    this.head = null
    this.length = 0
    this.tail = null // 新增 tail（尾部）属性，表示双向链表的最后一个节点
  }

  // 向列表尾部添加一个新的项
  append(element) {
    const node = new Node(element)
    let current = this.head,
      previous
    if (this.head === null) {
      this.head = node
    } else {
      // 新增 当条件为只有表头时
      if (this.length === 1) {
        this.head.next = node
        node.prev = this.head // 新增节点的上一个链接为表头
      } else {
        while (current.next) {
          previous = current
          current = current.next
        }
        current.next = node
        node.prev = current // 新增节点的上一个链接最后一个节点
      }
    }
    this.tail = node // 新增 尾部添加的元素都是尾巴
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
        // 新增 当条件为只有表头时
        if (this.length === 1) {
          this.tail = null // 新增 没有尾巴了
        } else {
          this.head.prev = null // 新增 头部的上一个节点为 null
        }
        // 删除的是最后一个节点时
      } else if (position === this.length - 1) {
        current = this.tail // 先存好原来的尾巴
        this.tail = current.prev // 新的尾巴为原来尾巴的上一个节点
        this.tail.next = null // 新的尾巴的下一个节点为null
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous // 它的下一个节点上一个链接指向原来的上一个节点
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
        // 当没有表头时，空链
        if (!this.head) {
          this.head = node
          this.tail = node // 新增 表头和尾巴都是它
        } else {
          node.next = current
          current.prev = node // 新增 设置上一个链接
          this.head = node
        }
        // 当在尾巴后面插入元素时
      } else if (position === this.length) {
        current = this.tail // 把原来的尾巴存起来
        current.next = node // 原来的尾巴后面接新的节点
        node.prev = current // 添加上一个节点的链接
        this.tail = node // 重新设置新的节点为尾巴
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node // 新增 设置上一个链接

        current.prev = node
        node.prev = previous // 新增 设置上一个链接
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

    while (current) {
      string += current.element + (current.next ? ' <=> ' : '') // 修改了一下链接符号
      current = current.next
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

module.exports = DoublyLinkedList
