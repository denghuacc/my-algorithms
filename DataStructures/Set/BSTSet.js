const BST = require('../Tree/BST')

/**
 * BSTSet 使用二分搜索树实现集合
 * 本集合特性：无序 + 唯一值
 */
class BSTSet {
  constructor() {
    this.bst = new BST()
  }

  // 获取集合的元素个数 O(1)
  getSize() {
    return this.bst.getSize()
  }

  // 查询集合是否为空 O(1)
  isEmpty() {
    return this.bst.isEmpty()
  }

  // 添加元素 O(log2(n))
  add(element) {
    this.bst.add(element)
  }

  // 删除元素 O(log2(n))
  remove(element) {
    this.bst.remove(element)
  }

  // 查询元素是否存在 O(log2(n))
  contains(element) {
    return this.bst.contains(element)
  }
}

module.exports = BSTSet
