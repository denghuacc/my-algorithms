/**
 * @name MapSet 集合
 * @description 使用对象实现 ES6 集合
 * 因为对象的 key 值只支持字符串和 symbol，其它类型的值都会先转换成字符串，有时可能会出错
 */
export default class MapSet<T> {
  items: any

  constructor() {
    this.items = {}
  }

  // 获取集合的元素数量 O(1)
  get size() {
    return Object.keys(this.items).length
  }

  // 添加元素 O(n)
  add(val: T) {
    if (!this.has(val)) {
      this.items[val] = val
    }
    return this
  }

  //  删除元素 O(n)
  delete(val: T) {
    if (this.has(val)) {
      delete this.items[val]
      return true
    }
    return false
  }

  //  查询元素 O(n)
  has(val: T) {
    return this.items.hasOwnProperty(val)
  }

  // 清除元素 O(1)
  clear() {
    this.items = {}
  }
}
