/**
 * @name Node 链表节点 链表的单位
 * @description
 * @property { any } element 元素
 * @property { Node } next 指向下一个节点的链接
 * @property { Node } prev 指向上一个节点的链接
 */
class Node {
  constructor(element) {
    this.element = element
    this.next = null
    this.prev = null
  }
}

/**
 * @name DoublyCircularLinkedList 双向循环链表
 * @description 双向循环链表最后一个节点（尾巴）的指向 `next`不是 null，而是 表头；
 * 表头的 `prev` 指向也不是 null， 而是最有一个节点尾巴 tail ，所以形成一个循环。
 * 相比于普通的双向链表，需要注意边界边界条件，不然很容易造成死循环。
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
class DoublyCircularLinkedList {
  constructor() {
    this.head = null
    this.length = 0
    this.tail = null
  }

  // 向列表尾部添加一个新的项
  append(element) {
    const node = new Node(element)
    let current = this.head,
      previous
    if (this.head === null) {
      this.head = node
      this.head.next = this.head.prev = this.head // 新增 表头的 ’next‘ 和 ’prev‘ 都指向它本身
    } else {
      if (this.length === 1) {
        this.head.next = node
        node.next = this.head // 新增 ’next‘ 指向表头
        node.prev = this.head // 新增 ’prev‘ 也指向表头
      } else {
        while (current.next) {
          previous = current
          current = current.next
          if (current.next === this.head) break // 新增打断条件，避免死循环；注意是 `current.next` 不是 `current`
        }
        current.next = node
        node.prev = current
        node.next = this.head // 新增尾巴的 `next` 指向表头 head
        this.head.prev = node // 新增表头的 `prev` 指向尾巴 tail
      }
    }
    this.tail = node
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
        if (this.length === 1) {
          this.head.next = this.head.prev = this.head // 新增 新的表头的 ’next‘ 和 ’prev‘ 都指向它本身
          this.tail = node // 修改 尾巴也是它，不为 null
        } else {
          this.head.prev = this.tail // 修改 表头的 ’prev‘指向尾巴，不为 null
          this.tail.next = this.head // 新增 尾巴的 ’next‘指向表头
        }
      } else if (position === this.length - 1) {
        current = this.tail
        this.tail = current.prev
        this.tail.next = this.head // 修改 尾巴的 ’next‘指向表头，不为 null
        this.head.prev = this.tail // 新增 表头的 ’prev‘指向尾巴
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        previous.next = current.next
        current.next.prev = previous
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
        if (!this.head) {
          this.head = node
          this.head.next = this.head.prev = this.head // 新增链接
          this.tail = node
          this.tail.next = this.tail.prev = this.tail // 新增链接
        } else {
          node.next = current
          current.prev = node
          this.head = node
          this.head.prev = this.tail // 新增链接
          this.tail.next = head // 新增链接
        }
      } else if (position === this.length) {
        current = this.tail
        current.next = node
        node.prev = current
        this.tail = node
        this.tail.next = this.head // 新增链接
        this.head.prev = this.tail // 新增链接
      } else {
        while (index++ < position) {
          previous = current
          current = current.next
        }
        node.next = current
        previous.next = node

        current.prev = node
        node.prev = previous
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
      string +=
        current.element + (current.next !== this.head ? ' <=> ' : ' <=> "Head"') // 修改标记条件
      current = current.next
      if (current === this.head) break // 新增打断条件，避免死循环
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
      if (current === this.head) break // 新增打断条件，避免死循环
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

module.exports = DoublyCircularLinkedList
