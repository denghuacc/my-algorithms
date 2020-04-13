const AVLTree = require('../avl-tree/avl-tree')

/**
 * @name AVLMap 映射
 * @description 使用 AVLTree 实现 ES6 映射 Map
 */
class AVLMap {
  constructor() {
    this.avl = new AVLTree()
  }

  // 查询元素数量 n(1)
  get size() {
    return this.avl.getSize()
  }

  // 设置值 n(log2(n))
  set(key, val) {
    if (!this.has(key)) {
      this.avl.add(key, val)
    }
    this.avl.set(key, val)
    return this
  }

  // 获取值 n(log2(n))
  get(key) {
    const val = this.avl.get(key)
    return val == null ? undefined : val
  }

  // 查询值 n(log2(n))
  has(key) {
    return this.avl.contains(key)
  }

  // 删除值 n(log2(n))
  delete(key) {
    const val = this.avl.remove(key)
    return val == null ? false : true
  }

  // 删除值 n(log2(n))
  clear() {
    this.avl = new AVLTree()
  }
}

module.exports = AVLMap
