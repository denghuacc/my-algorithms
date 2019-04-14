const AVLTree = require('../AVLTree/AVLTree')

/**
 * @name AVLMap 使用 AVLTree 实现 Map
 */
class AVLMap {
  constructor() {
    this.avl = new AVLTree()
  }

  add(key, value) {
    this.avl.add(key, value)
  }

  remove(key) {
    return this.avl.remove(key)
  }

  contains(key) {
    return this.avl.contains(key)
  }

  get(key) {
    return this.avl.get(key)
  }

  set(key, newValue) {
    this.avl.set(key, newValue)
  }

  getSize() {
    return this.avl.getSize()
  }

  isEmpty() {
    return this.avl.isEmpty()
  }
}

module.exports = AVLMap
