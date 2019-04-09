/**
 * @name Dictionary 字典 也叫映射
 * @description 键值对结构
 * 基于Object 或者 数组
 * 方便查找元素
 * @property { Array } items 数据仓库
 * @method has 判断元素是否存在
 * @method set 添加元素
 * @method remove 删除元素
 * @method get 查找元素
 * @method values 展示元素的值
 * @method clear 清空元素
 * @method size 元素个数
 * @method keys 展示元素的键
 * @method getItems 输出元素的键值
 */
class Dictionary {
  constructor() {
    this.items = {}
  }

  // 判断元素是否存在
  has(key) {
    return this.items.hasOwnProperty(key)
  }

  // 添加元素
  set(key, value) {
    this.items[key] = value
  }

  // 删除元素
  remove(key) {
    if (this.has(key)) {
      delete this.items[key]
      return true
    }
    return false
  }

  // 查找元素
  get(key) {
    return this.has(key) ? this.items[key] : undefined
  }

  // 展示元素的值
  values() {
    const values = []
    for (const key in this.items) {
      if (this.has(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  // 清空元素
  clear() {
    this.items = {}
  }

  // 元素个数
  size() {
    return Object.keys(this.items).length
  }

  // 展示元素的键
  keys() {
    return Object.keys(this.items)
  }

  // 输出元素的键值
  getItems() {
    return this.items
  }
}

module.exports = Dictionary
