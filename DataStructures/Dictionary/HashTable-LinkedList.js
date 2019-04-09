const LinkedList = require('../LinkedList/LinkedList')

class ValuePair {
  constructor(key, value) {
    this.key = value
    this.value = value
  }

  toString() {
    return `[${this.key} - ${this.value}]`
  }
}

/**
 * @name HashTable 散列 也叫哈希表
 * @description 使用分离链接法改进散列表。
 * 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面；
 * 它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。
 * @property { Array } table 数据仓库
 * @method loseloseHashCode 散列函数
 * @method put 向散列表增加一个新的项（也能更新散列表） 重写
 * @method remove 根据键值从散列表中移除值 重写
 * @method get 返回根据键值检索到的特定的值 重写
 */
class HashTable {
  constructor() {
    this.table = []
  }

  // 散列方法
  loseloseHashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 // 37是随机数
  }

  // 向散列表增加一个新的项（也能更新散列表）
  put(key, value) {
    const position = this.loseloseHashCode(key)
    if (this.table[position] === undefined) {
      this.table[position] = new LinkedList() // 初始化一个链表
    }
    this.table[position].append(new ValuePair(key, value)) // 把值加入链表
  }

  // 根据键值从散列表中移除值
  remove(key) {
    const position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead()

      while (current.next) {
        if (current.element.key === key) {
          this.table[position].remove(current.element)
          if (this.table[position].isEmpty()) {
            this.table[position] = undefined
          }
          return true
        }
        current = current.next
      }

      if (current.element.key === key) {
        this.table[position].remove(current.element)
        if (this.table[position].isEmpty()) {
          this.table[position] = undefined
        }
        return true
      }
    }

    return false
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    const position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      let current = this.table[position].getHead() // 获取链表表头

      while (current.next) {
        if (current.element.key === key) {
          return current.element.value
        }
        current = current.next
      }

      if (current.element.key === key) {
        return current.element.value
      }
    }
    return undefined
  }

  print() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i] !== undefined) {
        console.log(i + ': ' + this.table[i])
      }
    }
  }
}

module.exports = HashTable
