import { ValuePair } from '../models/value-pair'
import { defaultToString } from '../util'

interface Table<K, V> {
  [key: string]: ValuePair<K, V>
}

/**
 * @name HashTable 散列 也叫哈希表
 * @description 散列算法的作用是尽可能快地在数据结构中找到一个值
 */
export default class HashTable<K, V> {
  table: Table<K, V> = {}

  constructor() {}

  size() {
    return Object.keys(this.table).length
  }

  isEmpty() {
    return this.size() === 0
  }

  hashCode(key: K) {
    return this.loseloseHashCode(key)
  }

  // 散列方法一
  private loseloseHashCode(key: K) {
    if (typeof key === 'number') return key
    const tableKey = defaultToString(key)
    let hash = 0
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i)
    }
    return hash % 37 // 取余，37是随机素数
  }

  // 散列方法二
  // private djb2HashCode(key: K) {
  //   const tableKey = defaultToString(key)
  //   let hash = 5381 // 社区建议使用这个数值
  //   for (let i = 0; i < tableKey.length; i++) {
  //     hash += hash * 33 + tableKey.charCodeAt(i)
  //   }
  //   return hash % 1013 // 取余，取质数 1013 即散列表数量若为 1000 左右时比较合适
  // }

  // 增加值
  put(key: K, val: V) {
    if (key != null && val != null) {
      const position = this.hashCode(key)
      this.table[position] = new ValuePair(key, val)
      return true
    }
    return false
  }

  // 获取值
  get(key: K) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    return valuePair == null ? undefined : valuePair.val
  }

  // 移除值
  remove(key: K) {
    const hash = this.hashCode(key)
    const valuePair = this.table[hash]
    if (valuePair != null) {
      delete this.table[hash]
      return true
    }
    return false
  }

  getTable() {
    return this.table
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
