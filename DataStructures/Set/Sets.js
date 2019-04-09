/**
 * @name Sets 集合
 * @description 集合是一种包含不同元素的数据结构
 * 基于数组
 * ES6 新增了 Set 数据结构，类名 Sets 区别于 Set
 * 特性 1：无序
 * 特性 2：唯一性，不允许相同成元存在
 * @property { Object } items 数据仓库
 * @method has 判断是否有某个元素
 * @method add 增加元素
 * @method remove 删除元素
 * @method clear 清空元素
 * @method size 集合元素个数
 * @method values 展示元素的值
 * @method union 并集；两个集合中所有元素的新集合
 * @method intersection 交集；两个集合中共有元素的新集合
 * @method difference 差集；本集合有而其他集合没有的元素的集合
 * @method subset 子集 判断本集合是不是某个集合的子集
 * @method isEmpty 空集 判断本集合是不是空集
 */
class Sets {
  constructor() {
    this.items = {}
  }

  // 判断是否有某个元素
  has(value) {
    return this.items.hasOwnProperty(value)
  }

  // 增加元素
  add(value) {
    if (!this.has(value)) {
      this.items[value] = value
      return true
    }
    return false
  }

  // 删除元素
  remove(value) {
    if (this.has(value)) {
      delete this.items[value]
      return true
    }
    return false
  }

  // 清空元素
  clear() {
    this.items = {}
  }

  // 集合元素个数
  size() {
    return Object.keys(this.items).length
  }

  // 展示元素的值
  values() {
    const values = []
    for (let key in this.items) {
      if (this.items.hasOwnProperty(key)) {
        values.push(this.items[key])
      }
    }
    return values
  }

  // 并集：两个集合中所有元素的新集合
  union(otherSet) {
    const unionSet = new Sets()
    let values = this.values()
    for (const item of values) {
      unionSet.add(item)
    }

    values = otherSet.values()
    for (const item of values) {
      unionSet.add(item)
    }
    return unionSet
  }

  // 交集：两个集合中共有元素的新集合
  intersection(otherSet) {
    const intersectionSet = new Sets()
    const values = this.values()
    for (const item of values) {
      if (otherSet.has(item)) {
        intersectionSet.add(item)
      }
    }
    return intersectionSet
  }

  // 差集；本集合有而其他集合没有的元素的集合
  difference(otherSet) {
    const differenceSet = new Sets()
    const values = this.values()
    for (const item of values) {
      if (!otherSet.has(item)) {
        differenceSet.add(item)
      }
    }
    return differenceSet
  }

  // 子集 判断本集合是不是某个集合的子集
  subset(otherSet) {
    if (this.size() > otherSet.size()) {
      return false
    } else {
      const values = this.values()
      for (const item of values) {
        if (!otherSet.has(item)) {
          return false
        }
      }
      return true
    }
  }

  // 空集 没有任何元素
  isEmpty() {
    return this.size === 0
  }
}

module.exports = Sets
