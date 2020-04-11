const RedBlackTree = require('../RedBlackTree/RedBlackTree')

/**
 * @name RedBlackTreeSet 集合
 * @description 使用 Red Black Tree 实现 ES6 的 Set 集合
 */
class RedBlackTreeSet {
  constructor() {
    this.rbt = new RedBlackTree()
  }

  // 获取集合的元素个数 O(1)
  get size() {
    return this.rbt.getSize()
  }

  // 添加元素 O(log2(n))
  add(val) {
    this.rbt.add(val)
    return this
  }

  // 删除元素 O(log2(n))
  delete(val) {
    if (!this.has(val)) return false
    this.rbt.remove(val)
    return true
  }

  // 查询元素是否存在 O(log2(n))
  has(val) {
    return this.rbt.contains(val)
  }

  clear() {
    this.rbt = new RedBlackTree()
  }
}

module.exports = RedBlackTreeSet
