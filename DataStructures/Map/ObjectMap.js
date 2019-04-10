/**
 * @name Dictionary 字典 也叫映射
 * @description 键值对结构
 * 使用对象实现映射
 * 方便查找元素
 */
class ObjectMap {
  constructor() {
    this.items = {}
  }

  getSize() {
    return Object.keys(this.items).length
  }

  isEmpty() {
    return Object.keys(this.items).length === 0
  }

  contains(key) {
    return this.items.hasOwnProperty(key)
  }

  get(key) {
    return this.contains(key) ? this.items[key] : null
  }

  add(key, value) {
    if (this.contains(key)) {
      console.log(key, 'already exist!')
    }
    this.items[key] = value
  }

  set(key, newValue) {
    if (!this.contains(key)) {
      throw new Error(key + " doesn't exist!")
    }
    this.items[key] = newValue
  }

  remove(key) {
    if (this.contains(key)) {
      const delObj = this.items[key]
      delete this.items[key]
      return delObj
    }
    return null
  }
}

module.exports = ObjectMap
