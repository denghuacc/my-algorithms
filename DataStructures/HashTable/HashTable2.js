/**
 * @name BetterHashTable 更好的散列
 * @description 改进散列函数
 * 这并不是最好的散列函数，但这是最受社区推崇的散列函数之一！
 * 表现良好的散列函数：插入和检索元素的时间（即性能），当然也包括较低的冲突可能性。
 * 可以在网上找到一些不同的实现方法，或者也可以实现自己的散列函数
 */
class HashTable2 {
  constructor() {
    this.table = []
  }

  // 散列方法
  hashCode(key) {
    let hash = 5381 // 社区建议使用这个数值
    for (let i = 0; i < key.length; i++) {
      hash += hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013 // 取模，质数 1013 在散列表的大小为 1000 比较合适
  }

  // 向散列表增加一个新的项（也能更新散列表）
  add(key, value) {
    const pos = this.hashCode(key)
    console.log(pos + ' - ' + key)
    this.table[pos] = value
  }

  // 根据键值从散列表中移除值
  remove(key) {
    this.table[this.hashCode(key)] = null
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    return this.table[this.hashCode(key)]
  }

  toString() {
    let str = ''
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        str += `${i}: ${this.table[i]}\n`
      }
    }
    return str
  }
}

module.exports = HashTable2
