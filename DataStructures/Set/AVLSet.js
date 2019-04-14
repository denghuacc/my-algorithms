const AVLTree = require('../AVLTree/AVLTree')

/**
 * @name AVLSet 集合
 * @description 使用 AVLTree 实现集合
 */
class AVLSet {
  constructor() {
    this.avl = new AVLTree()
  }

  getSize() {
    return this.avl.getSize()
  }

  isEmpty() {
    return this.avl.isEmpty()
  }

  contains(element) {
    return this.avl.contains(element)
  }

  add(element) {
    this.avl.add(element, null)
  }

  remove(element) {
    this.avl.remove(element)
  }
}

module.exports = AVLSet
