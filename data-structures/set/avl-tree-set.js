const AVLTree = require('../avl-tree/avl-tree')

/**
 * @name AVLSet 集合
 * @description 使用 AVLTree 实现 ES6 的 Set 集合
 */
class AVLSet {
  constructor() {
    this.avl = new AVLTree()
  }

  // 获取集合的元素个数 O(1)
  get size() {
    return this.avl.getSize()
  }

  // 添加元素 O(log2(n))
  add(val) {
    this.avl.add(val)
    return this
  }

  // 删除元素 O(log2(n))
  delete(val) {
    if (!this.has(val)) return false
    this.avl.remove(val)
    return true
  }

  // 查询元素是否存在 O(log2(n))
  has(val) {
    return this.avl.contains(val)
  }

  // 清除元素 O(1)
  clear() {
    this.avl = new AVLTree()
  }
}

module.exports = AVLSet
