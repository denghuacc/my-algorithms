/**
 * @name Node 链表的节点
 */
class Node {
  constructor(key = null, val = null, next = null) {
    this.key = key
    this.val = val
    this.next = next
  }
}

/**
 * @name LinkedListMap 映射
 * @description 使用链表实现 ES6 映射 Map
 */
class LinkedListMap {
  constructor() {
    this.dummyHead = new Node()
    this.size = 0
  }

  // 设置值 O(n)
  set(key, val) {
    const node = this._getNode(key)

    if (node == null) {
      this.dummyHead.next = new Node(key, val, this.dummyHead.next) // 头部位置增加节点
      this.size++
    } else {
      node.val = val
    }

    return this
  }

  // 获取值 O(n)
  get(key) {
    const node = this._getNode(key)
    return node == null ? undefined : node.val
  }

  // 查询值 O(n)
  has(key) {
    return this._getNode(key) != null
  }

  // 删除值 O(n)
  delete(key) {
    let prev = this.dummyHead

    while (prev.next != null) {
      if (prev.next.key === key) {
        break
      }
      prev = prev.next
    }

    if (prev.next != null) {
      const delNode = prev.next
      prev.next = delNode.next
      delNode.next = null
      this.size--
      return true
    }

    return false
  }

  // 清空值 O(1)
  clear() {
    this.dummyHead = new Node()
    this.size = 0
  }

  // 通过 key 获取对应的节点 辅助函数
  _getNode(key) {
    let cur = this.dummyHead.next

    while (cur != null) {
      if (cur.key === key) {
        return cur
      }
      cur = cur.next
    }

    return null
  }
}

module.exports = LinkedListMap
