import { ValuePairLazy } from '../models/value-pair'
import { defaultToString } from '../util'

interface Table<K, V> {
  [key: string]: ValuePairLazy<K, V>
}

/**
 * @name HashTableLinearProbingLazy 哈希表
 * @description 使用线性探测解决哈希冲突，使用 isDeleted 属性表示值是否被删除
 */
export default class HashTableLinearProbingLazy<K, V> {
  table: Table<K, V> = {}

  constructor() {}

  hashCode(key: K) {
    return this.loseloseHashCode(key)
  }

  // 散列方法
  private loseloseHashCode(key: K) {
    if (typeof key === 'number') return key
    const tableKey = defaultToString(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37 // 取余，37 是随机素数
  }

  // 增加值
  put(key: K, val: V) {
    if (key != null && val != null) {
      const position = this.hashCode(key)

      if (
        this.table[position] == null ||
        (this.table[position] != null && this.table[position].isDeleted)
      ) {
        this.table[position] = new ValuePairLazy(key, val)
      } else {
        let index = position + 1
        while (this.table[index] != null && !this.table[position].isDeleted) {
          index++
        }
        this.table[index] = new ValuePairLazy(key, val)
      }
      return true
    }
    return false
  }

  // 获取值
  get(key: K) {
    const position = this.hashCode(key)

    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        return this.table[position].val
      }
      let index = position + 1
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        if (this.table[index].key === key && this.table[index].isDeleted) {
          return undefined
        }
        index++
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        return this.table[position].val
      }
    }
    return undefined
  }

  // 移除值
  remove(key: K) {
    const position = this.hashCode(key)

    if (this.table[position] != null) {
      if (this.table[position].key === key && !this.table[position].isDeleted) {
        this.table[position].isDeleted = true
        return true
      }
      let index = position + 1
      while (
        this.table[index] != null &&
        (this.table[index].key !== key || this.table[index].isDeleted)
      ) {
        index++
      }
      if (
        this.table[index] != null &&
        this.table[index].key === key &&
        !this.table[index].isDeleted
      ) {
        this.table[index].isDeleted = true
        return true
      }
    }
    return false
  }

  getTable() {
    return this.table
  }

  size() {
    let count = 0
    Object.values(this.table).forEach(valuePair => {
      count += valuePair.isDeleted === true ? 0 : 1
    })
    return count
  }

  isEmpty() {
    return this.size() === 0
  }

  clear() {
    this.table = {}
  }

  toString() {
    if (this.isEmpty()) {
      return ''
    }
    const keys = Object.keys(this.table)
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString},{${keys[i]} => ${this.table[
        keys[i]
      ].toString()}}`
    }
    return objString
  }
}
