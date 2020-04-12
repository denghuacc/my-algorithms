/**
 * @name HashTable 散列 也叫哈希表
 * @description 散列算法的作用是尽可能快地在数据结构中找到一个值
 */
class HashTable {
  constructor() {
    this.table = []
    this.size = 0
  }

  getSize() {
    return this.size
  }

  // 原散列方法，很容易哈希冲突
  // _hashCode(key) {
  //   let hash = 0
  //   for (let i = 0; i < key.length; i++) {
  //     hash += key.charCodeAt(i)
  //   }
  //   return hash % 37 // 取余，37是随机素数
  // }

  // 散列方法
  _hashCode(key) {
    let hash = 5381 // 社区建议使用这个数值
    for (let i = 0; i < key.length; i++) {
      hash += hash * 33 + key.charCodeAt(i)
    }
    return hash % 1013 // 取余，取质数 1013 即散列表数量若为 1000 左右时比较合适
  }

  // 增加值
  add(key, val) {
    const pos = this._hashCode(key)
    if (this.contains(key)) {
      this.set(key, val)
    } else {
      this.table[pos] = val
      this.size++
    }
  }

  // 设置值
  set(key, val) {
    const pos = this._hashCode(key)
    if (!this.contains(key)) {
      throw new Error(key + " doesn't exist!")
    }
    this.table[pos] = val
  }

  // 获取值
  get(key) {
    const pos = this._hashCode(key)
    return this.table[pos]
  }

  contains(key) {
    const pos = this._hashCode(key)
    return this.table[pos] != null
  }

  // 移除值
  remove(key) {
    const pos = this._hashCode(key)
    if (this.contains(key)) {
      this.table[pos] = null
      this.size--
    }
  }

  // 打印值（只测试 pos 的值，只要 pos 的数量和 size 数量相同说明没有哈希冲突）
  print() {
    let arr = []
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        arr.push(i)
      }
    }
    return arr
  }
}

module.exports = HashTable
