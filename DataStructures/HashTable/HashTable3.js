/**
 * @name HashTable 散列 也叫哈希表
 * @description 使用分离链接法改进散列表。
 * 分离链接法包括为散列表的每一个位置创建一个链表并将元素存储在里面；
 * 它是解决冲突的最简单的方法，但是它在HashTable实例之外还需要额外的存储空间。
 * 注意：转换在 Java 学习的数据结构
 */
class HashTable3 {
  constructor() {
    // 取模的素数
    this.capacity = [
      53,
      97,
      193,
      389,
      769,
      1543,
      3079,
      6151,
      12289,
      24593,
      49157,
      98317,
      196613,
      393241,
      786433,
      1572869,
      3145739,
      6291469,
      12582917,
      25165843,
      50331653,
      100663319,
      201326611,
      402653189,
      805306457,
      1610612741
    ]
    this.capacityIndex = 0
    this.M = this.capacity[this.capacityIndex]
    this.upperTol = 10
    this.lowerTol = 2
    this.table = []
  }

  // 散列方法
  hashCode(key) {
    let str = null
    switch (this._type(key)) {
      case 'string':
        str = key
        break
      case 'null':
      case 'undefined':
      case 'number':
      case 'boolean':
        str = key + ''
    }
    return (this._hashCode(str) & 0x7fffffff) % this.M
  }

  _type(key) {
    return Object.prototype.toString
      .call(key)
      .slice(8, -1)
      .toLowerCase()
  }

  // 模拟 java 的 hashCode 方法
  _hashCode(str) {
    let h = 0,
      off = 0
    let len = str.length
    for (let i = 0; i < len; i++) {
      h = 31 * h + str.charCodeAt(off++)
    }
    let t = -2147483648 * 2
    while (h > 2147483647) {
      h += t
    }
    return h
  }

  // 向散列表增加一个新的项（也能更新散列表）
  add(key, value) {
    const hash = this.hashCode(key)

    if (!this.table[hash]) {
      this.table[hash] = new Map()
    }
    this.table[hash].set(key, value)

    // 哈希冲突超过一定数量时，替换较大的素数
    if (
      this.table[hash].size > this.upperTol &&
      this.capacityIndex + 1 < this.capacity.length
    ) {
      this.capacityIndex++
      this.M = this.capacity[this.capacityIndex]
    }
  }

  // 根据键值从散列表中移除值
  remove(key) {
    const hash = this.hashCode(key)
    const map = this.table[hash]
    let ret
    if (map.has(key)) {
      ret = map.delete(key)
      // 哈希冲突低于一定数量时，替换较小的素数
      if (map.size < this.upperTol && this.capacityIndex - 1 >= 0) {
        this.capacityIndex++
        this.M = this.capacity[this.capacityIndex]
      }

      // 删除后如果 map 为空，直接在数组中删除该索引
      if (map.size === 0) {
        this.table.splice(hash, 1)
      }
    }
    return ret
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    const map = this.table[this.hashCode(key)]
    return map.get(key)
  }

  toString() {
    let str = ''
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        const map = this.table[i]
        str += `${i}: `
        for (let item of map.entries()) {
          str += `${item[0]} => ${item[1]}; `
        }
        str += '\n'
      }
    }
    return str
  }
}

module.exports = HashTable3
