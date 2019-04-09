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
 * @description 使用线性探查法改进散列表。
 * 当想向表中某个位置加入一个新元素的时候，如果索引为index的位置已经被占据了，就尝试 index+1 的位置；
 * 如果 index+1 的位置也被占据了，就尝试 index+2 的位置，以此类推。
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
    let position = this.loseloseHashCode(key)
    if (this.table[position] === undefined) {
      this.table[position] = new ValuePair(key, value)
    } else {
      let index = ++position
      while (this.table[index] !== undefined) {
        index++
      }
      this.table[index] = new ValuePair(key, value)
    }
  }

  // 根据键值从散列表中移除值
  remove(key) {
    let position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        this.table[index] = undefined
      } else {
        let index = ++position
        while (this.table[index] === undefined || this.table[index] !== key) {
          index++
        }
        if (this.table[index].key === key) {
          this.table[index] = undefined
        }
      }
    }
    return undefined
  }

  // 返回根据键值检索到的特定的值
  get(key) {
    const position = this.loseloseHashCode(key)
    if (this.table[position] !== undefined) {
      if (this.table[position].key === key) {
        return this.table[position].value
      } else {
        let index = ++position
        while (this.table[index] === undefined || this.table[index] !== key) {
          index++
        }
        if (this.table[index].key === key) {
          return this.table[index].value
        }
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
