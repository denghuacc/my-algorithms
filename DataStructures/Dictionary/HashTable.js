/**
 * @name HashTable 散列 也叫哈希表
 * @description 散列算法的作用是尽可能快地在数据结构中找到一个值;
 * @property { Array } table 数据仓库
 * @method loseloseHashCode 散列函数
 * @method put 向散列表增加一个新的项（也能更新散列表）
 * @method remove 根据键值从散列表中移除值
 * @method get 返回根据键值检索到的特定的值
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
    console.log(position + ' - ' + key)
    this.table[position] = value
  }

  // 根据键值从散列表中移除值
  remove(key) {
    this.table[this.loseloseHashCode(key)] = undefined
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    return this.table[this.loseloseHashCode(key)]
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
