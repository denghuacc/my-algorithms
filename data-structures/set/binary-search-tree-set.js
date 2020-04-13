const BST = require('../binary-search-tree/binary-search-tree')

/**
 * @name BSTSet 集合
 * @description 使用二分搜索树实现实现 ES6 的 Set 集合
 */
class BSTSet {
  constructor() {
    this.bst = new BST()
  }

  // 获取集合的元素数量 O(1)
  get size() {
    return this.bst.getSize()
  }

  // 添加元素 O(log2(n))
  add(val) {
    this.bst.add(val)
    return this
  }

  // 删除元素 O(log2(n))
  delete(val) {
    if (!this.has(val)) return false
    this.bst.remove(val)
    return true
  }

  // 查询元素是否存在 O(log2(n))
  has(val) {
    return this.bst.contains(val)
  }

  // 清除元素 O(1)
  clear() {
    this.bst = new BST()
  }
}

module.exports = BSTSet
