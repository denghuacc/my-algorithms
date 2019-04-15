/**
 * @name HashTable 散列 也叫哈希表
 * @description 使用线性探查法改进散列表。
 * 当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试 index + 1 的位置；
 * 如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推，直到找到位置。
 * 删除和获取值也是一个道理
 */
class HashTable {
  constructor() {
    this.table = []
  }

  // 散列方法
  hashCode(key) {
    let hash = 0
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 37 // 37是随机数
  }

  // 向散列表增加一个新的项（也能更新散列表）
  add(key, value) {
    let hash = this.hashCode(key)
    if (!this.table[hash]) {
      const obj = {}
      obj[key] = value
      this.table[hash] = obj
    } else {
      // 继续往下找
      let index = hash + 1
      while (this.table[index]) {
        index++
      }
      const obj = {}
      obj[key] = value
      this.table[index] = obj
    }
  }

  // 根据键值从散列表中移除值
  remove(key) {
    let hash = this.hashCode(key)
    if (this.table[hash]) {
      if (this.table[hash].hasOwnProperty(key)) {
        this.table.splice(hash, 1)
      } else {
        let index = hash + 1
        while (this.table[index] && !this.table[index].hasOwnProperty(key)) {
          index++
        }
        this.table.splice(index, 1)
      }
    }
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    let hash = this.hashCode(key)
    if (this.table[hash]) {
      if (this.table[hash].hasOwnProperty(key)) {
        return this.table[hash][key]
      } else {
        let index = hash + 1
        while (this.table[index] && !this.table[index].hasOwnProperty(key)) {
          index++
        }
        return this.table[index][key]
      }
    }
  }

  toString() {
    let str = ''
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        const obj = this.table[i]

        str += `${i}: `
        for (let key in obj) {
          str += `${key} => ${obj[key]};`
        }
        str += '\n'
      }
    }
    return str
  }
}

module.exports = HashTable
