/**
 * @name ObjectSet 集合
 * @description 使用 ES 的对象结构实现 ES6 集合，比较接近原生结构（key 和 value 相同）
 * ES6 增加了原生的 Set 数据结构
 * 特性：它类似于数组，但是成员的值都是唯一的，没有重复的值。
 */
class ObjectSet {
  constructor() {
    this.items = {}
  }

  // 获取集合的元素数量 O(1)
  get size() {
    return Object.keys(this.items).length
  }

  // 添加元素 O(n)
  add(val) {
    if (!this.has(val)) {
      this.items[val] = val
    }
    return this
  }

  //  删除元素 O(n)
  delete(val) {
    if (this.has(val)) {
      delete this.items[val]
      return true
    }
    return false
  }

  //  查询元素 O(n)
  has(val) {
    return this.items.hasOwnProperty(val)
  }

  // 清除元素 O(1)
  clear() {
    this.items = {}
  }
}

module.exports = ObjectSet
