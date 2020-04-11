/**
 * @name ObjectMap 映射
 * @description 使用 ES 对象结构实现 ES6 的映射 Map
 * ES6 增加了原生的 Map 数据结构
 * 特性①：和对象一样是键值对结构，但是它的键不局限于字符串
 * 特性②：方便快速查找和设置元素
 */
class ObjectMap {
  constructor() {
    this.items = {}
  }

  // 获取元素数量 O(1)
  get size() {
    return Object.keys(this.items).length
  }

  // 设置值 O(1)
  set(key, val) {
    this.items[key] = val
    return this
  }

  // 获取值 O(1)
  get(key) {
    return this.items[key]
  }

  // 查询值 O(n)
  has(key) {
    return this.items.hasOwnProperty(key)
  }

  // 删除值 O(n)
  delete(key) {
    if (this.has(key)) {
      const delObj = this.items[key]
      delete this.items[key]
      return true
    }
    return false
  }

  // 清空值 O(1)
  clear() {
    this.items = {}
  }
}

module.exports = ObjectMap
