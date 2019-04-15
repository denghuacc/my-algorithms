/**
 * @name HashTable 散列 也叫哈希表
 * @description 散列算法的作用是尽可能快地在数据结构中找到一个值
 */
class HashTable {
  constructor() {
    this.table = []
  }

  // 散列方法
  _hashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 // 取模，37是随机素数
  }

  // 向散列表增加一个新的项（也能更新散列表）
  add(key, value) {
    const pos = this._hashCode(key)
    console.log(pos + ' - ' + key)
    this.table[pos] = value
  }

  // 根据键值从散列表中移除值
  remove(key) {
    this.table[this._hashCode(key)] = null
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    return this.table[this._hashCode(key)]
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

module.exports = HashTable
